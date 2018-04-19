const Request = require('./services/request.js');
const CountryView = require('./views/countryView.js');
const MapWrapper = require('./views/mapWrapper.js');

const allCountriesRequest = new Request("https://restcountries.eu/rest/v2/all")
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

const populateCountriesList = function(allCountries) {

  const countrySelector = document.getElementById('select-country');

  for (let country of allCountries) {
    const option = document.createElement('option');
    const countryDetails = getCountryDetails(country);
    option.value = JSON.stringify(countryDetails); // value is JSON object
    option.innerText = country.name;
    countrySelector.appendChild(option);
  }

}

const populateBucketList = function(countries) {
  countries.forEach(country => countryView.addCountry(country));
}


const saveCountry = function() {
  const countrySelector = document.getElementById('country-select');
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
  allCountriesRequest.get(populateCountriesList);
  initializeMap();
  dbrequest.get(populateBucketList)


  const selectCountryButton = document.getElementById('select-country-button');
  selectCountryButton.addEventListener('click', function(event) {
    event.preventDefault();
    saveCountry();
  });

  const selectClearButton = document.getElementById('clear-list');
  selectClearButton.addEventListener('click', clearBucketList)
};



document.addEventListener('DOMContentLoaded', app);
