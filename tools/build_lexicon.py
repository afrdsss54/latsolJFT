import json,re,hashlib,unicodedata,collections,pathlib
P=pathlib.Path('.')
load=lambda f:json.loads((P/f).read_text())
units=load('curriculum/seven-step-pilots.json'); lessons=load('lessons.json'); chapters=load('curriculum/s73-chapters.json')['chapters']
# Explicit lexical mapping; retain kana where spelling is ambiguous or conventional.
lex={}
for line in '''
水:みず ご飯:ごはん 学校:がっこう 駅:えき 明日:あした 百:ひゃく 円:えん 学生:がくせい 先生:せんせい 会社員:かいしゃいん 仕事:しごと 私:わたし 本:ほん 鞄:かばん 店:みせ 野菜:やさい 電車:でんしゃ 自転車:じてんしゃ 町:まち 写真:しゃしん 禁止:きんし 日本:にほん 旅行:りょこう 鍵:かぎ 柿:かき 豚:ぶた 花:はな 客:きゃく 今日:きょう お茶:おちゃ 切手:きって 医者:いしゃ 店員:てんいん 看護師:かんごし 留学生:りゅうがくせい 大学:だいがく 会社:かいしゃ 社員:しゃいん 友達:ともだち 六十:ろくじゅう 八十:はちじゅう 三百:さんびゃく 六百:ろっぴゃく 八百:はっぴゃく 一つ:ひとつ 二つ:ふたつ 三つ:みっつ 四つ:よっつ 五つ:いつつ 電話番号:でんわばんごう 四時:よじ 七時:しちじ 九時:くじ 五分:ごふん 半:はん 帽子:ぼうし 辞書:じしょ 料理:りょうり 日本語:にほんご 雑誌:ざっし 資料:しりょう 色:いろ 自動販売機:じどうはんばいき 椅子:いす 公園:こうえん 受付:うけつけ 事務所:じむしょ お客さん:おきゃくさん 猫:ねこ 上:うえ 下:した 隣:となり 中:なか 箱:はこ 食堂:しょくどう 図書館:としょかん 朝:あさ 営業:えいぎょう 午前:ごぜん 午後:ごご 週末:しゅうまつ お酒:おさけ 昨日:きのう 今朝:けさ 先週:せんしゅう 休み:やすみ 昼ご飯:ひるごはん 枚:まい 試着:しちゃく 靴:くつ 鏡:かがみ 空港:くうこう 行き:いき 乗り場:のりば バス停:バスてい 地下鉄:ちかてつ 次:つぎ 分:ふん 運賃:うんちん 約:やく 部屋:へや 書類:しょるい 金曜日:きんようび 日曜日:にちようび 時間:じかん お弁当:おべんとう 新幹線:しんかんせん 理由:りゆう 相談:そうだん 管理人:かんりにん 雨:あめ 手袋:てぶくろ 練習:れんしゅう 今度:こんど 予算:よさん 予定:よてい 会議:かいぎ 出張:しゅっちょう 変更:へんこう 点検:てんけん 利用:りよう 中止:ちゅうし 別:べつ 入口:いりぐち 準備:じゅんび 引き継ぎ:ひきつぎ 申請:しんせい 用紙:ようし 窓口:まどぐち 意見:いけん 遅刻:ちこく 連絡:れんらく 機械:きかい 担当:たんとう 確認:かくにん 故障:こしょう 熱:ねつ 病院:びょういん 薬:くすり 予約:よやく 来週:らいしゅう 都合:つごう 記入:きにゅう 煙草:たばこ 禁煙:きんえん
'''.split():
 w,k=line.split(':');lex[k]=(w,'kata benda')
