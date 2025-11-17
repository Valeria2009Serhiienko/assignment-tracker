"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";
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
 * Login Page
 *
 * Allows existing users to sign in to their account
 *
 * This is a Client Component because:
 * - It needs useState for error handling
 * - Uses interactive form elements
 * - Handles client-side validation
 *
 * The actual authentication happens server-side via the login() server action
 * This keeps credentials secure and never exposes them to the browser
 *
 * Flow:
 * 1. User enters email/password
 * 2. Form submits to login() server action
 * 3. Server validates credentials with Supabase
 * 4. On success: Redirects to dashboard
 * 5. On error: Shows error message
 */
export default function LoginPage() {
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
      const result = await login(formData);

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
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your StudyFlow account
          </CardDescription>
        </CardHeader>

        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Show error message if login fails */}
            {error && <FormMessage type="error" message={error} />}

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
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {/* Submit button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Link to signup page */}
            <p className="text-center text-sm text-secondary-text dark:text-dark-secondary-text">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-info hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
