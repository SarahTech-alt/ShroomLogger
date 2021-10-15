import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogDetails() {
    const allParams = useParams();
    const logDetails = useSelector(store => store.logHistory);
    const logId = allParams.id;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_LOG_DETAILS', payload: {id: logId }});
    }, [logId]);

    return (
        <>
        {/* {JSON.stringify(logDetails.logHistory)} */}
        <h1>Details Page</h1>
                {logDetails.logHistory.map((logs) => (
                    <div key={logs.log_id}>
                    <p>Common Name: {logs.common_name}</p>
                    <p>Scientific Name: {logs.scientific_name}</p>
                    <p>Date of Entry: {logs.date} </p>
                    <p>Description: {logs.details} </p>
                    <img src={logs.mushroom_picture_url} alt = {logs.mushroom_picture_url}></img>
                    </div>
                ))}
            <button onClick={event => history.goBack()}>back</button>
        </>
        
    );
}

export default LogDetails;