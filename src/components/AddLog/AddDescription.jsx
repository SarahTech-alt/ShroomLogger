import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

 
function AddDescription() {

        // use history for user navigation between pages
        const history = useHistory();
        // use to dispatch events to sagas
        const dispatch = useDispatch();
   
       const allParams = useParams();
   
       const newMushroom =  useSelector(store => store.logHistory.logToAdd);
   
       useEffect(() => {
   
       }, []);

   return (
        <>
        <h1>In Add Description</h1>
        {/* {JSON.stringify(newMushroom)} */}

        <input type="text" onChange={(event) => ({...newMushroom.details= event.target.value })} placeholder="Details"></input> <br />
        <br />
        <button onClick={event => history.push('/summary')}>Next: View Summary</button>
        </>
    );
}

export default AddDescription;