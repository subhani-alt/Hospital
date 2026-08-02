import { checkSupabaseConnection } from './config/supabase.js';

console.log('--- Testing Supabase Connection ---');
const success = await checkSupabaseConnection();
console.log(`Connection Status: ${success ? 'CONNECTED' : 'FAILED'}`);
process.exit(success ? 0 : 1);
