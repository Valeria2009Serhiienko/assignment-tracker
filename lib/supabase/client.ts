import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Client Components
 *
 * This client is used in components with "use client" directive
 * It handles authentication state and cookies automatically
 *
 * Why use this instead of the basic client?
 * - Proper cookie handling in Next.js
 * - Better session management
 * - Compatible with Next.js App Router
 *
 * @example
 * "use client"
 * import { createClient } from "@/lib/supabase/client"
 *
 * const supabase = createClient()
 * const { data } = await supabase.from("assignments").select()
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
