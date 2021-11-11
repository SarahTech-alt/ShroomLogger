import { combineReducers } from "redux";

// mushroomPictureReducer holds the
// photo information for all of the
// users log photos
const mushroomPictureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MUSHROOM_PHOTOS':
            return action.payload;
        default:
            return state;
    }
};

// selectedMushroomPicture holds the
// photo information for a specific entry
// that is selected
const selectedMushroomPicture = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOG_PHOTO':
        default:
            return state;
    }
}

// export all the reducers here
// to the root reducer to be
// accessed throughout the application
export default combineReducers({
    mushroomPictureReducer,
    selectedMushroomPicture
});