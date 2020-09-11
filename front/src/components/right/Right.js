import React, { Component } from 'react';

import Title from './title/Title';
import ScrollTimeline from './scroll-timeline/ScrollTimeline';
import Footnotes from './footnotes/Footnotes';

import './Right.css';

class Right extends Component {
  render() {
    const { camera, monthArray, loading } = this.props
    return (
      <div className="right-wrap" id="right-wrap">
        <Title />
        <ScrollTimeline
          camera={camera}
          monthArray={monthArray}
          loading={loading}
        />
      {!loading && <Footnotes />}
      </div>
    );
  }
}

export default Right;
