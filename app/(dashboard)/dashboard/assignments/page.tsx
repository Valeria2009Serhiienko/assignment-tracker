import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Assignments Page
 *
 * This will show a list of all user's assignments with:
 * - Filtering by subject, status, priority
 * - Sorting by due date, created date
 * - Search functionality
 * - Create/Edit/Delete actions
 *
 * For now, it's a placeholder showing what's coming next
 */
export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-text dark:text-dark-primary-text">
          Assignments
        </h1>
        <p className="mt-2 text-secondary-text dark:text-dark-secondary-text">
          Manage all your assignments in one place
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Management (Coming Soon)</CardTitle>
          <CardDescription>
            The full CRUD interface for managing assignments will be built next
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-secondary-text dark:text-dark-secondary-text">
            This page will include:
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm text-secondary-text dark:text-dark-secondary-text">
            <li>Create new assignments with title, description, subject, due date, priority, and status</li>
            <li>View all assignments in a clean table or card layout</li>
            <li>Edit existing assignments</li>
            <li>Delete assignments with confirmation</li>
            <li>Filter by subject, status, and priority</li>
            <li>Sort by due date, created date, or priority</li>
            <li>Search assignments by title or description</li>
            <li>Color-coded priority badges (low/medium/high)</li>
            <li>Status indicators (not-started/in-progress/completed)</li>
          </ul>

          <div className="pt-4">
            <Button disabled>Create New Assignment (Coming Soon)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
