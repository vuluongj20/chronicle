const fetch = require('node-fetch');
const csv = require('csvtojson');
const request = require('request')

const counties = require('../data/counties');
const populationIndex = counties.schemaMapper.population
const countyDataUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv';
const nationalDataUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv';

function getMonthArray(range) {
  const reference = [
    { month: 1, name: 'Jan', days: 31 },
    { month: 2, name: 'Feb', days: 28 },
    { month: 3, name: 'Mar', days: 31 },
    { month: 4, name: 'Apr', days: 30 },
    { month: 5, name: 'May', days: 31 },
    { month: 6, name: 'Jun', days: 30 },
    { month: 7, name: 'Jul', days: 31 },
    { month: 8, name: 'Aug', days: 31 },
    { month: 9, name: 'Sep', days: 30 },
    { month: 10, name: 'Oct', days: 31 },
    { month: 11, name: 'Nov', days: 30 },
    { month: 12, name: 'Dec', days: 31 }
  ]
  const start = range.start.split('-')
  const end = range.end.split('-')
  const monthArray = []
  start.forEach((el, index) => start[index] = +el)
  end.forEach((el, index) => end[index] = +el)

  function checkIfLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
  }

  let currentYear = start[0]
  let currentMonth = start[1]
  while (currentYear !== end[0] || currentMonth !== end[1]) {
    const month = reference[currentMonth - 1]
    if (checkIfLeapYear(currentYear) && currentMonth === 2) {
      month.days = 29
    }
    month.year = currentYear
    month.daysCounted = month.days
    monthArray.push(month)
    if (currentMonth !== 12) {
      currentMonth += 1
    } else {
      currentMonth = 1
      currentYear += 1
    }
  }

  // Rewrite first month
  monthArray[0].daysCounted = monthArray[0].days - start[2] + 1

  // Add last month
  const lastMonth = reference[end[1] - 1]
  if (checkIfLeapYear(end[0]) && end[1] === 2) {
    lastMonth.days = 29
  }
  lastMonth.year = end[0]
  lastMonth.daysCounted = end[2]
  monthArray.push(lastMonth)
  return monthArray
}

function getNextDate(currentDate, monthArray, stepSize) {
  const dateArray = currentDate.split('-')
  dateArray.forEach((el, index) => dateArray[index] = +el)

  const currentMonthIndex = monthArray.findIndex(month => {
    return month.year === dateArray[0] && month.month === dateArray[1]
  })

  if (dateArray[2] + stepSize > monthArray[currentMonthIndex].days) {
    const nextDate = dateArray[2] + stepSize - monthArray[currentMonthIndex].days
    if (currentMonthIndex === monthArray.length - 1) {
      return [false, currentDate]
    }
    if (nextDate > monthArray[currentMonthIndex + 1].daysCounted) {
      return [false, currentDate]
    }
    dateArray[0] = monthArray[currentMonthIndex + 1].year
    dateArray[1] = monthArray[currentMonthIndex + 1].month
    dateArray[2] = nextDate
  } else {
    const nextDate = dateArray[2] + stepSize
    if (nextDate > monthArray[currentMonthIndex].daysCounted && currentMonthIndex !== 0) {
      return [false, currentDate]
    }
    dateArray[0] = monthArray[currentMonthIndex].year
    dateArray[1] = monthArray[currentMonthIndex].month
    dateArray[2] = nextDate
  }

  const monthString = dateArray[1] > 9 ? dateArray[1]: `0${dateArray[1]}`
  const dateString = dateArray[2] > 9 ? dateArray[2]: `0${dateArray[2]}`
  return [true, `${dateArray[0]}-${monthString}-${dateString}`]
}

function getRemainingDays(currentDate, monthArray) {
  const dateArray = currentDate.split('-')
  dateArray.forEach((el, index) => dateArray[index] = +el)

  const currentMonthIndex = monthArray.findIndex(month => {
    return month.year === dateArray[0] && month.month === dateArray[1]
  })

  if (currentMonthIndex === monthArray.length - 1) {
    return monthArray[currentMonthIndex].daysCounted - dateArray[2]
  } else {
    return monthArray[currentMonthIndex].days - dateArray[2] + monthArray[currentMonthIndex + 1].daysCounted
  }
}

const fetchCountyData = new Promise((resolve, reject) => {
  const countyData = {};
  const countyRange = {};

  let currentDate;
  countyRange.start = '2020-01-21'
  countyRange.end = '2020-12-20'

  let monthArray = getMonthArray(countyRange),
    nextDate = countyRange.start,
    proceed = true

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
    .fromStream(request.get(countyDataUrl))
    .subscribe((row, rowIndex)=>{
      return new Promise(resolve => {
        if (row.date && row.date !== currentDate && row.date === nextDate) {
          countyData[row.date] = []
          currentDate = row.date
          if (proceed) {
            ([proceed, nextDate] = getNextDate(currentDate, monthArray, 20))
          }
          if (!proceed) {
            nextDate = countyRange.end
          }
        }
        if (row.fips && row.date === currentDate) {
          const county = counties.data.find(county => county[2] === row.fips)
          let start = countyData[currentDate].length
          while (countyData[currentDate].length > 0 && row.fips < countyData[currentDate][start - 1][0]) {
            start -= 1
          }
          county && countyData[row.date].splice(start, 0, [
            row.fips,
            row.cases,
            row.deaths,
            Math.max(+(row.cases/2000).toFixed(0), row.cases ? 1 : 0),
            Math.max(+(row.deaths/140).toFixed(0), row.deaths ? 1 : 0),
            Math.max(county[populationIndex] > 0 ? +(row.cases/county[populationIndex] * 500).toFixed(0) : 0.1, row.cases ? 1 : 0),
            Math.max(county[populationIndex] > 0 ? +(row.deaths/county[populationIndex] * 7000).toFixed(0) : 0.1, row.deaths ? 1 : 0),
            Math.max(row.cases > 0 ? Math.max(+(Math.log(row.cases/2000) * 6).toFixed(0), 0) : 0.1, row.cases ? 1 : 0),
            Math.max(row.deaths > 0 ? Math.max(+(Math.log(row.deaths/140) * 4).toFixed(0), 0) : 0.1, row.deaths ? 1 : 0),
            Math.max(county[populationIndex] > 0 && row.cases/county[populationIndex] > 0 ?
              Math.max(+(Math.log(row.cases/county[populationIndex]*500) * 6).toFixed(0), 0)
              : 0.1, row.cases ? 1 : 0),
            Math.max(county[populationIndex] > 0 && row.deaths/county[populationIndex] > 0 ?
              Math.max(+(Math.log(row.deaths/county[populationIndex]*7000) * 4).toFixed(0), 0)
              : 0.1, row.deaths ? 1 : 0)
          ])
        }
        resolve()
      })
    }, () => {
      console.log('Error while parsing CSV file!')
    }, () => {
      resolve({
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
    })
  })
})

const fetchNationalData = new Promise((resolve, reject) => {
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
  .then(() => {
    resolve({
      schemaMapper: {
        cases: 0,
        deaths: 1,
      },
      range: nationalRange,
      data: nationalData
    })
  })
})

module.exports = {
  fetchCountyData,
  fetchNationalData
}
