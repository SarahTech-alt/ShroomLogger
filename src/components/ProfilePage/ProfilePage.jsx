import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';

const imageConfig = {
    quality: 1.0,
    maxHeight: 300,
};


function ProfilePage() {

    onFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (acceptedImageTypes.includes(selectedFile.type)) {
            const copyFile = new Blob([selectedFile], { type: selectedFile.type });
            const resizedFile = await readAndCompressImage(copyFile, imageConfig);
            this.setState({
                selectedFile,
                resizedFile,
                preview: URL.createObjectURL(resizedFile),
                changes: true,
            });
        } else {
            this.setState({
                errorText: 'Invalid image file type. Must be gif, jpeg or png.',
            });
        }
    }

    return (
        <>
         { preview && (
        <img
            className="placeholder-photo-preview"
            src={preview}
            alt="Photo preview"
        />
         )}
    <input type="file" accept="image/*" onChange={this.onFileChange} />
        </>
    );
}

export default ProfilePage;