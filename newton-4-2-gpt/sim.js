"use strict";
const panel=document.querySelector(".sim");
const id=Number(panel.dataset.scene);
const canvas=panel.querySelector("canvas");
const ctx=canvas.getContext("2d");
const controls=[...panel.querySelectorAll("input,select")];
const time=panel.querySelector("[name=time]");
const play=document.querySelector("#play");
const reveal=document.querySelector("#reveal");
const metrics=document.querySelector("#metrics");
const g=9.8;
const ink="#eaf4fc", gray="#96adbf", grid="#294050", teal="#8de6df", amber="#ffdc8c", red="#ff9e96", rope="#d4b5ff";
const dark="#0b1925", blueBox="#285467", warmBox="#665036";
const fmt=(v,d=2)=>Number(v.toFixed(d)).toString();
const east=a=>Math.abs(a)<1e-8?"靜止":a>0?"向右":"向左";
const vertical=a=>Math.abs(a)<1e-8?"零":a>0?"向上":"向下";
const clamp=(x,min,max)=>Math.min(max,Math.max(min,x));
let active=false,shown=false,frame=0,elapsed=0;
function line(x,y,u,v,color=gray,w=2){
  ctx.strokeStyle=color;ctx.lineWidth=w;
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(u,v);ctx.stroke();
}
function path(points,color,w=2,fill=null){
  ctx.beginPath();ctx.moveTo(...points[0]);
  for(const p of points.slice(1))ctx.lineTo(...p);
  if(fill){ctx.closePath();ctx.fillStyle=fill;ctx.fill();}
  ctx.strokeStyle=color;ctx.lineWidth=w;ctx.stroke();
}
function text(word,x,y,color=ink,size=21,alignment="center"){
  ctx.font=size+"px Microsoft JhengHei, system-ui, sans-serif";ctx.fillStyle=color;
  ctx.textAlign=alignment;ctx.textBaseline="middle";ctx.fillText(word,x,y);
}
function box(x,y,w,h,name,fill=blueBox){
  ctx.fillStyle=fill;ctx.fillRect(x,y,w,h);
  ctx.strokeStyle=gray;ctx.lineWidth=1.5;ctx.strokeRect(x,y,w,h);
  if(name)text(name,x+w/2,y+h/2,ink,19);
}
function circle(x,y,r,color=dark,edge=gray){
  ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
  ctx.lineWidth=2;ctx.strokeStyle=edge;ctx.stroke();
}
function arc(x,y,r,start,end,color=rope,w=2.6){
  ctx.beginPath();ctx.arc(x,y,r,start,end);ctx.strokeStyle=color;ctx.lineWidth=w;ctx.stroke();
}
function floor(x,y,end){
  line(x,y,end,y,gray,3);
  for(let p=x+5;p<end-7;p+=14)line(p,y+7,p+7,y,grid,1.5);
}
function arrow(x,y,dx,dy,name,color=teal){
  const norm=Math.hypot(dx,dy);
  if(norm<2)return;
  const h=Math.min(9,norm*.5),ux=dx/norm,uy=dy/norm,X=x+dx,Y=y+dy;
  line(x,y,X,Y,color,2.5);
  path([[X,Y],[X-h*ux-h*.55*uy,Y-h*uy+h*.55*ux],[X-h*ux+h*.55*uy,Y-h*uy-h*.55*ux]],color,1,color);
  if(name)text(name,X+(Math.abs(ux)>.5?(ux>0?9:-9):8),Y+(uy<-.5?-8:uy>.5?8:-12),color,17,Math.abs(ux)>.5?(ux>0?"left":"right"):"left");
}
function human(x,y,handX,handY){
  circle(x,y-50,10,ink,ink);
  path([[x,y-39],[x,y-19],[x-10,y],[x,y-19],[x+13,y]],ink,3);
  path([[x,y-34],[handX,handY]],ink,3);
}
function background(){
  ctx.fillStyle=dark;ctx.fillRect(0,0,600,350);
  ctx.fillStyle=grid;
  for(let x=14;x<600;x+=20)for(let y=15;y<350;y+=20)ctx.fillRect(x,y,1.5,1.5);
}
const models=[
  ({m,h})=>({a:h*g/m,b:h*g/(m+h),t1:h*g,t2:m*h*g/(m+h)}),
  ({m,a})=>({mass:m*(g-a)/(g+a),drop:2*m*a/(g+a),lift:m*(g-a)}),
  ({a,limit})=>({requested:20*(10-a),holds:20*(10-a)<=limit+1e-8,min:Math.max(0,10-limit/20),actual:20*(10-a)<=limit+1e-8?a:10}),
  ({m,f,theta})=>{const r=theta*Math.PI/180,N=f/(2*Math.sin(r)),normal=m*g-N*Math.cos(r);return {r,N,normal,a:f/(2*m),holds:normal>=-1e-8};},
  ({m,n,f,mu})=>{const a=f/(m+n),N=n*a,cap=mu*N,holds=cap>=n*g-1e-8;return {a,N,cap,holds,limit:(m+n)*g/mu,down:holds?0:g-.8*mu*a};},
  ({m,n,f,mu,side})=>{const cap=mu*m*g,pulled=side?m:n,other=side?n:m,limit=(m+n)*cap/other,holds=f<=limit+1e-8,friction=holds?other*f/(m+n):.8*cap;
    return {cap,limit,holds,friction,maxA:cap/other,A:holds?f/(m+n):side?(f-friction)/pulled:friction/other,B:holds?f/(m+n):side?friction/other:(f-friction)/pulled};},
  ({n,m})=>({a:n*g/3,T:(9-n*n)*m*g/3,ratio:1-n*n/9}),
  ({m,n})=>{const a=(2*n-m)*g/(m+4*n),Tb=3*m*n*g/(m+4*n);return {a,Tb,Ta:2*Tb};},
  ({m,n,a})=>{const T=(m+n)*(g+a)/3,N=(2*m-n)*(g+a)/3;return {T,N,holds:N>=0};},
  ({time:t,a,m})=>{const after=Math.max(0,t-10),v=t<5?a*t:t<10?5*a:Math.max(0,5*a-a*after),y=t<5?.5*a*t*t:t<10?12.5*a+5*a*(t-5):37.5*a+5*a*after-.5*a*after*after,acc=t<5?a:t<10?0:t<15?-a:0;return {v,y,acc,reading:m*(1+acc/g),total:50*a};}
];
function drawPull(s,z,t){
  const scale=65/Math.max(1,z.a,z.b);
  for(let i=0;i<2;i++){
    const X=20+300*i,py=131,px=X+219,h=i?z.b:z.a,dx=scale*h*t*t/4;
    text(i?"圖二　掛砝碼":"圖一　定力拉",X+130,44,ink,23);
    floor(X+13,146,px);
    box(X+24+dx,106,70,40,fmt(s.m)+" kg");
    circle(px,py,14);
    line(X+94+dx,py-14,px,py-14,rope,2.6);arc(px,py,14,-Math.PI/2,0);
    line(px+14,py,px+14,206+dx,rope,2.6);
    if(i)box(px-12,206+dx,52,42,fmt(s.h)+" kg",warmBox);
    else {arrow(px+14,206+dx,0,31,"",amber);text(fmt(s.h)+" kgw",px-8,260+dx,amber,18,"right");}
    if(shown)arrow(X+90+dx,91,35,0,"T");
  }
  return "圖一 a₁＝"+fmt(z.a)+" m/s²，T₁＝"+fmt(z.t1)+" N　｜　圖二 a₂＝"+fmt(z.b)+" m/s²，T₂＝"+fmt(z.t2)+" N　｜　a₁/a₂＝"+fmt(z.a/z.b);
}
function drawBalloon(s,z,t){
  const cut=.7,dt=t-cut;
  const d=t<cut?.5*s.a*t*t:.5*s.a*cut*cut+s.a*cut*dt-.5*s.a*dt*dt;
  const y=110+d*33,after=t>=cut;
  ctx.beginPath();ctx.ellipse(264,y,52,39,0,0,Math.PI*2);ctx.fillStyle=blueBox;ctx.fill();ctx.strokeStyle=teal;ctx.lineWidth=2;ctx.stroke();
  line(264,y+39,264,y+73,rope,3);box(225,y+73,78,33,after?"剩餘載重":"原載重");
  if(after){const dropY=y+110+Math.min(114,34*dt+105*dt*dt);if(dropY<326)box(310,dropY,52,25,"Δm",warmBox);}
  if(shown){
    arrow(180,y,0,-44,"浮力",teal);
    arrow(180,y+17,0,after?32:54,"重力",amber);
    const v=after?s.a*(cut-dt):s.a*t;
    arrow(394,y+33,0,Math.abs(v)<.04?0:Math.sign(v)*35,"v",rope);
    text(after?"拋載後｜加速度向上":"拋載前｜加速度向下",409,48,teal,19);
  }
  return "浮力＝"+fmt(z.lift)+" N　｜　拋棄 Δm＝"+fmt(z.drop)+" kg　｜　剩餘 "+fmt(z.mass)+" kg　｜　"+(after?"拋載後 a 向上":"拋載前 a 向下");
}
function drawRope(s,z,t){
  const y=116+z.actual*t*t*3.4;
  floor(160,41,435);
  line(272,41,272,z.holds||t===0?y-9:83,rope,3);
  if(!z.holds&&t>0)line(272,y-18,272,y-38,rope,3);
  human(289,y+49,272,y-10);
  circle(301,y-3,4,ink,ink);arc(309,y+30,13,-Math.PI*.8,Math.PI*.64,ink,2);
  if(shown){
    arrow(187,y,0,51,"mg",amber);
    if(z.holds)arrow(187,y-6,0,-44,"T",teal);
    text(z.holds?"繩張力在負荷範圍內":"超載：斷繩示意",404,81,z.holds?teal:red,20);
  }
  return "所需張力 "+fmt(z.requested)+" N　｜　上限 "+fmt(s.limit)+" N　｜　最小向下 a＝"+fmt(z.min)+" m/s²　｜　"+(z.holds?"繩保持完整":"超載，斷繩模型 a＝10 m/s² 向下");
}
function drawContact(s,z,t){
  const dx=z.holds?z.a*t*t*102/Math.max(24,4*z.a):0,x=108+dx,edge=310+dx,h=90,off=h/Math.tan(z.r),y=241;
  const rp=edge-off;
  floor(29,y,572);
  path([[x,y],[x,y-h],[rp,y-h],[edge,y]],gray,2,blueBox);
  path([[rp,y-h],[407+dx,y-h],[407+dx,y],[edge,y]],gray,2,warmBox);
  text("A",x+(rp-x)/2+16,y-42);text("B",370+dx,y-43);
  text("θ",edge-41,y-13,amber,17);arrow(x-52,y-43,46,0,"",amber);text("F",x-43,y-64,amber,19);
  if(shown){
    const ox=(rp+edge)/2,oy=y-h/2,ax=65*Math.sin(z.r),ay=-65*Math.cos(z.r);
    arrow(ox,oy,ax,ay,"N");
    line(ox+ax,oy,ox+ax,oy+ay,rope);line(ox,oy,ox+ax,oy,rope);
    text("N sin θ",ox+50,oy+23,rope,17);
    if(!z.holds)text("右塊離地臨界已超過，暫停共同運動模型",300,68,red,20);
  }
  return "共同運動試算 a＝"+fmt(z.a)+" m/s²　｜　接觸 N＝"+fmt(z.N)+" N　｜　"+(z.holds?"B 受地面支持 "+fmt(Math.max(0,z.normal))+" N":"所需地面支持力為負，共同運動不成立");
}
function drawSide(s,z,t){
  const impact=z.down>0?Math.sqrt(1.5/z.down):Infinity;
  const p=Math.min(t,impact),dx=z.a*p*p*(125/Math.max(4,2*z.a)),drop=(p*p*.5*z.down)*100;
  const x=102+dx,y=271;
  floor(32,y,564);box(x,y-118,112,118,"m₁");box(x+112,y-124+drop,66,49,"m₂",warmBox);
  arrow(x-52,y-53,46,0,"",amber);text("F",x-49,y-72,amber,19);
  if(shown){
    arrow(x+146,y-103+drop,38,0,"N");
    arrow(x+146,y-106+drop,0,-37,z.holds?"fₛ":"fₖ",rope);
    if(!z.holds)text(t>=impact?"落地：接觸前這段模擬結束":"m₂ 無法維持高度",300,57,red,20);
  }
  return "F 臨界＝"+fmt(z.limit)+" N　｜　N＝"+fmt(z.N)+" N　｜　需 f＝"+fmt(s.n*g)+" N，靜摩擦上限＝"+fmt(z.cap)+" N　｜　"+(z.holds?"維持高度":"向下滑");
}
function drawStack(s,z,t){
  const scale=31 / Math.max(1,z.A,z.B);
  const maxTime=Math.sqrt(105/(scale*Math.max(1e-8,Math.abs(z.A-z.B))));
  const p=Math.min(t,maxTime);
  const xa=218+.5*z.A*p*p*scale,xb=148+.5*z.B*p*p*scale,y=265;
  floor(24,y,574);box(xb,y-52,223,52,"B（M）");box(xa,y-103,82,51,"A（m）",warmBox);
  const X=s.side?xa+82:xb+223,ay=s.side?y-79:y-25;
  arrow(X,ay,41,0,"F",amber);
  if(shown && z.friction>0){
    arrow(xa+41,y-125,s.side?-34:34,0,"f",rope);
    arrow(xb+115,y+23,s.side?34:-34,0,"f",rope);
  }
  return "不滑動的 F 上限＝"+fmt(z.limit)+" N，共同 a 上限＝"+fmt(z.maxA)+" m/s²　｜　"+(z.holds?"同步":"相對滑動")+"：aA＝"+fmt(z.A)+"，aB＝"+fmt(z.B)+" m/s²"+(t>=maxTime?"（滑至模型邊界）":"");
}

