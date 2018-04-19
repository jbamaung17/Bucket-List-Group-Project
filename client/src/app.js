const Request = require('./services/request.js');
const CountryView = require('./views/countryView.js');
const MapWrapper = require('./views/mapWrapper.js');

const countriesRequest = new Request("https://restcountries.eu/rest/v2/all")
const dbrequest = new Request("/api/countries");

const countryView = new CountryView();



const getCountryDetails = function(country) {
  const countryDetails = {
    name: country.name,
    population: country.population,
    capital: country.capital,
    flag: country.flag,
    latlng: country.latlng
  };

  return countryDetails;
}

const populateList = function(countries) {

  const selector = document.getElementById('select-country');

  for (let country of countries) {
    const option = document.createElement('option');
    const countryDetails = getCountryDetails(country);
    option.value = JSON.stringify(countryDetails); // value is JSON object
    option.innerText = country.name;
    selector.appendChild(option);
  }

}

const populateBucketList = function(countries) {
  countries.forEach(country => countryView.addCountry(country));
}


const saveCountry = function() {
  const countrySelector = document.getElementById('select-country');
  const selectedCountryJSON = countrySelector.value;
  const selectedCountryObj = JSON.parse(selectedCountryJSON);

  dbrequest.post(saveRequestComplete, selectedCountryObj);
}

const saveRequestComplete = function(countryToSave) {
  countryView.addCountry(countryToSave);
}


const initializeMap = function() {
  const container = document.getElementById("bucket-map");
  const center = { lat: 0, lng: 0 };
  const zoom = 2;
  const map = new MapWrapper(container, center, zoom);
};

const clearBucketList = function() {
  dbrequest.delete(countryView.clearList);
}


const app = function() {
  countriesRequest.get(populateList);
  initializeMap();
  dbrequest.get(populateBucketList);

}

document.addEventListener('DOMContentLoaded', app);
