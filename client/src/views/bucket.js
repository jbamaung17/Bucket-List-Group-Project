var BucketView = function(){
  this.countries = [];
}

BucketView.prototype.addCountry = function(country){
  this.countries.push(country);
  this.render(country);
};

BucketView.prototype.clear = function(country){
  this.countries = [];
  const ul = document.querySelector("#countries");
  ul.innerHTML = '';
};

BucketView.prototype.createCountryDropdown = function (countries) {
  const select = document.getElementById('select-country');
  for (let country of countries) {
    const option = document.createElement('option');
    option.value = country;
    option.innerText = country.name;
    select.appendChild(option);
  }
};

BucketView.prototype.render = function(country){
  const ul = document.querySelector("#countries");
  const li = document.createElement('li');
  const text = document.createElement('p');
  text.innerText = `${country.name}`;
  li.appendChild(text);
  ul.appendChild(li);
}

module.exports = BucketView;
