import { execSync } from 'child_process';
import { rmSync } from 'fs';

rmSync('dist', { recursive: true, force: true });

console.log('Building ESM...');
execSync('tsc --module ESNext --outDir dist/esm', { stdio: 'inherit' });

console.log('Building CJS...');
execSync('tsc --module CommonJS --outDir dist/cjs', { stdio: 'inherit' });

console.log('Build complete.');
