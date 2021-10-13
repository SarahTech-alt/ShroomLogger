import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* uploadPhoto(action) {
    try {
        const { selectedFile, resizedFile, id } = action.payload;
        // The name seems to be dropped on resize, send the name from the
        // original selected file instead.
        const fileName = encodeURIComponent(selectedFile.name);
        const fileType = encodeURIComponent(resizedFile.type);
        const fileSize = encodeURIComponent(resizedFile.size);
        console.log('fileName', fileName);
        
        
        const formData = new FormData();
        formData.append('image', resizedFile);
        yield axios.post(`api/profile/s3?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
        yield put({type:'SET_PROFILE_PIC', payload: [
            { medium: `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/medium/${fileName}`,
            thumbnail: `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/thumb${fileName}`,
            }
        ]})
    } catch (error) {
        alert('Something went wrong when uploading a photo');
        console.log('Photo Upload - post request failed', error);
    }

}


function* profileSaga() {
    yield takeEvery('UPLOAD_PHOTO', uploadPhoto);
}

export default profileSaga;