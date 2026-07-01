import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ylvhpbkipwgswycqoawt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdmhwYmtpcHdnc3d5Y3FvYXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MDcyOTUsImV4cCI6MjA5ODQ4MzI5NX0.WIUwR1MhZa702FiKY4z-K7O4cxZZKH0hM58UR8cV_h8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
