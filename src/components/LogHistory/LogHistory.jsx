import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Box from '@mui/material/Box';
import './LogHistory.css'


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

    const [selected, setSelected] = useState('');
    const [viewSorted, setViewSorted] = useState(false);

    const filterBy = (e) => {
        const sortedLogs = [];
        for (let i = 0; i < logHistory.length; i++) {
            if (logHistory[i].common_name === e.target.value) {
                sortedLogs.push(logHistory[i]);
            }
            setViewSorted(true);
            setSelected(sortedLogs)
        }
    }
    const mushroomNames = [];
    for (let i = 0; i < logHistory.length; i++) {
        mushroomNames.push(logHistory[i].common_name);
    }

    const uniqueNames = Array.from(new Set(mushroomNames))

    // calling saga function on page load
    // to get the log history from the server
    useEffect(() => {
        dispatch({ type: 'FETCH_LOGS' });
    }, [dispatch]);

    return (

        <div className="log-summary">
            {/* {JSON.stringify(logHistory)} */}
            <Box sx={{ mx: "auto", height: 'auto', width: 350, pt: 3 }}>
                <>
                    {mushroomNames.length ?
                        <div><br />
                            View History For: &nbsp;
                            <select onChange={filterBy}>
                                {uniqueNames.map(log => (
                                    <option key={log.id} value={log} >{log}</option>
                                ))}
                            </select>
                        </div> : ''}<br />
                </>
                {viewSorted ?
                    <>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Common Name</th>
                                    <th>Scientific Name</th>
                                    <th>Date of Entry</th>
                                    <th>Description</th>
                                </tr>
                                {selected.map((logs) => (
                                    <tr key={logs.log_id}>
                                        <td onClick={event => viewLog(logs.log_id)} style={{ textDecoration: 'underline', color: 'blue' }}> {logs.common_name}</td>
                                        <td>{logs.scientific_name}</td>
                                        <td>{moment(logs.date).format('LL')}</td>
                                        <td>{logs.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                    :
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
                                    <td onClick={event => viewLog(logs.log_id)} style={{ textDecoration: 'underline', color: 'blue' }}> {logs.common_name}</td>
                                    <td>{logs.scientific_name}</td>
                                    <td>{moment(logs.date).format('LL')}</td>
                                    <td>{logs.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </Box>
        </div>

    );
}

export default LogHistory;