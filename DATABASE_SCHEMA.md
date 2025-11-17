# StudyFlow Database Schema

This document explains the database structure for StudyFlow. You'll create these tables in your Supabase dashboard.

## 📊 Tables Overview

We need 2 main tables:
1. **profiles** - User profile information (extends Supabase auth.users)
2. **assignments** - Assignment/task data

---

## 🔧 Step-by-Step Setup Instructions

### Step 1: Enable Row Level Security (RLS)

**Why?** RLS ensures users can only access their own data. Without it, any user could see or modify anyone else's assignments!

All tables will have RLS enabled by default in Supabase.

---

### Step 2: Create Tables

Go to **Table Editor** in your Supabase dashboard and create these tables:

---

## 📋 Table 1: `profiles`

**Purpose:** Stores additional user information beyond what Supabase auth provides

**Columns:**

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | `uuid` | PRIMARY KEY, REFERENCES auth.users(id) ON DELETE CASCADE | User's unique ID (same as auth.users) |
| `email` | `text` | NOT NULL | User's email address |
| `full_name` | `text` | NULLABLE | User's display name |
| `created_at` | `timestamp with time zone` | DEFAULT now() | Account creation timestamp |
| `updated_at` | `timestamp with time zone` | DEFAULT now() | Last profile update |

**RLS Policies for `profiles`:**

```sql
-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);
```

**Trigger to auto-create profile on signup:**

```sql
-- Function to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 📚 Table 2: `assignments`

**Purpose:** Stores all assignment/task data

**Columns:**

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | `uuid` | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique assignment ID |
| `user_id` | `uuid` | NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE | Owner of the assignment |
| `title` | `text` | NOT NULL | Assignment title/name |
| `description` | `text` | NULLABLE | Detailed description |
| `subject` | `text` | NOT NULL | Course/subject name (e.g., "Mathematics") |
| `due_date` | `timestamp with time zone` | NOT NULL | When assignment is due |
| `priority` | `text` | NOT NULL, CHECK (priority IN ('low', 'medium', 'high')) | Priority level |
| `status` | `text` | NOT NULL, DEFAULT 'not-started', CHECK (status IN ('not-started', 'in-progress', 'completed')) | Current status |
| `created_at` | `timestamp with time zone` | DEFAULT now() | When assignment was created |
| `updated_at` | `timestamp with time zone` | DEFAULT now() | Last modification time |

**Indexes for Performance:**

```sql
-- Speed up queries that filter by user
CREATE INDEX assignments_user_id_idx ON assignments(user_id);

-- Speed up queries that filter by due date
CREATE INDEX assignments_due_date_idx ON assignments(due_date);

-- Speed up queries that filter by status
CREATE INDEX assignments_status_idx ON assignments(status);

-- Speed up queries that filter by subject
CREATE INDEX assignments_subject_idx ON assignments(subject);
```

**RLS Policies for `assignments`:**

```sql
-- Allow users to view their own assignments
CREATE POLICY "Users can view own assignments"
ON assignments FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to create their own assignments
CREATE POLICY "Users can insert own assignments"
ON assignments FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own assignments
CREATE POLICY "Users can update own assignments"
ON assignments FOR UPDATE
USING (auth.uid() = user_id);

-- Allow users to delete their own assignments
CREATE POLICY "Users can delete own assignments"
ON assignments FOR DELETE
USING (auth.uid() = user_id);
```

**Trigger to auto-update `updated_at`:**

```sql
-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for assignments table
CREATE TRIGGER update_assignments_updated_at
    BEFORE UPDATE ON assignments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## 🎯 Quick Setup Method (Copy-Paste)

Instead of creating tables manually, you can use the **SQL Editor** in Supabase:

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the complete schema below
4. Click **Run**

```sql
-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create assignments table
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on assignments
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX assignments_user_id_idx ON assignments(user_id);
CREATE INDEX assignments_due_date_idx ON assignments(due_date);
CREATE INDEX assignments_status_idx ON assignments(status);
CREATE INDEX assignments_subject_idx ON assignments(subject);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for assignments
CREATE TRIGGER update_assignments_updated_at
    BEFORE UPDATE ON assignments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- RLS Policies for assignments
CREATE POLICY "Users can view own assignments"
ON assignments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assignments"
ON assignments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assignments"
ON assignments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assignments"
ON assignments FOR DELETE
USING (auth.uid() = user_id);
```

---

## ✅ Verification

After running the SQL, verify everything worked:

1. **Check Tables:**
   - Go to **Table Editor**
   - You should see `profiles` and `assignments` tables
   - Both should have a green "RLS Enabled" badge

2. **Check Policies:**
   - Click on each table
   - Go to the **Policies** tab
   - You should see 3 policies for profiles, 4 for assignments

3. **Check Functions:**
   - Go to **Database** → **Functions**
   - You should see `handle_new_user` and `update_updated_at_column`

---

## 🔒 Security Explained

**What is Row Level Security (RLS)?**

RLS is like having a bouncer at a database table. It checks every query and ensures users can only access data they're allowed to see.

**Example:**
- Without RLS: Any user could run `SELECT * FROM assignments` and see EVERYONE's assignments
- With RLS: Users can only see their own assignments because of the policy `auth.uid() = user_id`

**Our Security Model:**
- Users can ONLY see/edit/delete their own assignments
- Users can ONLY see/edit their own profile
- The database enforces this at the lowest level (can't be bypassed from the app)

---

## 📝 Next Steps

Once your tables are created, you'll be ready to:
1. Set up authentication pages (login/signup)
2. Build the dashboard to display assignments
3. Create forms to add/edit assignments
4. Add filtering and sorting features

---

## 🐛 Troubleshooting

**Error: "new row violates row-level security policy"**
- Your RLS policies aren't set up correctly
- Re-run the policy creation SQL

**Error: "permission denied for table"**
- RLS is enabled but no policies exist
- Run the policy creation SQL

**Profiles not auto-creating on signup**
- Check if the trigger `on_auth_user_created` exists
- Check Database → Functions → `handle_new_user`
