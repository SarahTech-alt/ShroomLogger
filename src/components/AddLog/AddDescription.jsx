import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function AddDescription({ validateForm }) {

    // use history for user navigation between pages
    const history = useHistory();
    // use to dispatch events to sagas
    const dispatch = useDispatch();

    const allParams = useParams();

    const newMushroom = useSelector(store => store.logHistory.logToAdd);

    return (
        <div>
            <TextField
                multiline
                minRows={3}
                id="component-outlined"
                placeholder="details"
                onChange={event => ({ ...newMushroom.details = event.target.value })}
            />
        </div>
    );
}

export default AddDescription;