import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";

/**
 * Dashboard Layout
 *
 * This layout wraps all dashboard pages (/dashboard/*)
 *
 * Features:
 * - Fetches user data on the server (faster, more secure)
 * - Shows navigation bar with user info
 * - Provides consistent layout for all dashboard pages
 *
 * This is a Server Component (default in Next.js App Router)
 * Benefits:
 * - Fetches data on the server (no loading state needed)
 * - Better SEO
 * - Smaller JavaScript bundle
 * - More secure (API calls happen server-side)
 *
 * The middleware already protects this route, but we double-check here
 * This is defense in depth - good security practice
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Get the current user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user (shouldn't happen due to middleware, but just in case)
  if (!user) {
    redirect("/login");
  }

  // Fetch user's profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation bar */}
      <DashboardNav user={user} profile={profile} />

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