for cat,items in [('kata sifat い','大きい:おおきい 小さい:ちいさい 早い:はやい 遅い:おそい 安い:やすい 高い:たかい 白い:しろい 重い:おもい 軽い:かるい いい:いい 暑い:あつい 寒い:さむい 楽しい:たのしい おいしい:おいしい 忙しい:いそがしい 難しい:むずかしい 優しい:やさしい 新しい:あたらしい 古い:ふるい 広い:ひろい 狭い:せまい 明るい:あかるい 近い:ちかい 危ない:あぶない 悲しい:かなしい うれしい:うれしい 痛い:いたい 長い:ながい 短い:みじかい'),('kata sifat な','静か:しずか きれい:きれい 便利:べんり 元気:げんき にぎやか:にぎやか 暇:ひま 親切:しんせつ 有名:ゆうめい 素敵:すてき おしゃれ:おしゃれ 大丈夫:だいじょうぶ 必要:ひつよう 無理:むり 心配:しんぱい 安心:あんしん'),('kata tanya','誰:だれ どちら:どちら どれ:どれ どの:どの いくつ:いくつ どのくらい:どのくらい'),('kata keterangan','毎日:まいにち 毎晩:まいばん 一緒に:いっしょに ちょっと:ちょっと とても:とても あまり:あまり 少し:すこし まだ:まだ 一番:いちばん ゆっくり:ゆっくり 先に:さきに 一人で:ひとりで まっすぐ:まっすぐ'),('ungkapan','こんにちは:こんにちは はじめまして:はじめまして おはようございます:おはようございます こんばんは:こんばんは おやすみなさい:おやすみなさい ありがとう:ありがとう はい:はい いいえ:いいえ そうです:そうです いいですね:いいですね ください:ください じゃありません:じゃありません')]:
 for pair in items.split():
  w,k=pair.split(':');lex[k]=(w,cat)
for cat,items in [('angka','いち に さん よん ご なな はち きゅう ゼロ ろくじゅう はちじゅう さんびゃく ろっぴゃく はっぴゃく'),('kata tunjuk','これ それ あれ ここ そこ あそこ この その あの'),('kata keterangan','ちかく だれも'),('ungkapan','よろしく おねがいします|だめ'),('kata benda','ごみ きっぷ ねだん ちち はは あに いもうと だいどころ げんかん まど あさごはん ばんごはん せき てんいん かいけい みぎ ひだり ひこうき はれ ゆき くもり はる なつ あき ふゆ ふく うわぎ あか あお しろ くろ きょうしつ しゅくだい しけん しつもん いんさつ つくえ でんわ ばんごう へんじ さんぽ すいえい あたま おなか のど ゆうびんきょく ぎんこう しやくしょ じしん かじ ひなん ひじょうぐち ぶんべつ もえるごみ')]:
 for k in (items.split('|') if '|' in items else items.split()):
  lex.setdefault(k,(k,cat))
lex.update({'ぎゅうにゅう':('牛乳','kata benda'),'ちゅうもん':('注文','kata benda'),'きました':('来ました','kata kerja')})
# Curated verb lemmas and group, six forms generated with explicit irregulars.
verbs=[]; vmap=collections.defaultdict(list)
for group,items in [('godan','飲む:のむ 行く:いく 働く:はたらく 帰る:かえる 買う:かう 待つ:まつ 聞く:きく 座る:すわる 入る:はいる 使う:つかう 取る:とる 吸う:すう 思う:おもう 止まる:とまる 休む:やすむ 引っ越す:ひっこす 読む:よむ 始まる:はじまる 終わる:おわる 書く:かく 会う:あう 履く:はく 乗る:のる かかる:かかる 持つ:もつ 遊ぶ:あそぶ 選ぶ:えらぶ 死ぬ:しぬ 泳ぐ:およぐ 急ぐ:いそぐ 話す:はなす 触る:さわる 押す:おす 消す:けす 出す:だす 払う:はらう 守る:まもる 作る:つくる 売る:うる 降る:ふる 習う:ならう 置く:おく 洗う:あらう 違う:ちがう 歩く:あるく 捨てる:すてる'),('ichidan','食べる:たべる 起きる:おきる 寝る:ねる 見る:みる 遅れる:おくれる 着る:きる 降りる:おりる 乗り換える:のりかえる 見せる:みせる 開ける:あける 借りる:かりる 忘れる:わすれる 出る:でる 漏れる:もれる 止める:とめる 続ける:つづける 並べる:ならべる 捨てる:すてる'),('suru','する:する 勉強する:べんきょうする 散歩する:さんぽする 旅行する:りょこうする 連絡する:れんらくする 貯金する:ちょきんする 確認する:かくにんする 記入する:きにゅうする 掃除する:そうじする'),('kuru','来る:くる 持って来る:もってくる'),('godan','持って行く:もっていく')]:
 for pair in items.split():
  word,k=pair.split(':')
  if word=='捨てる' and group=='godan':continue
  if group=='godan':
   end=k[-1];a,i,e={'う':('わ','い','え'),'く':('か','き','け'),'ぐ':('が','ぎ','げ'),'す':('さ','し','せ'),'つ':('た','ち','て'),'ぬ':('な','に','ね'),'ぶ':('ば','び','べ'),'む':('ま','み','め'),'る':('ら','り','れ')}[end]; t='って' if end in 'うつる' or k.endswith('いく') else 'んで' if end in 'ぬぶむ' else {'く':'いて','ぐ':'いで','す':'して'}[end];forms=[k,k[:-1]+i+'ます',k[:-1]+t,k[:-1]+a+'ない',k[:-1]+t[:-1]+('だ' if t.endswith('で') else 'た'),k[:-1]+e+'る']
  elif group=='ichidan':forms=[k,k[:-1]+'ます',k[:-1]+'て',k[:-1]+'ない',k[:-1]+'た',k[:-1]+'られる']
  elif group=='suru':forms=[k,k[:-2]+'します',k[:-2]+'して',k[:-2]+'しない',k[:-2]+'した',k[:-2]+'できる']
  else:forms=[k,k[:-2]+'きます',k[:-2]+'きて',k[:-2]+'こない',k[:-2]+'きた',k[:-2]+'こられる']
  row={'lemma':word,'group':group,'forms':forms};verbs.append(row)
  for f in forms[:5]+[forms[1][:-2]+'ました']:vmap[f].append(row)
