(()=>{'use strict';
const app=document.getElementById('app');
const nav=document.createElement('nav');nav.className='s91-nav';nav.setAttribute('aria-label','Navigasi belajar');nav.hidden=true;
nav.innerHTML='<h2>LatSol 日本語</h2><p>Ruang belajar mandiri</p><div class="s91-nav-links"><button data-route="home">Beranda CBT</button><button data-route="path">Jalur belajar</button><button data-route="chapter">Daftar BAB</button><button data-route="adaptive">Rencana personal</button><button data-route="academy">Academy</button><button data-route="mastery">Mastery Lab</button></div>';
const layout=document.createElement('div');app.before(layout);layout.append(nav,app);
const skip=document.createElement('a');skip.className='s91-skip';skip.href='#app';skip.textContent='Lewati ke konten utama';layout.before(skip);app.tabIndex=-1;skip.onclick=e=>{e.preventDefault();app.focus()};
function sync(){const chapter=!!app.querySelector('.s91-chapter'),dashboard=!!app.querySelector('.s91-dashboard'),enabled=chapter||dashboard;layout.classList.toggle('s91-learning',enabled);nav.hidden=!enabled;nav.querySelectorAll('[data-route]').forEach(b=>{if(b.dataset.route===(chapter?'chapter':'path'))b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
for(const table of app.querySelectorAll('table')){if(table.parentElement.classList.contains('s91-table-scroll')||table.parentElement.classList.contains('history-table-wrap'))continue;const wrap=document.createElement('div');wrap.className='s91-table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Tabel data, dapat digulir');table.before(wrap);wrap.append(table)}
}
nav.addEventListener('click',e=>{const b=e.target.closest('[data-route]');if(!b||nav.hidden)return;const p=app.querySelector('.s91-chapter')?JFT_CHAPTER_UI.profile():JFT_PATH_UI.profile();switch(b.dataset.route){case 'home':JFT_GO_HOME();break;case 'path':JFT_PATH_UI.open(p);break;case 'chapter':JFT_CHAPTER_UI.open(p);break;case 'adaptive':JFT_ADAPTIVE_V2_UI.open(p);break;case 'academy':JFT_CENTER.open(p);break;case 'mastery':JFT_MASTERY_UI.open(p);break;}app.focus();});
new MutationObserver(sync).observe(app,{childList:true,subtree:true});sync();
})();
