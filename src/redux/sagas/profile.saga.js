import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* postProfilePic(action) {
    yield axios.post('/api/profile', action.payload);
}


function* profileSaga() {
    yield takeEvery('ADD_PROFILE_PICTURE', postProfilePic);
}

export default profileSaga;