import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== Prestige Hospitals Unified Build Script ===');
const cwd = process.cwd();
console.log('[Build] Current Working Directory:', cwd);

const isClientSubdir = fs.existsSync(path.join(cwd, 'src', 'App.jsx')) || fs.existsSync(path.join(cwd, 'src', 'main.jsx'));
const clientDir = isClientSubdir ? cwd : (fs.existsSync(path.join(cwd, 'client')) ? path.join(cwd, 'client') : cwd);

console.log('[Build] Target Client Directory:', clientDir);

// On Linux / Vercel, ensure native binaries for Rollup and Esbuild are installed
if (process.platform === 'linux') {
  console.log('[Build] Linux environment detected. Ensuring Linux native binaries (Rollup, Esbuild)...');
  try {
    execSync(
      'npm install --no-save --force --legacy-peer-deps --no-audit --no-fund @rollup/rollup-linux-x64-gnu@4.34.8 @rollup/rollup-linux-x64-musl@4.34.8 @esbuild/linux-x64',
      { cwd: clientDir, stdio: 'inherit' }
    );
  } catch (err) {
    console.warn('[Build] Warning installing Linux native binaries:', err.message);
  }
}

try {
  console.log('[Build] Compiling Vite application...');
  const viteBin = path.join(clientDir, 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
  const buildCmd = fs.existsSync(viteBin) ? `"${viteBin}" build` : 'npx vite build';
  execSync(buildCmd, { cwd: clientDir, stdio: 'inherit' });

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
  console.error('[Build Error]:', err.message);
  process.exit(1);
}

