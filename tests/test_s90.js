const assert=require('assert'),{create,KEY}=require('../unified-storage');
const m=new Map(),s={get length(){return m.size},key:i=>[...m.keys()][i],getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)};
const a='latsoljft-learning-s843:a',b='latsoljft-learning-s843:b',cbt='latsoljft-v2';m.set(a,'{"2":{"mastered":true}}');m.set(b,'{"2":{"mastered":false}}');m.set(cbt,'{"score":88}');const u=create(s);u.migrate();const first=u.backup();u.migrate();assert.equal(u.backup(),first);u.setItem(a,'{"2":{"mastered":false}}');assert.equal(u.getItem(b),m.get(b));assert.equal(m.get(cbt),'{"score":88}');u.restore(first);assert.equal(u.getItem(a),m.get(a));assert.equal(u.getItem(b),m.get(b));assert(!Object.hasOwn(JSON.parse(u.backup()).records,cbt));
const before=u.backup();assert.throws(()=>u.restore(JSON.stringify({schemaVersion:1,records:{[a]:'[]'}})));assert.equal(u.backup(),before);
console.log('S9.0 migration, profile isolation, restore and CBT preservation passed');
