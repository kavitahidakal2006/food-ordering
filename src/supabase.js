import { createClient } from "@supabase/supabase-js";

const supabaseUrl ="https://xstawmvfvxhezdriwdgp.supabase.co" ;
const supabaseKey = "sb_publishable_GPP-uVnVONtzcXt2tWxUTw_0k4Fn0Px";

export const supabase = createClient(supabaseUrl, supabaseKey);