# Kana -> romaji for academy readings and generated forms; source romaji retained.
base={};
for kana,rom in [('あいうえお','a i u e o'),('かきくけこ','ka ki ku ke ko'),('さしすせそ','sa shi su se so'),('たちつてと','ta chi tsu te to'),('なにぬねの','na ni nu ne no'),('はひふへほ','ha hi fu he ho'),('まみむめも','ma mi mu me mo'),('やゆよ','ya yu yo'),('らりるれろ','ra ri ru re ro'),('わをん','wa o n'),('がぎぐげご','ga gi gu ge go'),('ざじずぜぞ','za ji zu ze zo'),('だぢづでど','da ji zu de do'),('ばびぶべぼ','ba bi bu be bo'),('ぱぴぷぺぽ','pa pi pu pe po')]:base.update(zip(kana,rom.split()))
for k,r in [('き','ky'),('ぎ','gy'),('し','sh'),('じ','j'),('ち','ch'),('に','ny'),('ひ','hy'),('び','by'),('ぴ','py'),('み','my'),('り','ry')]:
 for a,b in zip('ゃゅょ','auo'):base[k+a]=r+b
base.update({'ふぁ':'fa','ふぃ':'fi','ふぇ':'fe','ふぉ':'fo','てぃ':'ti','でぃ':'di','うぃ':'wi','うぇ':'we','うぉ':'wo','しぇ':'she','ちぇ':'che','じぇ':'je','つぁ':'tsa','つぃ':'tsi','つぇ':'tse','つぉ':'tso','ふゅ':'fyu','ゔ':'vu'})
def roma(k):
 if not k or re.search(r'[一-龯]',k):return ''
 k=''.join(chr(ord(c)-96) if 'ァ'<=c<='ヶ' else c for c in k);out='';i=0;gem=False
 while i<len(k):
  c=k[i];i+=1
  if c=='っ':gem=True;continue
  if c=='ー':out+=next((x for x in reversed(out) if x in 'aeiou'),'');continue
  if c+k[i:i+1] in base and i<len(k):c+=k[i];i+=1
  r=base.get(c,c)
  if gem:r=('t' if r.startswith('ch') else r[:1])+r;gem=False
  if c=='ん' and i<len(k) and k[i] in 'あいうえおやゆよ':r="n'"
  out+=r
 return out
norm=lambda x:re.sub(r'\s+',' ',unicodedata.normalize('NFKC',x).strip()).casefold()
entries={}; issues=[]; raw=0; coverage=[]
def add(word,kana,rom,meaning,src,ch,ex,kind=''):
 global raw
 raw+=1; meaning=meaning.strip().rstrip('.');word=word.strip();kana=kana.strip();cat='belum diklasifikasi';v=None
 if kana in vmap:
  cand=vmap[kana];v=cand[0] if len(cand)==1 else next((x for x in cand if ('pakaian' in meaning and x['lemma']=='着る') or ('datang' in meaning and x['lemma']=='来る') or ('bangun' in meaning and x['lemma']=='起きる') or ('meletak' in meaning and x['lemma']=='置く')),None)
 if v:
  cat='kata kerja';
  if word==kana:
   if kana==v['forms'][0]:word=v['lemma']
   elif kana==v['forms'][1] and v['group']=='godan':word=v['lemma'][:-1]+v['forms'][1][len(v['forms'][0])-1:]
   elif kana==v['forms'][1] and v['group']=='ichidan':word=v['lemma'][:-1]+'ます'
   elif kana==v['forms'][1] and v['group']=='kuru':word=v['lemma'][:-1]+'ます'
   elif kana==v['forms'][1] and v['group']=='suru':word=v['lemma'][:-2]+'します'
 elif kana in lex:
  w,cat=lex[kana];word=w if word==kana else word
 elif kind:cat=kind
 elif re.fullmatch(r'[ァ-ヺー]+',kana):cat='kata benda'
 if len(word)==1 and ch==1:cat='kana / karakter'
 if not kana:issues.append((src,word,'bacaan belum tersedia'))
 if cat=='belum diklasifikasi':issues.append((src,word,'kategori belum diverifikasi'))
 if not rom:rom=roma(kana)
 key=(norm(word),norm(kana),norm(meaning));id='v-'+hashlib.sha256('|'.join(key).encode()).hexdigest()[:20]
 e=entries.setdefault(key,{'id':id,'word':word,'kana':kana,'romaji':rom,'meaning':meaning,'category':cat,'chapters':[],'sources':[],'examples':[],'verb':v})
 if ch not in e['chapters']:e['chapters'].append(ch)
 if src not in e['sources']:e['sources'].append(src)
 if ex and ex not in e['examples']:e['examples'].append(ex)
 if e['romaji'] and rom and norm(e['romaji'])!=norm(rom):issues.append((src,word,'variasi romaji: '+e['romaji']+' / '+rom))
 if not e['romaji']:e['romaji']=rom
 if not e['verb'] and v:e['verb']=v

