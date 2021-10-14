import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function LogHistory() {

    // access the log history
    // from the logHistory reducer
    const logHistory = useSelector(store => store.logHistory)

    // access useDispatch component
    // from react-redux
    const dispatch = useDispatch();

    const editLog = () => {

    }


    // calling saga function on page load
    // to get the log history from the server
    useEffect(() => {
        dispatch({ type: 'FETCH_LOGS' });
    }, [dispatch]);

    return (
        <>
            {JSON.stringify(logHistory)}

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
                    <td>{logs.date}</td>
                    <td>{logs.details}</td>
                    <td><button onClick={event => editLog()}>edit</button></td>
                    </tr>
                ))}
               </tbody>
            </table>
        </>
    );
}

export default LogHistory;