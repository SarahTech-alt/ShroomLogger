import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { response } from 'express';

function* fetchMushroomNames() {
  const mushroomNames = yield axios.get('/api/mushroom/userId');
  yield put({type: 'SET_NAMES', payload: mushroomNames});
}


function* mushroomNamesSaga() {
   yield takeEvery('FETCH_MUSHROOM_NAMES', fetchMushroomNames)
}

export default mushroomNamesSaga;