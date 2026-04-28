const siswa=[
"Adrian Wansman Sugi","Afriyani Sholeha","Alberto Bryan","Azan Azhar M.",
"Azria Nurfadilla","Banu Arkana Mibras H.","Bintang Hafizh Khadaffi",
"Cakra Prayata N.","Dava Trian Putra","Eriel Riva Fahreza",
"Fadly Irsyad Febrian","Fahrido Hidayat","Geshia Mulia Perdana",
"Gilang Ardian Pratama","Hafidz Ridho Nur Fadilla","Hafizah Nur Afrilyani",
"Haikal Putra Lesmana","Harits Shilah Al'adhawi","Izyan Ghaisani Prasetyo",
"M. Syehan Sidik Latuconsina","Maira Luna Hastari","Malik Ahmad Al Ghazi S.",
"Marcellinus Nathan Doni K.","Mochamad Eryan Ferully","Moh. Zidha Aminnulloh",
"Muchamad Iqbal Kurniadi","Muhammad Baihaqi A.","Muhammad Al-Fiansyakh",
"Muhammad Raihan Febriano","Muhammad Reza Pratama","Putri Indah Lestari",
"Regita Irzaprilya Arbadya F.","Reno Setiawan","Samuel Cristian Sulayman",
"Umar Rafa Setiawan","Zaskia Salsabila","Zidan Alkaisar",
"Ziyan Rashif Priyandaru","M. Kafi Rasydan"
];

const tbody=document.getElementById("tbody");
const headerRow=document.getElementById("headerRow");
const select=document.getElementById("pilihSiswa");

siswa.forEach((n,i)=>{
 select.innerHTML+=`<option value="${i}">${n}</option>`;
});

function generate(){
 headerRow.innerHTML="<th>No</th><th>Nama</th>";
 let hari=[];
 let t=new Date(2026,0,1);

 while(t.getFullYear()==2026){
  let d=t.getDay();
  if(d>=1 && d<=5){
   hari.push(t.getDate());
   headerRow.innerHTML+=`<th>${t.getDate()}</th>`;
  }
  t.setDate(t.getDate()+1);
 }

 tbody.innerHTML="";
 siswa.forEach((n,i)=>{
  let row=`<tr><td>${i+1}</td><td>${n}</td>`;
  hari.forEach(()=>{
   row+=`<td><input type="checkbox" class="h${i}" onchange="update()"></td>`;
  });
  row+=`<td><input type="number" class="izin${i}" value="0"></td>`;
  row+=`<td><input type="number" class="sakit${i}" value="0"></td>`;
  row+=`<td><input type="number" class="dispen${i}" value="0"></td>`;
  row+=`<td><input type="number" class="alpha${i}" value="0"></td>`;
  row+="</tr>";
  tbody.innerHTML+=row;
 });
}

const chart=new Chart(document.getElementById("chart"),{
 type:"doughnut",
 data:{labels:["Hadir","Izin","Sakit","Dispen","Alpha"],datasets:[{data:[0,0,0,0,0]}]}
});

const rankChart=new Chart(document.getElementById("rankChart"),{
 type:"line",
 data:{labels:[],datasets:[{data:[]}]}
});

function update(){
 let idx=select.value;
 let hadir=document.querySelectorAll(`.h${idx}:checked`).length;
 let izin=parseInt(document.querySelector(`.izin${idx}`).value||0);
 let sakit=parseInt(document.querySelector(`.sakit${idx}`).value||0);
 let dispen=parseInt(document.querySelector(`.dispen${idx}`).value||0);
 let alpha=parseInt(document.querySelector(`.alpha${idx}`).value||0);

 chart.data.datasets[0].data=[hadir,izin,sakit,dispen,alpha];
 chart.update();

 let insight = hadir>20?"🔥 Sangat rajin":
 izin>hadir?"🟡 Sering izin":
 sakit>hadir?"🟠 Sering sakit":
 alpha>hadir?"🔴 Perlu perhatian":
 "⚖️ Seimbang";

 document.getElementById("insight").innerText=insight;

 let rank=[];
 siswa.forEach((n,i)=>{
  rank.push({n,had