function drawFixed(s,z,t){
  for(let i=0;i<2;i++){
    const x=150+300*i,py=100,r=48,count=i?s.n:0,d=i?z.a*t*t*1.25:0;
    text(i?"改掛後":"原先平衡",x,44,ink,23);
    line(x,66,x,py,gray,3);circle(x,py,r);arc(x,py,r,Math.PI,2*Math.PI);
    for(const side of [-1,1]){
      const X=x+side*r,Y=171-side*d,n=3-side*count;
      line(X,py,X,Y,rope,2.6);
      for(let j=0;j<n;j++)box(X-18,Y+j*20,36,19,"",side<0?blueBox:warmBox);
      text(n+" 塊",X,Y+n*20+17,ink,17);
      if(shown)arrow(X+(side<0?-46:47),Y+10,0,-34,"T",teal);
    }
  }
  return "原張力 T₀＝"+fmt(3*s.m*g)+" N　｜　改掛後 T＝"+fmt(z.T)+" N，T/T₀＝"+fmt(z.ratio,3)+"　｜　a＝"+fmt(z.a)+" m/s²";
}
function drawMovable(s,z,t){
  const up=z.a*t*t*2.1,p=188-up,other=221+2*up;
  floor(136,39,463);line(296,39,296,90,gray,2);
  circle(296,92,23);circle(250,p,23);
  line(227,39,227,p,rope,2.6);arc(250,p,23,0,Math.PI);
  line(273,p,273,92,rope,2.6);arc(296,92,23,Math.PI,2*Math.PI);
  line(319,92,319,other,rope,2.6);
  line(250,p,250,p+48,amber,3);box(222,p+48,56,37,"m₁");box(291,other,56,37,"m₂",warmBox);
  text("繩 A",191,p+43,amber,17);text("繩 B",367,143,rope,17);
  if(shown){
    arrow(211,p+74,0,-34,"Tₐ");
    arrow(369,other+22,0,-34,"Tᵦ");
  }
  return "Tₐ＝"+fmt(z.Ta)+" N　Tʙ＝"+fmt(z.Tb)+" N　｜　m₁："+fmt(Math.abs(z.a))+" m/s² "+vertical(z.a)+"　m₂："+fmt(Math.abs(2*z.a))+" m/s² "+vertical(-z.a);
}
function drawPerson(s,z,t){
  const up=z.holds?s.a*t*t*1.4:0,y=285-up,p=146-up,handY=204+2*up;
  floor(164,35,470);
  circle(286,79,22);circle(330,p,22);
  line(286,35,286,79,gray,3);line(352,35,352,p,rope,2.6);arc(330,p,22,0,Math.PI);
  line(308,p,308,79,rope,2.6);arc(286,79,22,Math.PI,2*Math.PI);
  line(264,79,264,handY,rope,2.6);circle(264,handY,4,amber,amber);
  path([[331,p],[331,y-74],[218,y]],gray,2);line(331,y-74,427,y,gray,2);
  box(206,y,233,18,"");
  human(283,y,264,handY);
  if(shown){
    arrow(373,p+17,0,-43,"2T");
    arrow(225,handY,0,-41,"T");
    if(z.holds&&z.N>0)arrow(283,y-2,0,-37,"N",amber);
    if(!z.holds)text("無法維持人和平台接觸並共同上升",300,324,red,20);
  }
  return "拉繩力 T＝"+fmt(z.T)+" N　｜　"+(z.holds?"支持力 N＝"+fmt(z.N)+" N"+(z.N===0?"（臨界接觸）":""):"共同運動需負支持力，模型不成立");
}
function drawLift(s,z,t){
  const y=223-z.y/z.total*150;
  line(69,44,69,298,gray,3);line(253,44,253,298,gray,3);
  box(86,y,150,89,"","#1a3241");
  box(126,y+75,78,14,"",warmBox);
  human(164,y+74,178,y+42);
  if(shown){
    const maxV=5*s.a,ox=324,oy=260,W=216,H=117;
    text("秤讀數 "+fmt(z.reading)+" kg",160,326,teal,19);
    arrow(ox,oy,W+12,0,"t（s）",gray);arrow(ox,oy,0,-H-28,"v（m/s）",gray);
    const X=t2=>ox+W*t2/15,Y=v=>oy-H*v/maxV;
    const area=[[X(0),Y(0)],...[5,10].filter(k=>k<t).map(k=>[X(k),Y(maxV)]),[X(t),Y(z.v)],[X(t),Y(0)]];
    if(t>0)path(area,blueBox,1,blueBox);
    path([[ox,oy],[X(5),Y(maxV)],[X(10),Y(maxV)],[X(15),oy]],teal,2.5);
    circle(X(t),Y(z.v),5,amber,amber);
    for(const t2 of [0,5,10,15])text(String(t2),X(t2),oy+23,gray,16);
    text(fmt(maxV),ox-8,Y(maxV),gray,16,"right");
    arrow(213,y+63,0,-32,"",teal);
  }else{
    text("0–5 s",411,115,gray);text("5–10 s",411,158,gray);text("10–15 s",411,201,gray);
  }
  return "t＝"+fmt(t)+" s　｜　秤讀數 "+fmt(z.reading)+" kg　｜　a＝"+fmt(z.acc)+" m/s²，v＝"+fmt(z.v)+" m/s　｜　累計距離 "+fmt(z.y)+" m";
}
const scenes=[drawPull,drawBalloon,drawRope,drawContact,drawSide,drawStack,drawFixed,drawMovable,drawPerson,drawLift];
function read(){return Object.fromEntries(controls.map(el=>[el.name,Number(el.value)]));}
function draw(){
  const s=read();s.time=elapsed;
  background();
  const result=scenes[id](s,models[id](s),elapsed);
  if(shown)metrics.textContent=result;
  for(const el of controls)if(el.type==="range")el.closest("label").querySelector("output").value=fmt(s[el.name]);
}
function setShown(value){
  shown=value;metrics.hidden=!value;
  reveal.setAttribute("aria-pressed",String(value));
  reveal.textContent=value?"隱藏受力與讀值":"顯示受力與讀值";
}
function halt(){
  active=false;
  if(frame)cancelAnimationFrame(frame);
  frame=0;
  play.textContent="播放動畫";
}
function start(){
  const total=Number(time.max),startTime=elapsed>=total?0:elapsed;
  const clock=performance.now(),duration=id===9?9000:4500;
  active=true;play.textContent="暫停動畫";
  function tick(now){
    elapsed=clamp(startTime+(now-clock)*total/duration,0,total);time.value=String(elapsed);
    draw();
    if(elapsed>=total){halt();return;}
    frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);
}
for(const el of controls)el.addEventListener("input",()=>{
  halt();
  elapsed=el===time?Number(time.value):0;
  time.value=String(elapsed);
  draw();
});
play.addEventListener("click",()=>active?halt():start());
reveal.addEventListener("click",()=>{setShown(!shown);draw();});
document.querySelector("#reset").addEventListener("click",()=>{
  halt();
  for(const el of controls){
    if(el.type==="range")el.value=el.defaultValue;
    else el.selectedIndex=[...el.options].findIndex(o=>o.defaultSelected);
  }
  elapsed=0;setShown(false);draw();
});
draw();
