import User from './User';

const LATENCY = 500
const SESSION_EXPIRATION_TIME = 15*60
const SESSION_TOKEN_KEY = 'token'

const Timeout = callback => {
    return (...args) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                try {
                    res(callback(...args))
                } catch(e) {
                    rej(e)
                }
            }, LATENCY);
        })
    }
}

const login = Timeout((email, password) => {
    const user = User.get(email);

    if (!user) {
        throw new Error('User not found with that email.')
    }

    if (user.password !== password) {
        throw new Error('Password does not match.')
    }

    return user
})

const register = Timeout(({ email, password, confirmPassword, firstName, lastName }) => {
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

const saveUser = user => {
    const encoded = btoa(JSON.stringify(user))
    document.cookie = `${SESSION_TOKEN_KEY}=${encoded}; max-age=${SESSION_EXPIRATION_TIME}; path=/`;
}

const clearUser = () => {
    document.cookie = `${SESSION_TOKEN_KEY}=; max-age=0`;
}

const getCookieByName = name => {
    return ('; ' + document.cookie).split('; ' + name + '=').pop().split(';').shift();
}

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