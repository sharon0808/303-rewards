const rewards=[
  {name:'平時考加 1 分',cost:2,icon:'📝',desc:'個人累計最多加 5 分。'},
  {name:'減功課 1 遍',cost:3,icon:'✏️',desc:'依老師指定的當次作業使用。'},
  {name:'甜心卡 1 張',cost:3,icon:'🍪',desc:'自行保管，想吃點心時找老師兌換。'},
  {name:'抽抽樂 1 次',cost:5,icon:'🎁',desc:'抽出 1～20 號的驚喜獎勵。'}
];
const prizes=['造型文具','限量商品','我想和他坐','幫我跟他說','同學幫我做','向老師許願','再睡五分鐘','星星加 5 倍','星星加 10 倍','星星加 20 倍','減功課','再抽一次','好棒 × 3 次','小組爬一格','免睡卡','午休時間看書','今天不用打掃','打工去賺星星','甜心卡 × 1','免罰金牌'];
const defaults={name:'',seat:'',stars:0,stamps:0,history:[]};
let data={...defaults,...JSON.parse(localStorage.getItem('class3cPassport')||'{}')};
const $=s=>document.querySelector(s);
const save=()=>localStorage.setItem('class3cPassport',JSON.stringify(data));
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
function render(){
  $('#studentName').value=data.name;$('#seatNo').value=data.seat;$('#starCount').textContent=data.stars;$('#stampCount').textContent=data.stamps;
  $('#starStrip').textContent='★'.repeat(data.stars)+'☆'.repeat(Math.max(0,5-data.stars));
  $('#rewardGrid').innerHTML=rewards.map((r,i)=>`<article class="reward-card"><span class="cost">${r.cost} 章</span><span class="reward-icon">${r.icon}</span><h3>${r.name}</h3><p>${r.desc}</p><button data-reward="${i}" ${data.stamps<r.cost?'disabled':''}>我要兌換</button></article>`).join('');
  $('#historyBody').innerHTML=data.history.map(h=>`<tr><td>${h.date}</td><td>−${h.cost}</td><td>${h.item}</td><td>✓ 已確認</td></tr>`).join('');
  $('#emptyHistory').hidden=data.history.length>0;save();
}
$('#studentName').addEventListener('input',e=>{data.name=e.target.value;save()});
$('#seatNo').addEventListener('input',e=>{data.seat=e.target.value.replace(/\D/g,'');e.target.value=data.seat;save()});
$('#addStar').addEventListener('click',()=>{data.stars++;if(data.stars===5){data.stars=0;data.stamps++;toast('集滿 5 顆星星，獲得 1 個棒棒章！🎉')}else toast('得到一顆星星！⭐');render()});
$('#removeStar').addEventListener('click',()=>{if(data.stars>0){data.stars--;render()}else toast('目前沒有星星可以扣除')});
let pending=null;
$('#rewardGrid').addEventListener('click',e=>{const btn=e.target.closest('[data-reward]');if(!btn)return;pending=rewards[btn.dataset.reward];$('#dialogTitle').textContent=`兌換「${pending.name}」？`;$('#dialogText').textContent=`將扣除 ${pending.cost} 個棒棒章，請讓老師按下確認。`;$('#confirmDialog').showModal()});
$('#confirmDialog').addEventListener('close',()=>{if($('#confirmDialog').returnValue==='confirm'&&pending){if(data.stamps<pending.cost)return toast('棒棒章不夠喔！');data.stamps-=pending.cost;data.history.unshift({date:new Date().toLocaleDateString('zh-TW'),cost:pending.cost,item:pending.name});toast('兌換成功！已加入紀錄');render()}pending=null});
$('#prizeList').innerHTML=prizes.map((p,i)=>`<li>${i+1}. ${p}</li>`).join('');
$('#drawButton').addEventListener('click',()=>{if(data.stamps<5)return toast('需要 5 個棒棒章才能抽獎');pending=rewards[3];$('#dialogTitle').textContent='老師確認開始抽獎？';$('#dialogText').textContent='確認後會扣除 5 個棒棒章並立刻開獎。';$('#confirmDialog').showModal();const once=()=>{if($('#confirmDialog').returnValue==='confirm'){let n=1+Math.floor(Math.random()*20);$('#drawBall').textContent=n;$('#drawTitle').textContent=prizes[n-1];$('#drawHint').textContent=`恭喜抽中第 ${n} 號獎項！`;}$('#confirmDialog').removeEventListener('close',once)};$('#confirmDialog').addEventListener('close',once)});
$('#clearData').addEventListener('click',()=>{if(confirm('確定清除這台裝置上的姓名、星星、棒棒章與兌換紀錄嗎？')){data={...defaults,history:[]};render();toast('資料已清除')}});
render();
