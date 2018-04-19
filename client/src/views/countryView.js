const CountryView = function() {
  this.countries = [];
}

CountryView.prototype.addCountry = function(country) {
  this.countries.push(country);
  this.render(country);
};

CountryView.prototype.render = function(country) {
  const bucketList = document.getElementById('country-list');

  const li = this.formatCountryData(country);
  bucketList.appendChild(li);
};

CountryView.prototype.formatCountryData = function(country) {
  const li = document.createElement('li');
  li.className = 'country-list-item';
  const span = document.createElement('span')
  // name
  const name = document.createElement('span');
  name.className = 'countryName';
  name.innerText = `${country.name}`;

  // flag
  const flag = document.createElement('img');
  flag.className = 'flag-img';
  flag.setAttribute("width", 50)
  flag.src = country.flag;
  li.appendChild(span);
  span.appendChild(flag);
  span.appendChild(name);
  return li;
};

CountryView.prototype.clearList = function() {
  this.countries = [];
  const bucketList = document.getElementById('bucket-list');
  bucketList.innerHTML = "";
};

module.exports = CountryView;
