import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function AddDescription() {
    // use history for user navigation between pages
    const history = useHistory();

    const newMushroom = useSelector(store => store.logHistory.logToAdd);

    return (
        <div className="container">

            <Box sx={{ mx: "auto", height: 350, width: 350 }}>
                <h1>Additional Details:</h1>

                <TextField
                    multiline
                    minRows={3}
                    id="component-outlined"
                    placeholder="details"
                    onChange={event => ({ ...newMushroom.details = event.target.value })}
                />

                <Stack spacing={1} direction="row">
                    <Button
                        sx={{ mt: 5 }}
                        variant="outlined"
                        style={{ color: '#615246', borderColor: '#080706' }}
                        onClick={event => history.push('/summary')}>
                        Next: Summary
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default AddDescription;