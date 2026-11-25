const assert=require('assert');const E=require('../exam-pro-engine.js');const qs=Array.from({length:48},(_,i)=>({id:'q'+i,answer:0}));const r=(i,correct=36)=>({id:'r'+i,timestamp:100+i,answers:Array.from({length:48},(_,j)=>j<correct?0:1),correct,percent:Math.round(correct/48*100),elapsed:1200,questionSnapshot:qs});
let s=E.summarize([r(1),r(2),r(3)],qs);assert.equal(s.total,3);assert.equal(s.covered,3);assert.equal(s.average,75);assert.equal(s.section[0].accuracy,100);assert.equal(s.section[3].accuracy,0);assert.equal(s.readiness,79);assert(s.eligible);
s=E.summarize([r(1),r(2)],qs);assert.equal(s.readiness,null);
s=E.summarize([r(1),{...r(2),questionSnapshot:null,questionIds:null},r(3)],qs);assert.equal(s.covered,2);assert.equal(s.unknown,1);assert.equal(s.readiness,null);
s=E.summarize([],qs);assert.equal(s.average,null);assert.equal(s.readiness,null);
s=E.summarize([r(1),r(2),r(3),r(4)],qs,{limit:3});assert.equal(s.total,3);
assert(E.questionSet({...r(1),questionSnapshot:null,questionIds:qs.map(q=>q.id)},qs));
console.log('M6 Exam Pro tests passed');
