/**
 * Core data types for StudyFlow Assignment Tracker
 */

// Priority levels for assignments
export type Priority = "low" | "medium" | "high";

// Assignment status options
export type AssignmentStatus = "not-started" | "in-progress" | "completed";

// Main Assignment interface
export interface Assignment {
  id: string; // Unique identifier (UUID from database)
  userId: string; // Reference to the user who owns this assignment
  title: string; // Assignment name/title
  description: string | null; // Detailed description (optional)
  subject: string; // Course/subject name (e.g., "Mathematics", "English")
  dueDate: Date; // Due date and time
  priority: Priority; // Importance level
  status: AssignmentStatus; // Current completion status
  createdAt: Date; // When the assignment was created
  updatedAt: Date; // Last modification timestamp
}

// Form data type for creating/editing assignments (excludes auto-generated fields)
export interface AssignmentFormData {
  title: string;
  description: string | null;
  subject: string;
  dueDate: Date;
  priority: Priority;
  status: AssignmentStatus;
}

// User profile interface
export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard statistics
export interface DashboardStats {
  totalAssignments: number;
  completedAssignments: number;
  inProgressAssignments: number;
  upcomingDeadlines: number; // Due within next 7 days
  overdueAssignments: number;
}

// Filter options for assignments list
export interface AssignmentFilters {
  subject?: string;
  priority?: Priority;
  status?: AssignmentStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
