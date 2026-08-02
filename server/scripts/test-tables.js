import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

const supabaseUrl = process.env.SUPABASE_URL || 'https://xmpmptsmzzywiafkbgzw.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTables() {
  console.log('--- Testing Supabase Table Operations ---');
  
  // Try querying 'appointments' table
  const { data: appointments, error: apptError } = await supabase.from('appointments').select('*').limit(1);
  if (apptError) {
    console.log('Appointments table status:', apptError.message);
  } else {
    console.log('Appointments table exists! Row count sample:', appointments.length);
  }

  // Try querying 'doctors' table
  const { data: doctors, error: docError } = await supabase.from('doctors').select('*').limit(1);
  if (docError) {
    console.log('Doctors table status:', docError.message);
  } else {
    console.log('Doctors table exists! Row count sample:', doctors.length);
  }

  // Try querying 'departments' table
  const { data: depts, error: deptError } = await supabase.from('departments').select('*').limit(1);
  if (deptError) {
    console.log('Departments table status:', deptError.message);
  } else {
    console.log('Departments table exists! Row count sample:', depts.length);
  }

  // Try querying 'users' table
  const { data: users, error: userError } = await supabase.from('users').select('*').limit(1);
  if (userError) {
    console.log('Users table status:', userError.message);
  } else {
    console.log('Users table exists! Row count sample:', users.length);
  }

  // Try querying 'health_packages' table
  const { data: pkgs, error: pkgError } = await supabase.from('health_packages').select('*').limit(1);
  if (pkgError) {
    console.log('Health packages table status:', pkgError.message);
  } else {
    console.log('Health packages table exists! Row count sample:', pkgs.length);
  }
}

testTables();
