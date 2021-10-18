import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogDetails() {
    // matches parameters of current route
    const allParams = useParams();
    // selects the id from the parameters
    const logId = allParams.id;
    // access the logHistory reducer from the store
    const logInfo = useSelector(store => store.logHistory);
    // select the logDetail from the combined logHistory reducer
    const selectedLog = logInfo.logDetail;
    // access mushroom photos
    const mushroomPhotos = useSelector(store => store.mushroomPhotos)
    // access selected mushroom photo from store
    // const selectedPhoto = mushroomPhotos.selectedMushroomPicture;
    // variable for dispatching actions to sagas
    const dispatch = useDispatch();
    // variable for navigation purposes
    const history = useHistory();
    // on page load dispatch to selected log saga
    // send logId that was retried with useParams
    useEffect(() => {
        dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
        console.log('id to send to photo router in component', logId)
        dispatch({ type: 'SET_SELECTED_MUSHROOM_PHOTO', payload: logId })
        console.log('log id on page load', logId);
    }, [logId]);

    return (
        <>
            {JSON.stringify(mushroomPhotos)}
            {JSON.stringify(selectedLog)}
            {/* Access information from the logDetail
            reducer and display on DOM 
            with a back button to navigate to previous page */}
            <h1>View Details</h1>
            <button onClick={event => deleteLog()}>delete log</button>
            <p> Common Name: {selectedLog.common_name}</p>
            <p> Scientific Name: {selectedLog.scientific_name}</p>
            <p> Date of Entry: {selectedLog.date} </p>
            <p> Description: {selectedLog.details} </p>
            {/* <img src={selectedPhoto.mushroom_picture_url} alt={selectedPhoto.mushroom_picture_url}></img><br /> */}
            <button onClick={event => history.goBack()}>back</button>
        </>
    );
}

export default LogDetails;