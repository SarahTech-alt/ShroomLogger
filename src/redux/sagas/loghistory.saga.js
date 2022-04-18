import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchLogHistory() {
  const response = yield axios.get('/api/mushroom');
  yield put({ type: 'SET_LOG_HISTORY', payload: response.data });
}

function* fetchLogDetail(action) {
  const logId = action.payload;
  const response = yield axios.get(`/api/mushroom/detail/${logId}`);
  yield put({ type: 'SET_LOG_DETAIL', payload: response.data[0] });
}

function* deleteSelectedLog(action) {
  const logId = action.payload;
  yield axios.delete(`/api/mushroom/delete/${logId}`);
  yield put({ type: 'FETCH_LOGS' });
}

function* addMushroomLog(action) {
  const infoToAdd = action.payload;
  const newMushroomInfo =
    infoToAdd.newMushroom

  const addMushroom = yield axios.post('/api/mushroom', newMushroomInfo);
  yield put({ type: 'FETCH_LOGS' });
  yield put({ type: 'UNSET_NEW_LOG' })
}

function* postUpdatedLog(action) {
  try {
    const selectedLog = action.payload.logId
    const updatedMushroomDetails = action.payload.logInfo.logDetail;
    yield axios.put(`api/mushroom/editInfo/${selectedLog}`, updatedMushroomDetails);
    yield put({ type: 'FETCH_LOGS' })
  } catch (error) {
  }
}

function* logSaga() {
  yield takeLatest('FETCH_LOGS', fetchLogHistory),
    yield takeLatest('SET_SELECTED_LOG', fetchLogDetail),
    yield takeLatest('DELETE_SELECTED_LOG', deleteSelectedLog),
    yield takeLatest('ADD_NEW_MUSHROOM', addMushroomLog),
    yield takeLatest('EDIT_LOG_DETAILS', postUpdatedLog)
}

export default logSaga;