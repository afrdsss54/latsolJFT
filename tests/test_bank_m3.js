const fs=require('fs'),assert=require('assert');const bank=JSON.parse(fs.readFileSync(__dirname+'/../questions.json','utf8'));
assert.equal(bank.length,500);assert.equal(new Set(bank.map(q=>q.id)).size,500);
for(let s=0;s<4;s++)assert.equal(bank.filter(q=>q.section===s).length,125);
const added=bank.filter(q=>q.id.startsWith('M3-'));assert.equal(added.length,260);
assert.equal(new Set(added.map(q=>q.prompt)).size,260);
for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.answer>=0&&q.answer<4);assert(q.explanation);if(q.section===2)assert(q.audio);if(q.section===3)assert(q.passage)}
console.log('PASS M3 bank: 500 entries, 260 new, 125/section, unique IDs and prompts');
