import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { moveToDate } from './redux/actions'

import { getMonthArray, initializeCanvas } from './utils/init';

import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from './components/nav/Nav';
import Left from './components/left/Left';
import Right from './components/right/Right';

import './App.css';

const backendURL = process.env.NODE_ENV === 'development' ? 'http://192.168.1.74:8080' : ''
const worldSvgUrl = {
  l: '/data/world_l.svg',
  s: '/data/world_s.svg'
}

gsap.registerPlugin(ScrollToPlugin);
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
  line: '#EAEAEA',
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
    this.updateLegend = this.updateLegend.bind(this)
  }

  updateLegend(data) {
    this.setState({
      countyHoverData: data
    })
  }

  componentDidMount() {
    setTimeout(async () => {
      // INIT THREE.JS
      const { date, options } = this.props
      const worldUrl = window.innerWidth > 768 ? worldSvgUrl.l : worldSvgUrl.s
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
        wireframeMesh,
        baseGeometries,
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
          wireframeMesh,
          baseGeometries,
          renderer
        },
        monthArray,
        fontSize: +window
          .getComputedStyle(document.body, null)
          .getPropertyValue('font-size')
          .replace('px', '')
      })


      // SCROLLTRIGGER
      const vh = window.innerHeight/100
      // const threeTimelineCasesNormalized = getTimeline(countyData, cylinders, monthArray, {
      //   variable: 'cases',
      //   normalize: true,
      //   logScale: false,
      //   duration: 1
      // })
      // const threeTimelineDeathsNormalized = getTimeline(countyData, cylinders, monthArray, {
      //   variable: 'deaths',
      //   normalize: true,
      //   logScale: false,
      //   duration: 1
      // })
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
              ['.st-current-date-tag-wrap', '.count-wrap'],
              { duration: 1, opacity: 1 }
            )),
          trigger: '.st-timeline-content',
          pin: false,
          start: `top-=${vh*5}px ${scrollerCenterPos}`,
          end: `top ${scrollerCenterPos}`,
          scrub: 0.2
        })

        function createCylinderTriggers(scrollerPos) {
          let prevKey
          baseGeometries.forEach((geometry, index) => {
            if (index !== baseGeometries.length - 1) {
              ScrollTrigger.create({
                trigger: `#st-${geometry.key}`,
                animation: gsap.to([cylinderMesh.morphTargetInfluences, wireframeMesh.morphTargetInfluences], {
                  duration: 1,
                  0: 1,
                }),
                start: `end ${scrollerPos}`,
                endTrigger: `#st-${baseGeometries[index + 1].key}`,
                end: `end ${scrollerPos}`,
                markers: true,
                scrub: 0.2,
                onLeave: () => {
                  if (index < baseGeometries.length - 2) {
                    cylinderMesh.geometry.dispose()
                    cylinderMesh.geometry = baseGeometries[index + 1]
                    wireframeMesh.geometry.dispose()
                    wireframeMesh.geometry = baseGeometries[index + 1]
                  }
                },
                onLeaveBack: () => {
                  if (index < baseGeometries.length - 2) {
                    cylinderMesh.geometry.dispose()
                    cylinderMesh.geometry = baseGeometries[index]
                    cylinderMesh.morphTargetInfluences[0] = 1
                    wireframeMesh.geometry.dispose()
                    wireframeMesh.geometry = baseGeometries[index]
                    wireframeMesh.morphTargetInfluences[0] = 1
                  }
                }
              })
              prevKey = geometry.key
            }
          })
        }

        setTimeout(() => createCylinderTriggers('center'), 100)

        // ScrollTrigger.create({
        //   id: 'main-timeline-cases-normalized',
        //   animation: threeTimelineCasesNormalized,
        //   trigger: '.st-timeline-content',
        //   pin: false,
        //   start: `top-=${vh*2.5}px ${scrollerCenterPos}`,
        //   end: `bottom ${scrollerCenterPos}`,
        //   scrub: 0.2,
        //   onLeaveBack: () => this.props.moveToDate(countyData.range.start),
        //   onLeave: () => this.props.moveToDate(countyData.range.end)
        // }).disable()
        // ScrollTrigger.create({
        //   id: 'main-timeline-deaths-normalized',
        //   animation: threeTimelineDeathsNormalized,
        //   trigger: '.st-timeline-content',
        //   pin: false,
        //   start: `top-=${vh*2.5}px ${scrollerCenterPos}`,
        //   end: `bottom ${scrollerCenterPos}`,
        //   scrub: 0.2,
        //   onLeaveBack: () => this.props.moveToDate(countyData.range.start),
        //   onLeave: () => this.props.moveToDate(countyData.range.end)
        // }).disable()
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
      const oldId = `main-timeline-${oldVariable}${oldNormalize ? '-normalized' : ''}`
      const newId = `main-timeline-${variable}${normalize ? '-normalized' : ''}`
      const oldTrigger = ScrollTrigger.getById(oldId)
      const newTrigger = ScrollTrigger.getById(newId)
      oldTrigger.disable()
      newTrigger.enable()
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
      countyData,
      nationalData,
      three,
      monthArray,
      loading,
      countyHoverData
    } = this.state
    return (
      <div id="App" style={globalStyles}>
        <Nav />
        <div className="main-content">
          <Left
            loading={loading}
            countyData={countyData}
            nationalData={nationalData}
            cylinders={three.cylinders}
            monthArray={monthArray}
            countyHoverData={countyHoverData}
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
  date: state.date,
  options: state.options,
  playing: state.playback.playing
})
const mapDispatchToProps = dispatch => ({
  moveToDate: (date) => dispatch(moveToDate(date)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
