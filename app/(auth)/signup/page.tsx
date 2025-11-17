"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormMessage } from "@/components/form-message";

/**
 * Signup Page
 *
 * Allows new users to create an account
 *
 * This is a Client Component because:
 * - It needs useState for error/loading states
 * - Uses interactive form elements
 * - Handles client-side validation
 *
 * The actual account creation happens server-side via the signup() server action
 * This keeps user data secure and validates on the server
 *
 * Flow:
 * 1. User enters email, password, and optional name
 * 2. Form submits to signup() server action
 * 3. Server creates user in Supabase Auth
 * 4. Database trigger automatically creates profile
 * 5. On success: User is logged in and redirected to dashboard
 * 6. On error: Shows error message
 */
export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle form submission
   * Uses FormData API to extract form values
   * Calls server action and handles response
   */
  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signup(formData);

      // If there's an error, display it
      if (result?.error) {
        setError(result.error);
      }
      // If successful, the server action will redirect to /dashboard
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-3xl">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Start tracking your assignments with StudyFlow
          </CardDescription>
        </CardHeader>

        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Show error message if signup fails */}
            {error && <FormMessage type="error" message={error} />}

            {/* Full Name field (optional) */}
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                disabled={isLoading}
              />
              <p className="text-xs text-tertiary-text dark:text-dark-tertiary-text">
                Optional - helps personalize your experience
              </p>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                required
                autoComplete="new-password"
                disabled={isLoading}
                minLength={6}
              />
              <p className="text-xs text-tertiary-text dark:text-dark-tertiary-text">
                Must be at least 6 characters long
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {/* Submit button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            {/* Link to login page */}
            <p className="text-center text-sm text-secondary-text dark:text-dark-secondary-text">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-info hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
