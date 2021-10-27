import { useParams } from 'react-router-dom';
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditLog.css';
import moment from 'moment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EditMap from './EditMap.jsx';
import EditPhoto from './EditPhoto.jsx';

function EditLog() {

    // on page load dispatch to selected log saga
    // send logId that was retried with useParams
    useEffect(() => {
        console.log('process env', process.env)
        dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
        console.log('log id on page load', logId);
        dispatch({ type: 'SET_SELECTED_MUSHROOM_PHOTO', payload: logId })
    }, [logId]);

    // matches parameters of current route
    const allParams = useParams();

    // selects the id from the parameters
    const logId = allParams.id;

    // select the logDetail from the combined logHistory reducer
    const wholeStore = useSelector(store => store)
    const logInfo = useSelector(store => store.logHistory);
    const selectedLog = logInfo.logDetail;

    // access the logHistory reducer from the store
    const userInfo = useSelector(store => store.user);

    // getting user id from the store to send 
    // with uploaded photo
    const userId = userInfo.id;

    // variable for dispatching actions to sagas
    const dispatch = useDispatch();

    // variable for navigation purposes
    const history = useHistory();

    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState('');

    const sendFormDataToServer = () => {
        // The file name seems to be dropped on resize, send both the
        // original and resized files.
        let action;
        console.log('in send form data to server', logInfo);
        dispatch({
            type: 'EDIT_LOG_DETAILS',
            payload: {
                // any other form data...
                logId,
                logInfo,
                resizedFile,
                selectedFile
            }
        })
        history.goBack();
    }

    // dispatches to delete saga on delete button click
    const deleteLog = () => {
        console.log('in delete log on component', logId);
        dispatch({ type: 'DELETE_SELECTED_LOG', payload: logId })
        history.push('/history');
    }

    // hooks for editing date
    // formatted using moment.js
    const [selectedDate, setDate] = useState(moment(selectedLog.date).format("YYYY-MM-DD"));
    const [inputValue, setInputValue] = useState(moment(selectedLog.date).format("YYYY-MM-DD"));
    // change the log entry date
    // with the user inputted date
    const onDateChange = (date, value) => {
        selectedLog.date = date;
        setDate(date);
        setInputValue(value);
    };
    // formats date for Material UI
    const dateFormatter = str => {
        return str;
    };

    return (
        <>
            {/* {JSON.stringify(selectedLog)}<hr /> */}
            {/* Access information from the logDetail
            reducer and display on DOM with buttons to edit logs
            and a back button to navigate to previous page */}
            <div className="container">
                <Box sx={{ mx: "auto", width: 300 }}>
                    <FormControl sx={{ width: 300 }}>
                        <TextField
                            id="component-outlined"
                            placeholder={selectedLog.common_name}
                            onChange={event => ({ ...selectedLog.common_name = event.target.value })}
                            helperText="common name"
                        />
                        <br />
                        <TextField
                            id="component-outlined"
                            placeholder={selectedLog.scientific_name}
                            onChange={event => ({ ...selectedLog.scientific_name = event.target.value })}
                            helperText="scientific name"
                        />
                        <br />
                        <Fragment>
                            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                                <KeyboardDatePicker
                                    autoOk={true}
                                    showTodayButton={true}
                                    value={selectedDate}
                                    format="YYYY-MM-DD"
                                    inputValue={inputValue}
                                    onChange={onDateChange}
                                    rifmFormatter={dateFormatter}
                                    helperText="date"
                                />
                            </MuiPickersUtilsProvider>
                        </Fragment>
                        <br />
                        <TextField
                            multiline
                            minRows={3}
                            id="component-outlined"
                            placeholder={selectedLog.details}
                            onChange={event => ({ ...selectedLog.details = event.target.value })}
                            helperText="details"
                        />
                    </FormControl>
                    <br /><br />
                    {/* EditPhoto and EditMap components displayed here
                    send selectedLog and logId via props */}
                    <EditPhoto selectedLog={selectedLog}
                        logId={logId} />
                    <EditMap selectedLog={selectedLog} />

                    <br />
                    {/* Back for user navigation */}
                    <Stack spacing={6} direction="row">
                        <Button variant="outlined"

                            style={{ color: '#615246', borderColor: '#080706' }}
                            onClick={event => history.goBack()}>
                            Back
                        </Button>
                        {/* Submit sends the updated information
                        to the edit log saga */}
                        <Button
                            variant="outlined"
                            style={{ color: '#615246', borderColor: '#080706' }}
                            onClick={event => sendFormDataToServer()}>
                            Submit
                        </Button>
                        {/* Delete sends the logId to the
                        delete log saga */}
                        <Button
                            variant="outlined"
                            style={{ color: '#615246', borderColor: '#080706' }}
                            startIcon={<DeleteOutlineIcon />}
                            onClick={event => deleteLog()}>
                            Delete
                        </Button>

                    </Stack>
                </Box>
            </div>
        </>
    );
}

export default EditLog;