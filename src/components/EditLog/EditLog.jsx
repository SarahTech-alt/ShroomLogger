import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditLog() {
    const allParams = useParams();
    const logDetails = useSelector(store => store.logHistory.logDetail);
    const logId = allParams.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_LOG_DETAILS', payload: {id: logId }});
    }, [logId]);

    return (
        <>
        <h1>Edit Page</h1>
        </>
    );
}

export default EditLog;