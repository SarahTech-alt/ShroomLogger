import { combineReducers } from "redux";
import moment from 'moment';

const logHistory = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOG_HISTORY':
            return action.payload;
        default:
            return state;
    }
};

const logDetail = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOG_DETAIL':
            return action.payload;
        default:
            return state;
    }
};

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

const locationInfo = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOCATION_INFO':
            return action.payload;
        default:
            return state;
    }
}



export default combineReducers({
    logHistory,
    logDetail,
    logToAdd,
    locationInfo,
});