import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CountyInfo.css';

class CountyInfo extends Component {
  constructor(props) {
    super(props)
    this.panelRef = React.createRef()
    this.movePanel = this.movePanel.bind(this)
  }

  movePanel(e) {
    const x = e.clientX
    const y = e.clientY
    if (this.panelRef.current) {
      this.panelRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.movePanel)
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.movePanel)
  }
  render() {
    const { countyData, hoverData, date } = this.props;
    if (hoverData) {
      const caseData = getCasesFromFips(countyData, date, hoverData.fips)
      let caseRate = caseData && hoverData.population && caseData.cases && (caseData.cases / hoverData.population * 100000)
      let deathRate = caseData && hoverData.population && caseData.deaths && (caseData.deaths / hoverData.population * 100000)
      return (
        <div ref={this.panelRef} className="county-info-panel">
          <p className="county-info-name">{`${hoverData.name}, ${hoverData.state}`}</p>
          <div className="county-info-divider" />
          <div className="county-info-rows">
            <div className="county-info-row-names">
              {!!caseData.cases && <p>Cases:</p>}
              {!!caseData.deaths && <p>Deaths:</p>}
              {!!hoverData.population && <p>Population:</p>}
              {!!caseRate && <p>Cases/100k:</p>}
              {!!deathRate && <p>Deaths/100k:</p>}
            </div>
            <div className="county-info-row-data">
              {!!caseData.cases && <p>{caseData.cases.toLocaleString('en-US')}</p>}
              {!!caseData.deaths && <p>{caseData.deaths.toLocaleString('en-US')}</p>}
              {!!hoverData.population && <p>{hoverData.population.toLocaleString('en-US')}</p>}
              {!!caseRate && <p>{caseRate.toLocaleString('en-US', { maximumFractionDigits : 2 })}</p>}
              {!!deathRate && <p>{deathRate.toLocaleString('en-US', { maximumFractionDigits : 2 })}</p>}
            </div>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({
  date: state.date
})

export default connect(
  mapStateToProps,
  null
)(CountyInfo);
