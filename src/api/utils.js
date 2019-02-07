import { LATENCY } from './constants';

export const Timeout = callback => {
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

export const getCookieByName = name => {
    return ('; ' + document.cookie).split('; ' + name + '=').pop().split(';').shift();
}