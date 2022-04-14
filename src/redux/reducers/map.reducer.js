import { combineReducers } from "redux";
import moment from 'moment';

// logHistory holds the information of
// all of the entered logs for a user
const userLocation = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOCATION':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    userLocation,
});