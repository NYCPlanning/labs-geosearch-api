var express = require('express');
var rp = require('request-promise');
var config = require('pelias-config').generate();
var assignMeta = require('../util/assign-meta');
var peliasProxy = require('../util/pelias-proxy');

var router = express.Router();

router.get('/', (req, res) => {
  peliasProxy(req)
    .then((data) => {
      // append metadata
      assignMeta(data.features)
        .then(() => {
          res.send(data);
        });
    });
});

module.exports = router;
