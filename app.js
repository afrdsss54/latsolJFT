(()=>{'use strict';
const BANK=window.JFT_BANK||[], NAMES=['Huruf & Kosakata (Moji/Goi)','Percakapan & Ungkapan (Kaiwa)','Menyimak (Choukai)','Membaca (Dokkai)'], EN=['Script & Vocabulary','Conversation & Expression','Listening Comprehension','Reading Comprehension'], KEY='latsoljft-v2', ACTIVE='latsoljft-active-v16', LEGACY_ACTIVE='latsoljft-active-v2', DURATION=3600, PER_SECTION=10;
const $=id=>document.getElementById(id), escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
let db=read(KEY,{profiles:[],history:[],current:null}),exam=null,ticker=null,reviewItem=null;
if(!Array.isArray(db.profiles)||!Array.isArray(db.history))db={profiles:[],history:[],current:null};
function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch{alert('Penyimpanan browser penuh atau diblokir.')}}
function persist(){if(exam){try{localStorage.setItem(ACTIVE,JSON.stringify(exam))}catch{alert('Progres ujian gagal disimpan. Periksa kapasitas penyimpanan browser.')}}}
function clearActive(){try{localStorage.removeItem(ACTIVE);sessionStorage.removeItem(LEGACY_ACTIVE)}catch{}}
function activeProfile(){return db.profiles.find(p=>p.id===db.current)}
function currentName(){return activeProfile()?.name||'Tamu'}
let speechRun=0;
function stopVoice(){speechRun++;if('speechSynthesis' in window)window.speechSynthesis.cancel()}
function japaneseVoices(){return ('speechSynthesis' in window)?speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith('ja')):[]}
function audioStatus(){if(!('speechSynthesis' in window))return 'Browser ini tidak mendukung speech synthesis.';const voices=japaneseVoices();return voices.length?`Suara Jepang tersedia: ${voices.map(v=>v.name).slice(0,3).join(', ')}${voices.length>3?'…':''}`:'Suara Jepang belum tersedia. Instal paket suara Japanese (ja-JP) di sistem/browser.'}

function situation(q){const t=(q.passage||'')+' '+(q.audio||'')+' '+q.prompt;const v=[[/駅|電車|バス|切符/,'🚉','Transportasi'],[/病院|薬|医者/,'🏥','Kesehatan'],[/店|スーパー|買|円|メニュー/,'🛒','Belanja'],[/仕事|会議|会社/,'🏢','Pekerjaan'],[/学校|授業|先生|図書館/,'📚','Sekolah'],[/天気|雨|晴/,'🌦️','Cuaca'],[/レストラン|食堂|料理/,'🍱','Makanan'],[/メール|連絡|電話/,'✉️','Pesan']].find(x=>x[0].test(t));return v||[null,'🗾','Kehidupan sehari-hari']}
function topicOf(q){
 const t=[q.prompt,q.passage||'',q.audio||''].join(' ');
 const rules=[
  [/駅|電車|バス|切符|乗り|時刻|発車/,'Transportasi & jadwal'],
  [/病院|薬|医者|熱|痛|予約/,'Kesehatan & janji'],
  [/仕事|会社|会議|勤務|休み|アルバイト/,'Pekerjaan'],
  [/買|円|店|スーパー|値段|レジ/,'Belanja & harga'],
  [/学校|先生|授業|図書館|勉強/,'Sekolah & belajar'],
  [/メール|電話|連絡|メッセージ|返事/,'Komunikasi'],
  [/食|料理|飲|レストラン|メニュー/,'Makanan & restoran'],
  [/天気|雨|晴|台風/,'Cuaca']
 ];
 return (rules.find(([re])=>re.test(t))||[null,'Kehidupan sehari-hari'])[1];
}
function diagnostic(qs,answers){
 const stats=new Map();
 qs.forEach((q,i)=>{const key=topicOf(q);if(!stats.has(key))stats.set(key,{name:key,total:0,correct:0,wrong:[]});
 const x=stats.get(key);x.total++;if(answers[i]===q.answer)x.correct++;else x.wrong.push(q.id)});
 return [...stats.values()].sort((a,b)=>(a.correct/a.total)-(b.correct/b.total));
}
function readingVisual(q){
 const raw=String(q.passage||'');if(!raw)return '';
 const lines=raw.split(/\n/).filter(Boolean),title=lines[0]||'お知らせ';
 const rows=lines.slice(1).map(line=>{
  const match=line.match(/^([^：:]+)[：:]\s*(.+)$/);
  if(match)return `<div class="reading-row"><span>${escape(match[1])}</span><strong>${escape(match[2])}</strong></div>`;
  if(line.includes('｜')||line.includes('|'))return `<div class="reading-row reading-columns">${line.split(/[｜|]/).map(cell=>`<span>${escape(cell.trim())}</span>`).join('')}</div>`;
  return `<p>${escape(line)}</p>`;
 }).join('');
 return `<section class="reading-document" aria-label="Bacaan bahasa Jepang"><div class="reading-heading"><span>📄</span><strong>${escape(title)}</strong></div><div class="reading-body">${rows||`<p>${escape(raw)}</p>`}</div></section>`;
}
function contextCard(q){const x=situation(q);return `<div class="scene" aria-label="Ilustrasi kategori ${x[2]}"><span class="scene-emoji" aria-hidden="true">${x[1]}</span><span><b>${x[2]}</b><small>Ilustrasi kategori latihan • bukan gambar soal resmi</small></span></div>}`}

