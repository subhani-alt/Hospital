import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xmpmptsmzzywiafkbgzw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QOyoUDjWXDLG2Mlll94iuA_L-_d7dUY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
