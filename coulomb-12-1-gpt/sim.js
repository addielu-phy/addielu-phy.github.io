"use strict";

const k = 9e9, e = 1.6e-19, G = 6.67e-11, proton = 1.7e-27, electron = 9.1e-31;
const blue = "#80e0ee", gold = "#ffd388", pink = "#ffa5bf", ink = "#edf6ff", dim = "#91a8c2", grid = "#36516b";
const add = (a,b) => a.map((v,i) => v+b[i]);
const subtract = (a,b) => a.map((v,i) => v-b[i]);
const scale = (a,s) => a.map(v => v*s);
const norm = a => Math.hypot(...a);
const distance = (a,b) => norm(subtract(a,b));
const fmt = (n,d=3) => String(Number((Math.abs(n)<0.5*10**(-d)?0:n).toFixed(d)));
const sci = n => {
  const [coefficient, exponent] = n.toExponential(2).split("e");
  return coefficient + " × 10^" + Number(exponent);
};

function particleForces(r) {
  return [k*e*e/(r*1e-11)**2, G*proton*electron/(r*1e-11)**2];
}

function pairForce(target, source) {
  const delta = subtract(target.pos,source.pos);
  return scale(delta,target.q*source.q/norm(delta)**3);
}

function pendulumDistance(q,mass) {
  return Math.cbrt(.125*q*q/mass);
}

function pendulumAcceleration(theta, velocity, q, mass) {
  const half = theta/2;
  return .125*q*q/mass*Math.cos(half)/(4*Math.sin(half)**2)-Math.sin(theta)-.67*velocity;
}

function attraction(x) {
  return -x/(1+x*x)**1.5;
}

function integrate(x,v,accel,span,count) {
  const points = [x], h = span/count;
  for(let i=0;i<count;i++) {
    const a = accel(x,v);
    const midX = x+h*v/2, midV = v+h*a/2;
    x += h*midV;
    v += h*accel(midX,midV);
    points.push(x);
  }
  return points;
}

const sample = (points,fraction) => {
  const index = fraction*(points.length-1);
  const i = Math.floor(index);
  return points[i]+((points[i+1]??points[i])-points[i])*(index-i);
};

function text(label,x,y,color=ink,anchor="middle",size=22) {
  return '<text x="'+x+'" y="'+y+'" fill="'+color+'" text-anchor="'+anchor+'" font-size="'+size+'">'+label+'</text>';
}

function line(a,b,color=grid,width=2,dashed=false) {
  return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round"'+(dashed?' stroke-dasharray="6 6"':'')+'/>';
}

function path(points,color,width=3,dashed=false) {
  return '<polyline fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round" stroke-linejoin="round" points="'+points.map(a=>a.join(",")).join(" ")+'"'+(dashed?' stroke-dasharray="6 6"':'')+'/>';
}

function circle(p,r,color,fill=color) {
  return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+r+'" fill="'+fill+'" stroke="'+color+'" stroke-width="2"/>';
}

function arrow(a,delta,color) {
  const length=norm(delta);
  if(length<2) return "";
  const b=add(a,delta), u=scale(delta,1/length), side=[-u[1],u[0]];
  const base=subtract(b,scale(u,Math.min(10,length*.55)));
  const wing=scale(side,Math.min(5,length*.28));
  return line(a,b,color,3)+path([add(base,wing),b,subtract(base,wing)],color);
}

function charge(p,label,q) {
  const color=q<0?blue:q>0?pink:dim;
  return circle(p,21,color,"#182d43")+text(label,p[0],p[1]+7,color);
}

function axes(ox,oy,w,h,xLabel,yLabel) {
  return line([ox,oy],[ox+w,oy],dim)+line([ox,oy],[ox,oy-h],dim)
    +text(xLabel,ox+w,oy+26,dim,"end",18)+text(yLabel,ox,oy-h-9,dim,"start",18);
}

