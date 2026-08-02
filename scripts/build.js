import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== Apex Health Vercel Unified Build Script ===');
const cwd = process.cwd();
console.log('[Build] Current Working Directory:', cwd);

// Determine client directory whether Vercel runs at root or inside /client
const clientDir = fs.existsSync(path.join(cwd, 'client', 'package.json'))
  ? path.join(cwd, 'client')
  : cwd;

console.log('[Build] Target Client Directory:', clientDir);

try {
  console.log('[Build] Executing Vite compilation...');
  execSync('npx vite build', { cwd: clientDir, stdio: 'inherit' });
  console.log('[Build] Build completed successfully!');
} catch (err) {
  console.error('[Build Error] Failed to compile client:', err.message);
  process.exit(1);
}
