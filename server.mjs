import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {createChatHandler} from './chat-api.mjs';
// Optional reference to an existing, user-approved env file; never served or logged.
if(process.env.FLOODCARE_ENV_FILE){if(typeof process.loadEnvFile!=='function')throw Error('Use Node 22+ to load FLOODCARE_ENV_FILE');process.loadEnvFile(process.env.FLOODCARE_ENV_FILE);}
const chat=createChatHandler();
const files={'/coordinator.js':['coordinator.js','text/javascript'],'/coordinator.css':['coordinator.css','text/css'],'/experience.js':['experience.js','text/javascript'],'/experience.css':['experience.css','text/css'],'/':['index.html','text/html'],'/index.html':['index.html','text/html'],'/style.css':['style.css','text/css'],'/app.js':['app.js','text/javascript'],'/chat.js':['chat.js','text/javascript'],'/chat-knowledge.js':['chat-knowledge.js','text/javascript']};
const port=Number(process.env.PORT||4173);
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"};
const origins=new Set([`http://127.0.0.1:${port}`,`http://localhost:${port}`]);
const json=(res,status,data)=>{res.writeHead(status,{...headers,'Content-Type':'application/json'});res.end(JSON.stringify(data))};
http.createServer(async(req,res)=>{try{
 const path=new URL(req.url,'http://localhost').pathname;
 if(path==='/api/chat/status'&&req.method==='GET'){json(res,200,{configured:!!process.env.OPENAI_API_KEY});return}
 if(path==='/api/chat'){
  if(req.method!=='POST'){json(res,405,{error:'method_not_allowed'});return}
  if(!origins.has(req.headers.origin)||req.headers['sec-fetch-site']==='cross-site'){json(res,403,{error:'forbidden'});return}
  if(!req.headers['content-type']?.startsWith('application/json')){json(res,415,{error:'invalid_request'});return}
  let length=0;const parts=[];for await(const chunk of req){length+=chunk.length;if(length>16000){json(res,413,{error:'too_large'});return}parts.push(chunk)}
  let body;try{body=JSON.parse(Buffer.concat(parts).toString())}catch{json(res,400,{error:'invalid_request'});return}
  const result=await chat(body);json(res,result.status,result.data);return
 }
 const file=files[path];if(!file||!['GET','HEAD'].includes(req.method)){res.writeHead(404,headers);res.end('Not found');return}
 const body=await readFile(new URL(`./dist/${file[0]}`,import.meta.url));res.writeHead(200,{...headers,'Content-Type':`${file[1]}; charset=utf-8`});res.end(req.method==='HEAD'?undefined:body);
 }catch{if(!res.headersSent)json(res,500,{error:'unavailable'});else res.end()}
}).listen(port,'127.0.0.1',()=>console.log(`HighGround: http://127.0.0.1:${port}`));
