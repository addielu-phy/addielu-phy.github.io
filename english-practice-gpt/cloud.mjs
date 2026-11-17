// Public web configuration reused from the existing physics-quiz project.
// This file contains no teacher password, admin key, service account or access token.
// Load the existing physics site's intentionally public client settings instead of republishing them.
export let teacherEmail='';
let config=null;
async function loadSettings(){
 if(config)return;
 if(!window.CLOUD?.enabled){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://addielu-phy.github.io/physics-quiz/firebase-config.js';script.onload=resolve;script.onerror=()=>reject(Error('settings-unavailable'));document.head.append(script);});}
 if(!window.CLOUD?.enabled||!window.CLOUD.config?.projectId)throw Error('settings-unavailable');
 config=window.CLOUD.config;teacherEmail=String(window.CLOUD.teacherEmail||'').toLowerCase();
 if(!teacherEmail)throw Error('settings-unavailable');
}
let promise;
export async function backend(){await loadSettings();if(!promise)promise=Promise.all(['app','firestore','auth'].map(n=>import(`https://www.gstatic.com/firebasejs/10.12.2/firebase-${n}.js`))).then(([A,F,U])=>{const app=A.getApps().find(a=>a.name==='english-practice')||A.initializeApp(config,'english-practice');return{A,F,U,app,db:F.getFirestore(app),auth:U.getAuth(app)};}).catch(e=>{promise=null;throw e;});return promise;}
let privacyOK=false;
export async function checkPrivacy(){if(privacyOK)return true;const {A,F}=await backend();const app=A.getApps().find(a=>a.name==='english-private-probe')||A.initializeApp(config,'english-private-probe');try{await F.getDocFromServer(F.doc(F.getFirestore(app),'results','english-read-permission-probe'));throw Error('privacy-open');}catch(e){if(e.code==='permission-denied'){privacyOK=true;return true;}throw e;}}
export function cloudError(e){const c=e?.code||e?.message||'';if(c.includes('privacy-open'))return '雲端讀取權限需要檢查，已停止上傳；本機紀錄保留。';if(c.includes('permission-denied'))return '雲端拒絕存取；本機紀錄保留，請由老師檢查原系統權限。';if(c.includes('invalid-credential')||c.includes('wrong-password')||c.includes('user-not-found'))return '帳號或密碼不符，請使用原理化系統的教師帳號。';if(c.includes('too-many-requests'))return '登入嘗試過多，請稍後再試。';if(c.includes('network')||c.includes('unavailable'))return '目前連線不穩；資料保留在本機，可稍後重試。';return '連線未完成；本機紀錄保留。'+(c?'（'+c+'）':'');}
export function payload(a){return{name:a.alias,mode:a.mode==='review'?'wrong':'practice',attemptNo:1,quizId:'english-practice-gpt',quizLabel:'英文短練習 GPT版',quizTitle:'單字・默寫・篇章理解',score:a.correct?100:0,correct:a.correct?1:0,total:1,ids:[a.key],wrongIds:a.correct?[]:[a.key],durationSec:Math.round(a.activeMs/1000),clientTime:a.at,eventId:a.id,schema:1,learnerId:a.learnerId,category:a.category,prompt:a.prompt,expected:a.expected,response:a.response,assisted:a.assisted,grading:a.grading,exerciseMode:a.mode,qa:a.qa===true,contentSource:a.source||'自訂練習',device:a.device||'',sessionId:a.sessionId||a.id};}
export async function sendAttempt(a){await checkPrivacy();const {F,db}=await backend();await F.addDoc(F.collection(db,'results'),{...payload(a),ts:F.serverTimestamp()});}
// Delivery is at least once: every retry retains eventId; the teacher report deduplicates it.
export async function login(email,password){const {U,auth}=await backend();await U.setPersistence(auth,U.browserSessionPersistence);const r=await U.signInWithEmailAndPassword(auth,email,password);if(r.user.email?.toLowerCase()!==teacherEmail){await U.signOut(auth);throw Error('teacher-account-required');}return r.user;}
export async function logout(){const {U,auth}=await backend();return U.signOut(auth);}
export async function readPage(cursor=null){const {F,db}=await backend();const constraints=[F.where('quizId','==','english-practice-gpt'),F.orderBy(F.documentId()),F.limit(250)];if(cursor)constraints.splice(2,0,F.startAfter(cursor));const snap=await F.getDocsFromServer(F.query(F.collection(db,'results'),...constraints));return{rows:snap.docs.map(d=>({...d.data(),docId:d.id})),cursor:snap.docs.at(-1)||null,more:snap.size===250};}
