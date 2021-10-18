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

// send user uploaded image to profile.router
// for storage in AWS S3 bucket
function* uploadPhoto(action) {
  try {
      const { selectedFile, resizedFile } = action.payload;
      // The name seems to be dropped on resize, send the name from the
      // original selected file instead.
      const fileName = encodeURIComponent(selectedFile.name);
      const fileType = encodeURIComponent(resizedFile.type);
      const fileSize = encodeURIComponent(resizedFile.size);
      console.log('fileName', fileName);
      const formData = new FormData();
      formData.append('image', resizedFile);
      yield axios.post(`api/profile/s3?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
      yield put({type: 'POST_MUSHROOM_PHOTO', payload: fileName})
      // yield put({type:'FETCH_PROFILE_INFO'})
  } catch (error) {
      alert('Something went wrong when uploading a photo');
      console.log('Photo Upload - post request failed', error);
  }
}

function* postMushroomPhoto(action) {
  // updates the profile picture url in the database
  // then calls the get saga function to get
  // the most up to date profile information
  try{
      console.log('filename in put', action.payload);
      let fileName = {selectedFile: action.payload};
      const postedPhoto = yield axios.put('api/mushroom/photo', fileName);
      yield put({type:'SET_MUSHROOM_PIC'})
  } catch (error) {
      console.log('something went wrong sending photo to db', error);  
  }
}


  function* logSaga() {
    yield takeLatest('FETCH_LOGS', fetchLogHistory);
    yield takeLatest('SET_SELECTED_LOG', fetchLogDetail);
    yield takeLatest('DELETE_SELECTED_LOG', deleteSelectedLog);
    yield takeLatest('ADD_NEW_MUSHROOM', addMushroomLog);
    yield takeLatest('ADD_NEW_PHOTO', uploadPhoto),
    yield takeLatest('EDIT_LOG_DETAILS', postUpdatedLog),
    yield takeLatest('EDIT_LOG_PICTURE', postUpdatedPicture),
    yield takeLatest('POST_MUSHROOM_PHOTO', postMushroomPhoto)
  }



export default logSaga;