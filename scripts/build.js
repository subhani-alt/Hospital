import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== Prestige Hospitals Unified Build Script ===');
const cwd = process.cwd();
console.log('[Build] Current Working Directory:', cwd);

const isClientSubdir = fs.existsSync(path.join(cwd, 'src', 'App.jsx')) || fs.existsSync(path.join(cwd, 'src', 'main.jsx'));
const clientDir = isClientSubdir ? cwd : (fs.existsSync(path.join(cwd, 'client')) ? path.join(cwd, 'client') : cwd);

console.log('[Build] Target Client Directory:', clientDir);

try {
  console.log('[Build] Compiling Vite application...');
  execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });
  console.log('[Build] Build completed successfully!');
} catch (err) {
  console.error('[Build Error]:', err.message);
  process.exit(1);
}
