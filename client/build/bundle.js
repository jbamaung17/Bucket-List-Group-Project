/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);
const BucketView = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url){
  this.url = url;
}

Request.prototype.get = function(callback){
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function(){
    if(this.status !== 200) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });

  request.send();
};

Request.prototype.post = function(callback, body){
  const request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function(){
    if(this.status !== 201){
      return;
    }
    console.log(body);
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send(JSON.stringify(body));
};

Request.prototype.delete = function(callback){
  const request = new XMLHttpRequest();
  request.open("DELETE", this.url);
  request.addEventListener("load", function(){
    if(this.status !== 204){
      return;
    }
    callback();
  })
  request.send();
}

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var BucketView = function() {
  this.countries = [];
}

BucketView.prototype.addCountry = function(country) {
  this.countries.push(country);
  this.render(country);
};

BucketView.prototype.clear = function(country) {
  this.countries = [];
  const ul = document.querySelector("#countries");
  ul.innerHTML = '';
};

BucketView.prototype.populateSelect = function(countries) {
  const select = document.getElementById('country-select')
  countries.forEach(function(country, index) {
    let option = document.createElement('option')
    option.innerText = country.name
    option.value = index
    select.appendChild(option)
  })
  getCountry(countries);
}

const getCountry = function(countries) {
  const selectedCountry = document.querySelector('select')
  selectedCountry.addEventListener('change', function() {
    let country = countries[this.value]
  })
}

BucketView.prototype.countryDetails = function(country) {
  const div = document.getElementById('country-list')
  clearContent(div)
  const divCountry = document.createElement('div')
  divCountry.classList.add('country-div')
  const divImage = document.createElement('div')
  divImage.classList.add('image')
  const divDetails = document.createElement('div')
  divDetails.classList.add('div-details')
  const countryName = document.createElement('h3')
  countryName.innerText = country.name
  const countryImage = document.createElement('img')
  countryImage.src = country.flag
  countryImage.alt = country.name
  countryImage.classList.add('country_image')
  div.appendChild(divCountry)
  divCountry.appendChild(divImage)
  divCountry.appendChild(divDetails)
  divImage.appendChild(countryImage)
  divDetails.appendChild(countryName)
  return div
}

const saveCountry = function(country) {
  const jsonString = JSON.stringify(country);
  localStorage.setItem('currentcountry', jsonString);
}

const clearContent = function(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

module.exports = BucketView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map