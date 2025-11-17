# 🚀 Supabase Setup Guide

Follow these steps to get your Supabase backend running for StudyFlow.

## ✅ Checklist

- [ ] Create Supabase account
- [ ] Create new project
- [ ] Copy API credentials
- [ ] Create database tables
- [ ] Verify RLS policies
- [ ] Add environment variables to project

---

## Step 1: Create Account & Project

1. **Go to https://supabase.com and sign up**
   - GitHub sign-in is fastest
   - Or use email

2. **Click "New Project"**
   - **Name**: `studyflow` (or your preference)
   - **Database Password**: Create strong password and SAVE IT
   - **Region**: Choose closest to you
   - **Plan**: Free tier is perfect

3. **Wait 1-2 minutes** for project initialization

---

## Step 2: Get API Credentials

1. Click **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. **Copy these two values:**

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGc...very_long_string
   ```

   ⚠️ **IMPORTANT:** Keep these safe! You'll paste them into `.env.local` next.

---

## Step 3: Create Database Tables

### Option A: Quick Copy-Paste Method (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard (left sidebar)
2. Click **"New Query"**
3. Open `DATABASE_SCHEMA.md` in this project
4. Copy the **entire SQL block** under "Quick Setup Method"
5. Paste into the SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. Wait for "Success" message

### Option B: Manual Table Creation

Follow the detailed instructions in `DATABASE_SCHEMA.md` if you prefer creating tables manually through the UI.

---

## Step 4: Verify Setup

### Check Tables
1. Go to **Table Editor**
2. You should see:
   - ✅ `profiles` table (with green "RLS Enabled" badge)
   - ✅ `assignments` table (with green "RLS Enabled" badge)

### Check Policies
1. Click on `assignments` table
2. Click **Policies** tab
3. You should see **4 policies:**
   - Users can view own assignments
   - Users can insert own assignments
   - Users can update own assignments
   - Users can delete own assignments

4. Click on `profiles` table
5. Click **Policies** tab
6. You should see **3 policies:**
   - Users can view own profile
   - Users can update own profile
   - Users can insert own profile

### Check Functions
1. Go to **Database** → **Functions** in sidebar
2. You should see:
   - ✅ `handle_new_user` - Creates profile when user signs up
   - ✅ `update_updated_at_column` - Auto-updates timestamps

---

## Step 5: Add Environment Variables

1. In your project root, create `.env.local` file:

```bash
# Copy the example file
cp .env.local.example .env.local
```

2. Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_very_long_anon_key_here
```

3. Save the file

⚠️ **Security Note:** `.env.local` is in `.gitignore` and will NOT be committed to git. This is correct - never commit API keys!

---

## 🎯 You're Done!

Your Supabase backend is now ready! The app can now:
- ✅ Store user profiles
- ✅ Store assignments
- ✅ Authenticate users
- ✅ Protect data with RLS

---

## 🔍 Quick Test (Optional)

Want to verify everything works? Try inserting test data:

1. Go to **Table Editor** → **assignments**
2. Click **Insert row**
3. You'll see it requires a `user_id` - this is good! RLS is working.
4. Don't insert anything yet - we'll do this through the app once auth is built.

---

## 🐛 Common Issues

### "Error: Invalid API key"
- Double-check you copied the **anon public** key, not the service_role key
- Make sure there are no extra spaces in `.env.local`

### "Error: new row violates row-level security policy"
- Your RLS policies aren't set up
- Go back to Step 3 and run the SQL again

### "Tables not showing up"
- Wait a minute and refresh the page
- Check the SQL Editor for any errors when you ran the schema

### "Can't find .env.local"
- Make sure you created it in the project root (same folder as `package.json`)
- Check that it starts with a dot: `.env.local` not `env.local`

---

## 📞 Need Help?

If something's not working:
1. Check the **SQL Editor** → **History** tab for error messages
2. Make sure you ran ALL the SQL in the "Quick Setup Method"
3. Verify your `.env.local` values are correct
4. Let me know what error you're seeing!

---

## ⏭️ Next Steps

Once Supabase is configured:
1. ✅ Restart your Next.js dev server (`npm run dev`)
2. 🔨 Build authentication pages (login/signup)
3. 🏗️ Create the dashboard
4. 📝 Build assignment forms
5. 🎉 Start using your app!
