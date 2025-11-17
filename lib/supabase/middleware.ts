import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Creates a Supabase client for use in Next.js Middleware
 *
 * Middleware runs before every request and can:
 * - Check if user is authenticated
 * - Redirect unauthenticated users to login
 * - Refresh expired sessions automatically
 * - Protect routes that require authentication
 *
 * Why use middleware for auth?
 * - Runs before the page loads (faster than checking in components)
 * - Single place to handle all route protection
 * - Automatically refreshes sessions before they expire
 *
 * How it works:
 * 1. Reads auth cookies from the request
 * 2. Validates the session with Supabase
 * 3. Updates cookies if session was refreshed
 * 4. Passes updated cookies to the response
 *
 * @param request - The incoming Next.js request
 * @returns Tuple of [supabase client, response object]
 *
 * @example Usage in middleware.ts:
 * export async function middleware(request: NextRequest) {
 *   const { supabase, response } = createClient(request)
 *   const { data: { session } } = await supabase.auth.getSession()
 *
 *   if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
 *     return NextResponse.redirect(new URL('/login', request.url))
 *   }
 *
 *   return response
 * }
 */
export function createClient(request: NextRequest) {
  // Create a response object to modify
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Set cookie on the request (for the current request)
            request.cookies.set(name, value);
          });

          // Create fresh response with updated cookies
          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            // Set cookie on the response (for the browser)
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  return { supabase, response };
}
