// Chinese prompts and reference translations for self-rated practice.
// Based on the supplied first exam's translation skills, not a complete Exam 2 syllabus.
const rows=[
['原卷考點：since 與認識彼此','Jane 和 Austin 從國中時期就認識彼此了。', 'Jane and Austin have known each other since junior high school.'],
['原卷考點：如此……以至於……','這個女孩如此疲憊，以至於她今天早上無法早起。','The girl was so tired that she could not get up early this morning.'],
['原卷考點：曾經……嗎？還沒','這些工人跟他們的老闆談過了嗎？不，還沒有。','Have these workers talked to their boss yet? No, not yet.'],
['原卷考點：How long 與 for','Jason 當老師多久了？他當老師六年多了。','How long has Jason been a teacher? He has been a teacher for over six years.'],
['原卷考點：工作持續多久','Larry 在這家餐廳工作多久了？他從 2021 年起就在這裡工作。','How long has Larry worked at this restaurant? He has worked here since 2021.'],
['變化練習：持續的友誼','我和 Amy 從小學時期就是朋友了。我們認識彼此十年了。','Amy and I have been friends since elementary school. We have known each other for ten years.'],
['變化練習：從過去到現在','我哥哥從 2020 年起就住在高雄。他已經在那家醫院工作三年了。','My brother has lived in Kaohsiung since 2020. He has worked at that hospital for three years.'],
['變化練習：工作多久','你媽媽在這家學校教書多久了？她從 2018 年起就在這裡教書。','How long has your mother taught at this school? She has taught here since 2018.'],
['變化練習：完成與尚未完成','你做完功課了嗎？我已經做完數學功課，但還沒有做完英文功課。','Have you finished your homework yet? I have already finished my math homework, but I have not finished my English homework yet.'],
['變化練習：已經吃過早餐','你吃過早餐了嗎？我已經吃過了，不過我只吃了一根香蕉。','Have you had breakfast yet? I have already had breakfast, but I only ate a banana.'],
['變化練習：生病與持續時間','你妹妹感冒多久了？她從星期一就感冒了。','How long has your sister had a cold? She has had a cold since Monday.'],
['變化練習：運動與改變','我姐姐從上個月起就每天運動。她已經減了兩公斤。','My sister has exercised every day since last month. She has lost two kilograms.'],
['變化練習：長時間沒有見面','我已經很久沒見到 Ben 了。他從去年起就住在台南。','I have not seen Ben for a long time. He has lived in Tainan since last year.'],
['變化練習：太……而不能……','這個男孩太年輕，還不能開車。他爸爸答應明年教他。','The boy is too young to drive. His father has promised to teach him next year.'],
['變化練習：過去的疲倦','我昨晚如此疲倦，以至於無法做完功課。我今天早上很早就起床了。','I was so tired last night that I could not finish my homework. I got up very early this morning.'],
['變化練習：太重而搬不動','這個箱子太重，我搬不動。你可以幫我嗎？','The box is too heavy for me to carry. Can you help me?'],
['變化練習：令人興奮與感到興奮','這部電影非常令人興奮。我和朋友看完後都感到很興奮。','The movie was very exciting. My friends and I felt very excited after watching it.'],
['變化練習：無聊的故事','這個故事很無聊，孩子們也覺得無聊。他們想聽另一個故事。','The story is boring, and the children feel bored. They want to hear another story.'],
['變化練習：消息與驚訝','這個消息很令人驚訝。聽到這個消息時，我們都感到很驚訝。','The news was surprising. We were all surprised when we heard it.'],
['變化練習：等候與時間長度','你在這裡等多久了？我已經等了二十分鐘，但公車還沒來。','How long have you waited here? I have waited for twenty minutes, but the bus has not arrived yet.'],
['變化練習：談過與還沒決定','你和父母談過你的計畫了嗎？我已經跟他們談過了，但我們還沒有做決定。','Have you talked to your parents about your plan yet? I have already talked to them, but we have not made a decision yet.'],
['變化練習：自從那次以後','我上星期和朋友吵了一架。我從那次以後就沒有跟他說話。','I had a fight with my friend last week. I have not talked to him since then.'],
['變化練習：練習與結果','我們最近花了很多時間練習音樂。因此，我們沒有太多時間讀書。','We have spent a lot of time practicing music lately. As a result, we have not had much time to study.'],
['變化練習：經驗與想再試','你曾經試過打羽球嗎？我打過，而且我想再試一次。','Have you ever tried playing badminton? Yes, I have, and I want to try it again.'],
];
export const TRANSLATION=rows.map(([title,prompt,expected],i)=>({id:'translation-'+(i+1),key:'translation-'+(i+1),type:'translation',category:'整段翻譯（自評）',title,prompt,expected,source:i<5?'依一段原卷翻譯第65–69題整理':'依一段翻譯考點設計・原創變化題',explain:'這是參考寫法，不是唯一正確答案；意思、時態及句型正確的其他寫法也可以。對照後自行選擇答對或答錯。'}));