def chapter(id,field):return next(c['number'] for c in chapters if id in c[field])
phrases=dict(line.split('|',1) for line in """～と申します|～ともうします
よろしくお願いします|よろしくおねがいします
どちらから来ましたか|どちらからきましたか
すみません、もう一度お願いします|すみません、もういちどおねがいします
ゆっくり話してください|ゆっくりはなしてください
もう少し大きいサイズはありますか|もうすこしおおきいサイズはありますか
注文をお願いします|ちゅうもんをおねがいします
～は食べられません|～はたべられません
～が入っていますか|～がはいっていますか
駅はどこですか|えきはどこですか
この電車は大阪へ行きますか|このでんしゃはおおさかへいきますか
次のバスは何時ですか|つぎのバスはなんじですか
遅れます|おくれます
申し訳ありません|もうしわけありません
明日、休んでもいいですか|あした、やすんでもいいですか
手伝っていただけますか|てつだっていただけますか
予定を変更したいです|よていをへんこうしたいです
大丈夫ですか|だいじょうぶですか
頭が痛いです|あたまがいたいです
薬はありますか|くすりはありますか
この荷物を送りたいです|このにもつをおくりたいです
財布をなくしました|さいふをなくしました
避難場所はどこですか|ひなんばしょはどこですか""".splitlines())
# For full phrases, romaji is explicitly segmented rather than guessing particle pronunciations.
phrase_rom=dict(zip(phrases,"""~ to moushimasu
yoroshiku onegaishimasu
dochira kara kimashita ka
sumimasen, mou ichido onegaishimasu
yukkuri hanashite kudasai
mou sukoshi ookii saizu wa arimasu ka
chuumon o onegaishimasu
~ wa taberaremasen
~ ga haitte imasu ka
eki wa doko desu ka
kono densha wa Oosaka e ikimasu ka
tsugi no basu wa nanji desu ka
okuremasu
moushiwake arimasen
ashita, yasunde mo ii desu ka
tetsudatte itadakemasu ka
yotei o henkou shitai desu
daijoubu desu ka
atama ga itai desu
kusuri wa arimasu ka
kono nimotsu o okuritai desu
saifu o nakushimashita
hinan basho wa doko desu ka""".splitlines()))
def splitword(w):
 if w in phrases:return w,phrases[w]
 m=re.fullmatch(r'(.*?)（([^）]+)）(.*)',w)
 if m:return m[1]+m[3],m[2]+m[3]
 if re.search('[一-龯～]',w):return w,''
 return w,w
for u in units:
 ch=chapter(u['id'],'unitIds');g=u['grammar'];ex={'jp':g.get('example',''),'romaji':g.get('romaji',''),'id':g.get('meaning',''),'source':u['id']}
 for w,r,m in u['vocab']:
  word,k=splitword(w);add(word,k,r,m,u['id'],ch,ex)
 coverage.append({'id':u['id'],'type':'unit','chapter':ch,'entries':len(u['vocab'])})
