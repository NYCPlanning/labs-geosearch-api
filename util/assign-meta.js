// takes an array of features, queries ES database to get the original documents
// assigns meta properties to each feature, returns the array of features
var rp = require('request-promise');
var elasticsearch = require('elasticsearch');
var config = require('pelias-config').generate();


var client = new elasticsearch.Client({
  host: `${config.esclient.hosts[0].host}:9200`,
  log: 'trace'
});

function assignMeta(features) {
  var ids = features.map(feature => feature.properties.id);

  return client.search({
    index: 'pelias',
    body: {
      query: {
        ids: {
          type: 'address',
          values: ids,
        }
      }
    }
  }).then(function (resp) {
      var hits = resp.hits.hits;
      hits.forEach((result) => {
        var meta = result._source.meta;
        var feature = features.filter(d => d.properties.id === result._id)[0];
        Object.assign(feature.properties, meta);
      })

  }, function (err) {
      console.trace(err.message);
  });
}

module.exports = assignMeta;
