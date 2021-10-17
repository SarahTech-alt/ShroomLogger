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
    const response = yield axios.get(`/api/mushroom/detail/${logId}`);
    yield put({ type: 'SET_LOG_DETAIL', payload: response.data[0]});
}

function* deleteSelectedLog(action) {
  console.log('in delete saga');
  console.log('id in delete saga', action.payload);
  yield axios.delete(`/api/mushroom/delete/${action.payload}`);
  yield put({ type: 'FETCH_LOGS' });
}

function* addMushroomLog(action) {
  console.log('in add mushroom. new mushroom info', action.payload);
  yield axios.post('/api/mushroom', action.payload);
  yield put({ type:'FETCH_LOGS'});
}

function* postUpdatedLog(action) {
  try{
      const selectedLog = action.payload.logId
      console.log('log id to send to post in edit', selectedLog);
      const updatedMushroomDetails = action.payload.updatedMushroom;
      console.log('edited log info to send to post', updatedMushroomDetails);
      yield axios.put(`api/mushroom/editInfo/${selectedLog}`, updatedMushroomDetails);
      yield put({type:'FETCH_LOGS'})
  } catch (error) {
      console.log('something went wrong sending edited log to db', error);  
  }
}

function* postUpdatedPicture(action) {
  // updates the profile picture url in the database
  // then calls the get saga function to get
  // the most up to date profile information
  try{
      console.log('filename in put', action.payload);
      const fileName = {selectedFile: action.payload.logId};
      const selectedPhoto = {logId: action.payload}
      yield axios.put(`api/mushroom/picture/${selectedPhoto}`, fileName);
      yield put({type:'FETCH_LOGS'})
  } catch (error) {
      console.log('something went wrong sending edited photo to db', error);  
  }
}

  function* logSaga() {
    yield takeLatest('FETCH_LOGS', fetchLogHistory);
    yield takeLatest('SET_SELECTED_LOG', fetchLogDetail);
    yield takeLatest('DELETE_SELECTED_LOG', deleteSelectedLog);
    yield takeLatest('ADD_NEW_MUSHROOM', addMushroomLog);
    yield takeLatest('EDIT_LOG_DETAILS', postUpdatedLog),
    yield takeLatest('EDIT_LOG_PICTURE', postUpdatedPicture);
  }



export default logSaga;