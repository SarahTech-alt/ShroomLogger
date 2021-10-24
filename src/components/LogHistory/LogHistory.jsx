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
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';


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
        
        <div className="container">
            {/* {JSON.stringify(logHistory)} */}
            {/* <ArrowBackOutlinedIcon sx={{height:100, width:50}} onClick={event => history.goBack()} /> */}

            <Tabs>
                <Tab label="Home" onClick={event => history.push('/home')} />
                <Tab label="History" sx={{ borderBottom: 1 }} onClick={event => history.push('/history')} />
                <Tab label="Map" onClick={event => history.push('/map')} />
                <Tab label="Add New" onClick={event => history.push('/addPhotos')} />
            </Tabs>
            <Box sx={{ mx: "auto", height: 350, width: 350 }}>
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
                                <td><PageviewOutlinedIcon sx={{ mt: .5, height: 30 }} onClick={event => viewLog(logs.log_id)} /></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </div>

    );
}

export default LogHistory;