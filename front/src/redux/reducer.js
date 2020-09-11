import { combineReducers } from 'redux';
import * as actions from './actions';

const initialOptions = {
  variable: 'cases',
  normalize: true,
  logScale: false,
  duration: 0,
  easing: 'expo.out'
}
const initialPlayback = {
  playing: false,
  speed: 1
}
const initialDate = '2020-05-16'

function date(state = initialDate, action) {
  if (action.type === actions.MOVE_TO_DATE) {
    return action.date
  } else {
    return state
  }
}
function options(state = initialOptions, action) {
  switch (action.type) {
    case actions.UPDATE_OPTIONS:
      return {
        ...state,
        ...action.options,
        duration: action.duration,
        ease: action.ease
      }
    default:
      return state
  }
}
function playback(state = initialPlayback, action) {
  switch (action.type) {
    case actions.TOGGLE_PLAY:
      return {
        ...state,
        playing: action.to !== undefined ? action.to : !state.playing
      }
    case actions.CHANGE_PLAYBACK_SPEED:
      return {
        ...state,
        speed: action.speed
      }
    default:
      return state
  }
}

const app = combineReducers({
  date,
  options,
  playback
})

export default app;
