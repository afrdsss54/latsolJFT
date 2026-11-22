/* LatSol v17 M1 — pure deterministic adaptive scoring, no network/API. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.JFT_ADAPTIVE=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const SECTIONS=['Moji/Goi','Kaiwa','Choukai','Dokkai'];
function valid(q){return q&&typeof q.id==='string'&&Number.isInteger(q.section)&&q.section>=0&&q.section<4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4}
function snapshot(r,bank){if(!r||!Array.isArray(r.answers))return [];if(Array.isArray(r.questionSnapshot)&&r.questionSnapshot.length===r.answers.length)return r.questionSnapshot;
// Legacy 40-item packages: retain original fixed selection, do not invent v16 results.
if(r.answers.length===40&&Number.isInteger(r.pack)&&r.pack>=0&&r.pack<6)return [0,1,2,3].flatMap(s=>bank.filter(q=>q.section===s).slice(r.pack*10,r.pack*10+10));
return [];}
function analyze(bank,history,practice){const map=new Map(bank.filter(valid).map(q=>[q.id,q]));const bySection=SECTIONS.map((name,section)=>({section,name,correct:0,total:0,accuracy:null}));const byQuestion=new Map();let ignored=0;
function record(q,answer){if(!valid(q)||!map.has(q.id)){ignored++;return}const actual=map.get(q.id);if(actual.section!==q.section){ignored++;return}const ok=answer===q.answer;const sec=bySection[q.section];sec.total++;if(ok)sec.correct++;const old=byQuestion.get(q.id)||{seen:0,wrong:0};old.seen++;if(!ok)old.wrong++;byQuestion.set(q.id,old)}
for(const r of history||[]){const qs=snapshot(r,bank);if(qs.length!==(r.answers||[]).length){ignored++;continue}qs.forEach((q,i)=>record(q,r.answers[i]));}
for(const p of practice||[]){if(!Array.isArray(p.questionIds)||!Array.isArray(p.answers)||p.questionIds.length!==p.answers.length)continue;p.questionIds.forEach((id,i)=>{const q=map.get(id);if(q)record(q,p.answers[i]);else ignored++});}
for(const s of bySection)s.accuracy=s.total?Math.round(s.correct/s.total*100):null;
return {bySection,byQuestion,ignored};}
function rank(bank,analysis,recentIds){const recent=new Set(recentIds||[]);return bank.filter(valid).map(q=>{const sec=analysis.bySection[q.section],seen=analysis.byQuestion.get(q.id)||{seen:0,wrong:0};const sectionWeak=sec.total?1-sec.correct/sec.total:0.5;const errorRate=seen.seen?seen.wrong/seen.seen:0.5;
const weight=1+2*sectionWeak+1.5*errorRate+(seen.seen===0?1:0)-Math.min(1.3,seen.seen*.22)-(recent.has(q.id)?1.4:0);
return {q,weight:Math.max(.15,weight)};});}
function pick(bank,history,practice,count=10,random=Math.random){const analysis=analyze(bank,history,practice);const recent=(practice||[]).slice(0,4).flatMap(p=>p.questionIds||[]);const pool=rank(bank,analysis,recent);const selected=[];const target=Math.min(Math.max(0,count),pool.length);
while(selected.length<target){const total=pool.reduce((sum,x)=>sum+x.weight,0);let roll=Math.min(.999999999,Math.max(0,Number(random())||0))*total;let index=pool.findIndex(x=>(roll-=x.weight)<0);if(index<0)index=pool.length-1;selected.push(pool.splice(index,1)[0].q)}return {questions:selected,analysis};}
return {SECTIONS,snapshot,analyze,rank,pick};
});
