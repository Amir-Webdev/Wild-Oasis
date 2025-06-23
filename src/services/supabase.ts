import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://otbruwqzsomgezmcidly.supabase.co";
const supabaseKey =
  import.meta.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YnJ1d3F6c29tZ2V6bWNpZGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODEwODMsImV4cCI6MjA2NTY1NzA4M30._OQWbx-ZRgNs2aS4SaQPufVmAsxyKp3mLkj6DokpEWg";

if (!supabaseKey) {
  throw new Error("SUPABASE_KEY تعریف نشده است.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
