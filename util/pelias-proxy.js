// takes an array of features, queries ES database to get the original documents
// assigns meta properties to each feature, returns the array of features
var rp = require('request-promise');
var config = require('pelias-config').generate();

function peliasProxy(req) {

  // query pelias api
  var peliasURL = `http://${config.api.host}:4000${req.originalUrl}`
  return rp(peliasURL)
    .then((body) => {
      return JSON.parse(body)
    });
}

module.exports = peliasProxy;
