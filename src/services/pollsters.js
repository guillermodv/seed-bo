/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/pollsters/`;

export default class PollstersServices {
    static fetchPollsters({state}) {
        return http.get(`${API}${state}`);
    }

    static fetchPollster(id) {
        return http.get(`${API}${id}/pollster`);
    }
}
