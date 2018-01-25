var express = require('express');
var autocomplete = require('./autocomplete');
var search = require('./search');

var router = express.Router();

router.use('/v1/autocomplete', autocomplete);
router.use('/v1/search', search);

module.exports = router;
