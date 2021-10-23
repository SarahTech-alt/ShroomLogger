import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function LogHistory() {

    // access the log history
    // from the logHistory reducer
    const logHistory = useSelector(store => store.logHistory.logHistory)

    // access useDispatch component
    // from react-redux
    const dispatch = useDispatch();

    //access useHistory component
    // from react-router-dom
    const history = useHistory();

    // dispatch selected id to sagas and
    // direct user to view details page
    const viewLog = (logId) => {
        history.push(`/details/${logId}`);
    }

    // calling saga function on page load
    // to get the log history from the server
    useEffect(() => {
        dispatch({ type: 'FETCH_LOGS' });
    }, [dispatch]);

    return (
        <>

            {/* {JSON.stringify(logHistory)} */}
            {/* <ArrowBackOutlinedIcon sx={{height:100, width:50}} onClick={event => history.goBack()} /> */}
            <img src='/mushroom.png' className="logo" />< br /><br /><br /><br />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs>
    <Tab label="Home" onClick={event => history.push('/home')} />
    <Tab label="Map"  onClick={event => history.push('/map')}/>
    <Tab label="Add New" onClick={event => history.push('/addPhotos')} />
  </Tabs>
</Box><br />
            <table>
                <tbody>
                <tr>
                    <th>Common Name</th>
                    <th>Scientific Name</th>
                    <th>Date of Entry</th>
                    <th>Description</th>
                </tr>
                
                {logHistory.map((logs) => (
                    <tr key={logs.log_id}>
                    <td>{logs.common_name}</td>
                    <td>{logs.scientific_name}</td>
                    <td>{moment(logs.date).format('LL')}</td>
                    <td>{logs.details}</td>
                    <td><EditOutlinedIcon onClick={event => viewLog(logs.log_id)}>View</EditOutlinedIcon></td>
                    
                    </tr>
                ))}
               </tbody>
            </table>
          
        </>
    );
}

export default LogHistory;