function drawParticles(s,shown) {
  const [electric,gravity]=particleForces(s.r);
  const sep=76+13*s.r, p=[300-sep/2,84], n=[300+sep/2,84];
  let figure=charge(p,"+",1)+charge(n,"−",-1)+line(add(p,[22,0]),add(n,[-22,0]),grid,2,true);
  figure+=text("質子",p[0],58,pink)+text("電子",n[0],58,blue)+text("r",300,75,dim);
  if(shown) {
    const span=Math.min(sep/2-5,48+16*Math.log2(5.3/s.r));
    figure+=arrow(add(p,[0,31]),[span,0],blue)+arrow(add(n,[0,31]),[-span,0],blue)
      +arrow(add(p,[0,49]),[span,0],gold)+arrow(add(n,[0,49]),[-span,0],gold);
    const X=r=>111+432*(r-2.65)/13.25, Y=f=>258-(Math.log10(f)+48)*2.55;
    figure+=axes(111,266,432,134,"r（10⁻¹¹ m）","力大小（對數刻度）")
      +text("10⁻⁸ N",102,Y(1e-8)+6,dim,"end",18)+text("10⁻⁴⁷ N",102,Y(1e-47)+6,dim,"end",18);
    for(const [i,color,label] of [[0,blue,"庫侖力"],[1,gold,"萬有引力"]]) {
      const points=Array.from({length:65},(_,j)=>{const r=2.65+13.25*j/64;return [X(r),Y(particleForces(r)[i])];});
      figure+=path(points,color)+circle([X(s.r),Y(particleForces(s.r)[i])],5,color)
        +text(label,532,Y(particleForces(15.9)[i])-9,color,"end",19);
    }
    figure+=text("上方兩組箭頭依各自尺度繪製",300,322,dim,"middle",19);
  } else {
    figure+=text("移動滑桿，比較兩粒子的間距。",300,228,dim);
  }
  return [figure,"庫侖力 "+sci(electric)+" N｜萬有引力 "+sci(gravity)+" N｜兩力比 "+sci(electric/gravity)+"。兩力皆為吸引力。"];
}

function drawSquare(s,shown) {
  const corner=[[87,85],[239,85],[87,237],[239,237]];
  const charges=corner.map((pos,i)=>({pos:scale(pos,1/152),q:i===0||i===3?s.ratio:1}));
  let figure=path([corner[0],corner[1],corner[3],corner[2],corner[0]],grid)
    +line(corner[0],corner[3],grid,2,true)+text("a",162,73,dim)+text("a",55,166,dim)
    +text("受力目標",87,49,blue)+circle(corner[0],29,blue,"none");
  corner.forEach((p,i)=>{figure+=charge(p,i===0||i===3?"Q":"q",charges[i].q);});
  const vectors=charges.slice(1).map(source=>pairForce(charges[0],source));
  const net=vectors.reduce(add,[0,0]);
  if(shown) {
    const origin=[405,155], colors=[blue,gold,pink], gain=82/Math.max(1,...vectors.map(norm),norm(net));
    let tip=origin;
    figure+=text("向量首尾相接",432,50,ink);
    vectors.forEach((v,i)=>{
      const d=scale(v,gain*Math.min(1,Math.max(0,s.phase/100*3-i)));
      figure+=arrow(tip,d,colors[i]);
      tip=add(tip,d);
    });
    if(s.phase===100) figure+=norm(net)<.002?circle(origin,8,ink,"none"):arrow(origin,scale(net,gain),ink);
    figure+=text("右 q",346,294,blue)+text("下 q",428,294,gold)+text("對角 Q",514,294,pink);
  } else {
    figure+=text("先找出目標 Q 的三個受力。",432,163,dim,"middle",19);
  }
  const result=s.ratio===0?"Q＝0 時沒有作用力，原題的 Q 為非零電荷。"
    : "右為 +x、下為 +y。合力分量 (Fₓ, Fᵧ)＝("+fmt(net[0])+", "+fmt(net[1])+")，單位 kq²/a²。";
  return [figure,result];
}

