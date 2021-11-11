import { combineReducers } from 'redux';

// profilePictureReducer holds user
// profile picture
const profilePictureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_PIC':
            return action.payload;
        default:
            return state;
    }
};

// profileInfoReducer holds the user information
// from the logged in user
const profileInfoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_INFO':
            return action.payload;
        default:
            return state;
    }
}

// export all the reducers here
// to the root reducer to be
// accessed throughout the application
export default combineReducers({
    profilePictureReducer,
    profileInfoReducer
});