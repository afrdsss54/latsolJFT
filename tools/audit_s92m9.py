"""Structural audit of all explicitly indexed curriculum records; not linguistic certification."""
import json,csv,collections,unicodedata,re
from pathlib import Path
from html.parser import HTMLParser
root=Path(__file__).resolve().parents[1]
def load(p):return json.loads((root/p).read_text())
def js(p):return json.loads((root/p).read_text().split('=',1)[1].strip().rstrip(';'))
def norm(s):return re.sub(r'\s+','',unicodedata.normalize('NFKC',s)).casefold()
def filled(v):return isinstance(v,str) and bool(v.strip())
u=load('curriculum/seven-step-pilots.json');a=load('lessons.json');l=load('curriculum/listening-lab.json');s=load('curriculum/speaking-lab.json');x=js('curriculum/s92m6-lexicon.js');m=js('curriculum/s92m7-skills.js');ch=load('curriculum/s73-chapters.json')['chapters']; rows=[]; errors=[]; metrics=collections.Counter()
def record(group,id,checks,notes=''):
 bad=[k for k,v in checks.items() if not v];errors.extend(f'{group}:{id}: {k}' for k in bad);rows.append([group,id,'FAIL' if bad else 'PASS','; '.join(bad),notes]);metrics[group]+=1
def choice(q):
 o=q.get('options',[]);i=q.get('answer');return len(o)>=2 and all(map(filled,o)) and len(set(map(norm,o)))==len(o) and type(i)==int and 0<=i<len(o) and filled(q.get('explanation'))
assert all(len(z)==n for z,n in [(u,100),(a,100),(l,100),(s,100),(x['entries'],544),(x['kanji'],40),(m,14),(ch,14)])
for f in ['curriculum/seven-step-pilots','curriculum/listening-lab','curriculum/speaking-lab','curriculum/s73-chapters','curriculum/legacy-module-map','lessons','questions']:
 assert load(f+'.json')==js(f+'.js'),f+' mismatch'
ui={z['id']:z for z in u};li={z['id']:z for z in l};li_u={z['unitId']:z for z in l};sp_u={z['unitId']:z for z in s};mapping=[i for c in ch for i in c['unitIds']];academy=[i for c in ch for i in c['academyIds']];assert len(mapping)==100 and set(mapping)==set(ui);assert len(academy)==100 and set(academy)=={z['id'] for z in a};assert len(li_u)==len(sp_u)==100 and set(ui)==set(li_u)==set(sp_u)
for z in u:
 q=z['practice'];g=z['grammar'];metrics['active_questions']+=len(q);metrics['vocab_occurrences']+=len(z['vocab']);record('Seven-Step',z['id'],{'vocab triples':all(len(v)==3 and all(map(filled,v)) for v in z['vocab']),'grammar fields':all(filled(g.get(k)) for k in ['pattern','explanation','example','romaji','meaning','commonMistake']),'dialogue':all(map(filled,z['dialogue'])),'listening answer':choice(z['listeningQuestion']),'practice answers':all(choice(v) if v['type']=='choice' else v['type']=='input' and bool(v.get('answers')) and all(map(filled,v['answers'])) and filled(v.get('explanation')) for v in q),'prereq exists':all(i in ui and i!=z['id'] for i in z.get('prerequisiteUnitIds',[]))},'Presence/answer shape only; not semantic validation')
for z in a:record('Academy',z['id'],{'fields':all(filled(z.get(k)) for k in ['content','japanese','translation','question']),'choice':choice(z)},'Romaji not required by original schema')
for z in l:
 metrics['listening_variants']+=len(z['comprehensionVariants']);record('Listening',z['id'],{'unit':z['unitId'] in ui,'dialogue':z['dialogue']==[q['japanese'] for q in z['dialogueLines']] and norm(''.join(ui[z['unitId']]['dialogue'])) in norm(''.join(z['dialogue'])),'translation':all(filled(q['indonesian']) for q in z['dialogueLines']),'dictation':z['dictation']['target'] in z['dialogue'],'choices':choice(z['comprehension']) and all(map(choice,z['comprehensionVariants']))},'Text, not audio quality')
