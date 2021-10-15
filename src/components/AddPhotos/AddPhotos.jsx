import { useHistory } from 'react-router-dom';

function AddPhotos() {
    // use history for user navigation between pages
    const history = useHistory()

    return(
        <>
        <button onClick={event => history.goBack()}>Go Back</button>
        </>
    );
}

export default AddPhotos;