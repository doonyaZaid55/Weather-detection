
async function getdata(countrycode){
    var t = await fetch(`http://api.weatherapi.com/v1/forecast.json?key= 493c8478737e4f96aa6232205231408&q=${countrycode}&days=3`)
    if (t.ok && 400 != t.status) {
           let countrycode = await t.json();
          displayCurrent(countrycode.location, countrycode.current),
          displayAnother(countrycode.forecast.forecastday)
    }
}
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthnames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(countrycode,t){
    if (null != t){
    var currentday = new Date(t.last_updated.replace(" ", "T"));
    let n=`<div class="card">
    <div class="forecast-header head1 d-flex justify-content-between align-items-center">
      <h6>${days[currentday.getDay()]}</h6>
      <h6>${currentday.getDate() + monthnames[currentday.getMonth()]}</h6>
    </div>
    <div class="card-body today-forecast">
        <div class="country">
         <h6>${countrycode.name}</h6>
        </div>
        <div class="degree d-flex">
          <h3>${t.temp_c}<sup>o</sup>C</h3>
          <img src="https:${t.condition.icon}" alt="sun">
        </div>
        <small>${t.condition.text}</small>
        <div class="list d-flex">
          <div class="event">
            <img src="icon-umberella@2x.png">
            <span>20%</span>
          </div>
          <div class="event">
            <img src="icon-wind@2x.png">
            <span>18km/h</span>
          </div>
          <div class="event">
            <img src="icon-compass.png" class="image">
            <span>East</span>
          </div>
      </div>
    </div>
  </div>`
    document.getElementById('demo').innerHTML=n ;
}}
document.getElementById('search').addEventListener('keyup',countrycode=>{
    getdata(countrycode.target.value)
})
function displayAnother(countrycode){
    let t=''
    for(var currentday =1;currentday < countrycode.length;currentday++){
         t+=`<div class="card">
         <div class="forecast-header head2 text-center">
           <h6>${days[new Date(countrycode[currentday].date.replace(" ", "T")).getDay()]}</h6>
         </div>
         <div class="card-body d-flex justify-content-center align-items-center flex-column"id="forecast2">
           <div class="forecast-icon mb-4">
             <img src="https:${countrycode[currentday].day.condition.icon}" alt="sun" width="48">
           </div>
           <div class="forecast-degree d-flex justify-content-center align-items-center flex-column mb-3" >
             <h5>${countrycode[currentday].day.maxtemp_c}<sup>o</sup>C</h5>
             <span>${countrycode[currentday].day.mintemp_c}<sup>o</sup></span>
           </div>
           <small class="mb-5">${countrycode[currentday].day.condition.text}</small>
         </div>
       </div>`
    }
    document.getElementById('demo').innerHTML += t;
 }
 getdata()