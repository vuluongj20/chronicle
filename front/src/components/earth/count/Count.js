import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Count.css';

class Count extends Component {
  render() {
    const { date, variable, nationalData } = this.props;
    return (
      <div className="count-wrap">
        {nationalData &&
          nationalData.data &&
          nationalData.data[date] && (
          [<h2 className="count" key="count">
            {nationalData.data[date][nationalData.schemaMapper[variable]].toLocaleString('en-US')}
          </h2>,
          <p className="count-unit" key="count-unit">
            {`total ${variable} nation-wide`}
          </p>]
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date,
  variable: state.options.variable,
})

export default connect(
  mapStateToProps,
  null
)(Count);