for l in lessons:
 ch=chapter(l['id'],'academyIds');n=0;ex={'jp':l['japanese'],'romaji':'','id':l['translation'],'source':l['id']}
 # explicit gloss pairs only; all modules scanned, examples remain in source.
 for s in l['content'].split(';'):
  if '=' not in s:continue
  w,m=map(str.strip,s.split('=',1));w=re.sub(r'^Perkenalan sopan:\s*|^Pertanyaan asal:\s*|^Jawaban:\s*','',w)
  word,k=splitword(w)
  if '／' in k:k=k.split('／')[0] # contextual first reading, not entire reading inventory
  add(word,k,phrase_rom.get(word,''),m,l['id'],ch,ex,'ungkapan' if l['category']=='kaiwa' else 'kanji / kosakata' if l['category']=='kanji' else '');n+=1
 coverage.append({'id':l['id'],'type':l['category'],'chapter':ch,'entries':n})
# curated introductory readings, not exhaustive; includes characters explicitly taught in Academy.
kanji=[]
for line in '''日|ニチ、ジツ|ひ、か|hari; matahari
月|ゲツ、ガツ|つき|bulan
年|ネン|とし|tahun
時|ジ|とき|waktu; jam
上|ジョウ|うえ、あ.がる|atas
下|カ、ゲ|した、さ.がる|bawah
中|チュウ|なか|dalam; tengah
外|ガイ、ゲ|そと、はず.す|luar
食|ショク|た.べる|makan
飲|イン|の.む|minum
見|ケン|み.る|melihat
聞|ブン、モン|き.く|mendengar; bertanya
駅|エキ|—|stasiun
店|テン|みせ|toko
病|ビョウ|や.む|sakit
院|イン|—|institusi
学|ガク|まな.ぶ|belajar
校|コウ|—|sekolah
火|カ|ひ|api
水|スイ|みず|air
木|モク、ボク|き、こ|pohon; kayu
金|キン、コン|かね|emas; uang
土|ド、ト|つち|tanah
人|ジン、ニン|ひと|orang
男|ダン、ナン|おとこ|laki-laki
女|ジョ、ニョ|おんな|perempuan
大|ダイ、タイ|おお.きい|besar
小|ショウ|ちい.さい、こ、お|kecil
会|カイ|あ.う|bertemu
社|シャ|やしろ|perusahaan; kuil
電|デン|—|listrik
車|シャ|くるま|kendaraan
道|ドウ|みち|jalan
分|ブン、フン、ブ|わ.ける、わ.かる|bagian; menit
買|バイ|か.う|membeli
売|バイ|う.る|menjual
行|コウ、ギョウ|い.く、おこな.う|pergi; melakukan
来|ライ|く.る|datang
入|ニュウ|はい.る、い.れる|masuk; memasukkan
出|シュツ|で.る、だ.す|keluar; mengeluarkan'''.splitlines():
 k,on,kun,m=line.split('|');es=[e for e in entries.values() if k in e['word'] and e['kana'] and len(e['word'])>1];es.sort(key=lambda e:(len(e['word']),e['word']));chs=sorted(set(ch for e in entries.values() if k in e['word'] for ch in e['chapters']));fallback={'年':('一年','いちねん','satu tahun'),'外':('外国','がいこく','negara asing'),'木':('木曜日','もくようび','Kamis'),'土':('土曜日','どようび','Sabtu'),'男':('男の子','おとこのこ','anak laki-laki')}
 if not es and k in fallback:
  w,r,mn=fallback[k];es=[{'word':w,'kana':r,'meaning':mn}]
 kanji.append({'id':'k-'+format(ord(k),'x'),'word':k,'on':on,'kun':kun,'meaning':m,'chapters':chs,'examples':[{'word':e['word'],'kana':e['kana'],'meaning':e['meaning']} for e in es[:5]]})
data={'entries':list(entries.values()),'kanji':kanji,'audit':{'raw':raw,'unique':len(entries),'merged':raw-len(entries),'coverage':coverage,'issues':len(issues)}}
for name,obj in [('curriculum/s92m6-lexicon.js',data)]: (P/name).write_text('window.JFT_LEXICON = '+json.dumps(obj,ensure_ascii=False,separators=(',',':'))+';\n')
import csv
with open('S9.2-M6-LEXICAL-AUDIT.csv','w') as f:
 w=csv.writer(f);w.writerow(['source','word','issue']);w.writerows(issues)
with open('S9.2-M6-SOURCE-COVERAGE.csv','w') as f:
 w=csv.DictWriter(f,fieldnames=['id','type','chapter','entries']);w.writeheader();w.writerows(coverage)
print(data['audit']['raw'],data['audit']['unique'],len(kanji),len(issues),collections.Counter(e['category'] for e in entries.values()),len({e['verb']['lemma'] for e in entries.values() if e['verb']}),sum(not e['kana'] for e in entries.values()))
