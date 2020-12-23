import React, { Component } from 'react';

import Earth from '../earth/Earth';

import gsap from 'gsap';

import './Left.css';

const svg = {
  src: {
    prod: 'https://res.cloudinary.com/vuluongj20/image/upload/v1597470777/chronicle/hero.svg',
    dev: '/illustrations/hero.svg'
  },
  alt: 'Colorful illustration of people wearing masks'
}

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
    return (
      <div className="left-wrap">
        <Earth
          nationalData={nationalData}
          cylinders={cylinders}
          monthArray={monthArray}
        />
      <img 
        src={process.env.NODE_ENV === 'development' ? svg.src.dev : svg.src.prod} 
        alt={svg.src.alt}
        className="hero" 
      />
        <div className="hero-cover-start" />
        <div className="hero-cover-end" />
      </div>
    );
  }
}

export default Left;
