import React, { Component } from 'react';

import VariableSelection from './variable-selection/VariableSelection';
import Count from './count/Count';
import DataDescriptions from './data-descriptions/DataDescriptions';

import './Earth.css';

class Earth extends Component {
  render() {
    const { nationalData } = this.props
    return (
      <div className="earth">
        <div id="earth-canvas-wrapper" />
        <div className="overlap-wrap">
          <VariableSelection />
          <Count nationalData={nationalData} />
          <DataDescriptions />
        </div>
      </div>
    );
  }
}

export default Earth;
