const fs=require('fs'),assert=require('assert');
const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),html=fs.readFileSync('index.html','utf8');
assert(app.includes('kesempatan pemutaran dikembalikan'));
assert(app.includes('exam.plays[g]=Math.max(0,(exam.plays[g]||1)-1)'));
assert(sw.includes('latsoljft-content-jls-s5-1'));
assert(html.includes('jls-s5-1'));
console.log('PASS M8 voice-error refund and cache alignment');
