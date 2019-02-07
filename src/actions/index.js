import { Authenticate, LoadUser, Logout, Register, LoadUsers } from '../api'

export const INITIALIZE_USER = 'INITIALIZE_USER'
const initializeUser = user => ({
    type: INITIALIZE_USER,
    user
})

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
const requestLogin = () => ({
    type: REQUEST_LOGIN
})

export const REQUEST_LOGIN_SUCCESSFUL = 'REQUEST_LOGIN_SUCCESSFUL'
const requestLoginSuccessful = user => ({
    type: REQUEST_LOGIN_SUCCESSFUL,
    user
})

export const REQUEST_LOGIN_FAILED = 'REQUEST_LOGIN_FAILED'
const requestLoginFailed = message => ({
    type: REQUEST_LOGIN_FAILED,
    message
})

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
const requestLogout = () => ({
    type: REQUEST_LOGOUT
})

export const REQUEST_REGISTER = 'REQUEST_REGISTER'
const requestRegister = () => ({
    type: REQUEST_REGISTER
})

export const REQUEST_REGISTER_SUCCESSFUL = 'REQUEST_REGISTER_SUCCESSFUL'
const requestRegisterSuccessful = user => ({
    type: REQUEST_REGISTER_SUCCESSFUL,
    user
})

export const REQUEST_REGISTER_FAILED = 'REQUEST_REGISTER_FAILED'
const requestRegisterFailed = message => ({
    type: REQUEST_REGISTER_FAILED,
    message
})

export const authenticate = (email, password) => {
    return async dispatch => {
        dispatch(requestLogin());
        try {
            const user = await Authenticate(email, password);
            dispatch(requestLoginSuccessful(user));
        } catch(e) {
            dispatch(requestLoginFailed(e.message));
        }
    }
}

export const initializeUserFromStorage = () => {
    LoadUsers();
    return initializeUser(LoadUser());
}

export const logout = () => {
    Logout();
    return requestLogout();
}

export const register = data => {
    return async dispatch => {
        dispatch(requestRegister());
        try {
            const user = await Register(data);
            dispatch(requestRegisterSuccessful(user));
        } catch(e) {
            dispatch(requestRegisterFailed(e.message));
        }
    }
}