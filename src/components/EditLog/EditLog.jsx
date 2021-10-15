import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditLog() {
    // matches parameters of current route
    const allParams = useParams();
    // selects the id from the parameters
    const logId = allParams.id;
    // access the logHistory reducer from the store
    const logInfo = useSelector(store => store.logHistory);
    // select the logDetail from the combined logHistory reducer
    const selectedLog = logInfo.logDetail;
    // variable for dispatching actions to sagas
    const dispatch = useDispatch();
    // variable for navigation purposes
    const history = useHistory();
    // on page load dispatch to selected log saga
    // send logId that was retried with useParams
    useEffect(() => {
        dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
        console.log('log id on page load', logId);
    }, [logId]);
    // dispatches to delete saga on delete button click
    const deleteLog = () => {
        dispatch({ type: 'DELETE_SELECTED_LOG', payload: logId })
    }

    return (
        <>
            {JSON.stringify(logInfo.logDetail)}
            {/* Access information from the logDetail
            reducer and display on DOM with buttons to edit logs
            and a back button to navigate to previous page */}
            <h1>Edit Page</h1>
            <button onClick={event => deleteLog()}>delete log</button>
            <p><button>edit</button> Common Name: {selectedLog.common_name}</p>
            <p><button>edit</button> Scientific Name: {selectedLog.scientific_name}</p>
            <p><button>edit</button> Date of Entry: {selectedLog.date} </p>
            <p><button>edit</button> Description: {selectedLog.details} </p>
            <img src={selectedLog.mushroom_picture_url} alt={selectedLog.mushroom_picture_url}></img><br />
            <button onClick={event => history.goBack()}>back</button>
        </>
    );
}

export default EditLog;