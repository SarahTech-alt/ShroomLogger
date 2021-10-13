import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SECRETS" actions
function* fetchLogHistory() {
    const response = yield axios.get('/api/mushroom');
    yield console.log(response);
    yield put({ type: 'SET_LOG_HISTORY', payload: response.data });
  }

  function* logSaga() {
    yield takeLatest('FETCH_LOGS', fetchLogs);
  }



export default fetchLogHistory;