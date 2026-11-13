import {readFile} from 'node:fs/promises';
try {
 const config=JSON.parse(await readFile(new URL('./local-config.json',import.meta.url),'utf8'));
 if(!process.env.FLOODCARE_ENV_FILE && !process.env.OPENAI_API_KEY) process.env.FLOODCARE_ENV_FILE=config.envFile;
} catch(error) { if(error.code!=='ENOENT') throw new Error('Unable to read local-config.json'); }
await import('./server.mjs');
