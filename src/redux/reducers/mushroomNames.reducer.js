const mushroomNameReducer = (state = [], action) => {
    switch (action.type) {
        case ('SET_NAMES'):
            return action.payload;
        default:
            return state;
    }
}



export default mushroomNameReducer;