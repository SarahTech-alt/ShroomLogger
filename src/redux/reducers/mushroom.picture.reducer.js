import { combineReducers } from "redux";

const mushroomPictureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MUSHROOM_PHOTOS':
            return action.payload;
        default:
            return state;
    }
};

const selectedMushroomPicture = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED_MUSHROOM_PHOTO':
        default:
            return state;
    }
}


export default combineReducers({
    mushroomPictureReducer,
    selectedMushroomPicture
});