function drawPendulum(s,shown,trajectory) {
  const O=[389,43], L=196, B=add(O,[0,L]), theta=sample(trajectory,s.phase/100);
  const pos=t=>add(O,[-L*Math.sin(t),L*Math.cos(t)]);
  const A=pos(theta), d=distance(A,B)/L;
  const end=pendulumDistance(s.q,s.mass), F=.125*s.q*s.q/d**2;
  let figure=line([353,42],[425,42],dim,4)+line(O,B,dim,2,true)+line(O,A,ink,3)
    +path(Array.from({length:51},(_,i)=>pos(i*1.45/50)),grid,2,true)+line(A,B,dim,2,true)
    +text("L",414,144,dim)+text("d",(A[0]+B[0])/2,(A[1]+B[1])/2+24,dim)
    +circle(O,5,ink)+circle(A,9,pink,"#182d43")+circle(B,9,pink,"#182d43")
    +text("A",A[0]-15,A[1]-10,pink,"end",20)+text("B 固定",422,262,dim,"start",20);
  if(shown) {
    const equilibrium=pos(2*Math.asin(end/2)), origin=pos(2*Math.asin(.25));
    figure+=circle(equilibrium,13,blue,"none")+text("青色圓框：新平衡位置",460,309,blue,"middle",19)
      +circle(origin,4,dim)+text("灰點：舊平衡位置",140,79,dim,"middle",19);
    const u=scale(subtract(A,B),1/(L*d));
    figure+=arrow(A,scale(u,Math.min(91,70*F/s.mass)),gold)+arrow(A,[0,67],pink)
      +text("橘：電力　粉：重力",140,110,ink,"middle",19);
  }
  return [figure,"瞬時 d/L＝"+fmt(d)+"｜瞬時電力／原平衡電力＝"+fmt(F/.5)+"｜新平衡 d/L＝"+fmt(end)+"，電力／原平衡電力＝"+fmt(s.mass*end/.5)+"。圖上僅標示電力與重力。"];
}

function drawLine(s,shown) {
  const ys=[96,170,244], labels=["A","C","B"];
  const points=[{pos:[0,0],q:1},{pos:[s.x,0],q:s.ratio},{pos:[1,0],q:4}];
  const pixels=points.map(p=>[98+404*p.pos[0],124]);
  const results=points.map(target=>points.filter(source=>source!==target)
    .map(source=>pairForce(target,source)).reduce(add,[0,0])[0]);
  let figure=line(pixels[0],pixels[2],grid,2,true)+text("A",98,79)+text("C",pixels[1][0],79)+text("B",502,79);
  points.forEach((p,i)=>{figure+=charge(pixels[i],i===0?"Q":i===1?"q":"4Q",p.q);});
  if(shown) {
    const gain=97/Math.max(4,...results.map(Math.abs));
    results.forEach((v,i)=>{
      const p=[255,ys[i]+58];
      figure+=text(labels[i]+" 的合力",42,p[1]+6,ink,"start",19)+circle(p,3,dim);
      figure+=Math.abs(v)<.04?text("≈ 0",p[0]+28,p[1]+6,blue,"start",19):arrow(p,[v*gain,0],[blue,gold,pink][i]);
    });
  } else {
    figure+=text("左右移動 C，思考哪顆球的力會先抵消。",300,242,dim,"middle",20);
  }
  return [figure,"向右為正，單位 kQ²/d²。A："+fmt(results[0])+"｜C："+fmt(results[1])+"｜B："+fmt(results[2])+(s.ratio===0?"。C 的電量此時為零。":"。")];
}

