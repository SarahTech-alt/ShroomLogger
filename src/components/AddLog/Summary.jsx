import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Summary() {

    const dispatch = useDispatch();
    const newMushroom =  useSelector(store => store.logHistory.logToAdd);
    const history=useHistory();

  const addNewMushroom = () => {
              dispatch({
            type: 'ADD_NEW_MUSHROOM',
            payload:
                { newMushroom }
        })
        history.push('/home');
    };
  

    return (
        <>
        {JSON.stringify(newMushroom)}
     <button onClick={event => addNewMushroom()}>Add</button>

        </>
    );
}

export default Summary;