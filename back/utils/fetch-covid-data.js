const fetch = require('node-fetch');
const csv = require('csvtojson');

const counties = require('../data/counties');
const populationIndex = counties.schemaMapper.population
const countyDataUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv';
const nationalDataUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv';

const fetchCovidData = function() {
  const countyData = {};
  const countyRange = {};
  fetch(countyDataUrl)
    .then(res => res.text())
    .then(string => {
      csv({
        delimiter: ',',
        colParser: {
          date: 'string',
          county: 'string',
          state: 'string',
          fips: 'number',
          cases: 'number',
          deaths: 'number'
        }
      })
        .fromString(string)
        .then(data => {
          let currentDate;
          countyRange.start = data[0].date;
          countyRange.end = data[data.length - 1].date;
          data.forEach(row => {
            if (row.date && row.date !== currentDate) {
              countyData[row.date] = []
              currentDate = row.date
            }
            if (row.fips) {
              const county = counties.data.find(county => county[2] === row.fips)
              let start = countyData[currentDate].length
              while (countyData[currentDate].length > 0 && row.fips < countyData[currentDate][start - 1][0]) {
                start -= 1
              }
              countyData[row.date].splice(start, 0, [
                row.fips,
                row.cases,
                row.deaths,
                Math.max(+(row.cases/2000).toFixed(0), 1),
                Math.max(+(row.deaths/140).toFixed(0), 1),
                Math.max(county[populationIndex] > 0 ? +(row.cases/county[populationIndex] * 500).toFixed(0) : 0.1, 1),
                Math.max(county[populationIndex] > 0 ? +(row.deaths/county[populationIndex] * 7000).toFixed(0) : 0.1, 1),
                Math.max(row.cases > 0 ? Math.max(+(Math.log(row.cases/2000) * 6).toFixed(0), 0) : 0.1, 1),
                Math.max(row.deaths > 0 ? Math.max(+(Math.log(row.deaths/140) * 4).toFixed(0), 0) : 0.1, 1),
                Math.max(county[populationIndex] > 0 && row.cases/county[populationIndex] > 0 ?
                  Math.max(+(Math.log(row.cases/county[populationIndex]*500) * 6).toFixed(0), 0)
                  : 0.1, 1),
                Math.max(county[populationIndex] > 0 && row.deaths/county[populationIndex] > 0 ?
                  Math.max(+(Math.log(row.deaths/county[populationIndex]*7000) * 4).toFixed(0), 0)
                  : 0.1, 1)
              ])
            }
          })
        })
    })

    const nationalData = {};
    const nationalRange = {};
    fetch(nationalDataUrl)
      .then(res => res.text())
      .then(string => {
        csv({
          delimiter: ',',
          colParser: {
            date: 'string',
            cases: 'number',
            deaths: 'number'
          }
        })
          .fromString(string)
          .then(data => {
            nationalRange.start = data[0].date;
            nationalRange.end = data[data.length - 1].date;
            data.forEach(row => {
              nationalData[row.date] = [row.cases, row.deaths]
            })
          })
      })
  return [
    {
      schemaMapper: {
        fips: 0,
        casesRaw: 1,
        deathsRaw: 2,
        cases: 3,
        deaths: 4,
        casesNormalized: 5,
        deathsNormalized: 6,
        casesLog: 7,
        deathsLog: 8,
        casesNormalizedLog: 9,
        deathsNormalizedLog: 10
      },
      range: countyRange,
      data: countyData
    },
    {
      schemaMapper: {
        cases: 0,
        deaths: 1,
      },
      range: nationalRange,
      data: nationalData
    }
  ];
}

module.exports = fetchCovidData
