"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";
import type { User as SupabaseUser } from "@supabase/supabase-js";

/**
 * Dashboard Navigation Component
 *
 * Shows the top navigation bar for the dashboard
 *
 * Features:
 * - User info display
 * - Logout button
 * - Dark mode toggle
 * - Active route highlighting
 *
 * This is a Client Component because:
 * - Uses usePathname for active route detection
 * - Has interactive buttons (logout, theme toggle)
 *
 * Props are passed from the Server Component (layout.tsx)
 * This is a common pattern: fetch data on server, pass to client for interactivity
 */

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

interface DashboardNavProps {
  user: SupabaseUser;
  profile: Profile | null;
}

export function DashboardNav({ user, profile }: DashboardNavProps) {
  const pathname = usePathname();

  // Navigation links
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/assignments", label: "Assignments" },
  ];

  return (
    <nav className="border-b border-border bg-surface shadow-subtle dark:border-dark-border dark:bg-dark-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Logo and nav links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-primary-text dark:text-dark-primary-text">
                StudyFlow
              </span>
            </Link>

            {/* Navigation links */}
            <div className="hidden md:flex md:gap-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-action text-surface dark:bg-dark-primary-action dark:text-dark-background"
                        : "text-secondary-text hover:bg-border/50 hover:text-primary-text dark:text-dark-secondary-text dark:hover:bg-dark-border dark:hover:text-dark-primary-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side: User info, theme toggle, logout */}
          <div className="flex items-center gap-4">
            {/* User info */}
            <div className="hidden items-center gap-2 sm:flex">
              <User className="h-5 w-5 text-secondary-text dark:text-dark-secondary-text" />
              <span className="text-sm text-secondary-text dark:text-dark-secondary-text">
                {profile?.full_name || user.email}
              </span>
            </div>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Logout button */}
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
