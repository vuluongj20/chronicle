import { gsap } from 'gsap';
import { getNextDate, getRemainingDays } from './init';

function binarySearchFips(arr, fipsIndex, fips) {
  if (typeof fips === 'number') {
    let currentIndex = Math.floor((arr.length - 1)/2),
      start = 0,
      end = arr.length - 1,
      result
    while (!result) {
      if (arr[currentIndex][fipsIndex] === fips) {
        result = arr[currentIndex]
      } else if (arr[currentIndex][fipsIndex] > fips) {
        end = currentIndex
        currentIndex = Math.floor((end + start)/2)
      } else {
        start = currentIndex
        currentIndex = Math.ceil((end + start)/2)
      }
    }

    return result
  } else {
    return null
  }
}

export function updateCylinders(cases, cylinders, date, options) {
  const caseIndex = cases.schemaMapper

  const caseData = cases.data[date]
  const dataIndex = cases.schemaMapper[`${options.variable}${options.normalize ? 'Normalized' : ''}${options.logScale ? 'Log' : ''}`]
  let currentCaseIndex = 0

  cylinders.forEach((cylinder, index) => {
    if (caseData[currentCaseIndex] && caseData[currentCaseIndex][caseIndex.fips] === cylinder.county.fips) {
      const cylinderHeight = caseData[currentCaseIndex][dataIndex]
      if (options.variable === 'cases') {
        const cases = caseData[currentCaseIndex][caseIndex.casesRaw]
        cylinder.county.cases = cases
        cylinder.county.deaths = caseData[currentCaseIndex][caseIndex.deathsRaw]
        gsap.to(cylinder.material.color, {
          duration: options.duration,
          ease: options.ease,
          r: Math.max(Math.min(cylinderHeight/100 + 0.5, 0.8), 0.5),
          g: Math.max(Math.min(cylinderHeight/50 + 0.5, 1), 0.5),
          b: 0.5 - Math.max(Math.min(cylinderHeight/100, 0.5), 0)
        })
        if (cases !== 0) {
          gsap.to(cylinder.material, {
            duration: options.duration,
            ease: options.ease,
            opacity: Math.max(Math.min(cylinderHeight/10, 1), 0.4),
          })
        } else {
          gsap.to(cylinder.material, {
            duration: options.duration,
            ease: options.ease,
            opacity: 0,
          })
        }
      } else {
        const deaths = caseData[currentCaseIndex][caseIndex.deathsRaw]
        cylinder.county.deaths = deaths
        cylinder.county.cases = caseData[currentCaseIndex][caseIndex.casesRaw]
        gsap.to(cylinder.material.color, {
          duration: options.duration,
          ease: options.ease,
          r: 0.5 - Math.max(Math.min(cylinderHeight/140, 0.5), 0),
          g: Math.max(Math.min(cylinderHeight/140 + 0.5, 0.8), 0.5),
          b: Math.max(Math.min(cylinderHeight/70 + 0.5, 1), 0.5)
        })
        if (deaths !== 0) {
          gsap.to(cylinder.material, {
            duration: options.duration,
            ease: options.ease,
            opacity: Math.max(Math.min(cylinderHeight/16, 1), 0.4),
          })
        } else {
          gsap.to(cylinder.material, {
            duration: options.duration,
            ease: options.ease,
            opacity: 0,
          })
        }
      }
      gsap.to(cylinder.scale, {
        duration: options.duration,
        ease: options.ease,
        y: cylinderHeight,
      })
      currentCaseIndex += 1
    } else {
      gsap.to(cylinder.scale, {
        duration: options.duration,
        ease: options.ease,
        y: 0
      })
      gsap.to(cylinder.material, {
        duration: options.duration,
        ease: options.ease,
        opacity: 0,
      })
    }
  })
}

