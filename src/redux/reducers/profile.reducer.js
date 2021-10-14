import { combineReducers } from 'redux';

const profilePictureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_PIC':
            return action.payload;
        default:
            return state;
    }
};

const profileInfoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_INFO':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    profilePictureReducer,
    profileInfoReducer
});