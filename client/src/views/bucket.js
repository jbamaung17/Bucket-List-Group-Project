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
