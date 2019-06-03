/* eslint-disable */
/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const randomString = () => Math.round(
    (36 ** (9 + 1)) - (Math.random() * (36 ** 9))
).toString(36).slice(1) + (new Date().toISOString());

function getVersion() {
    return http.get(`${ENDPOINT}version`);
}

export {randomString};
export {getVersion};
