import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function LogHistory() {

    // access the log history
    // from the logHistory reducer
    const logHistory = useSelector(store => store.logHistory)

    // access useDispatch component
    // from react-redux
    const dispatch = useDispatch();


    // calling saga function on page load
    // to get the log history from the server
    useEffect(() => {
        dispatch({ type: 'FETCH_LOGS' });
    }, [dispatch]);

    return (
        <>
            {JSON.stringify(logHistory)}

            <table>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                <tr>
                {logHistory.map((logs) => (
                    <>
                    <td>{log.date}</td>
                    <td>{logs.details}</td>
                    <td><button>edit</button></td>
                    </>
                ))}
               </tr>
            </table>
        </>
    );
}

export default LogHistory;