const CountryView = function(){
  this.countries = [];
}

CountryView.prototype.addCountry = function (country) {
  this.countries.push(country);
  this.render(country);
};

CountryView.prototype.render = function (country) {
  const bucketList = document.getElementById('bucket-list');

  const li = this.formatCountryData(country);
  bucketList.appendChild(li);
};

CountryView.prototype.formatCountryData = function (country) {
    const li = document.createElement('li');
    country.className = 'country-list-item';
    // name
    const name = document.createElement('p');
    name.className = 'countryName';
    name.innerText = country.name;
    // capital
    const capital = document.createElement('p');
    capital.innerText = `Capital: ${country.capital}`;
    // population
    const pop = document.createElement('p');
    pop.innerText = `Population: ${country.population}`;
    // flag
    const flag = document.createElement('img');
    flag.className = 'flag-img';
    flag.src = country.flag;


    [name, capital, pop, flag].forEach(element => li.appendChild(element));

    return li;
};

CountryView.prototype.clearList = function () {
  this.countries = [];
  const bucketList = document.getElementById('bucket-list');
  bucketList.innerHTML = "";
};

module.exports = CountryView;