for z in s:record('Speaking',z['id'],{'unit':z['unitId'] in ui,'listening link':z['listeningId'] in li and li[z['listeningId']]['unitId']==z['unitId'],'shadowing':z['shadowing']['japanese']==li[z['listeningId']]['dialogue'],'repeat':all(filled(z['repeat'].get(k)) for k in ['japanese','romaji','meaning']),'shadow translation':len(z['shadowing']['japanese'])==len(z['shadowing']['translation']) and all(map(filled,z['shadowing']['translation']))},'Self-practice; no pronunciation evaluation')
verbs={}
for z in x['entries']:
 v=z.get('verb');
 if v:verbs[v['lemma']]=v['forms']
 record('Kotoba',z['id'],{'fields':all(filled(z.get(k)) for k in ['word','kana','romaji','meaning','category']),'sources':bool(z['sources']) and all(i in ui or i in academy for i in z['sources']),'chapter':bool(z['chapters']) and all(1<=i<=14 for i in z['chapters']),'examples':bool(z['examples']),'verb forms':not v or len(v['forms'])==6 and all(map(filled,v['forms']))},'Example is source context, not guaranteed lemma example; semantic review pending')
for z in x['kanji']:record('Kanji',z['id'],{'fields':all(filled(z.get(k)) for k in ['word','on','kun','meaning']),'examples':bool(z['examples']) and all(all(filled(q.get(k)) for k in ['word','kana','meaning']) for q in z['examples'])},'Selected readings only')
for p in m:
 record('Skills M7',p['id'],{k:all(filled(p[k].get(f)) for f in ['japanese','kana','romaji','translation','explanation','correct','wrong1','wrong2']) and len({norm(p[k][f]) for f in ['correct','wrong1','wrong2']})==3 for k in ['reading','listening','kaiwa']},'Answer and context spot-checked separately; not native-speaker certification')
assert len(verbs)==75; metrics['relaxed_lexicon_duplicate_candidates']=544-len({(norm(e['word']),norm(e['kana']),norm(e['meaning'])) for e in x['entries']})
metrics['expanded_listening_dialogues']=sum(z['dialogue']!=ui[z['unitId']]['dialogue'] for z in l);metrics['verb_lemmas']=len(verbs);metrics['duplicate_unit_dialogues']=100-len({norm(''.join(z['dialogue'])) for z in u});metrics['duplicate_unit_examples']=100-len({norm(z['grammar']['example']) for z in u});metrics['lexicon_examples_missing_romaji']=sum(not filled(q.get('romaji')) for e in x['entries'] for q in e['examples']);metrics['lexicon_examples_total']=sum(len(e['examples']) for e in x['entries']);metrics['records']=len(rows);metrics['errors']=len(errors)
class HTML(HTMLParser):
 def __init__(self):super().__init__();self.refs=[]
 def handle_starttag(self,tag,attrs):
  if tag in ['link','script']:self.refs.extend(v for k,v in attrs if k in ['src','href'] and v)
h=HTML();h.feed((root/'index.html').read_text());sw=(root/'sw.js').read_text();assets=re.search(r'ASSETS=(\[.*?\]);',sw).group(1);assets=json.loads(assets.replace("'",'"'));assert all((root/i.split('?')[0]).exists() for i in h.refs+assets);assert all(i.endswith('?v=jls-s92m9-1') for i in h.refs if i.split('?')[0].endswith(('.js','.css')));metrics['html_refs']=len(h.refs);metrics['sw_assets']=len(assets)
with (root/'S9.2-M9-CONTENT-AUDIT.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f);w.writerow(['Source','ID','Structural result','Failed checks','Editorial scope']);w.writerows(rows)
print(json.dumps(metrics,ensure_ascii=False,indent=2));print('\n'.join(errors));assert not errors
