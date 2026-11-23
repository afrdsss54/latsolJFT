const assert=require('assert'),fs=require('fs'),path=require('path');
const base=path.join(__dirname,'..'),all=require('../curriculum/seven-step-pilots.json'),E=require('../seven-step-engine.js');
assert.equal(E.validate(all).length,22);assert.equal(new Set(all.map(u=>u.id)).size,22);
const fresh=all.filter(u=>u.id.startsWith('s42-'));assert.equal(fresh.length,18);
assert.deepEqual(['F0','F1','F2'].map(st=>all.filter(u=>u.stage===st).length),[7,10,5]);
for(const u of fresh){assert.equal(u.steps.length,7);assert(u.vocab.length>=5);assert(u.grammar.explanation.length>45);assert(u.practice.length>=3);assert(u.practice.some(q=>q.type==='input'));assert(u.listeningQuestion.options[u.listeningQuestion.answer]);assert(u.editorialStatus==='draft-original-unreviewed');assert.deepEqual(u.sourceRefs,[]);assert(u.practice.every(q=>q.explanation));}
const js=fs.readFileSync(path.join(base,'curriculum/seven-step-pilots.js'),'utf8');assert(js.startsWith('window.JFT_SEVEN_STEP_UNITS = '));assert(js.includes('s42-f2-'));
const ui=fs.readFileSync(path.join(base,'seven-step-ui.js'),'utf8');assert(ui.includes('stageFilter'));assert(ui.includes('data-filter'));assert(ui.includes('stageFilter=null'));
const sw=fs.readFileSync(path.join(base,'sw.js'),'utf8'),html=fs.readFileSync(path.join(base,'index.html'),'utf8');assert(sw.includes('latsoljft-content-jls-s5-1'));assert(html.includes('jls-s5-1'));
console.log('PASS S4.2: 22 units, stage filtering, seven-step content, safe versioning');
