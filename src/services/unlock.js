/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

import {buildQueryString} from '../util';

const API = `${ENDPOINT}api/unlock/`;

export default class UnlockService {
    static fetchAreasToUnlock(params) {
        return http.get(`${API}areas${buildQueryString(params)}`);
    }

    static openArea(id) {
        return http.put(`${API}${id}`);
    }

    static openAreas(state, ups) {
        return http.put(`${API}${state}/${ups}`);
    }
}
