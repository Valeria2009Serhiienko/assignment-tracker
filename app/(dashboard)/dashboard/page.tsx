import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Calendar, CheckCircle2, Clock } from "lucide-react";

/**
 * Dashboard Page
 *
 * The main dashboard view showing:
 * - Welcome message
 * - Quick stats (assignments overview)
 * - Quick actions
 *
 * This is a Server Component (default)
 * - Fetches data on the server for better performance
 * - No loading state needed (data ready on first render)
 * - Better SEO
 *
 * In the future, this will show:
 * - Upcoming deadlines
 * - Assignment statistics
 * - Recent activity
 * - Calendar widget
 */
export default async function DashboardPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  // Get assignment counts (will show 0 for now since we haven't built CRUD yet)
  const { count: totalAssignments } = await supabase
    .from("assignments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id);

  const { count: completedAssignments } = await supabase
    .from("assignments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .eq("status", "completed");

  const { count: inProgressAssignments } = await supabase
    .from("assignments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .eq("status", "in-progress");

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-primary-text dark:text-dark-primary-text">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}!
        </h1>
        <p className="mt-2 text-secondary-text dark:text-dark-secondary-text">
          Here&apos;s an overview of your assignments and upcoming deadlines.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Assignments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Assignments
            </CardTitle>
            <BookOpen className="h-4 w-4 text-tertiary-text dark:text-dark-tertiary-text" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssignments || 0}</div>
            <p className="text-xs text-tertiary-text dark:text-dark-tertiary-text">
              All time
            </p>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressAssignments || 0}</div>
            <p className="text-xs text-tertiary-text dark:text-dark-tertiary-text">
              Currently working on
            </p>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAssignments || 0}</div>
            <p className="text-xs text-tertiary-text dark:text-dark-tertiary-text">
              Finished assignments
            </p>
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
            <Calendar className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-tertiary-text dark:text-dark-tertiary-text">
              Next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            You don&apos;t have any assignments yet. Create your first one to start tracking!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link href="/dashboard/assignments">
            <Button>View All Assignments</Button>
          </Link>
          <Button variant="outline" disabled>
            Create Assignment (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Setup Completion Card */}
      <Card>
        <CardHeader>
          <CardTitle>✅ Authentication is Working!</CardTitle>
          <CardDescription>
            You&apos;ve successfully set up authentication with Supabase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-secondary-text dark:text-dark-secondary-text">
            <li>✓ User signed up and logged in</li>
            <li>✓ Profile automatically created in database</li>
            <li>✓ Protected routes working (middleware)</li>
            <li>✓ Session management active</li>
            <li>✓ Logout functionality ready</li>
          </ul>
          <div className="mt-4 rounded-md border border-info/20 bg-info/10 p-4">
            <p className="text-sm text-primary-text dark:text-dark-primary-text">
              <strong>Next Steps:</strong> Build the assignment CRUD operations,
              then add calendar view and filtering!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
