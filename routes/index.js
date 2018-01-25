const express = require('express');
const autocomplete = require('./autocomplete');
const search = require('./search');

const router = express.Router();

router.use('/v1/autocomplete', autocomplete);
router.use('/v1/search', search);

module.exports = router;
