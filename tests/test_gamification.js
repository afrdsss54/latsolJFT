const assert=require('node:assert/strict');const G=require('../gamification-engine.js');
let s=G.normalize(null);s=G.record(s,'lesson','lesson:k1','2026-11-20');assert.equal(s.xp,20);assert.equal(s.lessons,1);assert.equal(s.streak,1);
s=G.record(s,'lesson','lesson:k1','2026-11-20');assert.equal(s.xp,20);
s=G.record(s,'practice','p1','2026-11-21');assert.equal(s.xp,55);assert.equal(s.streak,2);
s=G.record(s,'exam','e1','2026-11-22');assert.equal(s.streak,3);assert(G.unlocked(s).includes('three-days'));
s=G.record(s,'lesson','lesson:k2','2026-11-24');assert.equal(s.streak,1);assert.equal(s.bestStreak,3);
for(let i=0;i<30;i++)s=G.record(s,'exam','day24-e'+i,'2026-11-24');assert.equal(s.dailyXp,300);
assert.equal(G.level({xp:0}),1);assert.equal(G.level({xp:400}),3);
console.log('PASS M5: XP, deduplication, streak, achievements, daily cap, levels');
