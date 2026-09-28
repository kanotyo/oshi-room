const items=[['🧸','くま',40,55,180],['🪴','グリーン',30,320,180],['🛋️','ソファ',70,150,185],['💡','ライト',45,330,65],['🎀','リボン',35,175,75],['🖼️','フレーム',60,265,75],['🕯️','キャンドル',35,120,210],['🌷','お花',45,275,195],['🐰','うさぎ',55,210,205],['⭐','スター',50,215,45],['🫧','バブル',30,135,95],['👑','クラウン',90,275,35]];
const colors=['#f6c9da','#cdd9ff','#d7efcf','#ead5ff','#fff0b8','#ffd9c7'];
let s=JSON.parse(localStorage.getItem('oshiRoomV2')||'null')||{coins:100,color:colors[0],owned:[],xp:0,lastDaily:''};
const $=q=>document.querySelector(q),today=()=>new Date().toLocaleDateString('sv-SE');
function level(){return Math.floor(s.xp/50)+1} function save(){localStorage.setItem('oshiRoomV2',JSON.stringify(s));render()}
function sparkle(n=8){for(let i=0;i<n;i++){let e=document.createElement('span');e.textContent=['✨','♡','✦'][i%3];e.style.left=(20+Math.random()*60)+'vw';e.style.top=(35+Math.random()*35)+'vh';document.querySelector('#sparkles').append(e);setTimeout(()=>e.remove(),1100)}}
function render(){let lv=level();$('#coins').textContent=s.coins;$('#lv').textContent=lv;$('#xp').textContent=s.xp%50;$('#need').textContent=50;$('#room').style.background=`linear-gradient(${s.color} 0 68%,#d8bcaf 68%)`;
$('#placed').innerHTML=s.owned.map(i=>{let x=items[i];return `<span class="item" style="left:${x[3]}px;top:${x[4]}px">${x[0]}</span>`}).join('');
$('#shop').innerHTML=items.map((x,i)=>`<button onclick="buy(${i})" ${s.owned.includes(i)?'disabled':''}><span class="emoji">${x[0]}</span>${s.owned.includes(i)?'GET♡':x[1]+'<br>🪙'+x[2]}</button>`).join('');
$('#colors').innerHTML=colors.map(c=>`<button data-c="${c}" style="background:${c}"></button>`).join('');document.querySelectorAll('#colors button').forEach(b=>b.onclick=()=>{s.color=b.dataset.c;save()});
$('#ownedCount').textContent=s.owned.length;$('#totalCount').textContent=items.length;$('#progress').style.width=(s.owned.length/items.length*100)+'%';
let got=s.lastDaily===today();$('#daily').disabled=got;$('#daily').textContent=got?'受取済み♡':'受け取る';$('#dailyText').textContent=got?'また明日のお楽しみ':'今日の30コインをプレゼント'}
window.buy=i=>{let x=items[i];if(s.coins<x[2])return alert('コインが足りないよ♡');s.coins-=x[2];s.owned.push(i);s.xp+=12;sparkle();save()}
$('#daily').onclick=()=>{if(s.lastDaily===today())return;s.coins+=30;s.xp+=5;s.lastDaily=today();sparkle(12);save()}
let running=false,score=0,t;$('#start').onclick=()=>{if(running)return;running=true;score=0;$('#score').textContent=0;let left=10;$('#timer').textContent=left+'秒';t=setInterval(()=>{left--;$('#timer').textContent=left+'秒';if(left<=0){clearInterval(t);running=false;let reward=10+score*2;s.coins+=reward;s.xp+=Math.min(20,score);sparkle(14);save();alert(`終了！ ${reward}コイン獲得 🎉`) }},1000)}
$('#heart').onclick=()=>{if(!running)return;score++;$('#score').textContent=score;let h=$('#heart');h.textContent=Math.random()>.45?'♥':'♡';h.style.transform=`translate(${Math.random()*42-21}px,${Math.random()*24-12}px) scale(${.85+Math.random()*.4})`}
render();