import json as j,csv,collections as C,subprocess
from pathlib import Path
P=Path('.')
def load(f): return j.loads(Path(f).read_text())
def js(f): return j.loads(Path(f).read_text().split('=',1)[1].strip().rstrip(';'))
ch=load('curriculum/s73-chapters.json')['chapters']; units=load('curriculum/seven-step-pilots.json'); academy=load('lessons.json'); uc={i:c['number'] for c in ch for i in c['unitIds']}; ac={i:c['number'] for c in ch for i in c['academyIds']}
assert set(uc)=={u['id'] for u in units} and set(ac)=={u['id'] for u in academy}
base='https://www.irodori.jpf.go.jp/'; jft='https://www.jpf.go.jp/jft-basic/e/about/'; minna='https://www.3anet.co.jp/en/minnaqa.html'; m3='https://www.3anet.co.jp/en/minnanonihongo_dai3pan.html'
refs=[]
def ref(id,family,topic,chapters,url,status,gap,extra=None):
 refs.append(dict(id=id,family=family,topic=topic,chapters=chapters,source=url,sourceStatus=status,mappingStatus='kandidat-tematik' if chapters else 'belum-terpetakan',gap=gap,**(extra or {})))
# Independently authored topic summaries; not copied titles, exercise texts or full Can-do translations.
vols=[('Starter','starter','starter','X',[
('Sapaan dasar',[2]),('Meminta pengulangan dan bantuan bahasa',[2,13]),('Perkenalan dan identitas',[2]),('Keluarga dan tempat tinggal',[2,5]),('Preferensi makanan',[6,8]),('Memesan hidangan',[7,9]),('Rumah dan peralatan',[5]),('Lokasi orang di tempat kerja',[5]),('Jadwal sehari-hari',[3,6]),('Meminjam barang',[9]),('Hobi dan minat',[6,11]),('Mengajak orang lain',[6]),('Memilih kendaraan',[7]),('Deskripsi lingkungan',[5,8]),('Kebutuhan belanja',[7]),('Harga barang',[3,7]),('Kegiatan lampau',[6,11]),('Keinginan berlibur',[11,14])]),
('Elementary 1','elementary-1','elementary01','Y',[
('Perkembangan diri dan pekerjaan',[2,4,12]),('Hobi dan waktu luang',[6,12]),('Musim dan perubahan cuaca',[8,13]),('Cuaca lampau',[6,8]),('Deskripsi lingkungan kota',[5,8]),('Menanyakan rute',[5,7,9]),('Terlambat dan tersesat',[7,12]),('Pengalaman olahraga',[11]),('Meminta bantuan membaca',[9,13]),('Kelas bahasa Jepang',[14]),('Persiapan makanan bersama',[6,14]),('Komentar tentang hidangan',[8]),('Perkiraan waktu pekerjaan',[6,12]),('Izin tidak masuk kerja',[9,12]),('Keluhan kesehatan',[13]),('Kebiasaan kesehatan',[10,13]),('Pemberian dari keluarga',[4]),('Saran hadiah',[7,13])]),
('Elementary 2','elementary-2','elementary02','Z',[
('Perkenalan di tempat kerja',[2,4,12]),('Mengidentifikasi dan mendeskripsikan orang',[8]),('Alergi dan pembatasan makanan',[9,13]),('Instruksi penyajian makanan',[9,10]),('Saran pemesanan perjalanan',[7,13]),('Pengalaman perjalanan',[11]),('Perubahan acara karena cuaca',[12,13]),('Lokasi fasilitas acara',[5,7]),('Tradisi tahunan',[]),('Pakaian sesuai situasi',[7,13]),('Transaksi dan kartu pelanggan',[7]),('Membandingkan produk',[8,11]),('Fasilitas umum',[5,14]),('Permintaan layanan personal',[9]),('Kondisi peralatan dan lingkungan',[10,14]),('Komunikasi saat bencana',[13]),('Perkembangan kemampuan bahasa',[13]),('Rencana masa depan',[14])])]
# Six lessons with explicitly inspected first page of Can-do checklist, grouped paraphrases.
selected={('starter',1):('Interaksi sapaan, perpisahan, terima kasih dan pemahaman pesan pendek',4),('starter',2):('Klarifikasi komunikasi dan bantuan ungkapan Jepang',3),('elementary-1',1):('Sapaan setelah lama tidak bertemu, kabar dan pekerjaan',3),('elementary-1',2):('Minat, hari libur, profil staf dalam bacaan dan tulisan',4),('elementary-2',1):('Mengenal rekan kerja, perkenalan lebih rinci dan profil daring',4),('elementary-2',2):('Ciri orang, alasan menyukai tokoh dan bacaan wawancara',4)}
for family,key,slug,prefix,topics in vols:
 for i,(topic,cs) in enumerate(topics,1):
  ev=selected.get((key,i)); extra={'lesson':i,'level':'A1' if key=='starter' else 'A2','activityEvidence':ev[1] if ev else 0}
  if ev:extra.update(activitySummary=ev[0],activitySource=f'{base}assets/data/{slug}/pdf/{prefix}_candocheck.pdf',activityPage=1)
  ref(f'irodori-{key}-{i:02}',family,topic,cs,f'{base}en/{slug}/pdf.html','judul-resmi-diperiksa; Can-do halaman 1 diperiksa' if ev else 'judul-resmi-diperiksa','Periksa kesesuaian aktivitas satu per satu; '+('tambahkan materi tradisi tahunan.' if not cs else 'uji transfer pada tugas baru.'),extra)
