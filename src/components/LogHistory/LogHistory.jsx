import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';


function LogHistory() {

    // access the log history
    // from the logHistory reducer
    const logHistory = useSelector(store => store.logHistory.logHistory)

    // access useDispatch component
    // from react-redux
    const dispatch = useDispatch();

    //access useHistory component
    // from react-router-dom
    const history = useHistory();

    // dispatch selected id to sagas and
    // direct user to view details page
    const viewLog = (logId) => {
        history.push(`/details/${logId}`);
    }

    // calling saga function on page load
    // to get the log history from the server
    useEffect(() => {
        dispatch({ type: 'FETCH_LOGS' });
    }, [dispatch]);

    return (
        <>
            {/* {JSON.stringify(logHistory)} */}

            <table>
                <tbody>
                <tr>
                    <th>Common Name</th>
                    <th>Scientific Name</th>
                    <th>Date of Entry</th>
                    <th>Description</th>
                </tr>
                
                {logHistory.map((logs) => (
                    <tr key={logs.log_id}>
                    <td>{logs.common_name}</td>
                    <td>{logs.scientific_name}</td>
                    <td>{moment(logs.date).format('LL')}</td>
                    <td>{logs.details}</td>
                    <td><button onClick={event => viewLog(logs.log_id)}>View</button></td>
                    
                    </tr>
                ))}
               </tbody>
            </table>
            <button onClick={event => history.goBack()}>Go Back</button>
        </>
    );
}

export default LogHistory;