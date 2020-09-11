import { select, call, put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from './actions';

import initializeCanvas from '../utils/init';

function* fetchCountyData(action) {
  try {
    const { data } = yield call(axios.get, 'http://localhost:8080/api/counties');
    yield put({type: actions.COUNTY_DATA_FETCH_SUCCEEDED, data});
  } catch (e) {
    yield put({type: actions.COUNTY_DATA_FETCH_FAILED, message: e.message});
  }
}
function* fetchCaseData(action) {
  try {
    const { data } = yield call(axios.get, 'http://localhost:8080/api/cases');
    yield put({type: actions.CASE_DATA_FETCH_SUCCEEDED, data});
  } catch (e) {
    yield put({type: actions.CASE_DATA_FETCH_FAILED, message: e.message});
  }
}

function* initialize(action) {
  try {
    yield all([
      fetchCountyData(),
      fetchCaseData()
    ])
    const counties = yield select(state => state.data.counties)
    const cases = yield select(state => state.data.cases)
    const threeObjects = initializeCanvas(counties, cases)
    document.getElementById('earth-canvas-wrapper').append(threeObjects.renderer.domElement)
    yield put({type: actions.SAVE_THREE_OBJECTS, objects: threeObjects})
    yield put({type: actions.INITIALIZATION_SUCCEEDED});
  } catch (e) {
    yield put({type: actions.INITIALIZATION_FAILED, message: e.message});
  }
}

function* rootSaga() {
  yield takeEvery(actions.INITIALIZATION_REQUESTED, initialize);
}

export default rootSaga;
