import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://xmpmptsmzzywiafkbgzw.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_QOyoUDjWXDLG2Mlll94iuA_L-_d7dUY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

export const checkSupabaseConnection = async () => {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (response.ok || response.status === 200) {
      console.log(`[Supabase] Connected successfully to ${supabaseUrl}`);
      return true;
    } else {
      console.log(`[Supabase] Reached endpoint at ${supabaseUrl} (HTTP Status ${response.status})`);
      return true;
    }
  } catch (error) {
    console.error(`[Supabase Error] Connection failed:`, error.message);
    return false;
  }
};
