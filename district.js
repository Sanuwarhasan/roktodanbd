/* রক্তদান BD — জেলা পেজ: Firebase থেকে এই জেলার লাইভ ডোনার ও অনুরোধ */
(function(){
var D = window.DISTRICT;
var cfg = {apiKey:"AIzaSyDa6ZVCdvbQ0K3p4q77diiePx9lFsQOUmQ",authDomain:"roktodanbd.firebaseapp.com",projectId:"roktodanbd",storageBucket:"roktodanbd.firebasestorage.app",messagingSenderId:"982753175969",appId:"1:982753175969:web:606afaba989f07ba8f83e0"};
var GROUPS = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
var donors = [], reqs = [], group = "", upa = "";
function bn(n){return String(n).replace(/[0-9]/g,function(c){return "০১২৩৪৫৬৭৮৯"[c];});}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function wa(num,text){var n=String(num||"").replace(/\D/g,"");if(!n)return"";if(n.charAt(0)==="0")n="88"+n;return "https://wa.me/"+n+(text?"?text="+encodeURIComponent(text):"");}
function msg(g){return "আসসালামু আলাইকুম! \"রক্তদান - Blood Donate BD\" (roktodanbd.com) থেকে যোগাযোগ করছি। "+D.bn+"-এ জরুরি "+g+" রক্তের প্রয়োজন।\nরোগী: ____\nহাসপাতাল: ____\nতারিখ: ____\nআপনি কি দিতে পারবেন? 🩸";}
function msgr(fb){var m=String(fb||"").match(/^https?:\/\/(?:[a-z0-9-]+\.)?(?:facebook\.com|fb\.com)\/([A-Za-z0-9.\-]+)\/?(?:\?.*)?$/i);if(!m)return"";if(["profile.php","share","people","groups","pages","p","watch","photo","story.php"].indexOf(m[1].toLowerCase())>-1)return"";return "https://m.me/"+m[1];}
function $(id){return document.getElementById(id);}

function render(){
  var list = donors.filter(function(d){return (!group||d.group===group)&&(!upa||d.upazila===upa);});
  list.sort(function(a,b){return (a.avail==="no")-(b.avail==="no");});
  $("count").textContent = bn(list.length)+" জন রক্তদাতা পাওয়া গেছে";
  if(!list.length){
    $("grid").innerHTML='<div class="empty">😔 '+(group?group+" গ্রুপের ":"")+'কোনো রক্তদাতা '+(upa||D.bn)+'-এ এখনো নেই।<br><br><a class="btn btn-primary" href="/#register">✚ রক্তদাতা হিসেবে যুক্ত হোন</a> <a class="btn btn-ghost" href="/#requests">🚨 জরুরি অনুরোধ দিন</a></div>';
    return;
  }
  var h="";
  list.forEach(function(d){
    h+='<div class="card"><div class="top"><div class="badge"><span>'+esc(d.group)+'</span></div><div><h3>'+esc(d.name)+'</h3><div class="meta">📍 '+esc(d.area?d.area+", ":"")+esc(d.upazila&&d.upazila!=="অন্যান্য"?d.upazila+", ":"")+esc(d.district)+'</div></div></div>'
      +(d.avail==="no"?'<div class="avail no">🔴 আপাতত অপ্রস্তুত</div>':'<div class="avail yes">🟢 রক্ত দিতে প্রস্তুত</div>')
      +'<div class="acts"><a class="btn btn-primary" href="tel:'+esc(d.phone)+'">📞 কল</a><a class="btn btn-ghost" href="sms:'+esc(d.phone)+'?body='+encodeURIComponent(msg(d.group))+'">✉️ SMS</a>'
      +(d.wa?'<a class="btn btn-wa" target="_blank" rel="noopener" href="'+esc(wa(d.wa,msg(d.group)))+'">🟢 WhatsApp</a>':'')
      +(d.fb?(msgr(d.fb)?'<a class="btn btn-fb" target="_blank" rel="noopener nofollow" href="'+esc(msgr(d.fb))+'">💬 Messenger</a>':'<a class="btn btn-fb" target="_blank" rel="noopener nofollow" href="'+esc(d.fb)+'">📘 Facebook</a>'):'')
      +'</div></div>';
  });
  $("grid").innerHTML=h;
}
function stats(){
  var ready=donors.filter(function(d){return d.avail!=="no";}).length;
  $("sTotal").textContent=bn(donors.length); $("sReady").textContent=bn(ready); $("sReq").textContent=bn(reqs.length);
  var c={}; donors.forEach(function(d){c[d.group]=(c[d.group]||0)+1;});
  var chips=document.querySelectorAll(".chip[data-g]");
  for(var i=0;i<chips.length;i++){var g=chips[i].getAttribute("data-g");chips[i].textContent=g?g+" ("+bn(c[g]||0)+")":"সব";}
}
function renderReqs(){
  if(!reqs.length){$("reqs").innerHTML='<div class="empty">✅ '+D.bn+'-এ এই মুহূর্তে কোনো জরুরি অনুরোধ নেই।</div>';return;}
  var h="";
  reqs.forEach(function(r){
    h+='<div class="card req"><div class="top"><div class="badge"><span>'+esc(r.group)+'</span></div><div><h3>'+bn(r.bags||1)+' ব্যাগ '+esc(r.group)+' রক্ত</h3><div class="meta">🏥 '+esc(r.hospital)+'<br>🗓 '+esc(r.date)+(r.reason?' · '+esc(r.reason):'')+'</div></div></div>'
      +'<div class="acts"><a class="btn btn-primary" href="tel:'+esc(r.phone)+'">📞 কল</a><a class="btn btn-wa" target="_blank" rel="noopener" href="'+esc(wa(r.phone,"roktodanbd.com-এ আপনার "+r.group+" রক্তের অনুরোধ দেখলাম। আমি সাহায্য করতে চাই।"))+'">🟢 WhatsApp</a></div></div>';
  });
  $("reqs").innerHTML=h;
}
window.setGroup=function(g,el){group=g;var c=document.querySelectorAll(".chip[data-g]");for(var i=0;i<c.length;i++)c[i].classList.toggle("active",c[i]===el);render();};
window.setUpa=function(u){upa=u;$("upaSel").value=u;render();document.getElementById("donors").scrollIntoView({behavior:"smooth"});};

try{
  firebase.initializeApp(cfg);
  var db=firebase.firestore();
  db.collection("donors").where("district","==",D.bn).onSnapshot(function(s){
    donors=[];s.forEach(function(d){donors.push(d.data());});stats();render();
  },function(){ $("grid").innerHTML='<div class="empty">⚠️ ডেটা লোড হয়নি, পেজ রিফ্রেশ করুন।</div>'; });
  db.collection("requests").where("district","==",D.bn).where("status","==","open").onSnapshot(function(s){
    reqs=[];var y=new Date(Date.now()-86400000).toISOString().slice(0,10);
    s.forEach(function(d){var r=d.data();if(!r.date||r.date>=y)reqs.push(r);});
    reqs.sort(function(a,b){return (b.time||0)-(a.time||0);});stats();renderReqs();
  },function(){renderReqs();});
}catch(e){}
})();