function stopTimer(){if(ticker)clearInterval(ticker);ticker=null;stopVoice()}
function time(sec){sec=Math.max(0,sec);return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`}
function head(extra=''){return `<header class="top"><div class="brand">🇯🇵 LatSol JFT <small>CBT Practice • JFT-Basic A2 • Mega RC</small></div><div class="top-actions"><span class="account">👤 ${escape(currentName())}</span>${extra}</div></header>`}
function shell(html,extra=''){document.title='LatSol JFT A2 — CBT Practice';$('app').innerHTML=head(extra)+`<main class="shell">${html}</main><footer class="footer">Latihan independen, bukan website resmi JFT-Basic. Soal dan penilaian bukan materi atau skor resmi The Japan Foundation.</footer>`}
function packQuestions(pack){return [0,1,2,3].flatMap(s=>BANK.filter(q=>q.section===s&&!q.id.startsWith("M3-")).slice(pack*PER_SECTION,(pack+1)*PER_SECTION))}
// CBT Engine 2.0: 48 soal / 4 bagian; legacy v15 tetap 40 soal.
const EXAM_SIZE=12, EXAM_TOTAL=48;
function examQuestions(e){
 if(e.questionSnapshot?.length===e.answers.length)return e.questionSnapshot;
 if(e.version===16 && Array.isArray(e.questionIds))return e.questionIds.map(id=>BANK.find(q=>q.id===id)).filter(Boolean);
 return packQuestions(e.pack);
}
function resultQuestions(r){
 if(Array.isArray(r.questionSnapshot)&&r.questionSnapshot.length===r.answers?.length)return r.questionSnapshot;
 return packQuestions(r.pack); // fallback legacy: rekonstruksi tidak dijamin identik
}
function sectionSize(e){return e.version===16?EXAM_SIZE:PER_SECTION}
function sectionOffset(e,s){return s*sectionSize(e)}
function createExam(pack){
 const sections=[0,1,2,3].map(sec=>{
  const pool=BANK.filter(q=>q.section===sec);
  const attempts=db.history.filter(h=>h.profile===db.current&&h.pack===pack&&h.version===16).length;
  const start=(pack*19+attempts*13)%pool.length;
  return Array.from({length:EXAM_SIZE},(_,i)=>pool[(start+i)%pool.length]);
 });
 const qs=sections.flat(),now=Date.now();
 return {version:16,pack,profile:db.current,name:currentName(),questionIds:qs.map(q=>q.id),questionSnapshot:qs.map(q=>({...q,options:[...q.options]})),answers:Array(EXAM_TOTAL).fill(null),section:0,index:0,plays:{},started:now,deadline:now+DURATION*1000};
}
function migrateHistorySnapshots(){
 let changed=false;
 for(const h of db.history){if(!h.questionSnapshot&&Number.isInteger(h.pack)&&h.pack>=0&&h.pack<6&&Array.isArray(h.answers)&&h.answers.length===40){
  h.questionSnapshot=packQuestions(h.pack).map(q=>({...q,options:[...q.options]}));h.legacySnapshotFrom='v15-reconstructed-unverified';changed=true;
 }}
 if(changed)save();
}
function validActive(e){
 if(!e||!Number.isInteger(e.pack)||e.pack<0||e.pack>5||!e.profile||!Number.isFinite(e.deadline)||!Array.isArray(e.answers))return false;
 if(!db.profiles.some(p=>p.id===e.profile))return false;
 if(e.version===16)return e.answers.length===EXAM_TOTAL&&Array.isArray(e.questionSnapshot)&&e.questionSnapshot.length===EXAM_TOTAL&&Number.isInteger(e.section)&&e.section>=0&&e.section<4&&Number.isInteger(e.index)&&e.index>=0&&e.index<EXAM_SIZE;
 return e.answers.length===40&&Number.isInteger(e.section)&&e.section>=0&&e.section<4&&Number.isInteger(e.index)&&e.index>=0&&e.index<10;
}
function profileHome(){document.onkeydown=null;stopTimer();exam=null;clearActive();const p=activeProfile();let history=db.history.filter(h=>h.profile===db.current);shell(`<div class="hero"><section class="card"><span class="eyebrow">Mega Upgrade • 500 soal • 100 modul</span><h1 class="big">Latihan JFT-Basic A2<br>dengan format CBT</h1><p class="lead muted">Pilih paket, kerjakan soal dengan timer, dengarkan audio Jepang, dan lihat pembahasan lengkap setelah ujian.</p><div class="stats"><div class="stat"><strong>500</strong><span>Bank soal</span></div><div class="stat"><strong>6</strong><span>Paket ujian</span></div><div class="stat"><strong>60</strong><span>Menit / paket</span></div><div class="stat"><strong>4</strong><span>Bagian CBT</span></div></div><label class="field" for="profile">Profil peserta (disimpan di browser)</label><select id="profile" class="input"><option value="">Pilih profil</option>${db.profiles.map(x=>`<option value="${escape(x.id)}" ${db.current===x.id?'selected':''}>${escape(x.name)}</option>`).join('')}</select><div class="row" style="margin-top:12px"><input id="newname" class="input" style="flex:1;min-width:150px" placeholder="Buat profil baru" maxlength="50"><button class="btn secondary" id="add">+ Buat profil</button></div><p class="notice">Profil lokal bukan akun online: tidak ada password, tidak tersinkron ke perangkat lain. Jangan gunakan pada komputer bersama untuk data pribadi.</p><div class="row"><button class="btn" id="history">📊 Riwayat nilai (${history.length})</button><button class="btn outline" id="export">Ekspor hasil JSON</button><button class="btn" id="learn">📊 Smart Learning & Dashboard</button><button class="btn secondary" id="center">📚 Learning Center</button><button class="btn" id="jls-path">🌱 Jalur Belajar F0–F5</button><button class="btn secondary" id="exam-pro">📈 Exam Pro & Analytics</button></div></section><section class="card"><span class="pill">PILIH PAKET SIMULASI</span><h2>Mulai latihan</h2><p class="muted small">Setiap simulasi v16: 12 soal per bagian (48 total), dipilih dari 500 soal yang tersedia. Paket berbeda dapat berbagi soal. Soal dirotasi per paket dan percobaan. Bukan prediksi ujian resmi.</p><div id="packs">${Array.from({length:6},(_,i)=>{let count=history.filter(h=>h.pack===i).length;return `<div class="pack"><div><b>Paket ${i+1}</b><div class="mini">48 soal · 60 menit · ${count}× dikerjakan</div></div><button class="btn" data-start="${i}">Mulai →</button></div>`}).join('')}</div><p class="info small">Setelah pindah bagian tidak bisa kembali. Pada listening, tidak bisa kembali ke soal sebelumnya. Maksimal 2 pemutaran audio per soal.</p></section></div>`);
if(window.JFT_GAMIFY){const panel=document.createElement('div');panel.innerHTML=window.JFT_GAMIFY.card(db.current);const hero=document.querySelector('.hero');if(hero)hero.insertAdjacentElement('afterend',panel)}
$('profile').onchange=e=>{db.current=e.target.value||null;save();profileHome()};$('add').onclick=()=>{const name=$('newname').value.trim();if(name.length<2){alert('Nama minimal 2 karakter.');return}let id='p'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);db.profiles.push({id,name});db.current=id;save();profileHome()};$('exam-pro').onclick=()=>{if(!db.current){alert('Pilih profil terlebih dahulu.');return}window.JFT_EXAM_PRO.open({profile:db.current,name:currentName(),history:db.history.filter(h=>h.profile===db.current),bank:BANK,onBack:profileHome,onPractice:()=>window.JFT_LEARN.open({profile:db.current,name:currentName(),history:db.history.filter(h=>h.profile===db.current),bank:BANK})})};$('jls-path').onclick=()=>window.JFT_PATH_UI.open(db.current||'guest');$('history').onclick=showHistory;$('export').onclick=exportHistory;$('center').onclick=()=>window.JFT_CENTER.open(db.current||'guest');$('learn').onclick=()=>window.JFT_LEARN.open({profile:db.current,name:currentName(),history:db.history.filter(h=>h.profile===db.current),bank:BANK});document.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startExam(Number(b.dataset.start)))}
const GUIDES=[
 {title:'Huruf dan Kosakata',subtitle:'文字・語彙',body:'Pilih bacaan kanji, arti kosakata, atau kata yang paling sesuai dengan situasi. Anda boleh kembali ke soal lain dalam bagian ini.'},
 {title:'Percakapan dan Ungkapan',subtitle:'会話・表現',body:'Baca dialog dan pilih respons atau ungkapan yang paling wajar dalam kehidupan sehari-hari. Anda boleh meninjau soal selama masih di bagian ini.'},
 {title:'Menyimak (Choukai)',subtitle:'聴解',body:'Dengarkan ujaran bahasa Jepang dan pilih jawaban. Transkrip tidak terlihat saat ujian. Pada simulasi ini audio dibatasi dua kali dan tidak bisa kembali ke soal sebelumnya. Dialog memakai suara sintetis Jepang yang tersedia pada perangkat. Jika suara Jepang tidak terpasang, audio tidak dapat diputar. Bukan rekaman MP3 atau audio resmi.'},
 {title:'Membaca (Dokkai)',subtitle:'読解',body:'Baca teks, pesan, atau pengumuman lalu pilih jawaban berdasarkan informasi tertulis. Anda boleh kembali ke soal lain dalam bagian ini.'}
];
function guide(pack,section,initial=false){stopVoice();const x=GUIDES[section];shell(`<div class="guide-layout"><section class="card"><span class="pill">PAKET ${pack+1} · BAGIAN ${section+1} DARI 4</span><div class="jp-sub">${x.subtitle}</div><h1>${x.title}</h1><p class="lead">${x.body}</p><div class="info"><b>Aturan navigasi</b><p class="small">12 soal per bagian (untuk sesi v16). Setelah melanjutkan ke bagian berikutnya, bagian sebelumnya terkunci. Jawaban kosong dihitung salah. Timer berjalan terus selama pergantian bagian.</p></div><div class="row" style="margin-top:24px"><button class="btn" id="go-section">${initial?'Mulai ujian 60 menit':'Mulai bagian '+(section+1)} →</button>${initial?'<button class="btn secondary" id="cancel-guide">Kembali ke beranda</button><button class="btn outline" id="test-voice">🔊 Tes suara Jepang</button>':''}</div></section><aside class="card"><h2>Urutan bagian</h2>${GUIDES.map((g,i)=>`<div class="sectionline"><span>${i+1}. ${g.title}</span><span>${i<section?'✓':i===section?'●':'○'}</span></div>`).join('')}<p class="notice">Simulasi independen. Bukan tampilan, soal, audio, atau penilaian resmi JFT-Basic.</p></aside></div>`,exam?`<span class="timer" id="clocktop">${time(Math.max(0,Math.ceil((exam.deadline-Date.now())/1000)))}</span>`:'');$('go-section').onclick=()=>{if(initial){exam=createExam(pack);persist();startTimer()}examScreen()};if(initial){$('cancel-guide').onclick=profileHome;$('test-voice').onclick=()=>{if(!('speechSynthesis' in window)){alert('Browser tidak mendukung TTS.');return}const v=speechSynthesis.getVoices().find(x=>x.lang.toLowerCase().startsWith('ja'));if(!v){alert('Suara bahasa Jepang belum tersedia. Instal Japanese voice pada perangkat.');return}stopVoice();const u=new SpeechSynthesisUtterance('こんにちは。音声のテストです。');u.lang='ja-JP';u.voice=v;u.rate=.9;speechSynthesis.speak(u)}}}
function startExam(pack){if(!activeProfile()){alert('Buat atau pilih profil terlebih dahulu.');return}guide(pack,0,true)}
function startTimer(){if(ticker)clearInterval(ticker);ticker=setInterval(()=>{if(!exam)return;let sec=Math.max(0,Math.ceil((exam.deadline-Date.now())/1000));for(let id of ['clock','clocktop'])if($(id)){$(id).textContent=time(sec);$(id).classList.toggle('warn',sec<=300)}if(sec===0)finish(true)},500)}
function examScreen(){if(!exam)return;if(Date.now()>=exam.deadline){finish(true);return}const qs=examQuestions(exam),s=exam.section,idx=exam.index,size=sectionSize(exam),offset=sectionOffset(exam,s),g=offset+idx,q=qs[g],ans=exam.answers[g],answered=exam.answers.slice(offset,offset+size).filter(a=>a!==null).length,remain=Math.max(0,Math.ceil((exam.deadline-Date.now())/1000)),listening=s===2;
const nav=listening?'<p class="muted small">Listening: navigasi mundur dinonaktifkan.</p>':`<div class="navgrid">${Array.from({length:size},(_,i)=>`<button class="navnum ${exam.answers[offset+i]!==null?'done':''} ${idx===i?'active':''}" data-nav="${i}">${i+1}</button>`).join('')}</div>`;
shell(`<div class="exam"><section class="card"><div class="row between"><span class="pill">BAGIAN ${s+1} DARI 4 · PAKET ${exam.pack+1}</span><span class="small muted">Soal ${idx+1} dari ${size}</span></div><h2>${NAMES[s]}</h2><div class="small muted">${GUIDES[s].subtitle} · ${EN[s]}</div><div class="progress"><div style="width:${(idx+1)/size*100}%"></div></div><p class="muted small">Pilih satu jawaban yang paling tepat. Pintasan: 1–4 untuk menjawab, → soal berikutnya, ← kembali (kecuali listening).</p>${listening?`<div class="info"><div class="listening-icon">🎧</div><b>Dengarkan audio Jepang</b><p class="small">Transkrip disembunyikan hingga ujian selesai. Maksimal dua kali putar. Pilih jawaban setelah mendengarkan.</p><button class="btn secondary" id="play" ${(exam.plays[g]||0)>=2?'disabled':''}>▶ Putar audio (${exam.plays[g]||0}/2)</button><p id="voice-status" class="small muted" role="status" aria-live="polite">${escape(audioStatus())}</p></div>`:''}${s>=2?contextCard(q):''}${q.passage?`<div class="reading-tools"><button class="btn outline" id="reading-zoom" type="button" aria-pressed="false">🔎 Perbesar bacaan</button></div>${readingVisual(q)}`:''}<div class="question">${escape(q.prompt)}</div>${q.options.map((o,i)=>`<button class="option ${ans===i?'selected':''}" data-answer="${i}"><span class="letter">${'ABCD'[i]}</span><span>${escape(o)}</span></button>`).join('')}<div class="divider"></div><div class="row between no-print"><button class="btn secondary" id="prev" ${idx===0||listening?'disabled':''}>← Sebelumnya</button><button class="btn" id="next">${idx===size-1?(s===3?'Selesaikan ujian':'Lanjut bagian →'):'Berikutnya →'}</button></div></section><aside class="card"><div class="side-title">Waktu tersisa</div><div class="timer" id="clock">${time(remain)}</div><div class="divider"></div><div class="side-title">Status bagian</div><p class="muted">${answered} dari ${size} terjawab</p><div class="progress"><div style="width:${answered/size*100}%"></div></div>${nav}<div class="divider"></div><p class="small muted">${s===2?'Tidak dapat kembali ke soal listening sebelumnya.':'Nomor biru muda menunjukkan soal yang telah dijawab.'}</p><p class="small muted">Progres ujian tersimpan di browser ini. Jika halaman di-refresh, sesi dapat dilanjutkan selama waktu belum habis.</p><button class="btn outline" id="finish">Akhiri ujian lebih awal</button></aside></div>`,`<span class="timer" id="clocktop">${time(remain)}</span>`);
if(q.passage&&$('reading-zoom'))$('reading-zoom').onclick=()=>{const doc=document.querySelector('.reading-document');const expanded=doc.classList.toggle('reading-expanded');$('reading-zoom').textContent=expanded?'🔎 Ukuran normal':'🔎 Perbesar bacaan';$('reading-zoom').setAttribute('aria-pressed',String(expanded))};
document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(Date.now()>=exam.deadline){finish(true);return}exam.answers[g]=Number(b.dataset.answer);persist();examScreen()});document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{if(Date.now()>=exam.deadline){finish(true);return}exam.index=Number(b.dataset.nav);stopVoice();persist();examScreen()});$('prev').onclick=()=>{if(Date.now()>=exam.deadline){finish(true);return}if(idx>0&&!listening){exam.index--;persist();examScreen()}};$('next').onclick=next;$('finish').onclick=()=>{if(Date.now()>=exam.deadline){finish(true);return}if(confirm('Akhiri ujian sekarang dan tampilkan hasil?'))finish(false)};if(listening)$('play').onclick=()=>play(g,qs[g]); document.onkeydown=e=>{if(!exam||e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||''))return;if(Date.now()>=exam.deadline){finish(true);return}let k=e.key.toLowerCase();if('1234'.includes(k)&&k.length===1){e.preventDefault();exam.answers[g]=Number(k)-1;persist();examScreen()}else if(k==='arrowright'){e.preventDefault();next()}else if(k==='arrowleft'&&!listening&&idx>0){e.preventDefault();exam.index--;persist();examScreen()}}}
function play(g,q){
if(!exam)return;if(Date.now()>=exam.deadline){finish(true);return}
if(!('speechSynthesis' in window)){alert('Browser tidak mendukung audio Jepang.');return}
if((exam.plays[g]||0)>=2)return;
const voices=japaneseVoices();
if(!voices.length){$('voice-status').textContent='Suara Jepang belum tersedia. Instal suara Japanese (ja-JP) pada Windows atau browser.';return}
const lines=String(q.audio||'').split(/\n+/).filter(Boolean);
if(!lines.length){$('voice-status').textContent='Audio belum tersedia untuk soal ini.';return}
stopVoice();const run=speechRun;exam.plays[g]=(exam.plays[g]||0)+1;persist();
$('play').textContent=`▶ Putar audio (${exam.plays[g]}/2)`;$('play').disabled=exam.plays[g]>=2;
$('voice-status').textContent='Audio sedang diputar…';$('play').disabled=true;
let n=0, failed=false;
function nextLine(){if(run!==speechRun||!exam||exam.section!==2||exam.index!==g-sectionOffset(exam,2))return;if(n>=lines.length){if($('voice-status'))$('voice-status').textContent='Audio selesai';if($('play'))$('play').disabled=(exam.plays[g]||0)>=2;return}
const line=lines[n++],female=/^(女|女性|母|店員|先生)：/.test(line),male=/^(男|男性|父)：/.test(line);
const spoken=line.replace(/^(女|女性|母|店員|先生|男|男性|父)：/,'');
const u=new SpeechSynthesisUtterance(spoken);u.lang='ja-JP';u.voice=voices[female?0:(male&&voices.length>1?1:0)]||null;u.rate=.88;u.pitch=female?1.18:male?.86:1;
u.onend=nextLine;u.onerror=()=>{if(run!==speechRun)return;if(!failed){failed=true;stopVoice();exam.plays[g]=Math.max(0,(exam.plays[g]||1)-1);persist();if($('voice-status'))$('voice-status').textContent='Audio gagal; kesempatan pemutaran dikembalikan. Periksa paket suara Jepang di perangkat.';if($('play')){$('play').textContent=`▶ Putar audio (${exam.plays[g]}/2)`;$('play').disabled=false}}};
speechSynthesis.speak(u)}nextLine()
}
function next(){if(!exam)return;if(Date.now()>=exam.deadline){finish(true);return}if(exam.index<sectionSize(exam)-1){exam.index++;stopVoice();persist();examScreen();return}if(exam.section===3){if(confirm('Kumpulkan jawaban dan tampilkan hasil?'))finish(false);return}let blank=exam.answers.slice(sectionOffset(exam,exam.section),sectionOffset(exam,exam.section)+sectionSize(exam)).filter(x=>x===null).length;if(!confirm(`Lanjut bagian berikutnya? ${blank?blank+' soal belum dijawab. ':''}Tidak bisa kembali ke bagian ini.`))return;exam.section++;exam.index=0;stopVoice();persist();guide(exam.pack,exam.section)}
function finish(timeout){
 if(!exam)return;timeout=Boolean(timeout||Date.now()>=exam.deadline);
 const e=exam,qs=examQuestions(e),correct=qs.filter((q,i)=>q.answer===e.answers[i]).length;
 const report={id:'r'+Date.now().toString(36),version:e.version||15,profile:e.profile,name:e.name,pack:e.pack,answers:[...e.answers],questionIds:qs.map(q=>q.id),questionSnapshot:qs.map(q=>({...q,options:[...q.options]})),correct,percent:Math.round(correct/qs.length*100),date:new Date().toLocaleString('id-ID'),timestamp:Date.now(),timeout,elapsed:Math.min(DURATION,Math.floor((Date.now()-e.started)/1000))};
 stopTimer();exam=null;clearActive();db.history.unshift(report);db.history=db.history.slice(0,300);save();window.JFT_GAMIFY?.award(e.profile,'exam','exam:'+report.id);result(report);
}
function result(r){
 document.onkeydown=null;stopTimer();const qs=resultQuestions(r),size=qs.length/4,total=qs.length;if(!total||!Number.isInteger(size)||size<1){shell('<section class="card"><h2>Hasil lama tidak dapat dibuka</h2><p>Data soal pada riwayat ini tidak lengkap. Gunakan ekspor JSON untuk mencadangkan hasil.</p><button class="btn" id="back">Kembali</button></section>');$('back').onclick=showHistory;return}
 const per=NAMES.map((name,i)=>{const correct=qs.slice(i*size,(i+1)*size).filter((q,j)=>r.answers[i*size+j]===q.answer).length;return{name,correct}});
 shell(`<section class="card"><div class="row between"><span class="pill">${r.timeout?'WAKTU HABIS':'UJIAN SELESAI'}</span><span class="small muted">Paket ${r.pack+1} · ${escape(r.date)} · ${total} soal</span></div><h1>Hasil simulasi — ${escape(r.name)}</h1><div class="row" style="gap:32px"><div><div class="score">${r.percent}%</div><b>${r.correct} dari ${total} benar</b></div><div><span class="pill">${r.percent>=80?'Target latihan 80% tercapai':'Belum mencapai target latihan 80%'}</span><p class="small muted">Durasi: ${time(r.elapsed||0)} · ${r.timeout?'Terkumpul otomatis saat waktu habis':'Jawaban telah dikumpulkan'}</p></div></div><div class="resultgrid">${per.map(x=>`<div class="resultbox"><span class="small muted">${escape(x.name)}</span><b>${Math.round(x.correct/size*100)}%</b><span class="small">${x.correct}/${size} benar</span></div>`).join('')}</div><section class="diagnostic"><h2>Analisis topik</h2><p class="small muted">Kategori berdasarkan kata kunci, bukan evaluasi resmi.</p><div class="diagnostic-grid">${diagnostic(qs,r.answers).slice(0,5).map(x=>`<div class="diagnostic-item"><div class="row between"><b>${escape(x.name)}</b><span>${x.correct}/${x.total} benar</span></div><div class="progress"><div style="width:${Math.round(x.correct/x.total*100)}%"></div></div></div>`).join('')}</div></section><p class="info small"><b>Penting:</b> Ini persentase latihan, bukan skor JFT-Basic resmi. Ambang 80% hanya target belajar internal.</p><div class="row no-print"><button class="btn" id="review">Lihat pembahasan ${total} soal</button><button class="btn secondary" id="print">Cetak hasil</button><button class="btn outline" id="back">Beranda</button></div><div id="reviews" class="hidden"><h2>Review jawaban & pembahasan</h2>${r.legacySnapshotFrom?'<p class="notice">Catatan: pembahasan riwayat lama direkonstruksi dari bank soal yang tersedia. Jika soal pernah berubah sebelum migrasi, isi pembahasan mungkin tidak sama dengan soal saat ujian lama.</p>':''}<div class="tabs no-print">${NAMES.map((n,i)=>`<button class="tab ${i===0?'active':''}" data-section="${i}">${escape(n)}</button>`).join('')}</div><div id="review-content"></div></div></section>`);
 $('review').onclick=()=>{$('reviews').classList.toggle('hidden');$('review').textContent=$('reviews').classList.contains('hidden')?`Lihat pembahasan ${total} soal`:'Tutup pembahasan';showReviewSection(r,0)};
 $('print').onclick=()=>window.print();$('back').onclick=profileHome;document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>showReviewSection(r,Number(b.dataset.section)));
}
function showReviewSection(r,s){
 document.querySelectorAll('[data-section]').forEach(b=>b.classList.toggle('active',Number(b.dataset.section)===s));
 const qs=resultQuestions(r),size=qs.length/4;
 $('review-content').innerHTML=qs.slice(s*size,(s+1)*size).map((q,i)=>{const g=s*size+i,ans=r.answers[g],ok=ans===q.answer;
 return `<article class="review ${ok?'good':'bad'}"><div class="small muted">${escape(q.id)} · ${escape(topicOf(q))} · Soal ${i+1}</div>${q.passage?`<div class="passage">${escape(q.passage)}</div>`:''}<b>${escape(q.prompt)}</b><p class="small ${ok?'right':'wrong'}">${ok?'✓ Benar':'✕ '+(ans===null?'Tidak dijawab':'Salah')}</p><p>Jawaban kamu: <b>${ans===null?'—':escape(q.options?.[ans]??'Opsi tidak tersedia')}</b><br>Jawaban benar: <b>${escape(q.options?.[q.answer]??'Opsi tidak tersedia')}</b></p><p class="muted">${escape(q.explanation)}</p>${q.audio?`<p class="small"><b>Transkrip audio:</b> ${escape(q.audio)}</p>`:''}</article>`}).join('');
}
function showHistory(){
 document.onkeydown=null;stopTimer();const rows=db.history.filter(h=>h.profile===db.current);
 shell(`<section class="card"><div class="row between"><h1>Riwayat nilai — ${escape(currentName())}</h1><button class="btn secondary" id="back">← Beranda</button></div><p class="muted">Hasil disimpan pada browser/perangkat ini. Hasil v15 tetap 40 soal; v16 dan Mega Upgrade menggunakan 48 soal.</p>${rows.length?`<div style="overflow-x:auto"><table class="history-table"><thead><tr><th>Tanggal</th><th>Paket</th><th>Nilai</th><th>Benar</th><th>Aksi</th></tr></thead><tbody>${rows.map(h=>`<tr><td>${escape(h.date)}</td><td>${h.pack+1}</td><td><b>${h.percent}%</b></td><td>${h.correct}/${h.answers?.length||40}</td><td><button class="btn secondary" data-result="${escape(h.id)}">Detail</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">Belum ada hasil ujian untuk profil ini.</div>'}<div class="row" style="margin-top:24px"><button class="btn outline" id="export">Unduh JSON</button><button class="btn danger" id="clear">Hapus riwayat profil</button></div></section>`);
 $('back').onclick=profileHome;$('export').onclick=exportHistory;$('clear').onclick=()=>{if(confirm('Hapus seluruh riwayat nilai profil ini? Tidak dapat dibatalkan.')){db.history=db.history.filter(h=>h.profile!==db.current);save();showHistory()}};
 document.querySelectorAll('[data-result]').forEach(b=>b.onclick=()=>{let h=db.history.find(x=>x.id===b.dataset.result);if(h)result(h)});
}
function exportHistory(){let rows=db.history.filter(h=>h.profile===db.current);let data=JSON.stringify({profile:currentName(),exportedAt:new Date().toISOString(),results:rows},null,2);let a=document.createElement('a'),url=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.href=url;a.download='latsoljft-riwayat.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
window.JFT_GO_HOME=profileHome;
if(BANK.length!==500||[0,1,2,3].some(s=>BANK.filter(q=>q.section===s).length!==125)){shell('<section class="card"><h2>Bank soal belum lengkap</h2><p>Pastikan questions.js dari paket terbaru sudah diunggah.</p></section>');return}
migrateHistorySnapshots();
let saved=null;
try{saved=JSON.parse(localStorage.getItem(ACTIVE)||'null')||JSON.parse(sessionStorage.getItem(LEGACY_ACTIVE)||'null')}catch{}
if(validActive(saved)){
 exam=saved;db.current=saved.profile;save();
 if(Date.now()>=saved.deadline)finish(true);
 else{persist();examScreen();startTimer()}
}else{if(saved){try{localStorage.setItem('latsoljft-invalid-session-backup',JSON.stringify(saved));localStorage.removeItem(ACTIVE)}catch{}}profileHome()}
})();
