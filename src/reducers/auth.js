import {
    REQUEST_LOGIN,
    REQUEST_LOGIN_SUCCESSFUL,
    REQUEST_LOGIN_FAILED,
    INITIALIZE_USER, 
    REQUEST_LOGOUT,
    REQUEST_REGISTER,
    REQUEST_REGISTER_SUCCESSFUL,
    REQUEST_REGISTER_FAILED
} from '../actions'

export default (state = { status: 'idle', user: null }, action) => {
    switch(action.type) {
        case REQUEST_LOGIN:
            return { ...state, status: 'requesting' };
        case REQUEST_LOGIN_FAILED:
            return { ...state, status: 'failed', message: action.message };
        case REQUEST_LOGIN_SUCCESSFUL:
            return { ...state, status: 'successful', user: action.user };
        case INITIALIZE_USER:
            return { ...state, user: action.user };
        case REQUEST_LOGOUT:
            return { ...state, user: null };
        case REQUEST_REGISTER:
            return { ...state, status: 'requesting' };
        case REQUEST_REGISTER_SUCCESSFUL:
            return { ...state, status: 'successful', user: action.user };
        case REQUEST_REGISTER_FAILED:
            return { ...state, status: 'failed', message: action.message };
        default:
            return state
    }
}