import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL || 'https://xmpmptsmzzywiafkbgzw.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_QOyoUDjWXDLG2Mlll94iuA_L-_d7dUY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnectionAndSeeding() {
  console.log('--- Testing Supabase Connection & Full Database Sync ---');
  
  // 1. Check Doctors
  const docCheck = await supabase.from('doctors').select('count', { count: 'exact' });
  console.log('Current Doctors in Supabase DB:', docCheck.count, docCheck.error ? `Error: ${docCheck.error.message}` : '');

  // 2. Check Appointments
  const appCheck = await supabase.from('appointments').select('count', { count: 'exact' });
  console.log('Current Appointments in Supabase DB:', appCheck.count, appCheck.error ? `Error: ${appCheck.error.message}` : '');

  // 3. Check Blogs
  const blogCheck = await supabase.from('blogs').select('count', { count: 'exact' });
  console.log('Current Blogs in Supabase DB:', blogCheck.count, blogCheck.error ? `Error: ${blogCheck.error.message}` : '');

  // 4. Check Health Packages
  const pkgCheck = await supabase.from('health_packages').select('count', { count: 'exact' });
  console.log('Current Health Packages in Supabase DB:', pkgCheck.count, pkgCheck.error ? `Error: ${pkgCheck.error.message}` : '');

  console.log('--- DB Verification Complete ---');
}

testConnectionAndSeeding();
