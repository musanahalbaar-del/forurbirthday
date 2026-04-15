import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lhvwhetjipooftmabpsy.supabase.co";
const supabaseAnonKey = "sb_publishable_oFLocnd_4NmWKNCzZfNd1A_5HrxXF6W";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);