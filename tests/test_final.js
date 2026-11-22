const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..');const bank=JSON.parse(fs.readFileSync(path.join(root,'questions.json'),'utf8'));
let now=1800000000000;const store=new Map();const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
const elements=new Map();function el(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',classList:{toggle(){},contains(){return false}},onclick:null});return elements.get(id)}
const document={getElementById:el,querySelectorAll:()=>[],activeElement:{tagName:'BODY'},title:'',onkeydown:null};
const ctx={window:{JFT_BANK:bank},document,localStorage,sessionStorage:{getItem:()=>null,removeItem:()=>{}},Date:class extends Date{static now(){return now}},setInterval:()=>1,clearInterval:()=>{},alert:()=>{},confirm:()=>true,console,URL,Blob};ctx.window.window=ctx.window;
let src=fs.readFileSync(path.join(root,'app.js'),'utf8');src=src.replace('})();','globalThis.__test={createExam,examQuestions,validActive,finish,resultQuestions,migrateHistorySnapshots,examScreen,next,play,getDB:()=>db,setExam:e=>exam=e,getExam:()=>exam};})();');
vm.createContext(ctx);vm.runInContext(src,ctx);const t=ctx.__test,db=t.getDB();db.profiles.push({id:'p',name:'QA'});db.current='p';
const e=t.createExam(0);t.setExam(e);now=e.deadline+1;t.examScreen();assert.equal(t.getExam(),null);assert.equal(db.history[0].timeout,true);assert.equal(db.history[0].answers.length,48);
const e2=t.createExam(1);t.setExam(e2);now=e2.deadline+1;t.next();assert.equal(t.getExam(),null);assert.equal(db.history[0].timeout,true);
const e3=t.createExam(2);e3.section=2;t.setExam(e3);now=e3.deadline+1;t.play(24,t.examQuestions(e3)[24]);assert.equal(t.getExam(),null);assert.equal(db.history[0].timeout,true);
const legacy={id:'legacy',pack:0,profile:'p',name:'QA',answers:Array(40).fill(null),correct:0,percent:0};db.history.push(legacy);t.migrateHistorySnapshots();assert.equal(legacy.questionSnapshot.length,40);assert.equal(legacy.legacySnapshotFrom,'v15-reconstructed-unverified');
assert.equal(bank.length,500);console.log('PASS final: expired render, next, audio, legacy warning, 500 bank items');
