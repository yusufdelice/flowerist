import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Run TypeScript seed via tsx
console.log('Running prisma/seed.ts...');
import('./seed.ts');
