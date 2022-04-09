import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMushroomPhotos() {
  const response = yield axios.get('/api/log/photo');
  yield put({ type: 'SET_MUSHROOM_PHOTOS', payload: response.data });
}

function* fetchLogPhotos(action) {
  const logId = action.payload;
  const response = yield axios.get(`/api/log/photo/${logId}`);
  yield put({ type: 'SET_LOG_PHOTO', payload: response.data[0] });
}

function* postUpdatedPhoto(action) {
  // updates the profile picture url in the database
  // then calls the get saga function to get
  // the most up to date profile information
  try {
    const fileName = { selectedFile: action.payload.logId };
    const selectedPhoto = { logId: action.payload }
    yield axios.put(`api/log/photo/${selectedPhoto}`, fileName);
    yield put({ type: 'FETCH_MUSHROOM_PHOTOS' })
  } catch (error) {
  }
}

// send user uploaded image to profile.router
// for storage in AWS S3 bucket
function* uploadMushroomPhoto(action) {
  try {
    const { selectedFile, resizedFile } = action.payload;
    // The name seems to be dropped on resize, send the name from the
    // original selected file instead.
    const fileName = encodeURIComponent(selectedFile.name);
    const fileType = encodeURIComponent(resizedFile.type);
    const fileSize = encodeURIComponent(resizedFile.size);
    const formData = new FormData();
    formData.append('image', resizedFile);
    yield axios.post(`api/log/photo/s3?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
  } catch (error) {

  }
}


function* mushroomPictureSaga() {
  yield takeLatest('ADD_MUSHROOM_PHOTO', uploadMushroomPhoto),
    yield takeLatest('EDIT_LOG_PICTURE', postUpdatedPhoto),
    // yield takeLatest('POST_MUSHROOM_PHOTO', postMushroomPhoto),
    yield takeLatest('FETCH_MUSHROOM_PHOTOS', fetchMushroomPhotos),
    yield takeLatest('SET_SELECTED_MUSHROOM_PHOTO', fetchLogPhotos)
}

export default mushroomPictureSaga;