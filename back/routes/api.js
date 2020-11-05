const express = require('express');
const fs = require('fs');
const router = express.Router();
const NodeCache = require("node-cache");

const counties = require('../data/counties.json');
const us = require('../data/us.json');
const world = require('../data/world.json');

const apiCache = new NodeCache({ checkperiod: 2*60, deleteOnExpire: false });
const cacheDuration = 24*60*60;
const { fetchCountyData, fetchNationalData } = require('../utils/fetch-covid-data');

apiCache.on('expired', async function(key, value) {
  switch (key) {
    case 'county-data':
      apiCache.set("county-data", await fetchCountyData, cacheDuration);
      break;
    case 'national-data':
      apiCache.set("national-data", await fetchNationalData, cacheDuration);
      break;
    default:
      break;
  }
})
const useCountyCache = function(req, res, next) {
  const countyData = apiCache.get("county-data")
  if (countyData) {
    res.json(countyData);
    return;
  } else {
    res.sendResponse = res.send
    res.send = (data) => {
      apiCache.set("county-data", data, cacheDuration);
      res.sendResponse(data)
    }
    next()
  }
}
const useNationalCache = function(req, res, next) {
  const nationalData = apiCache.get("national-data")
  if (nationalData) {
    res.json(nationalData);
    return;
  } else {
    res.sendResponse = res.send
    res.send = (data) => {
      apiCache.set("national-data", data, cacheDuration);
      res.sendResponse(data)
    }
    next()
  }
}

router.get('/meta/counties', function(req, res, next) {
  res.json(counties);
});

router.get('/meta/world', function(req, res, next) {
  res.json(world);
});

router.get('/meta/us', function(req, res, next) {
  res.json(us);
});

router.get('/data/county', useCountyCache, async function(req, res, next) {
  const countyData = await fetchCountyData;
  res.json(countyData);
});

router.get('/data/national', useNationalCache, async function(req, res, next) {
  const nationalData = await fetchNationalData;
  res.json(nationalData);
});

module.exports = router;
