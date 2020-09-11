import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Settings.css';

import { updateOptions, changePlaybackSpeed } from '../../../redux/actions'

import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSettings: false,
      showSettingsEventListener: null,
    }
    this.toggleSettings = this.toggleSettings.bind(this)
  }

  toggleSettings(e, to) {
    e.stopPropagation()
    const nextValue = to !== undefined ? to : !this.state.showSettings
    this.setState({
      showSettings: nextValue,
    })
  }

  componentDidMount() {
    this.keyboardListener = e => {
      if (e.keyCode === 27) {
        this.setState({
          showSettings: false,
        })
      }
    }
    document.addEventListener('keyup', this.keyboardListener);
  }

  componentDidUpdate(prevProps) {
    const { playing: oldPlaying } = prevProps
    const { playing } = this.props
    if (playing !== oldPlaying && playing) {
      this.setState({
        showSettings: false,
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyboardListener);
  }

  render() {
    const {
      showSettings
    } = this.state;
    const {
      options,
      updateOptions,
      playbackSpeed,
      changePlaybackSpeed
    } = this.props;
    return (
      <div className="settings-wrap">
        <div
          className={`settings-background-wrap ${showSettings ? 'active' : ''}`}
          onClick={(e) => this.toggleSettings(e, false)}>
        </div>
        <button
          className={`settings-button ${showSettings ? 'active' : ''}`}
          onClick={e => this.toggleSettings(e)}
        >
          <SettingsIcon className="settings-button-icon" />
          <p className="settings-button-text">Settings</p>
        </button>
        <div className={`settings-panel ${showSettings ? 'active' : ''}`}>
          <div className="settings-row">
            <p className="settings-text">Adjust for population</p>
            <div
              className={`switch ${options.normalize ? 'active' : ''}`}
              onClick={() => updateOptions({ normalize: !options.normalize })}>
              <div className="switch-slider" />
            </div>
          </div>
          <div className="settings-row">
            <p className="settings-text">Use log scale</p>
            <div
              className={`switch ${options.logScale ? 'active' : ''}`}
              onClick={() => updateOptions({ logScale: !options.logScale })}>
              <div className="switch-slider" />
            </div>
          </div>
          <div className="settings-row">
            <p className="settings-text">Playback speed</p>
            <div className="speed-selection-wrap">
              <button
                className={`speed-option ${playbackSpeed === 0.5 ? 'active' : ''}`}
                onClick={() => playbackSpeed !== 0.5 && changePlaybackSpeed(0.5)}
              >
                0.5x
              </button>
              <button
                className={`speed-option ${playbackSpeed === 1 ? 'active' : ''}`}
                onClick={() => playbackSpeed !== 1 && changePlaybackSpeed(1)}
              >
                1x
              </button>
              <button
                className={`speed-option ${playbackSpeed === 2 ? 'active' : ''}`}
                onClick={() => playbackSpeed !== 2 && changePlaybackSpeed(2)}
              >
                2x
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  options: state.options,
  playbackSpeed: state.playback.speed
})
const mapDispatchToProps = dispatch => ({
  updateOptions: (options, duration, easing) => dispatch(updateOptions(options)),
  changePlaybackSpeed: (speed) => dispatch(changePlaybackSpeed(speed)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
