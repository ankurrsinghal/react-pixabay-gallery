import User from './User';
import { login, saveUser, clearUser, register } from './Auth';
import { getCookieByName } from './utils';
import { SESSION_TOKEN_KEY } from './constants';

export const Authenticate = async (email, password) => {
    const user = await login(email, password);
    if (user) {
        saveUser(user)
        return user;
    }
}

export const LoadUser = () => {
    const token = getCookieByName(SESSION_TOKEN_KEY);
    if (token) {
        try {
            return JSON.parse(atob(token));
        } catch(e) {}
    }
}

export const Logout = () => {
    clearUser();
}

export const Register = async data => {
    const user = await register(data);
    if (user) {
        saveUser(user)
        return user;
    }
}

export const LoadUsers = () => {
    User.load()
}