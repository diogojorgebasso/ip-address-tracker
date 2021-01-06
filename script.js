const Pickerip = document.getElementById('ipaddres')
const PickerLocation = document.getElementById('location')
const Pickertimezone = document.getElementById('timezone')
const Pickerisp = document.getElementById('isp')

fetch('https://geo.ipify.org/api/v1?apiKey=at_UoPVkEyC44YnP5UoN6xgIwrTIDln9&ipAddress=8.8.8.8').then((response) => {
  // The API call was successful!
  return response.json();
}).then((data) => {
  // This is the JSON from our response
  [lat, lng] = [data.location.lat, data.location.lng]

  Pickerip.innerHTML = data.ip
  Pickerip.innerHTML = data.ip


}).catch((err) => {
    // There was an error
    console.warn('Something went wrong.', err);
  });

var map = L.map('map', {
  center: [lat, lng],
  zoom: 13
});

let blackIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  shadowUrl: 'images/icon-location.svg',
});

L.marker([lat, lng], { icon: blackIcon }).addTo(map)
  .bindPopup(`A marker for ${isp || 'no ISP found'}`)
  .openPopup();
