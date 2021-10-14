import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// send user uploaded image to profile.router
// 


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
        // yield axios.post('api/profile', fileName);
        
        // put({
        //     type: 'SET_PROFILE_PIC', payload: [
        //         {
        //             medium: `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/medium/${fileName}`,
        //             thumbnail: `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/thumb/${fileName}`,
        //         }
        //     ]
        // })
        yield put({type: 'POST_PHOTO', payload: fileName})
        // yield put({type:'FETCH_PROFILE_INFO'})
    } catch (error) {
        alert('Something went wrong when uploading a photo');
        console.log('Photo Upload - post request failed', error);
    }

}

function* postPhoto(action) {
    try{
        console.log('filename in put', action.payload);
        let fileName = {selectedFile: action.payload};
        const postedPhoto = yield axios.put('api/profile', fileName);
        yield put({type:'FETCH_PROFILE_INFO'})
    } catch (error) {
        console.log('something went wrong sending photo to db', error);  
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
    yield takeEvery('POST_PHOTO', postPhoto)
}

export default profileSaga;