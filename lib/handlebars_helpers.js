var Handlebars = require('handlebars');
var _ = require('underscore');

Handlebars.registerHelper('address_string', function(object) {
  var addressArr = [object.city, object.region, object.countryCode];
  return _.compact(addressArr).join(', ');
});
