"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Server Actions for Authentication
 *
 * These functions run on the server and handle:
 * - User signup (creating new accounts)
 * - User login (signing in)
 * - User logout (signing out)
 *
 * Why use Server Actions?
 * - More secure (credentials never sent to browser)
 * - Built-in CSRF protection
 * - Automatic revalidation of server data
 * - Better error handling
 *
 * All functions return { error: string } on failure or redirect on success
 */

/**
 * Sign up a new user with email and password
 *
 * Flow:
 * 1. Validate form data
 * 2. Create user in Supabase Auth
 * 3. Auto-creates profile via database trigger
 * 4. Signs user in automatically
 * 5. Redirects to dashboard
 *
 * @param formData - Form data containing email, password, and full_name
 * @returns Error object if signup fails, redirects on success
 *
 * @example In a Client Component:
 * <form action={signup}>
 *   <input name="email" type="email" required />
 *   <input name="password" type="password" required />
 *   <input name="full_name" type="text" />
 *   <button type="submit">Sign Up</button>
 * </form>
 */
export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Extract and validate form data
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    full_name: formData.get("full_name") as string,
  };

  // Validate required fields
  if (!data.email || !data.password) {
    return { error: "Email and password are required" };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { error: "Please enter a valid email address" };
  }

  // Validate password strength (minimum 6 characters)
  if (data.password.length < 6) {
    return { error: "Password must be at least 6 characters long" };
  }

  // Attempt to create user
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.full_name || null,
      },
    },
  });

  if (error) {
    // Handle specific error cases
    if (error.message.includes("User already registered")) {
      return { error: "An account with this email already exists" };
    }
    return { error: error.message };
  }

  // Revalidate the current path to update auth state
  revalidatePath("/", "layout");

  // Redirect to dashboard
  redirect("/dashboard");
}

/**
 * Sign in an existing user
 *
 * Flow:
 * 1. Validate credentials
 * 2. Sign in with Supabase
 * 3. Set auth cookies
 * 4. Redirect to dashboard
 *
 * @param formData - Form data containing email and password
 * @returns Error object if login fails, redirects on success
 *
 * @example In a Client Component:
 * <form action={login}>
 *   <input name="email" type="email" required />
 *   <input name="password" type="password" required />
 *   <button type="submit">Sign In</button>
 * </form>
 */
export async function login(formData: FormData) {
  const supabase = await createClient();

  // Extract form data
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate required fields
  if (!data.email || !data.password) {
    return { error: "Email and password are required" };
  }

  // Attempt to sign in
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Handle specific error cases
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Invalid email or password" };
    }
    return { error: error.message };
  }

  // Revalidate the current path to update auth state
  revalidatePath("/", "layout");

  // Redirect to dashboard
  redirect("/dashboard");
}

/**
 * Sign out the current user
 *
 * Flow:
 * 1. Call Supabase signOut
 * 2. Clear auth cookies
 * 3. Redirect to home page
 *
 * @returns Redirects to home page
 *
 * @example In a Client Component:
 * <form action={logout}>
 *   <button type="submit">Sign Out</button>
 * </form>
 */
export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Revalidate and redirect
  revalidatePath("/", "layout");
  redirect("/");
}
