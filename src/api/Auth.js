import { Timeout } from './utils';
import User from './User';
import { SESSION_EXPIRATION_TIME, SESSION_TOKEN_KEY } from './constants';

export const login = Timeout((email, password) => {
    const user = User.get(email);

    if (!user) {
        throw new Error('User not found with that email.')
    }

    if (user.password !== password) {
        throw new Error('Password does not match.')
    }

    return user
})

export const register = Timeout(({ email, password, confirmPassword, firstName, lastName }) => {
    if (password !== confirmPassword) {
        throw new Error('Passwords does not match');
    }

    if (User.exists(email)) {
        throw new Error('User already exists with that email');
    }

    const user = {
        email,
        password,
        firstName,
        lastName
    };

    User.save(user);

    return user;
})

export const saveUser = user => {
    const encoded = btoa(JSON.stringify(user));
    document.cookie = `${SESSION_TOKEN_KEY}=${encoded}; max-age=${SESSION_EXPIRATION_TIME}; path=/`;
}

export const clearUser = () => {
    document.cookie = `${SESSION_TOKEN_KEY}=; max-age=0`;
}