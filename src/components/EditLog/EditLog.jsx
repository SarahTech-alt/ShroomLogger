import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditLog() {
    const allParams = useParams();
    const logInfo = useSelector(store => store.logHistory);
    const selectedLog = logInfo.logDetail;
    const logId = allParams.id;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
        console.log('log id on page load', logId);
    }, [logId]);

    const deleteLog = () => {
        dispatch({ type: 'DELETE_SELECTED_LOG', payload: logId })
    }

    return (
        <>
        {JSON.stringify(logInfo.logDetail)}
        <h1>Edit Page</h1>
        <button onClick={event=> deleteLog()}>delete log</button>
                {/* {logInfo.logDetail.map((logs) => (
                    <div key={logs.log_id}> */}
                    <p><button>edit</button> Common Name: {selectedLog.common_name}</p>
                    <p><button>edit</button> Scientific Name: {selectedLog.scientific_name}</p>
                    <p><button>edit</button> Date of Entry: {selectedLog.date} </p>
                    <p><button>edit</button> Description: {selectedLog.details} </p>
                    <img src={selectedLog.mushroom_picture_url} alt = {selectedLog.mushroom_picture_url}></img><br />
                    {/* </div> */}
                {/* ))} */}
            <button onClick={event => history.goBack()}>back</button>
        </>
        
    );
}

export default EditLog;