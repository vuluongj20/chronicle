import React, { Component } from 'react';
import { connect } from 'react-redux';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'

import { moveToDate } from '../../../redux/actions'

import './ScrollTimeline.css';

const messages = {
  '2020-01-22': {
    text: "A man in Washington State is infected with the newly discovered coronavirus, the first confirmed case in the United States. Federal officials expand screenings at major airports. Life continues as normal for most Americans.",
    camera: {
      l: { x: -48, y: 106, z: 77 },
      s: { x: -41, y: 91, z: 66 },
    }
  },
  '2020-02-15': {
    text: "Total case number has slowly grown to 15. New cases are popping up in the East Coast. Future studies will suggest they came from Europe.",
  },
  '2020-02-29': {
    text: "The first death is recorded in the country. There are now 70 confirmed cases in the country.",
    camera: {
      l: { x: 16, y: 85, z: 107 },
      s: { x: 20, y: 81, z: 102 }
    }
  },
  '2020-03-13': {
    text: "President Trump declares a state of emergency. Total cases surpasses 2,000.",
    camera: {
      l: { x: -16, y: 112, z: 140 },
      s: { x: -16, y: 96, z: 117 }
    }
  },
  '2020-04-02': {
    text: "Cases tops 1 million. Nearly 10 million americans are out of work due to the health crisis.",
  },
  '2020-04-17': {
    text: "Protests against social distancing restrictions erupt in Michigan, Minnesota and Ohio.",
  },
  '2020-04-29': {
    text: "A National Institute of Health trial show that remdesivir, made by Gilead Sciences, can decrease COVID-19 recovery time.",
  },
  '2020-05-27': {
    text: "More than 100,000 people have died from the virus.",
  },
  '2020-06-10': {
    text: "Total cases reach 2 million.",
  },
  '2020-06-20': {
    text: "Southern U.S. states see sharp rise in cases. Florida and South Carolina breaks their single-day record for the third straight day.",
  },
  '2020-07-07': {
    text: "The Trump administration sends formal notice of U.S. withdrawal from the W.H.O. Total cases reach 3 million.",
  },
  '2020-07-23': {
    text: "Cases reach 4 million. It took 72 days to reach the first million, 69 days to reach the second, 27 to reach the third, and 16 days to reach the fourth.",
  },
  '2020-08-23': {
    text: "The U.S. Food and Drug Adminstration (FDA) issues emergency use authorization for convalescent plasma to treat COVID-19.",
  },
  '2020-09-11': {
    text: "Despite limited reopening and health precautions, American colleges and universities have reported more than 36,000 coronavirus cases.",
  },
  '2020-10-15': {
    text: "The U.S. climbs toward a third peak. Hospitals begin filling up, especially in the Midwest and Mountain West."
  },
  '2020-11-09': {
    text: "The vaccine maker Pfizer announces early testing result showing that its vaccine is more than 90% effective.",
  },
  '2020-12-12': {
    text: "The FDA issues emergency authorization for the Pfizer-BioNTech vaccine. Millions of doses are shipped out immediately.",
  },
}

const content = {
  loading: "Loading new data",
  scroll: "Scroll to begin"
}

class ScrollTimeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: null
    }
  }
  componentDidUpdate(prevProps) {
    const { date: prevDate, monthArray: prevMonthArray, loading: oldloading } = prevProps
    const { date, monthArray, loading } = this.props
    if (!loading && oldloading) {
      const vh = window.innerHeight/100
      gsap.to(['.st-current-date-ball', '.st-line-start'], {
        duration: 1.6,
        delay: 0.6,
        ease: 'expo.out',
        opacity: 1
      })
      gsap.to('.st-line', {
        duration: 0.8,
        delay: 0.6,
        ease: 'expo.in',
        scaleY: 1
      })
      gsap.to('.st-current-date-loading-text', {
          duration: 1.6,
          delay: 0.6,
          ease: 'expo.out',
          y: '-100%'
        }
      )
      gsap.to('.st-current-date-loading-wrap', {
          duration: 1.6,
          delay: 0.6,
          ease: 'expo.out',
          opacity: 0,
          onComplete: () => {
            const loader = document.getElementsByClassName('st-current-date-loading-wrap')[0]
            loader.parentNode.removeChild(loader)
          }
        }
      )
      gsap.to('.st-current-date-scroll-text', {
          duration: 1.6,
          delay: 0.6,
          ease: 'expo.out',
          opacity: 1,
          y: '-50%',
          onComplete: () => {
            ScrollTrigger.create({
              animation: gsap.timeline()
                .add(gsap.fromTo('.st-current-date-scroll-text', {opacity: 1}, {opacity: 0}), 0),
              start: 'top top',
              end: `top+=${vh*10}px top`,
              scrub: 0,
            })
          }
        }
      )
    }
    if (monthArray && !prevMonthArray) {
      this.setState({
        currentDate: `${monthArray[0].name} ${monthArray[0].days - monthArray[0].daysCounted}`
      }, () => {
        // Intersection Observer
        const optionsL = {
          rootMargin: '-50% 0% -50% 0%'
        }
        const optionsS = {
          rootMargin: '-75% 0% -25% 0%'
        }
        const callback = (entries, observer) => {
          let currentDate
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              currentDate = entry.target.dataset.date
            }
          })
          if (currentDate) {
            this.props.moveToDate(currentDate)
          }
        }
        this.observerL = new IntersectionObserver(callback, optionsL)
        this.observerS = new IntersectionObserver(callback, optionsS)
        setTimeout(() => {
          if (window.innerWidth > window.innerHeight) {
            document.querySelectorAll('.st-date-wrap').forEach(el => this.observerL.observe(el))
          } else {
            document.querySelectorAll('.st-date-wrap').forEach(el => this.observerS.observe(el))
          }
        }, 2)

        // SCROLL TRIGGER
        const { camera } = this.props
        const vh = window.innerHeight/100
        const createTriggers = (screen, scrollerPos) => {
          let prevKey;
          Object.keys(messages).forEach((messageKey, index) => {
            if (messages[messageKey].camera) {
              if (index === 0) {
                ScrollTrigger.create({
                  trigger: '.scroll-timeline-wrap',
                  animation: gsap.to(camera.position, {
                    duration: 1,
                    x: messages[messageKey].camera[screen].x,
                    y: messages[messageKey].camera[screen].y,
                    z: messages[messageKey].camera[screen].z
                  }),
                  start: `top-=${vh*5}px ${scrollerPos}`,
                  endTrigger: `#st-${messageKey}`,
                  end: `center ${scrollerPos}`,
                  scrub: 0.2
                })
              } else {
                ScrollTrigger.create({
                  trigger: `#st-${prevKey}`,
                  animation: gsap.fromTo(camera.position,
                    {
                      x: messages[prevKey].camera[screen].x,
                      y: messages[prevKey].camera[screen].y,
                      z: messages[prevKey].camera[screen].z
                    },
                    {
                      duration: 1,
                      x: messages[messageKey].camera[screen].x,
                      y: messages[messageKey].camera[screen].y,
                      z: messages[messageKey].camera[screen].z
                    }
                  ),
                  start: `center+=${vh*5}px ${scrollerPos}`,
                  endTrigger: `#st-${messageKey}`,
                  end: `center-=${vh*5}px ${scrollerPos}`,
                  scrub: 0.2
                })
              }
              prevKey = messageKey
            }
          })
        }
        setTimeout(() => {
          ScrollTrigger.matchMedia({
            "(min-aspect-ratio: 1/1)": () => createTriggers('l', 'center'),
            "(max-aspect-ratio: 1/1)": () => createTriggers('s', '75%')
          })
        }, 0)
      })
    }
    if (date !== prevDate) {
      const dateArray = date.split('-').map(el => +el)
      const month = monthArray.find(month =>
        month.year === dateArray[0] && month.month === dateArray[1]
      )
      this.setState({
        currentDate: `${month.name} ${dateArray[2]}`
      })
    }
  }
  componentDidMount() {
    let resizeTimer
    const resize = () => {
      if (window.innerWidth > window.innerHeight) {
        document.querySelectorAll('.st-date-wrap').forEach(el => {
          this.observerL.observe(el)
          this.observerS.unobserve(el)
        })
      } else {
        document.querySelectorAll('.st-date-wrap').forEach(el => {
          this.observerS.observe(el)
          this.observerL.unobserve(el)
        })
      }
    }
    this.resizeListener = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 250)
    }
    window.addEventListener('resize', this.resizeListener)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }
  render() {
    const { monthArray, loading } = this.props
    const { currentDate } = this.state
    return (
      <div className="scroll-timeline-wrap">
        <div className="st-line-wrap">
          <div className="st-line-start" />
          <div className="st-line" />
        </div>
        <div className="st-current-date-wrap">
          <div className="st-current-date-ball" />
          <div className="st-current-date-loading-wrap">
            <svg className="loading-circle-svg" width="2em" height="2em">
              <circle className="loading-circle"/>
            </svg>
            <p className="st-current-date-loading-text">{content.loading}</p>
          </div>
          <p className="st-current-date-scroll-text">{content.scroll}</p>
          <div className="st-current-date-tag-wrap">
            <p className="st-current-date-tag">{currentDate}</p>
          </div>
        </div>
        <div className={`st-top-padding ${loading ? '' : 'full'}`} />
        <div className="st-timeline-content">
          {!loading && monthArray && monthArray.map((month, monthIndex) => {
            return (
              <div className="st-month-wrap" key={`${month.year}-${month.month}`}>
                {[...Array(month.daysCounted)].map((_, dateIndex) => {
                  let date = dateIndex + 1
                  if (monthIndex === 0) {
                    date += month.days - month.daysCounted
                  }
                  const monthString = month.month > 9 ? month.month : `0${month.month}`
                  const dateString = date > 9 ? date : `0${date}`
                  const dateRep = `${month.year}-${monthString}-${dateString}`
                  return (
                    <div
                      key={`${month.year}-${month.month}-${date}`}
                      data-date={`${month.year}-${monthString}-${dateString}`}
                      id={`st-${month.year}-${monthString}-${dateString}`}
                      className="st-date-wrap"
                    >
                      {date === 1 && (
                        <div className="st-anchor-wrap">
                          <div className="st-month-anchor">{month.name}</div>
                        </div>
                      )}
                      {date === 10 && (
                        <div className="st-anchor-wrap">
                          <div className="st-date-anchor">10</div>
                        </div>
                      )}
                      {date === 20 && (
                        <div className="st-anchor-wrap">
                          <div className="st-date-anchor">20</div>
                        </div>
                      )}
                      {messages[dateRep] && (
                        <div className="st-message-wrap">
                          <div className="st-message-line" />
                          <div className="st-message-content">
                            <p className="st-message-date"></p>
                            <p className="st-message">
                              <span className="st-message-date">{`${month.name} ${date}. `}</span>
                              <span className="st-message-text">{messages[dateRep].text}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date,
})
const mapDispatchToProps = dispatch => ({
  moveToDate: (date) => dispatch(moveToDate(date)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollTimeline);
