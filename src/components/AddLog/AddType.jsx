import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

    useEffect(() => {

    }, []);

   return (
    <div className="container">
              {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

<Tabs>
  <Tab label="Home" onClick={event => history.push('/home')} />
  <Tab label="History" onClick={event => history.push('/history')} />
  <Tab label="Map" onClick={event => history.push('/map')} />
  <Tab label="Add New" onClick={event => history.push('/addPhotos')} />
</Tabs>

</Box><br /> */}
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
                            // placeholder="scientific name"
                        />
                        <br />
        {/* <input type="text" onChange={(event) => ({ ... newMushroom.common_name = event.target.value })} placeholder="Common Name"></input> <br />

        <input type="text" onChange={(event) => ({ ...newMushroom. scientific_name= event.target.value })} placeholder="Scientific Name (optional)"></input><br /><br /> */}

        <Stack spacing={1} sx={{pt:3}} direction="row">
                        <Button
                            variant="outlined"
                            style={{color: '#615246', borderColor:'#080706'}}
                            onClick={event => { history.push('/locationtime') }}>
                            Next: Location/Time
                        </Button>
                    </Stack>
        </Box>
        </div>
    );
}

export default AddType;