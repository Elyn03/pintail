import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Environment variable VITE_SUPABASE_URL is not defined. " +
      "Please set VITE_SUPABASE_URL in your environment configuration.",
  );
}

if (!supabaseKey) {
  throw new Error(
    "Environment variable VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY is not defined. " +
      "Please set VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY in your environment configuration.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
