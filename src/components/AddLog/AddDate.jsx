import { useEffect, useState, Fragment } from "react";
import moment from 'moment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function AddDate() {

    const [selectedDate, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));

    const onDateChange = (date, value) => {
        newMushroom.date = date;
        setDate(date);
        setInputValue(value);
    };

    const dateFormatter = str => {
        return str;
    };

    return (
        <div className="nav-buttons">
            <Fragment>
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <KeyboardDatePicker
                        autoOk={true}
                        showTodayButton={true}
                        value={selectedDate}
                        format="YYYY-MM-DD" bo
                        inputValue={inputValue}
                        onChange={onDateChange}
                        rifmFormatter={dateFormatter}
                    />
                </MuiPickersUtilsProvider>
            </Fragment>
        </div>
    )
}

export default AddDate;