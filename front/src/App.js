import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getMonthArray, initializeCanvas } from './utils/init';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from './components/nav/Nav';
import Left from './components/left/Left';
import Right from './components/right/Right';

import './App.css';

const backendURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

gsap.registerPlugin(ScrollTrigger);

const styles = {
  theme: '#D5DD3C',
  themeDark: '#D0D926',
  heading: '#242424',
  body: '#333333',
  label: '#9B9B9B',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceHover: '#F1F1F1',
  surfaceElevated: '#EEEEEE',
  border: 'rgba(240, 240, 240, 0.8)',
  line: '#E1E1E1',
  lineLight: '#EEEEEE',
  shadow: '0 0 2em 0 rgba(0, 0, 0, 0.05)'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countyData: {},
      nationalData: {},
      three: {},
      monthArray: null,
      loading: true,
    }
  }

  componentDidMount() {
    setTimeout(async () => {
      // INIT THREE.JS
      const { options } = this.props
      const [
        { data: counties },
        { data: usTopo },
        { data: worldTopo },
        { data: countyData },
        { data: nationalData },
      ] = await Promise.all([
        axios.get(`${backendURL}/api/meta/counties`),
        axios.get(`${backendURL}/api/meta/us`),
        axios.get(`${backendURL}/api/meta/world`),
        axios.get(`${backendURL}/api/data/county`),
        axios.get(`${backendURL}/api/data/national`),
      ])
      const monthArray = getMonthArray(countyData.range)
      const {
        camera,
        orbitControls,
        cylinderMesh,
        baseCaseGeometries,
        baseDeathGeometries,
        renderer
      } = initializeCanvas(counties, usTopo, worldTopo, countyData, monthArray, options, this.updateLegend)
      document.getElementById('earth-canvas-wrapper').append(renderer.domElement)
      this.setState({
        countyData,
        nationalData,
        three: {
          camera,
          orbitControls,
          cylinderMesh,
          baseCaseGeometries,
          baseDeathGeometries,
          renderer
        },
        monthArray,
        fontSize: +window
          .getComputedStyle(document.body, null)
          .getPropertyValue('font-size')
          .replace('px', '')
      })

      this.baseGeometries = baseCaseGeometries


      // SCROLLTRIGGER
      const vh = window.innerHeight/100
      const createTriggers = (scrollerTopPos, scrollerCenterPos) => {
        ScrollTrigger.create({
          id: 'earth-in',
          animation: gsap.timeline()
            .add(gsap.to('.hero', {duration: 0.4, scale: 1.4, opacity: 0}), 0)
            .add(gsap.to('.earth', {duration: 1.6, scale: 1, opacity: 1}), 0.4),
          trigger: '.title-wrap',
          pin: false,
          start: `top ${scrollerTopPos}`,
          endTrigger: '.st-timeline-content',
          end: `top ${scrollerCenterPos}`,
          scrub: 0.2
        })
        ScrollTrigger.create({
          id: 'current-date-tag-in',
          animation: gsap.timeline()
            .add(gsap.to(
              ['.st-current-date-tag-wrap', '.count-wrap', '.data-descriptions-wrap'],
              { duration: 1, opacity: 1 }
            )),
          trigger: '.st-timeline-content',
          pin: false,
          start: `top-=${vh*5}px ${scrollerCenterPos}`,
          end: `top ${scrollerCenterPos}`,
          scrub: 0.2
        })

        const createCylinderTriggers = (scrollerPos) => {
          this.baseGeometries.forEach((geometry, index) => {
            if (index !== this.baseGeometries.length - 1) {
              ScrollTrigger.create({
                trigger: `#st-${geometry.key}`,
                animation: gsap.to(cylinderMesh.morphTargetInfluences, {
                  duration: 1,
                  0: 1,
                }),
                start: `end ${scrollerPos}`,
                endTrigger: `#st-${this.baseGeometries[index + 1].key}`,
                end: `end ${scrollerPos}`,
                scrub: 0.2,
                onLeave: () => {
                  if (index < this.baseGeometries.length - 2) {
                    cylinderMesh.geometry.dispose()
                    cylinderMesh.geometry = this.baseGeometries[index + 1]
                  }
                },
                onEnterBack: () => {
                  if (index < this.baseGeometries.length - 2) {
                    cylinderMesh.geometry.dispose()
                    cylinderMesh.geometry = this.baseGeometries[index]
                    cylinderMesh.morphTargetInfluences[0] = 1
                  }
                }
              })
            }
          })
        }

        setTimeout(() => createCylinderTriggers('center'), 100)
      }
      ScrollTrigger.matchMedia({
        "(min-aspect-ratio: 1/1)": () => createTriggers('top', 'center'),
        "(max-aspect-ratio: 1/1)": () => createTriggers('center', '75%'),
      })


      // RESIZE EVENT LISTENER
      let resizeTimer
      const resize = () => {
        const wrapperBBox = document.getElementById('earth-canvas-wrapper').getBoundingClientRect()
        renderer.setSize(wrapperBBox.width, wrapperBBox.height)
        camera.aspect = wrapperBBox.width/wrapperBBox.height
        camera.updateProjectionMatrix()
      }
      window.onresize = () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(resize, 250)
      }
      window.scrollTo(0, 0)
      this.setState({ loading: false })
    }, 2000)
  }

  componentDidUpdate(prevProps) {
    const {
      variable: oldVariable,
      normalize: oldNormalize,
      logScale: oldLogScale
    } = prevProps.options
    const { playbackSpeed: oldPlaybackSpeed } = prevProps
    const {
      variable,
      normalize,
      logScale
    } = this.props.options
    const { playbackSpeed } = this.props
    if (
      oldVariable !== variable
      || oldNormalize !== normalize
      || oldLogScale !== logScale
      || oldPlaybackSpeed !== playbackSpeed
    ) {
      const {
        cylinderMesh,
        baseCaseGeometries,
        baseDeathGeometries
      } = this.state.three
      const cylinderIndex = cylinderMesh.geometry.ind
      cylinderMesh.geometry.dispose()
      if (variable === 'cases') {
        this.baseGeometries = baseCaseGeometries
        cylinderMesh.geometry = baseCaseGeometries[cylinderIndex]
        cylinderMesh.material.color.set('#D5DD3C')
      } else if (variable === 'deaths') {
        this.baseGeometries = baseDeathGeometries
        cylinderMesh.geometry = baseDeathGeometries[cylinderIndex]
        cylinderMesh.material.color.set('#DD3CD5')
      }
    }
  }
  render() {
    const globalStyles = {
      '--theme': styles.theme,
      '--theme-dark': styles.themeDark,
      '--heading': styles.heading,
      '--body': styles.body,
      '--label': styles.label,
      '--background': styles.background,
      '--surface': styles.surface,
      '--surface-hover': styles.surfaceHover,
      '--surface-elevated': styles.surfaceElevated,
      '--border': styles.border,
      '--line': styles.line,
      '--line-light': styles.lineLight,
      '--shadow': styles.shadow
    }
    const {
      nationalData,
      three,
      monthArray,
      loading
    } = this.state
    return (
      <div id="App" style={globalStyles}>
        <Nav />
        <div className="main-content">
          <Left
            loading={loading}
            nationalData={nationalData}
            cylinders={three.cylinders}
            monthArray={monthArray}
          />
          <Right
            camera={three.camera}
            loading={loading}
            monthArray={monthArray}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  options: state.options
})

export default connect(
  mapStateToProps,
  null
)(App);
