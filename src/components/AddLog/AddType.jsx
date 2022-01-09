import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

   function AddType(){

     // use history for user navigation between pages
     const history = useHistory();
     // use to dispatch events to sagas
     const dispatch = useDispatch();

    const allParams = useParams();

    const newMushroom =  useSelector(store => store.logHistory.logToAdd);

    const validateForm = () => {
        if (newMushroom.common_name === '') {
            alert('Please enter a type');
        }
        else {
            history.push('/description');
        }
    }

    useEffect(() => {

    }, []);

   return (
    <div className="container">
<Box sx={{ mx: "auto", height: 350, width: 350 }}>
        <h1>Names:</h1>
        {/* {JSON.stringify(newMushroom)}<br /> */}
        <TextField
                            id="component-outlined"
                            required
                            onChange={event => ({ ...newMushroom.common_name = event.target.value })}
                            helperText="common name"
                            placeholder="common name"
                            label="Required"
                        />
                        <br />
                        <TextField 
                        sx={{pt:2}}
                            id="component-outlined"
                            
                            onChange={event => ({ ...newMushroom.scientific_name = event.target.value })}
                            helperText="scientific name"
                        />
                        <br />

        <Stack spacing={1} sx={{pt:3}} direction="row">
                        <Button
                            variant="outlined"
                            style={{color: '#615246', borderColor:'#080706'}}
                            onClick={validateForm}>
                            Next: Location/Time
                        </Button>
                    </Stack>
        </Box>
        </div>
    );
}

export default AddType;