# Keep historical hypothesis distinctly labelled. No promotion of speculative grammar sequence.
old=load('curriculum/s72-evidence-ledger.json')['references'][:50]
mm=[[2],[4],[5,7],[3,6],[7],[6],[4],[8],[6,12],[5],[3,7],[8,11],[7,14],[9],[9,10],[8,9],[10],[12,13],[11],[12],[12],[12],[5,13],[9,12],[13],[12,13],[13],[6],[14],[14],[14],[13,14],[10,14],[9,14],[13],[13],[ ],[12],[12],[ ],[ ],[14],[8],[ ],[13],[ ],[ ],[ ],[ ],[ ]]
for i,r in enumerate(old,1):
 ref(f'minna-{i:02}','Minna I' if i<=25 else 'Minna II',' / '.join(r['topicCandidate']),mm[i-1],minna,'struktur volume terverifikasi; urutan grammar belum diverifikasi','Hipotesis S7.2 historis mungkin salah urutan. Cek silabus edisi kedua dari buku berlisensi; '+('belum ada kandidat spesifik.' if not mm[i-1] else 'BAB terkait hanya usulan.'),{'lesson':i,'edition':'2'})
# Official test category purposes, paraphrased in Indonesian. These are not proficiency equivalences.
for id,topic,cs,detail in [
('vocab-meaning','Makna kosakata',list(range(1,15)),'Periksa kecocokan konteks kata.'),('vocab-use','Pemakaian kosakata',list(range(2,15)),'Perlu validasi konteks baru.'),('kanji-reading','Bacaan kanji',list(range(2,15)),'40 kanji pilihan bukan daftar resmi.'),('kanji-use','Makna dan pemakaian kanji',list(range(2,15)),'Perlu lebih banyak konteks kanji.'),('grammar','Tata bahasa percakapan',list(range(2,15)),'Periksa variasi jawaban.'),('expression','Ungkapan percakapan',list(range(2,15)),'Speaking mandiri bukan skor resmi.'),('listen-talk','Memahami percakapan',list(range(1,15)),'TTS belum divalidasi terhadap audio autentik.'),('listen-service','Memahami percakapan layanan',[7,9,13,14],'Skenario layanan terbatas.'),('listen-notice','Memahami instruksi dan pengumuman',[10,12,13,14],'Belum ada ujian BAB Choukai independen.'),('read-content','Memahami isi pesan dan bacaan',list(range(1,15)),'22 unit Seven-Step belum memiliki Dokkai eksplisit menurut audit M7.'),('read-search','Menemukan informasi praktis',[3,5,6,7,10,14],'Perlu variasi format visual dan papan informasi.')]:
 ref('jft-'+id,'JFT-Basic',topic,cs,jft,'kategori resmi terverifikasi',detail)
# inventory record per source, mapping to chapter where explicit, not semantic mastery
rows=[]
def add(source,records,chapter_fn,title_fn=lambda x:x.get('title',''),id_fn=lambda x:x['id']):
 for r in records:
  chapters=chapter_fn(r); chapters=[chapters] if isinstance(chapters,int) else chapters or []
  assert all(1<=c<=14 for c in chapters)
  rows.append(dict(source=source,id=str(id_fn(r)),chapters=chapters,title=title_fn(r),status='pemetaan internal' if chapters else 'BAB belum dipetakan'))
add('Seven-Step',units,lambda r:uc[r['id']]);add('Academy',academy,lambda r:ac[r['id']]);
for label,file in [('Listening','listening-lab'),('Speaking','speaking-lab')]:add(label,load('curriculum/'+file+'.json'),lambda r:uc[r['unitId']])
lex=js('curriculum/s92m6-lexicon.js');add('Kotoba M6',lex['entries'],lambda r:r['chapters'],lambda r:r['word']);add('Kanji M6',lex['kanji'],lambda r:r['chapters'],lambda r:r['word'])
for label,file in [('Skills M7','s92m7-skills'),('Interactive S9.3','s930-exercises'),('Exam S9.4','s94-exams'),('Immersive S9.5','s95-immersive')]:add(label,js('curriculum/'+file+'.js'),lambda r:r['chapter'],lambda r:r.get('title',r.get('prompt',''))[:120])
for label,file in [('Expansion S8.1','s81-content'),('Deep S8.3','s83-content'),('Complete S8.4.2','s842-content')]:add(label,js('curriculum/'+file+'.js'),lambda r:r['chapter'],id_fn=lambda r:'bab-'+str(r['chapter']))
for group in js('curriculum/s843-exams.js'):add('Exam S8.4.3',group['items'],lambda r:group['chapter'],lambda r:r['skill'])
add('Interactive S2',load('curriculum/interactive-units.json')['units'],lambda r:[])
add('CBT JFT',load('questions.json'),lambda r:[],lambda r:'Bagian '+str(r['section']+1))
dyn=j.loads(subprocess.check_output(['node','-e',"global.window=global;require('./lessons.js');require('./kana-engine.js');require('./mastery-engine.js');console.log(JSON.stringify({kana:JFT_KANA.cards,mastery:JFT_MASTERY.cards(JFT_LESSONS)}))"],text=True))
add('Kana Academy',dyn['kana'],lambda r:1,lambda r:r['kana']);add('Flashcard Academy',dyn['mastery'],lambda r:ac[r['moduleId']],lambda r:r['front'])
# Check explicit DAG; suggest nonbinding teaching order, no legacy mutation.
def dag(graph):
 visiting=set();seen=set()
 def visit(n):
  assert n in graph and n not in visiting, n
  if n in seen:return
  visiting.add(n)
  for p in graph[n]:visit(p)
  visiting.remove(n);seen.add(n)
 for n in graph:visit(n)
 return sum(map(len,graph.values()))
