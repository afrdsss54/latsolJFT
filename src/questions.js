export const sections = [
  {id:'vocab',name:'文字と語彙',en:'Script & Vocabulary'},
  {id:'expression',name:'会話と表現',en:'Conversation & Expression'},
  {id:'listening',name:'聴解',en:'Listening Comprehension'},
  {id:'reading',name:'読解',en:'Reading Comprehension'}
];
export const questions = [
{id:1,section:'vocab',text:'「病院」の よみかたは どれですか。',options:['びょういん','びよういん','びょいん','びょうえん'],answer:0,explanation:'病院（びょういん）は rumah sakit です。'},
{id:2,section:'vocab',text:'まいあさ ７じに ______。',options:['おきます','ねます','かえります','あらいます'],answer:0,explanation:'おきます berarti bangun tidur.'},
{id:3,section:'vocab',text:'「電車」は どれですか。',options:['バス','でんしゃ','じてんしゃ','くるま'],answer:1,explanation:'電車（でんしゃ） berarti kereta listrik.'},
{id:4,section:'vocab',text:'きょうは とても ______ です。コートを きます。',options:['あつい','さむい','あかるい','ひろい'],answer:1,explanation:'さむい berarti dingin; cocok dengan memakai mantel.'},
{id:5,section:'vocab',text:'「来週」の いみは どれですか。',options:['minggu lalu','minggu ini','minggu depan','bulan depan'],answer:2,explanation:'来週（らいしゅう） berarti minggu depan.'},
{id:6,section:'expression',text:'A：すみません、えきは どこですか。 B：この みちを ______、みぎに あります。',options:['まっすぐ いくと','たべると','ねると','かくと'],answer:0,explanation:'まっすぐ いくと = kalau berjalan lurus.'},
{id:7,section:'expression',text:'A：いっしょに ひるごはんを たべませんか。 B：______。いきましょう。',options:['いいですね','ざんねんです','だめです','しりません'],answer:0,explanation:'いいですね adalah respons positif terhadap ajakan.'},
{id:8,section:'expression',text:'A：ここで しゃしんを とっても いいですか。 B：すみません、ここでは ______。',options:['とってください','とらないでください','とりましょう','とれます'],answer:1,explanation:'とらないでください berarti mohon jangan memotret.'},
{id:9,section:'expression',text:'A：あしたの パーティーに きますか。 B：すみません、しごとが ある ______、いけません。',options:['から','まで','より','だけ'],answer:0,explanation:'から menyatakan alasan: karena ada pekerjaan.'},
{id:10,section:'expression',text:'A：この くつは どうですか。 B：ちょっと ______ です。もっと おおきいのは ありますか。',options:['おおきい','ちいさい','あたらしい','やすい'],answer:1,explanation:'ちいさい = kecil, sehingga meminta ukuran lebih besar.'},
{id:11,section:'listening',text:'音声を きいて こたえてください。おんなの ひとは なんじに えきへ いきますか。',speech:'あしたは、くじはんに えきへ いきます。',options:['９じ','９じはん','１０じ','１０じはん'],answer:1,explanation:'音声: くじはん = pukul 09.30.'},
{id:12,section:'listening',text:'音声を きいて こたえてください。なにを かいますか。',speech:'スーパーで たまごと パンを かいます。',options:['パンと ぎゅうにゅう','たまごと パン','さかなと パン','たまごと みず'],answer:1,explanation:'音声 menyebut たまごと パン.'},
{id:13,section:'listening',text:'音声を きいて こたえてください。きょうの てんきは どうですか。',speech:'きょうは あめです。かさを もって いってください。',options:['はれ','くもり','あめ','ゆき'],answer:2,explanation:'あめ berarti hujan.'},
{id:14,section:'listening',text:'音声を きいて こたえてください。どこで あいますか。',speech:'ごご さんじに としょかんの まえで あいましょう。',options:['えきの まえ','としょかんの まえ','がっこうの なか','こうえん'],answer:1,explanation:'としょかんの まえ berarti depan perpustakaan.'},
{id:15,section:'listening',text:'音声を きいて こたえてください。おとこの ひとは なにを しますか。',speech:'しゅうまつは ともだちと サッカーを します。',options:['サッカー','テニス','りょうり','べんきょう'],answer:0,explanation:'サッカーを します = bermain sepak bola.'},
{id:16,section:'reading',passage:'おしらせ：あしたの にほんごの クラスは １０じから １２じまでです。きょうしつは ２０３です。',text:'にほんごの クラスは なんじに はじまりますか。',options:['９じ','１０じ','１１じ','１２じ'],answer:1,explanation:'１０じから berarti mulai pukul 10.'},
{id:17,section:'reading',passage:'スーパーの セール：やさいは ２０％ やすくなります。セールは きんようびまでです。',text:'なにが やすくなりますか。',options:['くだもの','さかな','やさい','にく'],answer:2,explanation:'やさい berarti sayuran.'},
{id:18,section:'reading',passage:'たなかさんへ。きょうは かぜを ひいたので、かいしゃを やすみます。あしたは いく よていです。さとう',text:'さとうさんは どうして やすみますか。',options:['りょこうです','かぜを ひきました','しごとが おわりました','でんしゃが ありません'],answer:1,explanation:'かぜを ひいた = terkena flu.'},
{id:19,section:'reading',passage:'としょかん：げつようびは やすみです。かようびから にちようびまで、９じから １８じまで あいています。',text:'としょかんは いつ やすみですか。',options:['げつようび','かようび','どようび','にちようび'],answer:0,explanation:'げつようび = Senin.'},
{id:20,section:'reading',passage:'メール：あした いっしょに えいがを みませんか。えいがは ごご ２じからです。１じはんに えきで あいましょう。',text:'なんじに えきで あいますか。',options:['１じ','１じはん','２じ','２じはん'],answer:1,explanation:'１じはん = pukul 13.30.'}
];
