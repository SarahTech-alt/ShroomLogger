import { useSelector } from 'react-redux';

function LogHistory() {

    // access the log history
    // from the logHistory reducer
    const store = useSelector(store => store.logHistory)
    

    // calling saga function on page load
    // to get the log history from the server
    useEffect(() => {
        dispatch({ type: 'FETCH_LOG_HISTORY' });
      }, [dispatch]);
    
    return (
        <>
        {JSON.stringify(store)}
        </>
    );
}

export default LogHistory;