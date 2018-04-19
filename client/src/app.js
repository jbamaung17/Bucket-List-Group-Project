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

document.addEventListener('DOMContentLoaded', appStart);
