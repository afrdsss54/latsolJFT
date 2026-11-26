(function(root){'use strict';
const kinds=['reading','listening','dictation','kaiwa','speaking'],labels={reading:'Dokkai M7',listening:'Choukai M7',dictation:'Dictation M7',kaiwa:'Kaiwa M7',speaking:'Speaking M7 (mandiri)'},key=p=>'latsoljft-learning-s92m7:'+encodeURIComponent(String(p||'guest')),id=(pack,kind)=>pack.id+':'+kind;
function read(p){try{const d=JSON.parse(root.JFT_UNIFIED.getItem(key(p)));return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch{return {}}}
function normalize(s){return String(s??'').normalize('NFKC').replace(/[\s。、！？!?.,]/g,'')}
function check(pack,kind,value){if(kind==='dictation')return !!normalize(value)&&normalize(value)===normalize(pack.listening.dictation);if(['reading','listening','kaiwa'].includes(kind))return value===pack[kind].correct;throw Error('Speaking cannot be graded automatically')}
function record(p,pack,kind,correct,now=Date.now()){if(!kinds.includes(kind))throw Error('Unknown skill');const s=read(p),k=id(pack,kind),old=s[k];if(kind==='speaking'){if(correct!==true)throw Error('Confirm self-practice only');s[k]={attempts:(old?.attempts||0)+1,completed:true,due:now+7*86400000,lastPractice:now};}else{s[k]=root.JFT_LEXICON_ENGINE.update(old,correct===true,now)}root.JFT_UNIFIED.setItem(key(p),JSON.stringify(s));return s[k]}
function options(pack,kind,random=Math.random){const q=pack[kind],a=[q.correct,q.wrong1,q.wrong2];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const api={kinds,labels,key,id,read,normalize,check,record,options};root.JFT_SKILLS_M7_ENGINE=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(globalThis);
