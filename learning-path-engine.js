(()=>{'use strict';
const KEY='latsoljft-jls-path-s1-',PATHS=['from-zero','jft-prep'],STAGES=['F0','F1','F2','F3','F4','F5'];
const validProfile=p=>typeof p==='string'&&p.length>0&&p.length<160;
function storageKey(p){return KEY+(validProfile(p)?p:'guest')}
function normalize(x){return x&&typeof x==='object'&&PATHS.includes(x.path)?{path:x.path,stage:STAGES.includes(x.stage)?x.stage:(x.path==='from-zero'?'F0':'F5'),updatedAt:typeof x.updatedAt==='string'?x.updatedAt:null}:null}
function load(p){try{return normalize(JSON.parse(localStorage.getItem(storageKey(p))))}catch{return null}}
function choose(p,path){if(!PATHS.includes(path))return false;const previous=load(p),next={path,stage:previous&&previous.path===path?previous.stage:(path==='from-zero'?'F0':'F5'),updatedAt:new Date().toISOString()};try{localStorage.setItem(storageKey(p),JSON.stringify(next));return true}catch{return false}}
function setStage(p,stage){if(!STAGES.includes(stage))return false;const x=load(p);if(!x)return false;try{localStorage.setItem(storageKey(p),JSON.stringify({...x,stage,updatedAt:new Date().toISOString()}));return true}catch{return false}}
function stageModules(stage){return (window.JFT_CURRICULUM_MAP?.modules||[]).filter(x=>x.suggestedStage===stage)}
window.JFT_PATH_ENGINE={KEY,STAGES,load,choose,setStage,stageModules,storageKey,normalize};
if(typeof module!=='undefined')module.exports={KEY,STAGES,normalize,storageKey};
})();
