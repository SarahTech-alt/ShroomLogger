import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMushroomNames() {
  
}


function* mushroomNamesSaga() {
   yield takeEvery('FETCH_MUSHROOM_NAMES', fetchMushroomNames)
}

export default mushroomNamesSaga;