edges=dag({u['id']:u.get('prerequisiteUnitIds',[]) for u in units});cedges=dag({c['id']:c['prerequisiteChapterIds'] for c in ch})
orders=[{'chapter':9,'before':['s92m3-te-tt','s92m3-te-nde','s92m3-te-iku','s92m3-te-other'],'after':['s42-f2-18','s42-f2-19','s92m3-permission'],'reason':'Pembentukan て sebelum permintaan dan izin.'},{'chapter':10,'before':['s92m4-nai-godan-a','s92m4-nai-godan-b','s92m4-nai-other'],'after':['s92m4-obligation','s92m4-no-obligation'],'reason':'Bentuk ない sebelum kewajiban.'},{'chapter':11,'before':['s92m4-ta-godan-a','s92m4-ta-godan-b','s92m4-ta-other'],'after':['s42-f2-21','s92m4-experience-negative'],'reason':'Bentuk た sebelum pengalaman.'}]
for o in orders:assert all(x in uc for x in o['before']+o['after'])
summary=[dict(number=c['number'],title=c['title'],stage=c['stage'],counts=dict(C.Counter(r['source'] for r in rows if c['number'] in r['chapters'])),candidateRefs=[r['id'] for r in refs if c['number'] in r['chapters']]) for c in ch]
data=dict(version='S9.6',date='2026-11-26',references=refs,inventoryCounts=dict(C.Counter(r['source'] for r in rows)),chapters=summary,orders=orders,graph={'unitEdges':edges,'chapterEdges':cedges,'unitsWithoutExplicitPrerequisites':sum(not u.get('prerequisiteUnitIds') for u in units)},sources=[{'label':'Minna edisi kedua: struktur','url':minna},{'label':'Minna I edisi kedua','url':'https://www.3anet.co.jp/np/en/books/2300/'},{'label':'Minna II edisi kedua','url':'https://www.3anet.co.jp/np/en/books/2400/'},{'label':'Perubahan edisi ketiga','url':m3},{'label':'Irodori level dan pendekatan','url':base+'en/about.html'},{'label':'JFT-Basic struktur dan skala sejak Agustus 2026','url':jft}],limitations=['Kandidat BAB tidak membuktikan kesetaraan atau mastery.','Minna: struktur 25+25 terverifikasi, urutan tata bahasa tidak; hipotesis historis tidak dikoreksi tanpa bukti edisi kedua.','Irodori: 54 judul diperiksa; halaman pertama checklist Can-do setiap volume (6 pelajaran, 22 aktivitas) diperiksa ulang, bukan seluruh checklist.','CBT tetap dipertahankan: evaluasi skala A1/A2.1/A2.2 resmi memerlukan kalibrasi; skor LatSol tidak dapat dianggap skor resmi.','Inventaris merupakan record sumber, bukan materi unik; kartu Kana dan flashcard Academy ikut dihitung. Paket Lab dihitung per paket, bukan semua subsoal.','Tidak mengubah urutan wajib atau progres; rekomendasi urutan bersifat informatif.'])
Path('curriculum/s96-alignment.js').write_text('globalThis.JFT_S96_ALIGNMENT = '+j.dumps(data,ensure_ascii=False,indent=2)+';\n')
def csvout(f,rows):
 with open(f,'w',encoding='utf-8-sig',newline='') as h:
  w=csv.DictWriter(h,fieldnames=list(rows[0]));w.writeheader();w.writerows({k:(' | '.join(map(str,v)) if isinstance(v,list) else v) for k,v in r.items()} for r in rows)
csvout('S9.6-INVENTORY.csv',rows)
fields=['id','family','topic','chapters','sourceStatus','mappingStatus','gap','source','activityEvidence','activitySummary','activitySource','activityPage']
csvout('S9.6-EVIDENCE-GAP.csv',[{k:r.get(k,'') for k in fields} for r in refs])
print(len(rows),len(refs),sum(r.get('activityEvidence',0) for r in refs),sum(not r['chapters'] for r in refs),data['graph'],data['inventoryCounts'])
