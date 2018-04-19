const Request = require('./services/request.js');
const BucketView = require('./views/bucket.js');

const bucketView = new BucketView();
const requestBucket = new Request('http://localhost:3000/api/bucket');
const requestCountries = new Request('https://restcountries.eu/rest/v2/all');


const getCountriesComplete = function(countries) {
  bucketView.populateSelect(countries);
}

const countrySelected = function(event){
  const country = document.querySelector("#option").value;

  request.post(createRequestComplete, country);
}

const createRequestComplete = function(response){
  BucketView.addCountry(reponse);
}

const deleteButtonClicked =
function(){
  request.delete(deleteRequestComplete);
}

const deleteRequestComplete = function{
  BucketView.clear();
}


const appStart = function() {
  console.log("DOM content loaded, app starting... ");
  requestCountries.get(getCountriesComplete);

  const whenCountrySelected = document.querySelector("#country-select");
  countrySelected.addEventListener("change", countrySelected);


  const whenDeleteButtonClicked =
  document.querySelector("#delete-button");
  whenDeleteButtonClicked.addEventListener("click", deleteButtonClicked);


document.addEventListener('DOMContentLoaded', appStart);
