import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditLog.css';

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
    const [newMushroom, setNewMushroom] = useState({
        common_name: '',
        scientific_name: '',
        latitude: '',
        longitude: '',
        date: '',
        details: '',
        mushroom_picture_url: '',

    });



    const [editThing, setEditThing] = useState(false)


    return (
        <>
            {JSON.stringify(logInfo.logDetail)}<hr/>
            {/* Access information from the logDetail
            reducer and display on DOM with buttons to edit logs
            and a back button to navigate to previous page */}
            <h1>Edit Page</h1>
            <button onClick={event => deleteLog()}>delete log</button><br /><br />
            <input type="text" placeholder={selectedLog.common_name}/><br />
            <input type="text" placeholder={selectedLog.scientific_name}/><br />
            <input type="text" placeholder={selectedLog.details}/><br/>
            <input type="date" /><br/>
            <img src={selectedLog.mushroom_picture_url} alt={selectedLog.mushroom_picture_url}></img><br /> <br/>
            {editThing && (
                <div>
                    <input type="text" />
                    {/* Dispatches file to saga when the button is clicked */}
                    <button onClick={event => sendFormDataToServer()}>Submit</button>
                </div>
            )}

            {/* <button onClick={event => setEditThing(!editThing)}>Edit</button> */}
            <button onClick={event => history.goBack()}>back</button>
            
        </>
    );
}

export default EditLog;