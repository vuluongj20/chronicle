const express = require('express');
const fs = require('fs');
const router = express.Router();

const counties = require('../data/counties.json');
const us = require('../data/us.json');
const world = require('../data/world.json');

const fetchCovidData = require('../utils/fetch-covid-data');
let [countyData, nationalData] = fetchCovidData();

setTimeout(() => {
  [countyData, nationalData] = fetchCovidData();
}, 24 * 60 * 60 * 1000);

router.get('/meta/counties', function(req, res, next) {
  res.json(counties);
});

router.get('/meta/world', function(req, res, next) {
  res.json(world);
});

router.get('/meta/us', function(req, res, next) {
  res.json(us);
});

router.get('/data/county', function(req, res, next) {
  res.json(countyData);
});

router.get('/data/national', function(req, res, next) {
  res.json(nationalData);
});

module.exports = router;
