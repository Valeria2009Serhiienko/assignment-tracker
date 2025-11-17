import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Home Page - Landing page for StudyFlow
 *
 * This is a Server Component (default in Next.js App Router)
 * It renders the initial landing page with:
 * - Welcome message
 * - Theme toggle to test dark mode
 * - Sample buttons to verify styling
 *
 * Next steps: Replace with proper landing page or redirect to dashboard
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="border-b border-border bg-surface px-6 py-4 shadow-subtle dark:border-dark-border dark:bg-dark-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-text dark:text-dark-primary-text">
            StudyFlow
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-primary-text dark:text-dark-primary-text">
            Welcome to StudyFlow
          </h2>
          <p className="mb-8 text-lg text-secondary-text dark:text-dark-secondary-text">
            Your minimalistic assignment tracking application
          </p>

          {/* Test buttons to verify styling */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Button variant="default">Get Started</Button>
            <Button variant="outline">Learn More</Button>
            <Button variant="secondary">View Demo</Button>
          </div>

          {/* Setup status card */}
          <div className="mx-auto max-w-2xl rounded-lg border border-border bg-surface p-8 shadow-card dark:border-dark-border dark:bg-dark-surface">
            <h3 className="mb-4 text-xl font-semibold text-primary-text dark:text-dark-primary-text">
              ✅ Project Setup Complete
            </h3>
            <ul className="space-y-2 text-left text-secondary-text dark:text-dark-secondary-text">
              <li>✓ Next.js 14 with TypeScript</li>
              <li>✓ Tailwind CSS 3 configured</li>
              <li>✓ shadcn/ui component library ready</li>
              <li>✓ Dark mode support enabled</li>
              <li>✓ Custom color palette applied</li>
              <li>✓ TypeScript types defined</li>
            </ul>

            <div className="mt-6 rounded border border-warning/20 bg-warning/10 p-4">
              <p className="text-sm text-primary-text dark:text-dark-primary-text">
                <strong>Next Steps:</strong> Configure Supabase for authentication
                and database, then build the dashboard!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
