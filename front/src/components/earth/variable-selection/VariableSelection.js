import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VariableSelection.css';

import { updateOptions } from '../../../redux/actions'

class VariableSelection extends Component {
  render() {
    const { options, updateOptions } = this.props;
    return (
      <div className="variable-selection-wrap">
        <div className="variable-selection-inner-wrap themed">
          <button
            className={`variable-option ${options.variable === 'cases' ? 'active' : ''}`}
            onClick={() => options.variable !== 'cases' && updateOptions({ variable: 'cases' })}
          >
            Cases
          </button>
          <button
            className={`variable-option ${options.variable === 'deaths' ? 'active' : ''}`}
            onClick={() => options.variable !== 'deaths' && updateOptions({ variable: 'deaths' })}
          >
            Deaths
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  options: state.options,
})
const mapDispatchToProps = dispatch => ({
  updateOptions: (options, duration, easing) => dispatch(updateOptions(options)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariableSelection);
