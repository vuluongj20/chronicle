import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import * as topojson from "topojson-client";

export function getMonthArray(range) {
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

export function getCursorXOffset(date, monthArray, startOffset = 1.6, monthWidth = 10) {
  const dateArray = date.split('-')
  dateArray.forEach((el, index) => dateArray[index] = +el)

  let offset = startOffset

  for (let i = 0; monthArray[i].year !== dateArray[0] || monthArray[i].month !== dateArray[1]; i++) {
    offset += monthWidth * (monthArray[i].daysCounted / monthArray[i].days)
  }
  offset += monthWidth * (dateArray[2] / monthArray[monthArray.length - 1].days)

  return offset
}

export function getNextDate(currentDate, monthArray, stepSize) {
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

export function getRemainingDays(currentDate, monthArray) {
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

export function initializeCanvas(counties, usTopo, worldTopo, cases, monthArray, options, updateLegend) {
  const countyIndex = counties.schemaMapper
  const caseIndex = cases.schemaMapper

  const wrapperBBox = document.getElementById('earth-canvas-wrapper').getBoundingClientRect()

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  const scene = new THREE.Scene()

  // WORLD WIREFRAMES
  function convertToVertex(long, lat, r) {
    const lambda = long * Math.PI / 180;
    const phi = lat * Math.PI / 180;
    return [
      r * Math.cos(phi) * Math.cos(lambda),
      r * Math.sin(phi),
      - r * Math.cos(phi) * Math.sin(lambda)
    ];
  }
  function draw(map, material) {
    const geometries = new Array(map.length)
    const originalGeometry = new THREE.BufferGeometry();
    let currentIndex = 0
    for (const county of map) {
      const geometry = originalGeometry.clone()
      const positions = []
      positions.push(...convertToVertex(county[0][0], county[0][1], 100))
      for (const coordinate of county.slice(1)) {
        positions.push(...convertToVertex(coordinate[0], coordinate[1], 100))
        positions.push(...convertToVertex(coordinate[0], coordinate[1], 100))
      }
      positions.push(...convertToVertex(county[county.length - 1][0], county[county.length - 1][1], 100))
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.computeBoundingSphere()
      geometries[currentIndex] = geometry
      currentIndex += 1
    }
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries)
    const mergedLines = new THREE.LineSegments(mergedGeometry, material)
    scene.add(mergedLines);
  }
  const world = topojson.mesh(worldTopo);
  const us = topojson.mesh(usTopo);
  draw(
    world.coordinates,
    new THREE.LineBasicMaterial({color: '#BBBBBB'})
  );
  draw(
    us.coordinates,
    new THREE.LineBasicMaterial({color: '#BBBBBB'})
  );

  // GLOBE
  const sphereGeometry = new THREE.SphereBufferGeometry(100, 48, 48)
  const sphereMaterial  = new THREE.MeshBasicMaterial({color: '#FFFFFF'})
  const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial )
  scene.add(sphereMesh)

  // MAIN GRAPH
  const originalCylinderGeometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 1, 4)
  const cylinderColor = new THREE.Color()

  function getMergedCylinderGeometry(counties, cases, options, date) {
    const cylinderGeometries = new Array(counties.data.length)
    const caseData = cases.data[date]
    const dataIndex = cases.schemaMapper[`${options.variable}${options.normalize ? 'Normalized' : ''}${options.logScale ? 'Log' : ''}`]
    let currentCaseIndex = 0

    counties.data.forEach((county, index) => {
      const cylinderGeometry = originalCylinderGeometry.clone()
      let cylinderHeight = 0
      if (caseData[currentCaseIndex] && caseData[currentCaseIndex][caseIndex.fips] === county[countyIndex.fips]) {
        cylinderHeight = caseData[currentCaseIndex][dataIndex]
        currentCaseIndex += 1
      }
      cylinderGeometry.translate(
        0,
        0.5,
        0
      )
      cylinderGeometry.scale(1, cylinderHeight, 1)
      cylinderGeometry.rotateX(Math.atan(county[countyIndex.z]/county[countyIndex.y]))
      cylinderGeometry.rotateZ(Math.atan(-county[countyIndex.x]/county[countyIndex.y]))
      cylinderGeometry.translate(
        county[countyIndex.x]*0.99,
        county[countyIndex.y]*0.99,
        county[countyIndex.z]*0.99
      )
      cylinderGeometry.county = {
        fips: county[countyIndex.fips],
        name: county[countyIndex.county],
        state: county[countyIndex.state],
        population: county[countyIndex.population],
      }

      cylinderGeometries[index] = cylinderGeometry
    })
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(cylinderGeometries, false);
    return mergedGeometry
  }

  let mergedCylinderGeometries = {}
  let proceed = true
  let currentDate = cases.range.start
  const processedDates = []

  while (proceed) {
    mergedCylinderGeometries[currentDate] = getMergedCylinderGeometry(
      counties,
      cases,
      options,
      currentDate
    )
    processedDates.push(currentDate);

    ([proceed, currentDate] = getNextDate(currentDate, monthArray, 10))
  }
  mergedCylinderGeometries[cases.range.end] = getMergedCylinderGeometry(
    counties,
    cases,
    options,
    cases.range.end
  )
  processedDates.push(cases.range.end)

  const baseGeometries = []
  for (let index in processedDates) {
    const key = processedDates[+index]
    const baseGeometry = mergedCylinderGeometries[key]
    baseGeometry.key = key
    if (+index !== processedDates.length - 1) {
      const attribute = mergedCylinderGeometries[processedDates[+index + 1]].getAttribute('position')
      attribute.name = `${processedDates[+index + 1]}`
      baseGeometry.morphAttributes.position = [attribute]
    }
    baseGeometries.push(baseGeometry)
  }

  const cylinderMaterial = new THREE.MeshPhongMaterial({
    color: '#cad22d',
    flatShading: true,
    morphTargets: true,
  })
  const cylinderMesh = new THREE.Mesh(baseGeometries[0], cylinderMaterial)
  scene.add(cylinderMesh)

  const wireframeMaterial = new THREE.LineBasicMaterial({
    color: '#FFFFFF',
    transparent: true,
    opacity: 0.05,
    morphTargets: true,
  })
  const wireframeMesh = new THREE.LineSegments(baseGeometries[0], wireframeMaterial)
  scene.add(wireframeMesh)

  // CAMERA
  const camera = new THREE.PerspectiveCamera(75, wrapperBBox.width/wrapperBBox.height, 0.1, 300)

  // ORBIT CONTROLS
  const orbitControls = new OrbitControls(camera, renderer.domElement)
  orbitControls.update()
  orbitControls.target.set(0, 0, 0)
  orbitControls.enableDamping = true
  orbitControls.dampingFactor = 0.1
  orbitControls.zoomSpeed = 0.3
  orbitControls.maxPolarAngle = Math.PI/1.1
  orbitControls.minPolarAngle = 0.1
  orbitControls.maxAzimuthAngle = Math.PI / 2.1
  orbitControls.minAzimuthAngle = -Math.PI / 2.1
  orbitControls.maxDistance = 360
  orbitControls.minDistance = 120

  // LIGHTS
  const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.8)
  const directionalLight = new THREE.DirectionalLight('#FFFFFF', 0.2)
  directionalLight.position.set(0, 0, 60)
  scene.add(ambientLight)
  scene.add(directionalLight)

  // RAYCASTER
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const containerBBox = document.getElementById('earth-canvas-wrapper').getBoundingClientRect()
  let intersectObject
  let intersectObjectColor
  function onMouseMove(e) {
  	mouse.x = ((e.clientX - containerBBox.left) / containerBBox.width) * 2 - 1
  	mouse.y = - ((e.clientY - containerBBox.top) / containerBBox.height) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove, false)


  // RENDER
  renderer.setSize(wrapperBBox.width, wrapperBBox.height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor('#FFFFFF', 1)
  renderer.render(scene, camera)

  // STATS
  const stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)

  // ANIMATE
  function render() {
    stats.begin();
    orbitControls.update()
    renderer.render(scene, camera)
    // raycaster.setFromCamera( mouse, camera )
    // var intersects = raycaster.intersectObjects( scene.children )
    // if (
    //   intersects.length > 0 &&
    //   intersects[0].object.geometry.type === 'CylinderBufferGeometry'
    // ) {
    //   if (intersects[0].object !== intersectObject) {
    //     if (intersectObject) {
    //       intersectObject.material.color.setRGB(
    //         intersectObjectColor.r,
    //         intersectObjectColor.g,
    //         intersectObjectColor.b
    //       )
    //     }
    //     intersectObjectColor = {
    //       r: intersects[0].object.material.color.r,
    //       g: intersects[0].object.material.color.g,
    //       b: intersects[0].object.material.color.b
    //     }
    //     intersectObject = intersects[0].object
    //     intersectObject.material.color.setRGB(1, 1, 0.4)
    //     updateLegend(intersects[0].object.county)
    //   }
    // } else {
    //   if (intersectObject) {
    //     intersectObject.material.color.setRGB(
    //       intersectObjectColor.r,
    //       intersectObjectColor.g,
    //       intersectObjectColor.b
    //     )
    //   }
    //   intersectObject = null
    //   updateLegend(null)
    // }
    stats.end();
  }
  function animate() {
    render()
    requestAnimationFrame(animate)
  }
  animate()

  return {
    camera,
    orbitControls,
    cylinderMesh,
    wireframeMesh,
    baseGeometries,
    renderer,
  }
}
