import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://askfapkjlobovgddzxbk.supabase.co";
const supabaseAnonKey = "sb_publishable_kzYivt6ndbqRq--Zy_4nOw_7fUsddbm";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
