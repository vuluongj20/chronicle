import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DataDescriptions.css';

class DataDescriptions extends Component {
  render() {
    const { variable } = this.props;
    return (
      <div className="data-descriptions-wrap">
        <p className="dd-text">
          {`Bars represent county-level cumulative ${variable === 'cases' ? 'case' : 'death'} counts, adjusted for population`}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  variable: state.options.variable,
})

export default connect(
  mapStateToProps,
  null
)(DataDescriptions);
