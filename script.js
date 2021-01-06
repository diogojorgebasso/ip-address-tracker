const Pickerip = document.getElementById('ipaddres')
const PickerLocation = document.getElementById('location')
const Pickertimezone = document.getElementById('timezone')
const Pickerisp = document.getElementById('isp')
const button = document.getElementById('ipaddresSubmit')
const input = document.getElementById('input')
var map
findIp(fetch('https://geo.ipify.org/api/v1?apiKey=at_UoPVkEyC44YnP5UoN6xgIwrTIDln9')) //It will run on the background at the start

async function findIp(url4ip){
(url4ip).then((response) => {
  // The API call was successful!
  return response.json();
})
.then((data) => { //extract and insert the data
  let ip = data.ip
  let [lat, lng] = [data.location.lat, data.location.lng]
  let [city, region, zip, timezone] = [data.location.city, data.location.region, data.location.postalCode, data.location.timezone]
  var isp = data.isp ||'Not found!'
  let proxy = data.proxy.proxy || data.proxy.tor || data.proxy.vpn

  Pickerip.innerHTML = ip
  PickerLocation.innerHTML = `${city}, ${region} ${zip}`
  Pickertimezone.innerHTML = `UTC ${timezone}`
  Pickerisp.innerHTML = isp
  
  if (proxy){ //check for proxy
    alert(`For better results, consider desabling proxy`)
  } 
  ShowMap(lat,lng)
})
.catch((err) => {
    // There was an error
    console.warn('Something went wrong.', err);
  })}

function ShowMap(lat, lng){
  if (map != undefined) {
    map.remove();
}     
  map = L.map('map',{ zoomControl: false }).setView([lat, lng], 13);
  
  let blackIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    shadowUrl: 'images/icon-location.svg',
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGlvZ290ZXN0ZSIsImEiOiJja2prdzN5NXEwNnIzMzBuOHBvbTdzcWR0In0.p65WWekWRYb0CXZVBoeYPA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGlvZ290ZXN0ZSIsImEiOiJja2prdzN5NXEwNnIzMzBuOHBvbTdzcWR0In0.p65WWekWRYb0CXZVBoeYPA'
}).addTo(map);

  L.marker([lat, lng], { icon: blackIcon }).addTo(map)
    .bindPopup(`A marker for the specified location`)
    .openPopup();  
}

function ValidateIp(ip){
  const regex = new RegExp('\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b')
  if (!regex.test(ip)) {
    alert("Tem que ser um IP: XX.XXX.XX");
  }
  return regex.test(ip)
}
button.addEventListener('mouseclick',(e)=>{
  ValidateIp(input.value)
} )