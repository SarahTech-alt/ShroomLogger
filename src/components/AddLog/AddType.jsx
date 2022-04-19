import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

function AddType() {
    const newMushroom = useSelector(store => store.logHistory.logToAdd);
    return (
        <div>
            {/* {JSON.stringify(newMushroom)}<br /> */}
            <TextField
                id="component-outlined"
                required
                onChange={event => ({ ...newMushroom.common_name = event.target.value })}
                helperText="common name"
                placeholder='whatdya call it?*'
            />
            <br />
            <TextField
                sx={{ pt: 2 }}
                id="component-outlined"
                placeholder="scientific name"
                onChange={event => ({ ...newMushroom.scientific_name = event.target.value })}
                helperText="scientific name"
            />
            <br />
        </div>
    );
}

export default AddType;