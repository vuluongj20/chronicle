export const MOVE_TO_DATE = 'MOVE_TO_DATE'
export const UPDATE_OPTIONS = 'UPDATE_OPTIONS'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const CHANGE_PLAYBACK_SPEED = 'CHANGE_PLAYBACK_SPEED'

export function moveToDate(date) {
  return {
    type: MOVE_TO_DATE,
    date
  }
}

export function updateOptions(options, duration = 1, ease = 'expo.out') {
  return {
    type: UPDATE_OPTIONS,
    options,
    duration,
    ease
  }
}

export function togglePlay(to) {
  return {
    type: TOGGLE_PLAY,
    to
  }
}

export function changePlaybackSpeed(speed = 1) {
  return {
    type: CHANGE_PLAYBACK_SPEED,
    speed
  }
}
