import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SECRETS" actions
function* fetchLogHistory() {
    console.log('in fetch log history saga');
    const response = yield axios.get('/api/mushroom');
    yield console.log(response);
    yield put({ type: 'SET_LOG_HISTORY', payload: response.data });
  }

function* fetchLogDetail(logId) {
    console.log('the selected log is', logId);
    const response = yield axios.get(`/api/mushroom/${logId}`);
    yield put({ type: 'SET_LOG_DETAIL', payload: response});
}

  function* logSaga() {
    yield takeLatest('FETCH_LOGS', fetchLogHistory);
    yield takeLatest('FETCH_LOG_DETAIL', fetchLogDetail)
  }



export default logSaga;