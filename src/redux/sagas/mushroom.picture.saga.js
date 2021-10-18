import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMushroomPhotos() {
    console.log('in fetch mushroom photos');
const response = yield axios.get('/api/mushroom/photo');
yield console.log(response);
yield put({type: 'SET_MUSHROOM_PHOTOS', payload: response.data});
}

function* fetchLogPhotos(action) {
    console.log('in fetch selected photo', action.payload);
    const logId = action.payload;
    const response = yield axios.get(`/api/mushroom/photo/${logId}`);
    yield put({ type: 'SET_LOG_PHOTO', payload: response.data[0]});
}

function* postUpdatedPhoto(action) {
    // updates the profile picture url in the database
    // then calls the get saga function to get
    // the most up to date profile information
    try{
        console.log('filename in put', action.payload);
        const fileName = {selectedFile: action.payload.logId};
        const selectedPhoto = {logId: action.payload}
        yield axios.put(`api/mushroom/photo/${selectedPhoto}`, fileName);
        yield put({type:'FETCH_MUSHROOM_PHOTOS'})
    } catch (error) {
        console.log('something went wrong sending edited photo to db', error);  
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
        console.log('fileName', fileName);
        const formData = new FormData();
        formData.append('image', resizedFile);
        yield axios.post(`api/mushroom/photo/s3?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
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
        yield put({type:'SET_MUSHROOM_PHOTOS'})
    } catch (error) {
        console.log('something went wrong sending photo to db', error);  
    }
  }

  function* mushroomPictureSaga() {
    yield takeLatest('ADD_MUSHROOM_PHOTO', uploadMushroomPhoto),
    yield takeLatest('EDIT_LOG_PICTURE', postUpdatedPhoto),
    yield takeLatest('POST_MUSHROOM_PHOTO', postMushroomPhoto),
    yield takeLatest('FETCH_MUSHROOM_PHOTOS', fetchMushroomPhotos),
    yield takeLatest('SET_SELECTED_MUSHROOM_PHOTO', fetchLogPhotos)
  }

  export default mushroomPictureSaga;