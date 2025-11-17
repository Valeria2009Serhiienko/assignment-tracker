import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

/**
 * Next.js Middleware for Authentication
 *
 * This middleware runs BEFORE every request to your app
 *
 * What it does:
 * 1. Checks if user has a valid session
 * 2. Automatically refreshes expired sessions
 * 3. Protects dashboard routes (redirects to login if not authenticated)
 * 4. Redirects authenticated users away from auth pages
 *
 * Why use middleware instead of checking auth in pages?
 * - Runs before the page loads (faster)
 * - Single place to handle all auth logic
 * - Prevents flash of wrong content
 * - Can refresh sessions automatically
 *
 * Protected routes: /dashboard/*
 * Auth routes: /login, /signup
 * Public routes: /, everything else
 */
export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // Refresh session if expired - this is important for user experience
  // Without this, users would be logged out when their session expires
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is NOT logged in and trying to access dashboard, redirect to login
  if (!session && isDashboardRoute) {
    const redirectUrl = new URL("/login", request.url);
    // Add returnTo parameter so we can redirect back after login
    redirectUrl.searchParams.set("returnTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // For all other cases, continue with the request
  return response;
}

/**
 * Matcher Configuration
 *
 * Specifies which routes this middleware should run on
 * We exclude:
 * - _next/static (static files)
 * - _next/image (image optimization)
 * - favicon.ico (favicon)
 * - Public files (images, fonts, etc.)
 *
 * This improves performance by not running auth checks on static assets
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public files (images, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
