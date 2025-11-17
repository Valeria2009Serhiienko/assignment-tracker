import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase client for use in Server Components and Server Actions
 *
 * This client is used in:
 * - Server Components (default in Next.js App Router)
 * - Server Actions (functions with "use server")
 * - Route Handlers (API routes)
 *
 * Why use this instead of the client version?
 * - Can read/write cookies securely on the server
 * - Better for fetching data on the server (faster, more secure)
 * - Required for authentication in Server Components
 *
 * How it works:
 * - Reads auth cookies from the request
 * - Updates cookies when auth state changes
 * - Handles session refresh automatically
 *
 * @example Server Component:
 * import { createClient } from "@/lib/supabase/server"
 *
 * export default async function Page() {
 *   const supabase = await createClient()
 *   const { data } = await supabase.from("assignments").select()
 *   return <div>{data}</div>
 * }
 *
 * @example Server Action:
 * "use server"
 * import { createClient } from "@/lib/supabase/server"
 *
 * export async function createAssignment(formData: FormData) {
 *   const supabase = await createClient()
 *   await supabase.from("assignments").insert({ ... })
 * }
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
