import React, { Component } from 'react';
import { connect } from 'react-redux';

import gsap from 'gsap';

import { moveToDate, updateOptions, togglePlay } from '../../../redux/actions'

import { getCursorXOffset, getNextDate, getRemainingDays } from '../../../utils/init';

import { ReactComponent as PlayIcon } from '../../../assets/icons/play_arrow.svg';
import { ReactComponent as PauseIcon } from '../../../assets/icons/pause.svg';

import './Timeline.css';

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fontSize: 14,
      hoverDate: '',
      currentDate: '',
      showHoverWrap: true,
    }

    this.timelineRef = React.createRef()
    this.cursorRef = React.createRef()
    this.hoverWrapRef = React.createRef()

    this.toggleHoverWrap = this.toggleHoverWrap.bind(this)
    this.updateHoverDate = this.updateHoverDate.bind(this)
    this.updateCursorOffset = this.updateCursorOffset.bind(this)
    this.updateHoverCursorOffset = this.updateHoverCursorOffset.bind(this)
    this.setPlay = this.setPlay.bind(this)
  }

  updateCursorOffset(e) {
    e.stopPropagation()
    const { fontSize } = this.props
    const target = e.currentTarget
    let xOffset = e.clientX - target.getBoundingClientRect().left + target.scrollLeft;

    if (xOffset > fontSize*2 && xOffset < target.scrollWidth - fontSize*1.6) {
      gsap.to(this.cursorRef.current, {
        duration: 0,
        x: xOffset
      })
    }
  }

  updateHoverCursorOffset(e) {
    e.stopPropagation()
    const target = e.currentTarget
    const xOffset = e.clientX - target.getBoundingClientRect().left + target.scrollLeft;
    this.hoverWrapRef.current.style.transform = `translate(${xOffset}px)`
  }

  updateHoverDate(monthIndex, dateIndex) {
    const { monthArray } = this.props
    const monthString = monthArray[monthIndex].name
    const dateString = monthIndex > 0 ?
      dateIndex + 1
      : dateIndex + monthArray[monthIndex].days - monthArray[monthIndex].daysCounted + 1
    this.setState({
      hoverDate: `${monthString} ${dateString}`
    })
  }

  toggleHoverWrap(to) {
    this.setState({
      showHoverWrap: to
    })
  }

  showDate(date, duration = 1, ease = 'expo.out') {
    const {
      countyData,
      cylinders,
      moveToDate,
      options,
      monthArray,
      playing
    } = this.props
    const repositionPlay = playing
    if (repositionPlay) {
      this.setPlay(false)
    }
    const isFirstMonth = monthArray[0].month === date.monthIndex + 1
    if (isFirstMonth) {
      date.dateIndex += monthArray[0].days - monthArray[0].daysCounted
    }
    const monthString = date.monthIndex + 1 > 9 ? date.monthIndex + 1 : `0${date.monthIndex + 1}`
    const dateString = date.dateIndex + 1 > 9 ? date.dateIndex + 1 : `0${date.dateIndex + 1}`
    const newDate = `${date.year}-${monthString}-${dateString}`

    updateCylinders(countyData, cylinders, newDate, {
      ...options,
      duration,
      ease
    })
    moveToDate(newDate)

    const fullMonthString = monthArray[date.monthIndex].name
    const fullDateString = date.dateIndex + 1
    this.setState({
      currentDate: `${fullMonthString} ${fullDateString}`
    })

    if (repositionPlay) {
      setTimeout(() => {
        this.setPlay(true)
      }, 0)
    }
  }

  setPlay(to) {
    if (to) {
      const {
        monthArray,
        date,
        playbackSpeed,
        togglePlay
      } = this.props
      const duration = 1 / playbackSpeed
      let proceed, currentDate = getNextDate(date, monthArray, 10)

      togglePlay(true)

      const moveToNextDate = () => {
        const { countyData, cylinders, options, moveToDate } = this.props
        while (proceed) {
          updateCylinders(countyData, cylinders, currentDate, {
            ...options,
            duration,
            ease: 'none'
          })
          this.moveCursorToDate(currentDate, {
            ...options,
            duration,
            ease: 'none'
          })
          moveToDate(currentDate);

          ([proceed, currentDate] = getNextDate(currentDate, monthArray, 10))
        }
        const remainingDays = getRemainingDays(currentDate)
        currentDate = getNextDate(currentDate, monthArray, remainingDays)

        updateCylinders(countyData, cylinders, currentDate, {
          ...options,
          duration: duration * (remainingDays/10),
          ease: 'none'
        })
        this.moveCursorToDate(currentDate, {
          ...options,
          duration,
          ease: 'none'
        })
        moveToDate(currentDate)

        setTimeout(() => {
          togglePlay(false)
        }, duration * (remainingDays/10) * 1000)
      }
      moveToNextDate()
      this.playbackInterval = setInterval(() => {
        if (typeof nextDate === 'number') {
          clearInterval(this.playbackInterval)
        }
        moveToNextDate()
      }, duration*1000)
    } else {
      const { togglePlay } = this.props
      togglePlay(false)
      clearInterval(this.playbackInterval)
      gsap.globalTimeline.pause()
      gsap.globalTimeline.clear()
      gsap.globalTimeline.restart()
    }
  }

  moveCursorToDate(date, options) {
    const { fontSize, monthArray } = this.props

    const xOffset = Math.ceil(getCursorXOffset(
      date,
      monthArray,
      1.6,
      10
    )*fontSize)
    gsap.to(this.cursorRef.current, {
      duration: options.duration,
      ease: options.ease,
      x: xOffset
    })

    const timeline = this.timelineRef.current
    if (xOffset > fontSize*1.6 && xOffset < timeline.scrollWidth - fontSize*1.2) {
      const maxScrollLeft = timeline.scrollWidth - timeline.offsetWidth
      const scrollLeft = Math.floor(Math.min(Math.max(xOffset - timeline.offsetWidth/2, 0), maxScrollLeft))
      gsap.to(timeline, {
        duration: options.duration,
        ease: options.ease,
        scrollTo: { x: scrollLeft }
      })
    }
  }

  componentDidMount() {
    const { date, options } = this.props
    this.moveCursorToDate(date, options)

    this.keyboardListener = e => {
      e.preventDefault()
      if (e.keyCode === 32) {
        this.setPlay(!this.props.playing)
      }
    }
    document.addEventListener('keydown', this.keyboardListener);

    let resizeTimer
    const resize = () => {
      this.setState({
        fontSize: +window
          .getComputedStyle(document.body, null)
          .getPropertyValue('font-size')
          .replace('px', '')
      })
    }
    this.resizeListener = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 250)
    }
    window.addEventListener('resize', this.resizeListener)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyboardListener);
    window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    const { hoverDate, showHoverWrap, currentDate } = this.state
    const { monthArray, playing } = this.props;
    return (
      <div className="timeline-wrap">
        <div className="play-wrap">
          <div className="play-inner-wrap">
            <button className="play-button" onClick={() => this.setPlay(!playing)}>
              {!playing && <PlayIcon className="play-button-icon" />}
              {playing && <PauseIcon className="pause-button-icon" />}
            </button>
          </div>
        </div>
        <div
          className="timeline"
          onMouseMove={e => this.updateHoverCursorOffset(e)}>
          <div
            ref={this.timelineRef}
            className="timeline-inner-wrap"
            onClick={e => this.updateCursorOffset(e)}
          >
            <div className="timeline-padding-left"
              onMouseEnter={() => this.toggleHoverWrap(false)}
              onMouseOut={() => this.toggleHoverWrap(true)}
            />
            {monthArray && monthArray.map((month, monthIndex) => {
              return (
                <div
                  key={`${month.year}-${month.month}`}
                  className="tl-month"
                  style={{ '--width-proportion': month.daysCounted / month.days }}>
                  <div className={`tl-ticks ${monthIndex === 0 ? 'align-right' : ''}`}>
                    <div className="tl-ticks-inner-wrap">
                      {[...Array(3)].map((el, index) => {
                        return (
                          <div className="tl-tick-section" key={index}>
                            {[...Array(5)].map((el, index) => {
                              return <div className="tl-tick" key={index}></div>
                            })}
                          </div>
                        )
                      })}
                    </div>
                    <div className="tl-click-area-month">
                      {[...Array(month.daysCounted)].map((el, dateIndex) => {
                        return (
                          <div
                            key={dateIndex}
                            className="tl-click-area-date"
                            onMouseUp={() => this.showDate({
                              year: month.year,
                              monthIndex,
                              dateIndex
                            }, 1, 'expo.out')}
                            onMouseEnter={() => this.updateHoverDate(monthIndex, dateIndex)}></div>
                        )
                      })}
                    </div>
                  </div>
                  <p className="tl-month-name">{month.name}</p>
                </div>
              )
            })}
            <div className="timeline-padding-right"
              onMouseEnter={() => this.toggleHoverWrap(false)}
              onMouseOut={() => this.toggleHoverWrap(true)}
            />
            <div ref={this.cursorRef} className="timeline-cursor-wrap">
              <div className="timeline-cursor">
                {currentDate && (
                  <div className="timeline-current-date-wrap">
                    <p className="timeline-current-date">{currentDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="timeline-hover-area">
            <div
              className={`timeline-hover-cursor-wrap ${showHoverWrap ? 'active' : 'inactive'}`}
              ref={this.hoverWrapRef}
            >
              <div className="timeline-hover-cursor" />
              {hoverDate && (
                <div className="timeline-hover-date-wrap">
                  <p className="timeline-hover-date">{hoverDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date,
  options: state.options,
  playing: state.playback.playing,
  playbackSpeed: state.playback.speed
})
const mapDispatchToProps = dispatch => ({
  moveToDate: (date) => dispatch(moveToDate(date)),
  updateOptions: (options, duration, ease) => dispatch(updateOptions(options, duration, ease)),
  togglePlay: (to) => dispatch(togglePlay(to)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
