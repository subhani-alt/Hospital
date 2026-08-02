import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const pubKey = process.env.SUPABASE_PUBLISHABLE_KEY;

console.log('Testing SQL creation endpoints...');

async function trySql() {
  // Test 1: Try /rest/v1/rpc/exec_sql or similar
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': secretKey,
        'Authorization': `Bearer ${secretKey}`
      },
      body: JSON.stringify({ query: 'SELECT 1;' })
    });
    console.log('RPC exec_sql status:', res.status, await res.text());
  } catch (e) {
    console.log('RPC exec_sql error:', e.message);
  }

  // Test 2: Try pg REST query if enabled
  try {
    const res = await fetch(`${supabaseUrl}/pg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': secretKey,
        'Authorization': `Bearer ${secretKey}`
      },
      body: JSON.stringify({ query: 'SELECT 1;' })
    });
    console.log('PG endpoint status:', res.status, await res.text());
  } catch (e) {
    console.log('PG endpoint error:', e.message);
  }
}

trySql();
