const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..');const bank=JSON.parse(fs.readFileSync(path.join(root,'questions.json'),'utf8'));
const store=new Map();let clock=1_800_000_000_000;
const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
const sessionStorage={getItem:()=>null,removeItem:()=>{}};
const elements=new Map();function el(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',classList:{toggle(){},contains(){return false}},onclick:null});return elements.get(id)}
const document={getElementById:el,querySelectorAll:()=>[],activeElement:{tagName:'BODY'},title:'',onkeydown:null};
const ctx={window:{JFT_BANK:bank},document,localStorage,sessionStorage,Date:class extends Date{static now(){return clock}},setInterval:()=>1,clearInterval:()=>{},alert:()=>{},confirm:()=>true,console,URL,Blob};
ctx.window.window=ctx.window;
let source=fs.readFileSync(path.join(root,'app.js'),'utf8');
source=source.replace('})();','globalThis.__test={createExam,examQuestions,validActive,finish,resultQuestions,sectionSize,sectionOffset,migrateHistorySnapshots,packQuestions,getDB:()=>db,setExam:e=>exam=e,readActive:()=>JSON.parse(localStorage.getItem(ACTIVE))};})();');
vm.createContext(ctx);vm.runInContext(source,ctx);
const t=ctx.__test;
const db=t.getDB();db.profiles.push({id:'p1',name:'Test'});db.current='p1';
for(let pack=0;pack<6;pack++){
 const e=t.createExam(pack),qs=t.examQuestions(e);
 assert.equal(e.answers.length,48);assert.equal(qs.length,48);assert.equal(new Set(qs.map(q=>q.id)).size,48);
 for(let section=0;section<4;section++)assert.equal(qs.slice(section*12,section*12+12).filter(q=>q.section===section).length,12);
 assert(t.validActive(e));assert.equal(e.deadline-e.started,3600000);
}
const e=t.createExam(0);e.answers[0]=0;t.setExam(e);t.finish(false);
assert.equal(db.history[0].answers.length,48);assert.equal(db.history[0].questionSnapshot.length,48);
assert.equal(t.resultQuestions(db.history[0]).length,48);
assert.equal(store.get('latsoljft-active-v16'),undefined);
const legacy={id:'old',pack:1,profile:'p1',name:'Test',answers:Array(40).fill(null),correct:0,percent:0};db.history.push(legacy);
t.migrateHistorySnapshots();assert.equal(legacy.questionSnapshot.length,40);
assert.equal(t.resultQuestions(legacy).length,40);
assert.equal(t.sectionSize({version:16}),12);assert.equal(t.sectionSize({}),10);
console.log('PASS engine: 6 packs x 48, unique IDs, section grouping, deadline, session validation, result snapshots, legacy 40 migration');
