import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getLocation() {
    const response = yield axios.post('/api/map');
    yield put({ type: 'SET_LOCATION', payload: response.data });
    yield put({ type: 'SET_LOCATION_TO_SEND', payload: response.data });
}




function* mapSaga() {
    yield takeLatest('GET_LOCATION', getLocation)
}

export default mapSaga;