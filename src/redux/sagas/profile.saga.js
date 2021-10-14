import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// send user uploaded image to profile.router
// 


function* uploadPhoto(action) {
    try {
        const { selectedFile, resizedFile, userId } = action.payload;
        // The name seems to be dropped on resize, send the name from the
        // original selected file instead.
        const fileName = encodeURIComponent(selectedFile.name);
        const fileType = encodeURIComponent(resizedFile.type);
        const fileSize = encodeURIComponent(resizedFile.size);
        console.log('fileName', fileName);
        const formData = new FormData();
        formData.append('image', resizedFile);
        yield axios.post(`api/profile/s3?id=${userId}&?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
        yield put({
            type: 'SET_PROFILE_PIC', payload: [
                {
                    medium: `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/medium/${userId}/${fileName}`,
                    thumbnail: `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/thumb/${userId}/${fileName}`,
                }
            ]
        })
    } catch (error) {
        alert('Something went wrong when uploading a photo');
        console.log('Photo Upload - post request failed', error);
    }

}



function* fetchProfile() {
    try {
        const response = yield axios.get('api/profile');
        yield put({type: 'SET_PROFILE_INFO', payload: response.data})
    } catch (error) {
        alert('Something went wrong getting profile information');
        console.log('Profile information - get request failed', error);
    }
}


function* profileSaga() {
    yield takeEvery('UPLOAD_PHOTO', uploadPhoto);
    yield takeEvery('FETCH_PROFILE_INFO', fetchProfile)
}

export default profileSaga;