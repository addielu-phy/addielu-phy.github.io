"use strict";
const panel = document.querySelector(".sim");
const example = Number(panel.dataset.example);
const canvas = panel.querySelector("canvas");
const ctx = canvas.getContext("2d");
const controls = [...panel.querySelectorAll("input, select")];
const play = document.querySelector("#play");
const show = document.querySelector("#show");
const metrics = document.querySelector("#metrics");
const C = { blue:"#78cbff", purple:"#d7a5ff", gold:"#ffd678", coral:"#ff9c83", white:"#edf4ff", muted:"#adbed5", line:"#49607e" };
const TAU = 2 * Math.PI;
const originalZ = Math.sqrt(3);
let state, visible = false, frame = 0, playing = false;
function resetState() {
  state = Object.fromEntries(controls.map(el => [el.name, Number(el.value)]));
  if (example === 2) state.z = originalZ;
}
function line(x,y,X,Y,color=C.line,dash=[]) {
  ctx.beginPath();
  ctx.setLineDash(dash); ctx.strokeStyle=color; ctx.lineWidth=1.6;
  ctx.moveTo(x,y); ctx.lineTo(X,Y); ctx.stroke(); ctx.setLineDash([]);
}
function label(text,x,y,color=C.white,align="left",size=18) {
  ctx.fillStyle=color; ctx.font=size+"px Microsoft JhengHei, system-ui, sans-serif";
  ctx.textAlign=align; ctx.textBaseline="middle"; ctx.fillText(text,x,y);
}
function dot(x,y,r,fill,stroke) {
  ctx.beginPath(); ctx.arc(x,y,r,0,TAU);
  ctx.fillStyle=fill; ctx.fill();
  if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}
}
function arrow(x,y,dx,dy,color,caption="") {
  const length=Math.hypot(dx,dy);
  if(length<1) return;
  const u=dx/length,v=dy/length,head=Math.min(11,length*.65),X=x+dx,Y=y+dy;
  line(x,y,X,Y,color);
  ctx.beginPath();ctx.fillStyle=color;ctx.moveTo(X,Y);
  ctx.lineTo(X-head*u+head*.5*v,Y-head*v-head*.5*u);
  ctx.lineTo(X-head*u-head*.5*v,Y-head*v+head*.5*u);
  ctx.closePath();ctx.fill();
  if(caption) label(caption,X+(dx<0?-7:7),Y+(dy<0?-9:9),color,dx<0?"right":"left",16);
}
function charge(x,y,name,positive) {
  const color=positive?C.coral:C.blue;
  dot(x,y,24,positive?"#552b32":"#173d61",color); label(name,x,y,color,"center",21);
}
function number(n,digits=3) { return Number(n.toFixed(digits)).toString(); }
function grid() {
  ctx.fillStyle="#0a1527";ctx.fillRect(0,0,600,350);
  ctx.fillStyle="#223751";
  for(let x=20;x<600;x+=20) for(let y=20;y<350;y+=20) ctx.fillRect(x,y,1.5,1.5);
}
function pairModel(x,sign) {
  const scale=(1+x*x)**(-1.5);
  return { first:[scale,x*scale], second:[-sign*scale,sign*x*scale], total:[(1-sign)*scale,(1+sign)*x*scale] };
}
function pair() {
  const {x,sign}=state, {first,second,total}=pairModel(x,sign);
  const y=272-70*x;
  line(106,272,494,272);line(300,300,300,36,C.line,[6,6]);
  line(185,272,300,y,C.line,[4,5]);line(415,272,300,y,C.line,[4,5]);
  charge(185,272,"+q",true);charge(415,272,sign>0?"+q":"−q",sign>0);
  label("O",300,298,C.muted,"center");label("L",242,294,C.muted,"center");label("L",358,294,C.muted,"center");
  if(visible){
    arrow(300,y,first[0]*91,-first[1]*91,C.blue,"E₁");
    arrow(300,y,second[0]*91,-second[1]*91,C.purple,"E₂");
    arrow(300,y,total[0]*91,-total[1]*91,C.gold,"E");
    if(Math.hypot(...total)<1e-8) label("E = 0",300,y-29,C.gold,"center");
  }
  dot(300,y,5,C.white); label("P",288,y-17,C.white,"right");
  return "合電場分量　E水平 = "+number(total[0])+"，E垂直 = "+number(total[1])+"（kq/L²）";
}
function ringField(z){return z/Math.pow(1+z*z,1.5);}
function ring() {
  const {z,angle}=state, f=ringField(z), theta=angle*Math.PI/180;
  const cx=156,cy=183,px=cx+z*104;
  line(75,cy,542,cy,C.line,[6,6]);label("圓環中心軸",545,209,C.muted,"right");
  ctx.beginPath();ctx.ellipse(cx,cy,42,107,0,0,TAU);ctx.strokeStyle=C.coral;ctx.lineWidth=2;ctx.stroke();
  for(let i=0;i<12;i++){
    const t=i*TAU/12;
    label("+",cx+42*Math.cos(t),cy+107*Math.sin(t),C.coral,"center",18);
  }
  label("O",cx,204,C.muted,"center");label("R",cx-14,116,C.muted,"right");
  line(cx,cy,cx,81,C.line,[4,4]);
  for(let i=0;i<2;i++){
    const sign=i===0?1:-1, x=cx+sign*42*Math.cos(theta), y=cy+sign*107*Math.sin(theta);
    const color=i===0?C.blue:C.purple;
    dot(x,y,6,color);line(x,y,px,cy,color,[4,5]);
    if(visible){
      const axial=67*z/Math.sqrt(1+z*z);
      const radial=67/Math.sqrt(1+z*z);
      arrow(px,cy,axial-sign*radial*.39*Math.cos(theta),-sign*radial*Math.sin(theta),color);
    }
  }
  if(visible) arrow(px,cy,f*210,0,C.gold,"E");
  dot(px,cy,5,C.white);label("P",px,cy-20,C.white,"center");
  return "z/R = "+(Math.abs(z-originalZ)<1e-9?"√3":number(z,2))+"　全環軸向電場 = "+number(f,5)+" kQ/R²";
}
const b=2,c=2.65;
function shellField(r,ratio) {
  if(r<1 || (r>=b && r<c)) return 0;
  return r<b ? 1/(r*r) : (1+ratio)/(r*r);
}
function shell(){
  const {r,ratio}=state,s=34,cx=154,cy=167;
  dot(cx,cy,c*s,"#354c68",C.muted);dot(cx,cy,b*s,"#0d1a2f",C.blue);dot(cx,cy,s,"#633b42",C.coral);
  label("a",cx-4,cy-s-9,C.coral,"right");label("b",cx-4,cy-b*s-8,C.blue,"right");
  label("c",cx+8,cy-c*s-7,C.muted,"left");line(cx,cy,cx+144,cy,C.muted,[4,4]);
  const value=shellField(r,ratio), surface=[1,b,c].find(x=>Math.abs(r-x)<1e-8);
  if(visible){
    const ox=337,oy=267,width=220,height=158,ymax=Math.max(1.15,(1+ratio)/(c*c)*1.08);
    const X=u=>ox+width*u/4, Y=u=>oy-height*u/ymax;
    arrow(ox,oy,width+6,0,C.muted,"r/a");arrow(ox,oy,0,-height-8,C.muted,"E");
    for(const v of [1,b,c]){
      line(X(v),oy,X(v),oy-height,C.line,[5,5]);
      label(v===1?"a":v===b?"b":"c",X(v),oy+20,C.muted,"center",16);
    }
    const ranges=[[0,1,()=>0],[1,b,u=>1/u**2],[b,c,()=>0],[c,4,u=>(1+ratio)/u**2]];
    for(const [lo,hi,fn] of ranges){
      let prev=lo;
      for(let i=1;i<=40;i++){
        const u=lo+(hi-lo)*i/40;line(X(prev),Y(fn(prev)),X(u),Y(fn(u)),C.gold);prev=u;
      }
    }
    line(X(r),oy,X(r),oy-height,C.blue,[3,4]);
    if(surface===undefined){dot(X(r),Y(value),5,C.blue);arrow(cx+r*s,cy,Math.min(value*64,48),0,C.gold);}
    else for(const side of [-1,1]) dot(X(r),Y(shellField(surface+side*1e-7,ratio)),4,"#0a1527",C.blue);
    label("E–r 圖",440,72,C.white,"center");
  }else{
    label("內球：+q₁",340,121,C.coral);
    label("球殼淨電量：+q₂",340,159,C.blue);
    label("探測點沿半徑移動",340,197,C.muted);
  }
  dot(cx+r*s,cy,5,C.white);label("P",cx+r*s,cy-18,C.white,"center");
  return surface===undefined ? "E = "+number(value)+" kq₁/a²"+(value>0?"，徑向向外":"") :
    "表面兩側　內側 "+number(shellField(surface-1e-7,ratio))+"，外側 "+number(shellField(surface+1e-7,ratio))+"（kq₁/a²）";
}
function plateModel({distance,field,charge,mass,time}){
  const a=charge*1e-6*field/(mass*1e-3),total=Math.sqrt(2*distance/a),t=total*time/100;
  return {a,total,t,position:.5*a*t*t,velocity:a*t};
}
function plates(){
  const model=plateModel(state), {distance,time}=state;
  const left=65,right=left+175+distance*650,y=179,span=right-left;
  const x=left+span*(time/100)**2;
  for(let i=0;i<2;i++){
    const pos=i===1,X=pos?right:left,color=pos?C.coral:C.blue;
    ctx.fillStyle=pos?"#633b42":"#173d61";ctx.fillRect(X-7,66,14,222);
    for(let j=0;j<6;j++) label(pos?"+":"−",X+(pos?22:-22),87+j*36,color,"center",22);
  }
  line(left,306,right,306,C.muted);label("d = "+number(distance,2)+" m",(left+right)/2,325,C.muted,"center");
  for(let i=1;i<=10 && i<=time/10+1e-8;i++) dot(left+span*(i/10)**2,y,3,C.purple);
  if(visible){
    arrow(right-17,101,-span+34,0,C.coral);label("電場 E",(left+right)/2,80,C.coral,"center",17);
    arrow(x,y+39,40,0,C.blue,"電力");
    if(time>0) arrow(x,y-28,12+time*.46,0,C.gold,"v");
  }
  dot(x,y,11,"#244d70",C.blue);label("−",x,y,C.white,"center",18);
  return "a = "+number(model.a)+" m/s²　t = "+number(model.t)+" / "+number(model.total)+" s　位移 = "+number(model.position)+" m　v = "+number(model.velocity)+" m/s";
}
function shieldField(d,probe) {const external=-1/(d+probe)**2;return [external,-external];}
function shield(){
  const {d,probe}=state, cx=365,cy=175,scale=85,x=cx+scale*probe;
  line(84,cy,520,cy,C.line,[6,6]);dot(cx,cy,scale,"#394b65",C.muted);dot(cx,cy,scale*.76,"#101c30",C.line);
  charge(cx-scale*d,cy,"−Q",false);
  for(let i=0;visible && i<12;i++){
    const t=i*TAU/12+Math.PI/12,positive=Math.cos(t)<0;
    label(positive?"+":"−",cx+97*Math.cos(t),cy+97*Math.sin(t),positive?C.coral:C.blue,"center",18);
  }
  label("O",cx,cy+21,C.muted,"center");
  const [external,induced]=shieldField(d,probe);
  if(visible){
    const width=115*Math.abs(external);
    arrow(x,cy-30,-width,0,C.coral);label("外部電荷",54,286,C.coral);
    arrow(x,cy+30,width,0,C.blue);label("感應電荷",54,314,C.blue);
    label("空腔淨場 = 0",514,302,C.gold,"right");
  }
  dot(x,cy,5,C.white);label("P",x,cy-13,C.white,"center",17);
  return "外部電荷 "+number(Math.abs(external))+" 向左　感應電荷 "+number(induced)+" 向右　合場 0（kQ/R²）";
}
const scenes=[null,pair,ring,shell,plates,shield];
function draw(){
  grid();
  const result=scenes[example]();
  if(visible) metrics.textContent=result;
  for(const el of controls){
    const out=document.getElementById(el.name+"-value");
    if(out) out.value=el.name==="z" && state.z===originalZ ? "√3" : number(state[el.name],2);
    if(el.type==="range") el.value=String(state[el.name]);
  }
}
function setVisible(value){
  visible=value;show.setAttribute("aria-pressed",String(value));
  show.textContent=(value?"隱藏":"顯示")+(example===4?"向量與讀值":"電場與讀值");
  metrics.hidden=!value;
}
function stop(){
  if(frame) cancelAnimationFrame(frame);
  frame=0;playing=false;play.textContent="播放動畫";
}
function start(){
  const key=[null,"x","angle","r","time","probe"][example], el=controls.find(input=>input.name===key);
  const lo=Number(el.min), hi=Number(el.max);
  const initial=example===4 && state.time>=100 ? 0 : state[key];
  const duration=example===4 ? 3500 : 5200;
  const began=performance.now();
  playing=true;play.textContent="暫停動畫";setVisible(true);
  function tick(now){
    const elapsed=(now-began)/duration;
    if(example===4){
      state.time=Math.min(100,initial+100*elapsed);
      draw();
      if(state.time>=100){stop();return;}
    }else{
      const u=(initial-lo)/(hi-lo)+elapsed;
      state[key]=key==="angle" ? lo+(hi-lo)*(u%1) : lo+(hi-lo)*(1-Math.abs((u%2)-1));
      draw();
    }
    frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);
}
for(const el of controls) el.addEventListener("input",()=>{
  stop();
  state[el.name]=Number(el.value);
  draw();
});
play.addEventListener("click",()=>playing?stop():start());
show.addEventListener("click",()=>{setVisible(!visible);draw();});
document.querySelector("#reset").addEventListener("click",()=>{
  stop();
  for(const el of controls){
    if(el.type==="range") el.value=el.defaultValue;
    else el.selectedIndex=[...el.options].findIndex(option=>option.defaultSelected);
  }
  resetState();setVisible(false);draw();
});
document.querySelector("#original")?.addEventListener("click",()=>{stop();state.z=originalZ;draw();});
resetState();
draw();
