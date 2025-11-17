import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Metadata for SEO and browser display
export const metadata: Metadata = {
  title: "StudyFlow - Assignment Tracker",
  description: "A minimalistic assignment tracking application for students to manage coursework and deadlines",
  keywords: ["assignments", "student", "tracker", "productivity", "education"],
};

/**
 * Root Layout Component
 *
 * This is the top-level layout that wraps the entire application.
 * It sets up:
 * - HTML structure
 * - Theme provider for dark mode support
 * - Global styles with system fonts
 *
 * Font Strategy: Using system fonts for better performance and reliability
 * - No external font requests needed
 * - Instant loading (no network delay)
 * - Respects user's OS font preferences
 *
 * This is a Server Component by default (no "use client")
 * ThemeProvider is a Client Component, which is fine to use here
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
