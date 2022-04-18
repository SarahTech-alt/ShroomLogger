import { combineReducers } from "redux";
import moment from 'moment';

// logHistory holds the information of
// all of the entered logs for a user
const logHistory = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOG_HISTORY':
            return action.payload;
        default:
            return state;
    }
};

// logDetail holds the information for
// a specific log when it is selected
const logDetail = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOG_DETAIL':
            return action.payload;
        default:
            return state;
    }
};

// logToAdd holds the information of
// a newly created log entry
// default state is object with
// undefined values to allow for
// fields being left empty
const logToAdd = (state =
    {
        common_name: '',
        scientific_name: undefined,
        latitude: undefined,
        longitude: undefined,
        date: moment().format(),
        details: undefined,
        selectedFile: '',
        latitude: '',
        longitude: '',
    }, action) => {
    switch (action.type) {
        case 'SET_LOG_TO_ADD':
            return action.payload;
        case 'UNSET_NEW_LOG':
            return state;
        default:
            return state;
    }
}

// export all the reducers here
// to the root reducer to be
// accessed throughout the application
export default combineReducers({
    logHistory,
    logDetail,
    logToAdd,
});true