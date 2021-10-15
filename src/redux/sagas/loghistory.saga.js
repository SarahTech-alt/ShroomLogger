import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SECRETS" actions
function* fetchLogHistory() {
    console.log('in fetch log history saga');
    const response = yield axios.get('/api/mushroom');
    yield console.log(response);
    yield put({ type: 'SET_LOG_HISTORY', payload: response.data });
  }

function* fetchLogDetail(action) {
  console.log('in fetch log detail', action.payload);
  
    const logId = action.payload;
    console.log('the selected log is', logId);
    const response = yield axios.get(`/api/mushroom/edit/${logId}`);
    yield put({ type: 'SET_LOG_DETAIL', payload: response});
}

function* deleteSelectedLog(action) {
  console.log('in delete saga');
  console.log(action.payload);
  yield axios.delete(`/api/mushroom/delete/${action.payload.id}`)
}

  function* logSaga() {
    yield takeLatest('FETCH_LOGS', fetchLogHistory);
    yield takeLatest('SET_SELECTED_LOG', fetchLogDetail);
    yield takeLatest('DELETE_SELECTED_LOG', deleteSelectedLog)
  }



export default logSaga;