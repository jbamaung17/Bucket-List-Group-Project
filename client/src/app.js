// Make Map

var initializeMap = function(country){
  var mapDiv = document.getElementById('bucket-map');
  var center = {lat: country.lat, lng: country.lng};
  var mainMap = new MapWrapper(mapDiv, center, 16);


  mainMap.addInfoWindow(center, `<h2>${country.name}</h2>`; //+
}
