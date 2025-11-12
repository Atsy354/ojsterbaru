import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

import { isPublicEnvValid, publicEnv } from "../env";

export function createSupabaseServerClient() {
  if (!isPublicEnvValid) {
    throw new Error(
      "Supabase environment (URL/anon key) belum dikonfigurasi. Cek file .env.",
    );
  }

  // Get cookies instance - call it once per request
  const cookieStore = cookies();

  return createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // ignore write errors in server components/responders
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete(name);
          } catch {
            // ignore remove errors
          }
        },
      },
    },
  );
}

