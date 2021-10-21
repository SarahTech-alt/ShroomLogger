import { combineReducers } from "redux";

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

const logToAdd = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOG_TO_ADD':
            return action.payload;
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