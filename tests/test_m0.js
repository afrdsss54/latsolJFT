// M0 regression: check expiry guard hooks and snapshot integrity.
const fs=require('fs'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
assert(app.includes("if(Date.now()>=exam.deadline){finish(true);return}exam.answers[g]"),'Answer click expiry guard');
assert(app.includes("if(Date.now()>=exam.deadline){finish(true);return}exam.index="),'Navigation click expiry guard');
assert(app.includes("if(Date.now()>=exam.deadline){finish(true);return}let k="),'Keyboard expiry guard');
assert(app.includes('latsoljft-invalid-session-backup'),'Invalid session backup');
assert(/latsoljft-content-jls-s845-1/.test(sw),'S4.4 cache version');
const bank=JSON.parse(fs.readFileSync(path.join(root,'questions.json'),'utf8'));
assert.strictEqual(bank.length,500);assert.strictEqual(new Set(bank.map(q=>q.id)).size,500);
console.log('PASS M0: expiry guards, recovery backup, cache version, bank count');
