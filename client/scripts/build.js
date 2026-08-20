import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== Prestige Hospitals Unified Build Script ===');
const cwd = process.cwd();
console.log('[Build] Current Working Directory:', cwd);

// Determine if we are inside client subdirectory or repository root
const isClientSubdir = fs.existsSync(path.join(cwd, 'src', 'App.jsx')) || fs.existsSync(path.join(cwd, 'src', 'main.jsx'));
const clientDir = isClientSubdir ? cwd : (fs.existsSync(path.join(cwd, 'client')) ? path.join(cwd, 'client') : cwd);

console.log('[Build] Target Client Directory:', clientDir);

try {
  console.log('[Build] Executing Vite compilation...');
  execSync('npx vite build', { cwd: clientDir, stdio: 'inherit' });
  
  const clientDist = path.join(clientDir, 'dist');
  const rootDir = isClientSubdir ? path.resolve(cwd, '..') : cwd;
  const rootDist = path.join(rootDir, 'dist');
  const nestedDist = path.join(rootDir, 'client', 'dist');

  if (fs.existsSync(clientDist)) {
    if (path.resolve(clientDist) !== path.resolve(rootDist)) {
      try {
        fs.cpSync(clientDist, rootDist, { recursive: true });
      } catch (e) {
        console.warn('[Build] Warning copying to root dist:', e.message);
      }
    }
    if (path.resolve(clientDist) !== path.resolve(nestedDist)) {
      try {
        fs.cpSync(clientDist, nestedDist, { recursive: true });
      } catch (e) {
        console.warn('[Build] Warning copying to nested dist:', e.message);
      }
    }
  }

  console.log('[Build] Build completed successfully!');
} catch (err) {
  console.error('[Build Error] Failed to compile client:', err.message);
  process.exit(1);
}
