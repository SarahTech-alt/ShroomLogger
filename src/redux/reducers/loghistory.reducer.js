const logHistory = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOG_HISTORY':
            return action.payload;
        default:
            return state;
    }
};

export default logHistory;