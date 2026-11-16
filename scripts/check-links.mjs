// Verifica enlaces rotos internos (y recursos) recorriendo el sitio compilado.
// Los enlaces externos se omiten para que la prueba no dependa de la red.
import { LinkChecker } from 'linkinator';
import { serve } from './serve.mjs';

const PORT = 4324;
const server = await serve('dist', PORT);
const checker = new LinkChecker();
const broken = [];
checker.on('link', (result) => {
  if (result.state === 'BROKEN') broken.push(`${result.status} ${result.url} (desde ${result.parent})`);
});
const result = await checker.check({
  path: `http://localhost:${PORT}/`,
  recurse: true,
  linksToSkip: [`^(?!http://localhost:${PORT})`],
});
server.close();
console.log(`Enlaces revisados: ${result.links.length}`);
if (broken.length) {
  console.error(`Enlaces rotos (${broken.length}):\n${broken.join('\n')}`);
  process.exit(1);
}
console.log('✔ Sin enlaces rotos');
