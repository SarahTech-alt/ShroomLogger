import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function AddDescription() {

    // use history for user navigation between pages
    const history = useHistory();
    // use to dispatch events to sagas
    const dispatch = useDispatch();

    const allParams = useParams();

    const newMushroom = useSelector(store => store.logHistory.logToAdd);

    useEffect(() => {

    }, []);

    return (
        <div className="container">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                <Tabs>
                    <Tab label="Home" onClick={event => history.push('/home')} />
                    <Tab label="History" onClick={event => history.push('/history')} />
                    <Tab label="Map" sx={{ borderBottom: 1 }} onClick={event => history.push('/map')} />
                    <Tab label="Add New" onClick={event => history.push('/addPhotos')} />
                </Tabs>

            </Box><br />
            <Box sx={{ mx: "auto", height: 350, width: 350 }}>
                <h1>Additional Details:</h1>
                {/* {JSON.stringify(newMushroom)} */}

                <input type="text" onChange={(event) => ({ ...newMushroom.details = event.target.value })} placeholder="Details"></input> <br />
             
                <Stack spacing={1} direction="row">
                        <Button
                            variant="outlined"
                            style={{color: '#615246', borderColor:'#080706'}}
                            onClick={event => history.push('/summary')}>
                            Next: Add Details
                        </Button>
                    </Stack>
            </Box>
        </div>
    );
}

export default AddDescription;