import json,collections
from pathlib import Path
bank=json.loads((Path(__file__).parent/'questions.json').read_text())
assert len(bank)==500
assert len({q['id'] for q in bank})==500
assert collections.Counter(q['section'] for q in bank)=={0:125,1:125,2:125,3:125}
for q in bank:
 assert len(q['options'])==4 and len(set(q['options']))==4,q['id']
 assert isinstance(q['answer'],int) and 0<=q['answer']<4,q['id']
 assert q.get('prompt') and q.get('explanation'),q['id']
 if q['section']==2: assert q.get('audio'),q['id']
 if q['section']==3: assert q.get('passage'),q['id']
print('PASS: 500 soal; 125 per bagian; opsi unik; audio & passage tersedia')
