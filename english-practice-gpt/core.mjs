export const APP='english-practice-gpt';
export const VERSION='2026.11.19.1';
export const normalize=s=>String(s).normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
export function matches(value,answers){return answers.some(a=>normalize(a).replace(/[.!?。！？]+$/,'')===normalize(value).replace(/[.!?。！？]+$/,''));}
export function shuffle(a,rng=Math.random){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
export function recordFor(attempts,key){let wrong=false,streak=0,last=null;for(const a of attempts.filter(x=>x.key===key)){last=a;if(a.correct&&!a.assisted&&(a.grading!=='self'||key.startsWith('translation-'))){streak++;if(streak>=2)wrong=false;}else if(a.correct&&!a.assisted&&a.grading==='self'){/* Self reports never clear an objective weakness. */}else{wrong=true;streak=0;}}return{weak:wrong,streak,last};}
export function weakKeys(attempts){return [...new Set(attempts.map(a=>a.key))].filter(k=>recordFor(attempts,k).weak);}
export function nextQueue(items,attempts,count=5,review=false){const weak=new Set(weakKeys(attempts));const pool=items.filter(q=>!review||weak.has(q.key));return shuffle(pool).sort((a,b)=>Number(weak.has(b.key))-Number(weak.has(a.key))).slice(0,count);}
export function metrics(attempts){const first=attempts.filter(a=>a.grading!=='self'&&!a.assisted),right=first.filter(a=>a.correct).length;return{total:attempts.length,independent:first.length,right,rate:first.length?Math.round(100*right/first.length):null,assisted:attempts.filter(a=>a.assisted).length,self:attempts.filter(a=>a.grading==='self').length,weak:weakKeys(attempts).length};}
export function deduplicate(rows){const seen=new Set();return rows.filter(a=>{if(seen.has(a.eventId))return false;seen.add(a.eventId);return true;});}
export const dayKey=value=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
export function validateBackup(v){if(!v||v.app!==APP||v.version!==1||!Array.isArray(v.attempts)||v.attempts.length>50000||!Array.isArray(v.custom)||v.custom.length>2000)throw Error('這不是有效的英文練習備份。');
 const text=(x,max)=>typeof x==='string'&&x.length<=max,ids=new Set();
 for(const a of v.attempts){if(!a||!text(a.id,100)||ids.has(a.id)||!text(a.key,250)||!text(a.prompt,2000)||!text(a.expected,2000)||!text(a.response,2000)||!text(a.category,100)||!text(a.mode,30)||!text(a.learnerId,100)||!text(a.alias,40)||!Number.isFinite(Date.parse(a.at))||typeof a.correct!=='boolean'||typeof a.assisted!=='boolean'||!['auto','self'].includes(a.grading)||!Number.isFinite(a.activeMs)||a.activeMs<0||a.activeMs>3600000)throw Error('逐題紀錄格式不正確。');ids.add(a.id);}
 for(const c of v.custom)if(!c||!text(c.id,100)||!/^custom-[a-zA-Z0-9-]+$/.test(c.id)||!text(c.en,200)||!c.en.trim()||!text(c.zh,300)||!c.zh.trim()||![3,4,0].includes(c.unit))throw Error('自訂字庫格式不正確。');
 return v;}
export function parseWords(input,uid){const out=[];for(const [i,line]of input.split(/\r?\n/).entries()){if(!line.trim())continue;const p=line.split('|').map(s=>s.trim());if(p.length!==3||!['3','4','0'].includes(p[0])||!p[1]||!p[2]||p[1].length>200||p[2].length>300)throw Error(`第 ${i+1} 行格式不符：課別(3、4或0) | 英文 | 中文`);out.push({id:'custom-'+uid+'-'+i,unit:+p[0],en:p[1],zh:p[2]});}if(out.length>2000)throw Error('一次最多 2000 個字詞。');return out;}
export function csv(rows){return '\ufeff'+rows.map(r=>r.map(v=>{let s=String(v??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}).join(',')).join('\r\n');}

export function translationMetrics(attempts){const a=attempts.filter(x=>x.key.startsWith('translation-'));const correct=a.filter(x=>x.correct).length;return{attempts:a.length,practiced:new Set(a.map(x=>x.key)).size,correct,wrong:a.length-correct,weak:weakKeys(a).length,rate:a.length?Math.round(100*correct/a.length):null};}
