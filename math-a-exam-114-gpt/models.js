'use strict';
const BLUE='#2563eb',ORANGE='#d97706',TEAL='#0f766e',RED='#be123c';
function root(fn,a,b){let fa=fn(a);for(let k=0;k<65;k++){let m=(a+b)/2,fm=fn(m);if(fa*fm<=0)b=m;else{a=m;fa=fm;}}return (a+b)/2;}
function fmt(x,n=5){if(!Number.isFinite(x))return '未定義';if(x!==0&&(Math.abs(x)<.0001||Math.abs(x)>1e8))return x.toExponential(5);return Number(x.toFixed(n)).toLocaleString('en-US',{maximumFractionDigits:n});}
function config(id,m='A'){
const configs={
m1:m==='A'?[-1.5,1.5,.01,-.7,'指數 r']:m==='B'?[1,3,.01,1,'根指數倍率 k']:m==='C'?[20,30,.01,25,'夾擠中央數 N']:[.1,10,.01,m==='D'?.8:8,'真數 z'],
m2:[0,1,.01,0,'變換進度 p'],
m3:m==='A'?[-2,5,.01,0,'探針 x']:m==='B'?[-4,4,.01,0,'探針 x']:[.03,6,.01,1,'探針 x'],
m4:m==='D'||m==='E'?[.1,3,.01,.5,'底數 a']:[.1,.95,.01,.5,'底數 a'],
f1:[0,4,.01,0,'運算進度'],f2:[0,4,.01,0,'因數合併進度'],f3:[.3,3,.01,1.5,'底數兼變數 x'],
f4:[-2,6,.01,0,'原變數 x'],f5:[2,32,.05,4,'原變數 x'],f6:[.05,1.3,.001,9/16,'底數 a'],
f7:[-1,2,.001,5/6,'P點的橫坐標 x'],f8:[-12,-.1,.0001,-9.6125,'常用對數 log x'],
f9:[-3,1,.01,-1,'水平線高度 m'],f10:[0,10,.5,0,'經過年數 t'],f11:[0,42,.05,0,'經過時間 t（小時）']};
let c=configs[id];return {min:c[0],max:c[1],step:c[2],value:c[3],label:c[4]};}
function model(id,m,v,logScale=false){
let R={range:[-2,5,-2,8],curves:[],points:[],segments:[],vertical:[],horizontal:[],values:[],message:'',xLabel:'x',yLabel:'y'};
const curve=(label,fn,color=BLUE)=>R.curves.push({label,fn,color});
const point=(x,y,color=RED,label='')=>R.points.push({x,y,color,label});
const val=(label,value)=>R.values.push([label,typeof value==='number'?fmt(value):value]);
if(id==='m1'){
if(m==='A'){R.range=[3,7,0,Math.max(3,7**v*1.2)];R.xLabel='分母 n';R.yLabel='(1/n)^r';curve('(1/n)^r',n=>n**(-v));for(let n of [6,5,4]){point(n,n**(-v),BLUE);val('(1/'+n+')^'+fmt(v),n**(-v));}}
if(m==='B'){R.range=[1,7,0,1.05];R.xLabel='n';R.yLabel='(1/n)^(1/((n−1)k))';curve('根式數值',n=>n>1?n**(-1/((n-1)*v)):NaN);for(let n of [6,5,4]){let y=n**(-1/((n-1)*v));point(n,y,BLUE);val('根指數 '+fmt((n-1)*v)+'，真數1/'+n,y);}}
if(m==='C'){let ys=[Math.log((v-1)**.25)/Math.log(Math.sqrt(3)),Math.log(1/Math.sqrt(v))/Math.log(1/3),Math.log(v+1)/Math.log(9)];R.kind='bars';R.bars=ys.map((y,i)=>({label:['左式','中式','右式'][i],value:y,color:[BLUE,TEAL,ORANGE][i]}));ys.forEach((y,i)=>val(['log√3 ⁴√(N−1)','log₁/₃(1/√N)','log₉(N+1)'][i],y));R.message='N=25 即原題；同底化後，等價於比較 N−1、N、N+1。';}
if(m==='D'||m==='E'){let bs=m==='D'?[2,3,.2,.3]:[.2,.3,3,2],ys=bs.map(b=>Math.log(v)/Math.log(b));R.kind='bars';R.bars=ys.map((y,i)=>({label:'底數 '+bs[i],value:y,color:i<2?BLUE:ORANGE}));ys.forEach((y,i)=>val('log_'+bs[i]+'('+fmt(v)+')',y));R.message='真數跨過1，分子ln(z)的正負號會反轉；原題按鈕還原指定真數。';}
}
if(id==='m2'){
if(m==='A'){R.range=[0,10,0,110];curve('2^x+10',x=>2**x+10);curve('2^(10−x)',x=>2**(10-x),ORANGE);let x=10*v;point(x,2**x+10,BLUE);point(x,2**(10-x),ORANGE);let t=-5+Math.sqrt(1049),xr=Math.log2(t);point(xr,t+10,RED,'唯一交點');val('交點x',xr);val('交點y',t+10);}
if(m==='B'){let h=v*Math.log2(2025);R.range=[-14,3,0,8];curve('原圖 2^x',x=>2**x);curve('移動中的 2^(x+h)',x=>2**(x+h),TEAL);curve('目標 2025·2^x',x=>2025*2**x,ORANGE);point(-h,1,RED);val('向左平移',h);val('目前倍率',2**h);R.message='實際平移距離為log₂2025；曲線超出縱軸範圍時自然裁切。';}
if(m==='C'){R.range=[-2,12,-4,4];R.yLabel='y / 2025';curve('原圖（縱軸÷2025）',x=>2**x/2025);curve('鏡射、平移過渡示意',x=>(1-2*v)*2**x/2025-v,TEAL);curve('目標 (−2^x−2025)/2025',x=>(-(2**x)-2025)/2025,ORANGE);val('進度',fmt(v*100)+'%');R.message='縱軸以2025為單位；中間畫面為鏡射與平移的插值示意，完成時為原題精確曲線。';}
if(m==='D'){R.equal=true;R.range=[-2,5,-2,5];curve('y=2^x',x=>2**x);curve('y=log₂x',x=>x>0?Math.log2(x):NaN,ORANGE);curve('鏡射軸 y=x',x=>x,TEAL);let u=1.5,w=2**u;point(u+(w-u)*v,w+(u-w)*v,RED,'交換坐標');R.segments.push([u,w,w,u,TEAL]);val('移動點x',u+(w-u)*v);val('移動點y',w+(u-w)*v);R.message='橫、縱軸採等比例，才能正確看出對y=x的鏡射。';}
if(m==='E'){R.range=[-3,3,-3,7];curve('反例 y=2^x−2',x=>2**x-2);let x=-3+6*v;point(x,2**x-2);val('x',x);val('y',2**x-2);R.message='a=1、b=−2：第三、第四、第一象限皆出現。坐標軸上的點不屬於任何象限。';}
}
if(id==='m3'){
let fn;
if(m==='A'){R.range=[-2,5,-5,15];fn=x=>2**x-x*x;curve('2^x−x²',fn);for(let x of [root(fn,-1,0),2,4])point(x,0,RED,'根');}
if(m==='B'){R.range=[-4,4,0,18];fn=x=>2**x+2**(-x);curve('2^x+2^(−x)',fn);R.horizontal.push([1,'右式=1',ORANGE]);point(0,2,RED,'最小值2');}
if(m==='C'){R.range=[.02,6,-1,8];fn=x=>x-Math.log2(x);curve('x−log₂x',fn);R.message='整條曲線在x軸上方；沒有實根。';}
if(m==='D'){R.range=[.02,6,-2,8];fn=x=>Math.SQRT2**x-Math.log(x)/Math.log(Math.SQRT2);curve('(√2)^x−log√2 x',fn);point(2,0,RED,'根2');point(4,0,RED,'根4');}
if(m==='E'){R.range=[.02,3,-5,9];fn=x=>2**Math.abs(x)-Math.abs(Math.log2(x));curve('2^|x|−|log₂x|',fn);point(root(fn,.01,.99),0,RED,'唯一根');R.vertical.push([1,'絕對值分段點',TEAL]);}
point(v,fn(v));val('探針x',v);val(m==='B'?'左式值':'左式−右式',fn(v));R.yLabel=m==='B'?'左式':'左式−右式';
}
if(id==='m4'){
if(Math.abs(v-1)<1e-9){R.message='a=1不能作對數底數，也被原題排除；請移開滑桿。';R.invalid=true;return R;}
let a=v,b=2,c=4;
if(m==='A'){R.range=[1,5,0,1.1];curve('a^t',t=>a**t);point(b,a**b,BLUE);point(c,a**c,ORANGE);val('a^b（b=2）',a**b);val('a^c（c=4）',a**c);}
if(m==='B'){R.range=[1,4,-12,20];curve('b^t（b=2）',t=>2**t);curve('log_a t',t=>Math.log(t)/Math.log(a),ORANGE);val('b^c（b=2,c=3）',8);val('log_a c（c=3）',Math.log(3)/Math.log(a));R.message='0<a<1<b<c：左式為正，右式為負。';}
if(m==='C'){R.range=[1,5,-12,4];curve('log_a t',t=>Math.log(t)/Math.log(a));curve('log_b t（b=2）',t=>Math.log2(t),ORANGE);val('log_a 4',Math.log(4)/Math.log(a));val('log₂4',2);}
if(m==='D'){b=1;c=3;let avg=(a+a**3)/2,mid=a*a;R.range=[0,4,0,Math.max(1.2,a**4*1.1)];curve('a^t',t=>a**t);point(1,a,TEAL);point(3,a**3,TEAL);point(2,avg,ORANGE,'弦中點');point(2,mid,BLUE,'曲線中點');R.segments.push([1,a,3,a**3,TEAL]);val('曲線中點 a²',mid);val('兩端平均 (a+a³)/2',avg);val('前者−後者',mid-avg);}
if(m==='E'){let fn=t=>Math.log(t)/Math.log(a),ys=[fn(1),fn(9)];R.range=[1,9,Math.min(...ys,0)-1,Math.max(...ys,0)+1];curve('log_a t',fn);point(2,fn(2),TEAL);point(8,fn(8),TEAL);point(5,fn(5),BLUE,'曲線中點');let avg=(fn(2)+fn(8))/2;point(5,avg,ORANGE,'弦中點');R.segments.push([2,fn(2),8,fn(8),TEAL]);val('log_a 5',fn(5));val('(log_a 2+log_a 8)/2',avg);val('前者−後者',fn(5)-avg);R.message=a<1?'a<1：曲線中點低於弦中點，原選項不成立。':'a>1：曲線中點高於弦中點；原選項未限制a>1，所以不能一概成立。';}
val('底數a',a);
}
if(id==='f1'){let term=[Math.log(3)/Math.log(15),Math.log(3)/Math.log(15),2*Math.log(5)/Math.log(15),-9],sum=0;R.kind='bars';R.bars=term.map((t,i)=>{let value=t*Math.max(0,Math.min(1,v-i));sum+=value;return {label:['第一項','第二項','第三項','減9'][i],value,color:i===3?RED:BLUE};});val('目前累計',sum);val('前三項完整合計',2);val('完整結果',-7);R.message='長條高度表示每項的實際數值；前進到4時完成原式。';}
if(id==='f2'){let a=[-4/3,4,4/3,0],b=[2/3,2/3,0,-4/3],sx=0,sy=0;for(let i=0;i<4;i++){let p=Math.max(0,Math.min(1,v-i));sx+=a[i]*p;sy+=b[i]*p;}R.kind='bars';R.bars=[{label:'底數2的總指數',value:sx,color:BLUE},{label:'底數3的總指數',value:sy,color:ORANGE}];val('2的指數',sx);val('3的指數',sy);val('目前乘積 2^p×3^q',2**sx*3**sy);R.message='運算終點：2⁴×3⁰=16，log₂16=4。';}
if(id==='f3'){R.range=[.3,3,-1,5];let fn=x=>x>.5&&Math.abs(x-1)>1e-6?Math.log((2*x*x+x-1)/(2*x))/Math.log(x):NaN;curve('原式左邊',fn);R.horizontal.push([1,'比較線1',ORANGE]);R.vertical.push([.5,'真數為0',RED],[1,'底數不合法',RED]);if(v>.5&&Math.abs(v-1)>1e-8){point(v,fn(v));val('左邊',fn(v));val('左邊 > 1',fn(v)>1?'成立':'不成立');}else{R.invalid=true;R.message=v<=.5?'x≤1/2：真數條件不成立。':'x=1：底數不合法。';}val('x',v);}
if(id==='f4'){let t=2**(-v),fn=t=>32*t*t-65*t+2;R.range=[-.1,2.3,-36,30];R.xLabel='t=2^(−x)';R.yLabel='32t²−65t+2';curve('換元後的二次式',fn);R.shade=[1/32,2];point(t,fn(t));R.vertical.push([1/32,'1/32',TEAL],[2,'2',TEAL]);val('x',v);val('t=2^(−x)',t);val('原式值',fn(t));val('是否小於0',fn(t)<-1e-9?'是':'否（含等號端點）');}
if(id==='f5'){let t=Math.log2(v),fn=t=>(t-2)**2-1;R.range=[.7,5.3,-2,9];R.xLabel='t=log₂x';R.yLabel='f';curve('(t−2)²−1',fn);R.shade=[1,5];point(t,fn(t));point(2,-1,TEAL,'最小−1');point(5,8,ORANGE,'最大8');val('原變數x',v);val('t=log₂x',t);val('f(x)',fn(t));}
if(id==='f6'){let a=v,fn=x=>x*x+a**Math.abs(x)-1;R.range=[-1.2,1.2,-.35,1.8];curve('x²+a^|x|−1',fn);point(0,0,TEAL,'零根一直存在');if(a<1){let r=root(x=>fn(x),1e-8,1);point(r,0,RED);point(-r,0,RED);R.segments.push([-r,-.2,r,-.2,RED]);val('負根',-r);val('正根',r);val('非零根的距離',2*r);}else R.message='a≥1時，除了x=0以外沒有其他實根。';val('a',a);val('F(1/2)',fn(.5));}
if(id==='f7'){let y=5-3*v,u=2**(3*v),w=2**y;R.range=[-1,2,0,125];R.yLabel='兩項之和（不含2025）';let fn=x=>2**(3*x)+2**(5-3*x);curve('8^x+2^(5−3x)',fn);point(v,fn(v));point(5/6,8*Math.SQRT2,TEAL,'最小值');val('P(x,y)','('+fmt(v,3)+', '+fmt(y,3)+')');val('8^x',u);val('2^y',w);val('加2025後',2025+u+w);R.message='直線約束y=5−3x。當8ˣ=2ʸ=4√2時取到最小值。';}
if(id==='f8'){let k=Math.floor(v),mant=10**(v-k),x=10**v,mv=-k,nv=Math.floor(mant+1e-10);R.range=[-12,0,0,11];R.xLabel='log₁₀x';R.yLabel='科學記號係數';curve('10^(L−floor(L))',x=>10**(x-Math.floor(x)));point(v,mant);val('x',x.toExponential(8));val('小數點後首位位置m',mv);val('第一個非零數字n',nv);val('m+n',mv+nv);R.decimal=x.toFixed(Math.min(16,mv+4));R.message='每跨過一個整數對數，係數由接近10回到1，小數位置向左或向右換一格。';}
if(id==='f9'){let ax=2**v,bx=8*ax;R.range=[0,Math.max(9,bx*1.15),-4,4];curve('log₂x',x=>x>0?Math.log2(x):NaN);curve('−3+log₂x',x=>x>0?-3+Math.log2(x):NaN,ORANGE);R.horizontal.push([v,'y=m',TEAL]);point(ax,v,BLUE,'A');point(bx,v,ORANGE,'B');R.segments.push([ax,v,bx,v,TEAL]);val('m',v);val('x_A',ax);val('x_B',bx);val('AB',bx-ax);}
if(id==='f10'){R.range=[0,10,990000,1280000];R.xLabel='年數';R.yLabel='金額（元）';curve('A 單利',t=>1e6*(1+.025*t));curve('B 半年複利（整期點）',t=>1e6*1.012**(Math.floor(t*2+1e-8)),ORANGE);let A=1e6*(1+.025*v),B=1e6*1.012**(2*v);point(v,A,BLUE);point(v,B,ORANGE);val('經過半年期數',2*v);val('A（元）',fmt(A,2));val('B（元）',fmt(B,2));val('B−A（元）',fmt(B-A,2));R.message='滑桿每半年一格；橘線依完整半年期入帳，非整期位置以階梯呈現。';}
if(id==='f11'){let fn=t=>20*.25**(t/6),thr=6*Math.log(2000)/Math.log(4),trans=y=>logScale?Math.log10(y):y;R.range=[0,42,logScale?-4:0,logScale?1.5:21];R.xLabel='小時';R.yLabel=logScale?'log₁₀ Q（微克）':'Q（微克）';curve(logScale?'log₁₀ Q(t)':'Q(t)',t=>trans(fn(t)));R.horizontal.push([trans(.01),'門檻0.01微克',RED]);R.vertical.push([thr,'臨界時間',TEAL]);point(v,trans(fn(v)));val('t（小時）',v);val('剩餘（微克）',fn(v));val('低於0.01？',fn(v)<.01?'是':'否');val('連續模型門檻',fmt(thr,6)+'小時');R.message='一般刻度不易看見尾端；切到對數刻度可清楚辨認33小時已低於門檻。';}
return R;}
