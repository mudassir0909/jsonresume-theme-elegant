var Handlebars = require('handlebars');

Handlebars.registerHelper('address_string', function(object) {
  var addressArr = [object.city, object.region, object.countryCode];
  addressArr = addressArr.filter(function(elem) {return elem != undefined});
  return addressArr.join(', ');
});
