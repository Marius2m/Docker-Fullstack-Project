const INITIAL_STATE = {
    isAuthenticated: false
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'AUTHENTICATE':
            return {...state, isAuthenticated: true};
        case 'SIGN_OUT':
            return {...state, isAuthenticated: false};
        default:
            return state;
    }
}

export default authReducer;