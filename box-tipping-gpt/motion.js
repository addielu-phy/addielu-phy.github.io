/* GPT版：均勻矩形剛體；SI 單位；固定步長接觸衝量求解。 */
(function(){
'use strict';
const G=9.80665,M=2,I=M*(2*2+4*4)/12,DT=1/480;
class BoxMotion{
 constructor(){this.reset();}
 reset(v=0){this.x=0;this.z=2;this.a=0;this.vx=v;this.vz=0;this.w=0;this.t=0;this.N=0;this.f=0;this.contacts=[];this.hit=false;}
 corners(){const c=Math.cos(this.a),s=Math.sin(this.a);return [[-1,-2],[1,-2],[1,2],[-1,2]].map(([u,v])=>({rx:c*u-s*v,rz:s*u+c*v}));}
 step(Fkg,h,push=true){
 const F=push?Fkg*G:0,c=Math.cos(this.a),s=Math.sin(this.a),rpz=s+c*(h-2);
 this.vx-=F/M*DT;this.vz-=G*DT;this.w+=rpz*F/I*DT;
 const points=this.corners().map(p=>({...p,jn:0,jt:0}));
 for(let iter=0;iter<24;iter++)for(const p of points){
  const gap=this.z+p.rz,vn=this.vz+this.w*p.rx;
  if(gap>0.003&&gap+vn*DT>0)continue;
  const bias=Math.min(0.5,Math.max(0,-gap-0.0001)*0.18/DT);
  const dn=(bias-vn)/(1/M+p.rx*p.rx/I),old=p.jn;p.jn=Math.max(0,old+dn);
  const impulse=p.jn-old;this.vz+=impulse/M;this.w+=p.rx*impulse/I;
  const vt=this.vx-this.w*p.rz,trial=p.jt-vt/(1/M+p.rz*p.rz/I),prev=p.jt;
  p.jt=Math.abs(trial)<=0.5*p.jn?trial:Math.sign(trial)*0.4*p.jn;
  const dj=p.jt-prev;this.vx+=dj/M;this.w-=p.rz*dj/I;
 }
 this.x+=this.vx*DT;this.z+=this.vz*DT;this.a+=this.w*DT;this.t+=DT;
 this.N=points.reduce((v,p)=>v+p.jn,0)/DT;this.f=points.reduce((v,p)=>v+p.jt,0)/DT;
 this.contacts=points.filter(p=>p.jn>1e-8);if(Math.abs(this.a)>1.45)this.hit=true;
 }
}
if(typeof module!=='undefined'&&module.exports){module.exports={BoxMotion,DT,G};return;}
const root=document.createElement('section');root.className='card';root.id='motion';
root.innerHTML=`<span class="pill">新增 · 真實運動動畫 · GPT版</span><h2>先滑？先倒？讓木箱真的動起來</h2><p>按下播放，木箱會在地面上移動、翹起、旋轉，再由側面落地。換一個施力高度，比較同樣推力的結果。</p><div class="buttons"><button data-demo="slip">低推：先滑動</button><button data-demo="tip">高推：先翻倒</button><button data-demo="steady">等速滑動</button><button data-demo="rest">第 (3) 題：保持靜止</button></div><div class="lab"><div><canvas id="motion-canvas" width="1000" height="650" style="width:100%;height:auto;background:#edf3ed;border-radius:14px" aria-label="木箱剛體滑動翻倒動畫">瀏覽器需要支援 Canvas。</canvas><p class="caption">鏡頭會跟隨木箱；地面刻度固定在世界座標。虛線是起始位置，橙點是施力點，綠點是質心。箭頭顯示推力與重量；底部藍色短線顯示接觸位置。</p></div><div class="controls"><label for="motion-h">施力高度 h <output id="motion-hv"></output></label><input id="motion-h" type="range" min="0.25" max="4" step="0.05" value="3"><label for="motion-f">持續推力 F <output id="motion-fv"></output></label><input id="motion-f" type="range" min="0" max="1.4" step="0.01" value="0.9"><label for="motion-speed">播放速度 <output id="motion-sv"></output></label><input id="motion-speed" type="range" min="0.1" max="1" step="0.1" value="0.5"><div class="buttons"><button id="motion-play">▶ 播放</button><button id="motion-reset">重播此情境</button><button id="motion-release">撤去推力</button><button id="motion-step">前進 0.05 秒</button></div><p id="motion-state" class="status" role="status"></p><div class="metrics"><div class="metric">模擬時間<strong id="motion-time"></strong></div><div class="metric">傾斜角度<strong id="motion-angle"></strong></div><div class="metric">水平速度<strong id="motion-v"></strong></div><div class="metric">水平位移<strong id="motion-x"></strong></div></div><p class="caption">調整高度或推力會重設木箱。等速情境預設初速向左 0.6 m/s；其他情境由靜止開始。播放 12 秒後自動暫停，可按重播。</p></div></div><details><summary>動畫為什麼會這樣動？模型與限制</summary><p>以均勻矩形剛體計算平移及轉動：ΣF = ma，Στ<sub>C</sub> = I<sub>C</sub>α，I<sub>C</sub> = m(b² + H²)/12。地面接觸力會阻止穿透，並用 μₛ = 0.5、μₖ = 0.4 計算摩擦；接觸可從兩個底角變為單一底角，再變成側面接觸。因此不是預先排好滑動或翻倒路徑。</p><p>推力在 0.6 秒內平順升到設定值，接著持續水平向左，施力點隨箱體旋轉；h 是該點在木箱直立時距底部的高度。按「撤去推力」可看它繼續翻倒、回落或減速。等速情境從一開始即施加 0.8 kgw，抵消動摩擦。</p><p>木箱離開直立狀態後，不能再使用原題的靜力矩公式 Nd = 2 − Fh。此動畫採固定步長 1/480 秒的接觸衝量近似，碰撞視為不反彈；不描述木材變形、聲音、空氣阻力與真實接觸壓力分布。角落切換可能有很小的數值晃動。</p></details>`;
document.querySelector('main').insertBefore(root,document.getElementById('lab'));
const el=id=>document.getElementById('motion-'+id),cv=el('canvas'),ctx=cv.getContext('2d'),body=new BoxMotion();let playing=false,kind='tip',push=true,last=0,acc=0;
function settings(){return{h:+el('h').value,F:+el('f').value,speed:+el('speed').value};}
function reset(){playing=false;push=true;acc=0;body.reset(kind==='steady'?-0.6:0);render();}
function advance(seconds){const p=settings();acc+=seconds;while(acc>=DT){const f=kind==='steady'?p.F:p.F*Math.min(1,body.t/.6);body.step(f,p.h,push);acc-=DT;}if(body.t>=12)playing=false;}
function render(){const p=settings();el('hv').textContent=p.h.toFixed(2)+' m';el('fv').textContent=p.F.toFixed(2)+' kgw';el('sv').textContent=p.speed.toFixed(1)+'×';el('time').textContent=body.t.toFixed(2)+' s';el('angle').textContent=(body.a*180/Math.PI).toFixed(1)+'°';el('v').textContent=body.vx.toFixed(2)+' m/s';el('x').textContent=body.x.toFixed(2)+' m';el('play').textContent=playing?'❚❚ 暫停':'▶ 播放';
 let state=Math.abs(body.a)>.08?'木箱已翹起，正在轉動':Math.abs(body.vx)>.035?'木箱正在向左滑動':'木箱保持靜止／接近靜止';if(body.hit)state=Math.abs(body.w)<.12?'木箱已側面落地':'側面落地／繼續轉動';el('state').textContent=state+'。'+(push?'水平推力持續作用。':'已撤去推力。');
 const width=cv.width,height=cv.height,scale=82,ground=510,camera=body.x;ctx.clearRect(0,0,width,height);ctx.fillStyle='#f4f7ef';ctx.fillRect(0,0,width,ground);ctx.fillStyle='#d4dfce';ctx.fillRect(0,ground,width,height-ground);const X=x=>width*.53+(x-camera)*scale,Z=z=>ground-z*scale;
 ctx.strokeStyle='#9dad98';ctx.lineWidth=1;ctx.font='18px Microsoft JhengHei, sans-serif';for(let k=Math.floor(camera-8);k<=camera+8;k++){let xx=X(k);ctx.beginPath();ctx.moveTo(xx,ground);ctx.lineTo(xx-32,ground+32);ctx.stroke();ctx.fillStyle='#536963';ctx.fillText(k+' m',xx-12,ground+57);}ctx.strokeStyle='#64745e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,ground);ctx.lineTo(width,ground);ctx.stroke();
 ctx.save();ctx.setLineDash([7,7]);ctx.strokeStyle='#a8b7a1';ctx.lineWidth=2;ctx.strokeRect(X(-1),Z(4),164,328);ctx.restore();
 ctx.save();ctx.translate(X(body.x),Z(body.z));ctx.rotate(-body.a);const gradient=ctx.createLinearGradient(-82,-164,82,164);gradient.addColorStop(0,'#f6ddb2');gradient.addColorStop(1,'#c89350');ctx.fillStyle=gradient;ctx.strokeStyle='#77512f';ctx.lineWidth=4;ctx.fillRect(-82,-164,164,328);ctx.strokeRect(-82,-164,164,328);ctx.strokeStyle='#b1834c';ctx.lineWidth=2;for(let yy=-120;yy<165;yy+=64){ctx.beginPath();ctx.moveTo(-80,yy);ctx.lineTo(80,yy);ctx.stroke();}ctx.strokeStyle='#86663e';ctx.lineWidth=10;ctx.strokeRect(-65,-147,130,294);ctx.restore();
 const c=Math.cos(body.a),s=Math.sin(body.a),px=body.x+c-s*(p.h-2),pz=body.z+s+c*(p.h-2);const F=push?(kind==='steady'?p.F:p.F*Math.min(1,body.t/.6)):0;
 function vector(x,z,dx,dz,color,text){let xx=X(x),zz=Z(z),ex=xx+dx,ez=zz-dz,a=Math.atan2(ez-zz,ex-xx);ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(xx,zz);ctx.lineTo(ex,ez);ctx.stroke();ctx.beginPath();ctx.moveTo(ex,ez);ctx.lineTo(ex-14*Math.cos(a-.4),ez-14*Math.sin(a-.4));ctx.lineTo(ex-14*Math.cos(a+.4),ez-14*Math.sin(a+.4));ctx.closePath();ctx.fill();ctx.font='bold 21px Microsoft JhengHei, sans-serif';ctx.fillText(text,ex+10,ez-12);}
 if(F>.001)vector(px,pz,-F*90,0,'#bc493b','F');vector(body.x,body.z,0,-90,'#087c6b','W');ctx.fillStyle='#087c6b';ctx.beginPath();ctx.arc(X(body.x),Z(body.z),6,0,7);ctx.fill();ctx.fillStyle='#c45d21';ctx.beginPath();ctx.arc(X(px),Z(pz),6,0,7);ctx.fill();for(const v of body.corners()){if(body.z+v.rz<.015){ctx.strokeStyle='#2768af';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(X(body.x+v.rx)-9,ground);ctx.lineTo(X(body.x+v.rx)+9,ground);ctx.stroke();}}
 ctx.fillStyle='#16312f';ctx.font='bold 24px Microsoft JhengHei, sans-serif';ctx.fillText('GPT版 · 剛體運動實驗',28,38);ctx.font='20px Microsoft JhengHei, sans-serif';ctx.fillText('時間 '+body.t.toFixed(2)+' s　傾斜 '+(body.a*180/Math.PI).toFixed(1)+'°',28,73);
}
root.querySelectorAll('[data-demo]').forEach(btn=>btn.onclick=()=>{kind=btn.dataset.demo;el('h').value=kind==='tip'?3:kind==='steady'?2:1.5;el('f').value=kind==='tip'?.9:kind==='slip'?1.1:.8;reset();playing=true;render();});
el('h').oninput=el('f').oninput=()=>{kind='custom';reset();};el('speed').oninput=render;el('reset').onclick=()=>{reset();playing=true;render();};el('release').onclick=()=>{push=false;render();};el('step').onclick=()=>{playing=false;advance(.05);render();};el('play').onclick=()=>{if(body.t>=12)reset();playing=!playing;render();};
function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(playing){advance(dt*settings().speed);render();}requestAnimationFrame(loop);}render();requestAnimationFrame(loop);
})();
