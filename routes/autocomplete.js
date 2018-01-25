const express = require('express');
const rp = require('request-promise');
const assignMeta = require('../util/assign-meta');

const router = express.Router();

router.get('/', (req, res) => {

  let queryString = '';
  Object.keys(req.query).forEach((param, i) => {
    queryString += `${i > 0 ? '&' : ''}${param}=${req.query[param]}`
  });

  // query pelias api
  const peliasURL = `http://localhost:4000/v1/autocomplete?${queryString}`
  rp(peliasURL)
    .then((body) => {
    const data = JSON.parse(body)

    //query elasticsearch db
    assignMeta(data.features)
      .then(() => {
        res.send(data);
      });
  });
});

module.exports = router;
