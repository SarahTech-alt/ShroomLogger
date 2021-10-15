import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditLog() {
    const allParams = useParams();
    const logDetails = useSelector(store => store.logHistory);
    const logId = allParams.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_LOG_DETAILS', payload: {id: logId }});
    }, [logId]);

    return (
        <>
        {/* {JSON.stringify(logDetails.logHistory)} */}
        <h1>Edit Page</h1>
        <table>
                <tbody>
                {logDetails.logHistory.map((logs) => (
                    <tr key={logs.log_id}><br />
                    <tr><button>edit</button> Common Name: {logs.common_name}</tr><br />
                    <tr><button>edit</button> Scientific Name: {logs.scientific_name}</tr><br />
                    <tr><button>edit</button> Date of Entry: {logs.date} </tr><br />
                    <tr><button>edit</button> Description: {logs.details} </tr>
                    </tr>
                ))}
               </tbody>
            </table>
        </>
        
    );
}

export default EditLog;