function drawOscillation(s,shown,trajectory) {
  const fraction=s.phase/100, time=4*Math.PI*fraction, x=sample(trajectory,fraction);
  const exact=p=>155+p*74;
  const A=[155,61], B=[155,223], M=[exact(x),142];
  let figure=line([29,142],[285,142],dim)+line([155,38],[155,247],grid,2,true)
    +text("x",279,132,dim)+text("a",143,106,dim,"end",18)+charge(A,"+",1)+charge(B,"+",1)+charge(M,"−",-1);
  if(shown) {
    const forceGain=55/(1+x*x)**1.5;
    figure+=arrow(M,[x===0?0:-x*forceGain,-forceGain],gold)+arrow(M,[-x*forceGain,forceGain],gold)
      +arrow(M,[-2*x*forceGain,0],ink);
  }
  const X=f=>333+229*f, Y=z=>146-72*z/s.amp, segs=160;
  figure+=axes(333,230,237,166,"t / T₀","x / a")+line([333,Y(0)],[562,Y(0)],grid)
    +path(Array.from({length:segs+1},(_,i)=>[X(i/segs),Y(sample(trajectory,i/segs))]),blue)
    +path(Array.from({length:segs+1},(_,i)=>[X(i/segs),Y(s.amp*Math.cos(4*Math.PI*i/segs))]),gold,2,true)
    +circle([X(fraction),Y(x)],5,blue)+circle([X(fraction),Y(s.amp*Math.cos(time))],4,gold)
    +text("0",333,255,dim,"middle",18)+text("1",X(.5),255,dim,"middle",18)+text("2",X(1),255,dim,"middle",18)
    +text("實線：精確",384,294,blue,"middle",18)+text("虛線：簡諧",512,294,gold,"middle",18);
  return [figure,"t/T₀＝"+fmt(time/(2*Math.PI))+"｜精確 x/a＝"+fmt(x)+"｜簡諧 x/a＝"+fmt(s.amp*Math.cos(time))+"｜精確 Fₓ/(2kQq/a²)＝"+fmt(attraction(x))+"。"];
}

function mount() {
  const sim=document.querySelector(".sim");
  const number=Number(sim.dataset.scene);
  const diagram=sim.querySelector("#diagram"), metrics=sim.querySelector("#metrics");
  const play=sim.querySelector("#play"), show=sim.querySelector("#show"), reset=sim.querySelector("#reset");
  const fields=[...sim.querySelectorAll("input")], drive=fields.find(el=>el.name==="phase"||el.name==="x"||el.name==="r");
  const models=[drawParticles,drawSquare,drawPendulum,drawLine,drawOscillation];
  const playLabel=play.textContent;
  let shown=false, frame=0, cacheKey="", trajectory=[];
  function draw() {
    const s=Object.fromEntries(fields.map(el=>[el.name,Number(el.value)]));
    const key=[s.q,s.mass,s.amp].join("/");
    if(key!==cacheKey) {
      if(number===3) trajectory=integrate(2*Math.asin(.25),0,(x,v)=>pendulumAcceleration(x,v,s.q,s.mass),12,4800);
      if(number===5) trajectory=integrate(s.amp,0,attraction,4*Math.PI,3200);
      cacheKey=key;
    }
    const [figure,result]=models[number-1](s,shown,trajectory);
    diagram.innerHTML=figure;
    if(shown) metrics.textContent=result;
    for(const el of fields) el.closest("label").querySelector("output").value=fmt(Number(el.value));
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame=0;
    play.textContent=playLabel;
  }
  function toggleReading(value) {
    shown=value;
    metrics.hidden=!value;
    show.setAttribute("aria-pressed",String(value));
    show.textContent=value?"隱藏受力與讀值":"顯示受力與讀值";
  }
  play.addEventListener("click",()=>{
    if(frame) { stop(); return; }
    if(number===2) toggleReading(true);
    const min=Number(drive.min), max=Number(drive.max);
    const start=Number(drive.value)>=max?min:Number(drive.value);
    const duration=number===3?8000:number===5?9000:5300;
    const then=performance.now();
    play.textContent="暫停動畫";
    function tick(now) {
      const value=Math.min(max,start+(max-min)*(now-then)/duration);
      drive.value=String(value);
      draw();
      if(value>=max) stop();
      else frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
  });
  for(const el of fields) el.addEventListener("input",()=>{
    stop();
    if(el!==drive && (number===2 || number===3 || number===5)) drive.value=drive.min;
    draw();
  });
  show.addEventListener("click",()=>{toggleReading(!shown);draw();});
  reset.addEventListener("click",()=>{
    stop();
    for(const el of fields) el.value=el.defaultValue;
    toggleReading(false);
    draw();
  });
  draw();
}

if(typeof document!=="undefined") mount();
