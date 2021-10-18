import { combineReducers } from "redux";

const mushroomPictureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MUSHROOM_PIC':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    mushroomPictureReducer
});