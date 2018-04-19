const Request = require('./services/request.js');
const BucketView = require('./views/bucket.js');

const bucketView = new BucketView();
const requestBucket = new Request('http://localhost:3000/api/bucket');
const requestCountries = new Request('https://restcountries.eu/rest/v2/all');


const getCountriesComplete = function(countries) {
  bucketView.populateSelect(countries);
}


const appStart = function() {
  console.log("DOM content loaded, app starting... ");
  requestCountries.get(getCountriesComplete);



  // Make Map

  const initializeMap = function(country) {
    const mapDiv = document.getElementById('bucket-map');
    const center = { lat: country.lat, lng: country.lng };
    const mainMap = new MapWrapper(mapDiv, center, 16);

    mainMap.addInfoWindow(center, `<h2>${country.name}</h2>`); //+
  }
}

document.addEventListener('DOMContentLoaded', appStart);
