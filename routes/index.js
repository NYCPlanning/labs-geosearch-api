var express = require('express');
var autocomplete = require('./autocomplete');
var search = require('./search');
var peliasProxy = require('../util/pelias-proxy');

var router = express.Router();

router.use('/v1/autocomplete', autocomplete);
router.use('/v1/search', search);

// proxy all other requests
router.use('/v1', (req, res) => {
  peliasProxy(req)
    .then((data) => {
      if (!data.errors) res.status(400)
      res.send(data);
    });
})

module.exports = router;
