// Levanta dist/ en http://localhost:8080 y ejecuta un comando (p. ej. pa11y-ci); luego cierra el servidor.
// Uso: node scripts/serve-and-run.mjs <comando> [args...]
import { spawn } from 'node:child_process';
import { serve } from './serve.mjs';

const [cmd, ...args] = process.argv.slice(2);
const server = await serve('dist', 8080);
const child = spawn('npx', [cmd, ...args], { stdio: 'inherit' });
child.on('exit', (code) => {
  server.close();
  process.exit(code ?? 1);
});
