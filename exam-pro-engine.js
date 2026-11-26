(function(root){'use strict';
const SECTION=['Moji/Goi','Kaiwa','Choukai','Dokkai'];
const number=(n,lo,hi)=>Math.max(lo,Math.min(hi,Number.isFinite(n)?n:lo));
function valid(r){return !!r&&Array.isArray(r.answers)&&r.answers.length>0&&r.answers.length%4===0&&Number.isFinite(Number(r.timestamp))&&Number.isFinite(Number(r.correct))&&Number.isFinite(Number(r.percent));}
function questionSet(r,bank){if(Array.isArray(r.questionSnapshot)&&r.questionSnapshot.length===r.answers.length)return r.questionSnapshot;if(Array.isArray(r.questionIds)&&r.questionIds.length===r.answers.length){const byId=new Map((bank||[]).map(q=>[q.id,q]));const qs=r.questionIds.map(id=>byId.get(id));if(qs.every(Boolean))return qs;}return null;}
function summarize(history,bank,opts={}){
 const rows=(Array.isArray(history)?history:[]).filter(valid).slice().sort((a,b)=>Number(a.timestamp)-Number(b.timestamp));
 const windowSize=number(Number(opts.limit)||10,1,100);const recent=rows.slice(-windowSize);const total=recent.length;
 const section=SECTION.map((name,i)=>({name,correct:0,total:0,attempts:0}));
 let covered=0,unknown=0,elapsed=0,timed=0;
 for(const r of recent){const qs=questionSet(r,bank);const n=r.answers.length,per=n/4;
  if(qs){covered++;for(let i=0;i<n;i++){const q=qs[i];const s=section[Math.floor(i/per)];if(!q||!Number.isInteger(q.answer))continue;s.total++;if(r.answers[i]===q.answer)s.correct++;}section.forEach(s=>s.attempts++);}
  else unknown++;
  if(Number.isFinite(r.elapsed)&&r.elapsed>=0){elapsed+=r.elapsed;timed++}
 }
 const trend=recent.map((r,i)=>({label:`Ujian ${rows.length-recent.length+i+1}`,score:number(Number(r.percent),0,100),timestamp:Number(r.timestamp),count:r.answers.length}));
 const average=total?Math.round(recent.reduce((sum,r)=>sum+number(Number(r.percent),0,100),0)/total):null;
 const sectionScores=section.map(s=>({...s,accuracy:s.total?Math.round(s.correct/s.total*100):null}));
 // Internal learning index, deliberately NOT a JFT score or pass probability.
 // Only computed when >=3 recent exams and >=3 fully evidenced question sets.
 const eligible=total>=3&&covered>=3&&sectionScores.every(s=>s.total>=9);
 const balance=eligible?sectionScores.reduce((sum,s)=>sum+s.accuracy,0)/4:null;
 const consistency=eligible?Math.max(0,100-(Math.max(...trend.map(x=>x.score))-Math.min(...trend.map(x=>x.score)))):null;
 const readiness=eligible?Math.round(0.55*average+0.30*balance+0.15*consistency):null;
 return {totalAll:rows.length,total,average,covered,unknown,section:sectionScores,trend,averageSeconds:timed?Math.round(elapsed/timed):null,readiness,eligible,method:'55% rerata nilai latihan + 30% akurasi 4 bagian + 15% konsistensi (100 - rentang nilai), minimal 3 ujian dan 9 soal terverifikasi per bagian. Bukan prediksi kelulusan JFT-Basic.'};
}
const api={summarize,questionSet,valid,SECTION};root.JFT_EXAM_ENGINE=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
