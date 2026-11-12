'use strict';
const $=id=>document.getElementById(id),letters=['A','B','C','D','E'];
let index=0,mode='A',value=0,playing=false,lastTime=0,frame=0;
const storageKey='math-a-exam-114-gpt-v1';let saved={};
try{saved=JSON.parse(localStorage.getItem(storageKey)||'{}');if(!saved||typeof saved!=='object')saved={};}catch(e){}
function save(){try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch(e){}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function label(q){return q.id[0]==='m'?'多選 '+q.id.slice(1):'填充 '+q.id.slice(1);}
function nav(){let html='';for(let i=0;i<QUESTIONS.length;i++){let q=QUESTIONS[i];if(i===0||i===4)html+='<div class="label">'+(i===0?'一 · 多重選擇':'二 · 填充題')+'</div>';html+='<a href="#'+q.id+'" class="qnav '+(i===index?'active ':'')+(saved[q.id]?.done?'done':'')+'" '+(i===index?'aria-current="page"':'')+'><span class="n">'+label(q)+'</span> <span class="title">'+esc(q.title)+'</span></a>';} $('nav').innerHTML=html;}
function stop(){playing=false;cancelAnimationFrame(frame);$('play').textContent='▶ 播放';$('play').setAttribute('aria-pressed','false');}
function selectQuestion(i,scroll=false){stop();index=Math.max(0,Math.min(QUESTIONS.length-1,i));mode='A';let q=QUESTIONS[index];$('tag').textContent=label(q)+' · '+(q.id[0]==='m'?'每個選項獨立判斷':'完整計算');$('counter').textContent=(index+1)+' / 15';$('title').textContent=q.title;$('prompt').innerHTML=q.prompt;$('explore').textContent=q.explore;$('tip').innerHTML=q.tip;$('steps').innerHTML=q.steps.map((s,k)=>'<details class="step"><summary><span class="stepnum">'+String(k+1).padStart(2,'0')+'</span>'+s[0]+'</summary><div class="body">'+s[1]+'</div></details>').join('');$('answer').textContent=q.answer;$('answerDetails').open=false;$('note').value=saved[q.id]?.note||'';$('feedback').textContent='';$('mcPractice').hidden=q.id[0]!=='m';$('checks').innerHTML=letters.map(l=>'<label><input type="checkbox" value="'+l+'"> '+l+'</label>').join('');$('modes').innerHTML=q.id[0]==='m'?letters.map(l=>'<button class="mode '+(l==='A'?'active':'')+'" data-mode="'+l+'" aria-pressed="'+(l==='A')+'">選項 '+l+'</button>').join(''):'';$('modes').hidden=q.id[0]!=='m';$('logToggle').hidden=q.id!=='f11';$('logScale').checked=false;$('prev').disabled=index===0;$('next').disabled=index===QUESTIONS.length-1;markButton();setup();nav();if(scroll)$('main').scrollIntoView({block:'start'});}
function markButton(){$('mastered').textContent=saved[QUESTIONS[index].id]?.done?'✓ 我已理解這題':'□ 我已理解這題';}
function setup(){let q=QUESTIONS[index],c=config(q.id,mode);value=c.value;$('range').min=c.min;$('range').max=c.max;$('range').step=c.step;$('range').value=value;$('num').min=c.min;$('num').max=c.max;$('paramLabel').textContent=c.label;$('num').setAttribute('aria-label',c.label+'精確值');let presets=[];
if(q.id==='f3')presets=[[.5,'x=1/2（非法）'],[.75,'x=3/4'],[1,'x=1（非法）'],[1.5,'x=3/2']];
if(q.id==='f4')presets=[[-1,'x=−1'],[0,'x=0'],[5,'x=5']];
if(q.id==='f5')presets=[[2,'左端x=2'],[4,'頂點x=4'],[32,'右端x=32']];
if(q.id==='f6')presets=[[.25,'a=1/4'],[9/16,'原題a=9/16'],[1,'a=1']];
if(q.id==='f7')presets=[[-1,'點B'],[5/6,'兩項相等'],[2,'點A']];
if(q.id==='f9')presets=[[-2,'m=−2'],[-1,'原題m=−1'],[0,'m=0']];
if(q.id==='f10')presets=[[0,'剛存入'],[5,'5年'],[10,'10年']];
if(q.id==='f11')presets=[[30,'30小時'],[6*Math.log(2000)/Math.log(4),'門檻時間'],[33,'33小時'],[36,'36小時']];
if(q.id==='m4'&&(mode==='D'||mode==='E'))presets=[[.5,'a=1/2'],[1,'a=1（排除）'],[2,'a=2']];
$('presets').innerHTML=presets.map(p=>'<button data-value="'+p[0]+'">'+p[1]+'</button>').join('');update();}
function setValue(v){const c=config(QUESTIONS[index].id,mode);if(!Number.isFinite(v)||v<c.min-1e-8||v>c.max+1e-8){$('status').textContent='請輸入 '+c.min+' 到 '+c.max+' 之間的值。';$('status').classList.add('error');return;}value=v;update();}
function update(){const q=QUESTIONS[index],R=model(q.id,mode,value,$('logScale').checked);$('range').value=value;if(document.activeElement!==$('num'))$('num').value=Number(value.toFixed(8));$('readouts').innerHTML=R.values.map(v=>'<div class="readout"><small>'+esc(v[0])+'</small><strong>'+esc(v[1])+'</strong></div>').join('');$('status').textContent=R.message||'拖曳探針觀察數值，再展開下方詳解核對理由。';$('status').className='status'+(R.invalid?' error':'');$('decimal').textContent=R.decimal||'';$('textGraph').textContent=R.values.map(v=>v[0]+'：'+v[1]).join('；');$('legend').innerHTML=(R.kind==='bars'?R.bars.map(b=>({label:b.label,color:b.color})):R.curves).map(c=>'<span><span class="swatch" style="background:'+c.color+'"></span>'+esc(c.label)+'</span>').join('');draw(R);}
function draw(R){const canvas=$('canvas'),W=Math.max(280,canvas.clientWidth||800),H=W<520?340:430,dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);canvas.style.aspectRatio=W+'/'+H;const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.fillStyle='#f9fbff';ctx.fillRect(0,0,W,H);ctx.font='13px "Microsoft JhengHei",sans-serif';
if(R.kind==='bars'){let bs=R.bars,ys=bs.map(x=>x.value),lo=Math.min(0,...ys),hi=Math.max(0,...ys);if(hi-lo<.2){hi+=1;lo-=1;}let span=hi-lo;lo-=span*.12;hi+=span*.2;const L=55,T=25,B=H-65,PW=W-L-20,PH=B-T,Y=v=>B-(v-lo)/(hi-lo)*PH;ctx.strokeStyle='#bdcadc';ctx.beginPath();ctx.moveTo(L,Y(0));ctx.lineTo(W-15,Y(0));ctx.stroke();let bw=PW/bs.length;bs.forEach((b,i)=>{let x=L+bw*i+bw*.18,y=Y(b.value);ctx.fillStyle=b.color;ctx.fillRect(x,Math.min(y,Y(0)),bw*.64,Math.max(1,Math.abs(y-Y(0))));ctx.textAlign='center';ctx.fillStyle='#17243b';ctx.fillText(fmt(b.value,5),x+bw*.32,y+(b.value>=0?-10:21));ctx.font='12px "Microsoft JhengHei",sans-serif';let txt=b.label;if(W<500&&txt.length>8){ctx.fillText(txt.slice(0,5),x+bw*.32,H-38);ctx.fillText(txt.slice(5),x+bw*.32,H-20);}else ctx.fillText(txt,x+bw*.32,H-30);ctx.font='13px "Microsoft JhengHei",sans-serif';});ctx.textAlign='left';return;}
let [xmin,xmax,ymin,ymax]=R.range,L=W<500?52:77,T=28,B=H-48,PW=W-L-25,PH=B-T;if(R.equal){let side=Math.min(PW,PH);L+=(PW-side)/2;PW=side;PH=side;}
const X=x=>L+(x-xmin)/(xmax-xmin)*PW,Y=y=>B-(y-ymin)/(ymax-ymin)*PH;
ctx.strokeStyle='#e0e7f1';ctx.lineWidth=1;ctx.textAlign='right';ctx.fillStyle='#52637c';
for(let k=0;k<=4;k++){let y=ymin+(ymax-ymin)*k/4,py=Y(y);ctx.beginPath();ctx.moveTo(L,py);ctx.lineTo(L+PW,py);ctx.stroke();ctx.fillText(Math.abs(y)>=10000?fmt(y/10000,1)+'萬':fmt(y,2),L-8,py+4);}
ctx.textAlign='center';for(let k=0;k<=4;k++){let x=xmin+(xmax-xmin)*k/4,px=X(x);ctx.beginPath();ctx.moveTo(px,Y(ymin));ctx.lineTo(px,Y(ymax));ctx.stroke();ctx.fillText(fmt(x,2),px,B+21);}
ctx.fillStyle='#52637c';ctx.textAlign='left';ctx.fillText(R.yLabel,12,17);ctx.textAlign='right';ctx.fillText(R.xLabel,L+PW,H-8);
ctx.save();ctx.beginPath();ctx.rect(L,Y(ymax),PW,PH);ctx.clip();
if(R.shade){ctx.fillStyle='#0f766e0a';ctx.fillRect(X(R.shade[0]),Y(ymax),X(R.shade[1])-X(R.shade[0]),PH);}
if(ymin<=0&&ymax>=0){ctx.strokeStyle='#a3afc2';ctx.beginPath();ctx.moveTo(L,Y(0));ctx.lineTo(L+PW,Y(0));ctx.stroke();}
if(xmin<=0&&xmax>=0){ctx.strokeStyle='#a3afc2';ctx.beginPath();ctx.moveTo(X(0),Y(ymax));ctx.lineTo(X(0),Y(ymin));ctx.stroke();}
for(const [y,label,col] of R.horizontal){ctx.setLineDash([6,5]);ctx.strokeStyle=col;ctx.beginPath();ctx.moveTo(L,Y(y));ctx.lineTo(L+PW,Y(y));ctx.stroke();ctx.setLineDash([]);ctx.textAlign='right';ctx.fillStyle=col;ctx.fillText(label,L+PW-6,Math.max(T+15,Y(y)-8));}
for(const [x,label,col] of R.vertical){ctx.setLineDash([5,5]);ctx.strokeStyle=col;ctx.beginPath();ctx.moveTo(X(x),Y(ymax));ctx.lineTo(X(x),Y(ymin));ctx.stroke();ctx.setLineDash([]);ctx.textAlign='left';ctx.fillStyle=col;ctx.fillText(label,Math.max(L+2,Math.min(L+PW-85,X(x)+5)),T+18);}
for(const c of R.curves){ctx.strokeStyle=c.color;ctx.lineWidth=2.5;ctx.beginPath();let prev=null;for(let i=0;i<=PW*2;i++){let x=xmin+(xmax-xmin)*i/(PW*2),y=c.fn(x),py=Y(y),px=X(x);if(!Number.isFinite(py)){prev=null;continue;}if(prev===null||Math.abs(py-prev)>PH*.45)ctx.moveTo(px,py);else ctx.lineTo(px,py);prev=py;}ctx.stroke();}
for(const [x1,y1,x2,y2,col] of R.segments){ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(X(x1),Y(y1));ctx.lineTo(X(x2),Y(y2));ctx.stroke();ctx.setLineDash([]);}
for(const p of R.points){ctx.fillStyle=p.color;ctx.strokeStyle='white';ctx.lineWidth=2;ctx.beginPath();ctx.arc(X(p.x),Y(p.y),5.5,0,Math.PI*2);ctx.fill();ctx.stroke();if(p.label){ctx.textAlign='left';ctx.fillStyle=p.color;ctx.fillText(p.label,Math.max(L+3,Math.min(L+PW-75,X(p.x)+9)),Math.min(B-8,Math.max(T+18,Y(p.y)-10)));}}
ctx.restore();if(R.invalid){ctx.fillStyle='#be123c';ctx.textAlign='center';ctx.fillText('目前參數不符合原題定義域',W/2,H-70);}
}
$('modes').addEventListener('click',e=>{let b=e.target.closest('[data-mode]');if(!b)return;stop();mode=b.dataset.mode;for(let el of $('modes').children){el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',String(el===b));}setup();});
$('range').addEventListener('input',e=>{stop();setValue(Number(e.target.value));});
$('num').addEventListener('change',e=>{stop();if(e.target.value===''){update();return;}setValue(Number(e.target.value));});
$('presets').addEventListener('click',e=>{let b=e.target.closest('[data-value]');if(b){stop();setValue(Number(b.dataset.value));}});
$('reset').onclick=()=>{stop();setup();};
$('logScale').onchange=update;
$('play').onclick=()=>{if(playing){stop();return;}const c=config(QUESTIONS[index].id,mode);if(value>=c.max-1e-8)value=c.min;playing=true;lastTime=0;$('play').textContent='Ⅱ 暫停';$('play').setAttribute('aria-pressed','true');const startValue=value;let started=0;function tick(t){if(!playing)return;if(!started)started=t;let raw=startValue+(t-started)/14000*(c.max-c.min);value=Math.min(c.max,raw);if(QUESTIONS[index].id==='f10')value=Math.floor(value*2+1e-8)/2;update();if(raw>=c.max){value=c.max;update();stop();}else frame=requestAnimationFrame(tick);}frame=requestAnimationFrame(tick);};
$('nextStep').onclick=()=>{const items=[...$('steps').children],next=items.find(d=>!d.open);if(next){next.open=true;next.scrollIntoView({block:'nearest'});}else $('answerDetails').open=true;};
$('allSteps').onclick=()=>{for(let d of $('steps').children)d.open=true;$('answerDetails').open=true;};
$('hideSteps').onclick=()=>{for(let d of $('steps').children)d.open=false;$('answerDetails').open=false;};
$('print').onclick=()=>{stop();for(let d of $('steps').children)d.open=true;$('answerDetails').open=true;window.print();};
$('note').addEventListener('input',()=>{let id=QUESTIONS[index].id;saved[id]={...saved[id],note:$('note').value};save();});
$('mastered').onclick=()=>{let id=QUESTIONS[index].id;saved[id]={...saved[id],done:!saved[id]?.done};save();markButton();nav();};
$('check').onclick=()=>{let q=QUESTIONS[index],chosen=[...$('checks').querySelectorAll('input:checked')].map(c=>c.value),errors=letters.filter(l=>chosen.includes(l)!==q.answer.includes(l)).length,score=chosen.length===0?0:errors===0?8:errors===1?5:errors===2?2:0;$('feedback').textContent=chosen.length===0?'尚未選答，依原卷為0分。':errors===0?'全部判斷正確，8分。請再用詳解核對理由。':'有'+errors+'個選項判斷不同，依原卷為'+score+'分。可切換選項模型，再看分步說明。';};
$('prev').onclick=()=>{if(index>0)location.hash=QUESTIONS[index-1].id;};
$('next').onclick=()=>{if(index<QUESTIONS.length-1)location.hash=QUESTIONS[index+1].id;};
window.addEventListener('hashchange',()=>{let i=QUESTIONS.findIndex(q=>q.id===location.hash.slice(1));selectQuestion(i<0?0:i,true);});
window.addEventListener('resize',()=>update());
window.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
$('answers').innerHTML=QUESTIONS.map(q=>'<tr><td><a href="#'+q.id+'">'+label(q)+'</a></td><td>'+esc(q.title)+'</td><td>'+esc(q.answer)+'</td></tr>').join('');
selectQuestion(Math.max(0,QUESTIONS.findIndex(q=>q.id===location.hash.slice(1))));
