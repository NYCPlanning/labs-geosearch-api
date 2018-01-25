// takes an array of features, queries ES database to get the original documents
// assigns meta properties to each feature, returns the array of features
const rp = require('request-promise');
const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

function assignMeta(features) {
  const ids = features.map(feature => feature.properties.id);
  console.log(ids);

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
      const hits = resp.hits.hits;
      hits.forEach((result, i) => {
        const { meta } = result._source;
        Object.assign(features[i].properties, meta);
      })

  }, function (err) {
      console.trace(err.message);
  });
}

module.exports = assignMeta;
