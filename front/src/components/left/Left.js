import React, { Component } from 'react';

import Earth from '../earth/Earth';

import gsap from 'gsap';

import './Left.css';

class Left extends Component {
  componentDidMount() {
    gsap.to('.hero-cover-start', {
      duration: 1.6,
      ease: 'expo.inOut',
      scaleX: 0,
    })
  }
  render() {
    const { nationalData, cylinders, monthArray } = this.props
    const svgSrc = process.env.NODE_ENV === 'development' ? '/illustrations/hero.svg' : 'https://res.cloudinary.com/vuluongj20/image/upload/v1597470777/chronicle/hero.svg'
    return (
      <div className="left-wrap">
        <Earth
          nationalData={nationalData}
          cylinders={cylinders}
          monthArray={monthArray}
        />
      <img src={svgSrc} className="hero" />
        <div className="hero-cover-start" />
        <div className="hero-cover-end" />
      </div>
    );
  }
}

export default Left;
