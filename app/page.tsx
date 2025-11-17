import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * Home Page - Landing page for StudyFlow
 *
 * This is a Server Component (default in Next.js App Router)
 *
 * Features:
 * - Checks if user is already logged in
 * - If logged in: Redirects to dashboard automatically
 * - If not logged in: Shows landing page with login/signup CTAs
 *
 * Why check auth on server?
 * - Faster redirect (no client-side flash)
 * - Better UX (immediate navigation)
 * - More secure (server-side validation)
 */
export default async function Home() {
  const supabase = await createClient();

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  // If not logged in, show landing page
  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="border-b border-border bg-surface px-6 py-4 shadow-subtle dark:border-dark-border dark:bg-dark-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-text dark:text-dark-primary-text">
            StudyFlow
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-primary-text dark:text-dark-primary-text sm:text-5xl">
            Track Your Assignments<br />with Ease
          </h2>
          <p className="mb-8 text-lg text-secondary-text dark:text-dark-secondary-text">
            A minimalistic assignment tracker designed for students.<br />
            Stay organized and never miss a deadline.
          </p>

          {/* Call to action buttons */}
          <div className="mb-16 flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button variant="default" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features grid */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface p-6 shadow-card dark:border-dark-border dark:bg-dark-surface">
              <div className="mb-4 text-3xl">📚</div>
              <h3 className="mb-2 font-semibold text-primary-text dark:text-dark-primary-text">
                Organize by Subject
              </h3>
              <p className="text-sm text-secondary-text dark:text-dark-secondary-text">
                Keep track of assignments across all your courses in one place
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6 shadow-card dark:border-dark-border dark:bg-dark-surface">
              <div className="mb-4 text-3xl">⏰</div>
              <h3 className="mb-2 font-semibold text-primary-text dark:text-dark-primary-text">
                Never Miss Deadlines
              </h3>
              <p className="text-sm text-secondary-text dark:text-dark-secondary-text">
                See upcoming due dates and prioritize your work effectively
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6 shadow-card dark:border-dark-border dark:bg-dark-surface">
              <div className="mb-4 text-3xl">✅</div>
              <h3 className="mb-2 font-semibold text-primary-text dark:text-dark-primary-text">
                Track Progress
              </h3>
              <p className="text-sm text-secondary-text dark:text-dark-secondary-text">
                Mark assignments as started, in-progress, or completed
              </p>
            </div>
          </div>

          {/* Tech stack showcase */}
          <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-border bg-surface p-8 shadow-card dark:border-dark-border dark:bg-dark-surface">
            <h3 className="mb-4 text-xl font-semibold text-primary-text dark:text-dark-primary-text">
              ✅ Fully Functional Authentication
            </h3>
            <ul className="space-y-2 text-left text-sm text-secondary-text dark:text-dark-secondary-text">
              <li>✓ Next.js 14 with TypeScript & App Router</li>
              <li>✓ Supabase authentication & database</li>
              <li>✓ Secure route protection with middleware</li>
              <li>✓ Dark mode support</li>
              <li>✓ Responsive design with Tailwind CSS</li>
              <li>✓ Accessible UI components</li>
            </ul>

            <div className="mt-6 rounded border border-success/20 bg-success/10 p-4">
              <p className="text-sm text-primary-text dark:text-dark-primary-text">
                <strong>Ready to use!</strong> Sign up now to start tracking your assignments.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
