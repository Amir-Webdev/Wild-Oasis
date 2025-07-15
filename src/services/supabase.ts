import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase/supabaseTypes";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("کلید یا لینک Supabase تعریف نشده است.");
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
