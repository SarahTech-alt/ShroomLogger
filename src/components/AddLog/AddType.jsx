import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

   function AddType(){

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
        <h1>In Add Type</h1>
        {JSON.stringify(newMushroom)}<br />

        <input type="text" onChange={(event) => ({ ... newMushroom.common_name = event.target.value })} placeholder="Common Name"></input> <br />

        <input type="text" onChange={(event) => ({ ...newMushroom. scientific_name= event.target.value })} placeholder="Scientific Name (optional)"></input><br />

        <button onClick={event => history.push('/locationtime')}>Next: Add location and time</button>
        </>
    );
}

export default AddType;