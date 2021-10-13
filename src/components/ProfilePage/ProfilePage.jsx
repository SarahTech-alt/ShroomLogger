import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function ProfilePage() {
    // create a variable to hold the 
    // selected file information
    const [selectedFile, setSelectedFile] = useState(null);

    // allows dispatching action by utilizing
    // useDispatch module from react-redux
    const dispatch = useDispatch();

    // add inputted file information 
    // to selectedFile variable 
    const handleFileInput = (e) => {
        console.log('in file input', e);
        setSelectedFile(e.target.files[0]);
        
    }

    // dispatches file information
    // to profile saga 
    const handleUpload = (selectedFile) => {
        dispatch({type: 'ADD_PROFILE_PICTURE', payload: selectedFile })
    }

    return (
        <>
        <div
                className="upload-section">
                <div>React S3 File Upload</div>
                <br />
                <input type="file"
                    onChange={handleFileInput} />
                <br />
                <br />
                <button
                    onClick={() => handleUpload(selectedFile)}>
                    Upload to S3
                </button><br />
            </div>
        </>
    );
}

export default ProfilePage;