export function getTimeline(cases, cylinders, monthArray, options) {
  const caseIndex = cases.schemaMapper
  const dataIndex = cases.schemaMapper[`${options.variable}${options.normalize ? 'Normalized' : ''}${options.logScale ? 'Log' : ''}`]

  const timeline = gsap.timeline()

  let proceed = true
  let currentDate = cases.range.start
  let currentTime = 0

  const processDate = function (currentDate, currentTime, duration) {
    const caseData = cases.data[currentDate]
    let currentCaseIndex = 0

    cylinders.forEach((cylinder, index) => {
      if (caseData[currentCaseIndex] && caseData[currentCaseIndex][caseIndex.fips] === cylinder.county.fips) {
        const cylinderHeight = caseData[currentCaseIndex][dataIndex]
        if (options.variable === 'cases') {
          const cases = caseData[currentCaseIndex][caseIndex.casesRaw]
          timeline.add(
            gsap.to(cylinder.material.color, {
              duration,
              ease: 'none',
              r: Math.max(Math.min(cylinderHeight/100 + 0.5, 0.8), 0.5),
              g: Math.max(Math.min(cylinderHeight/50 + 0.5, 1), 0.5),
              b: 0.5 - Math.max(Math.min(cylinderHeight/100, 0.5), 0)
            }),
            currentTime
          )
          if (cases !== 0) {
            timeline.add(
              gsap.to(cylinder.material, {
                duration,
                ease: 'none',
                opacity: Math.max(Math.min(cylinderHeight/10, 1), 0.4),
              }),
              currentTime
            )
          } else {
            timeline.add(
              gsap.to(cylinder.material, {
                duration,
                ease: 'none',
                opacity: 0,
              }),
              currentTime
            )
          }
        } else {
          const deaths = caseData[currentCaseIndex][caseIndex.deathsRaw]
          timeline.add(
            gsap.to(cylinder.material.color, {
              duration,
              ease: 'none',
              r: 0.5 - Math.max(Math.min(cylinderHeight/140, 0.5), 0),
              g: Math.max(Math.min(cylinderHeight/140 + 0.5, 0.8), 0.5),
              b: Math.max(Math.min(cylinderHeight/70 + 0.5, 1), 0.5)
            }),
            currentTime
          )
          if (deaths !== 0) {
            timeline.add(
              gsap.to(cylinder.material, {
                duration,
                ease: 'none',
                opacity: Math.max(Math.min(cylinderHeight/16, 1), 0.4),
              }),
              currentTime
            )
          } else {
            timeline.add(
              gsap.to(cylinder.material, {
                duration,
                ease: 'none',
                opacity: 0,
              }),
              currentTime
            )
          }
        }
        timeline.add(
          gsap.to(cylinder.scale, {
            duration,
            ease: 'none',
            y: cylinderHeight,
          }),
          currentTime
        )
        currentCaseIndex += 1
      } else {
        timeline.add(
          gsap.to(cylinder.material.color, {
            duration,
            ease: 'none',
            r: 0.5,
            g: 0.5,
            b: 0.5
          }),
          currentTime
        )
        timeline.add(
          gsap.to(cylinder.scale, {
            duration,
            ease: 'none',
            y: 0
          }),
          currentTime
        )
        timeline.add(
          gsap.to(cylinder.material, {
            duration,
            ease: 'none',
            opacity: 0,
          }),
          currentTime
        )
      }
    });
  }

  processDate(currentDate, 0, 0.1)
  currentTime += 0.1;
  ([proceed, currentDate] = getNextDate(currentDate, monthArray, 10))
  while (proceed) {
    processDate(currentDate, currentTime, options.duration);

    ([proceed, currentDate] = getNextDate(currentDate, monthArray, 10))
    currentTime += 1
  }
  const remainingDays = getRemainingDays(currentDate, monthArray)
  processDate(cases.range.end, currentTime, remainingDays/10*options.duration)

  return timeline
}

export function getCasesFromFips(countyData, date, fips) {
  const data = countyData.data[date]
  const fipsIndex = countyData.schemaMapper.fips
  const result = binarySearchFips(data, fipsIndex, fips)
  return {
    cases: result[countyData.schemaMapper.casesRaw],
    deaths: result[countyData.schemaMapper.deathsRaw]
  }
}
