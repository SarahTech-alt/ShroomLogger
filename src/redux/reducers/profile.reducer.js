const profileReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_PIC':
            return action.payload;
        default:
            return state;
    }
};

export default profileReducer;