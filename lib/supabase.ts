import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lhvwhetjipooftmabpsy.supabase.co";
const supabaseAnonKey = "ISI_PUBLISHABLE_KEY_KAMU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);