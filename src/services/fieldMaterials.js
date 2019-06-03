/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/fieldMaterials/`;

export default class FieldMaterialsService {
    static fetch() {
        return http.get(API);
    }

    static fetchByState(state) {
        return http.get(`${API}${state}`);
    }

    static fetchByUps(state, ups) {
        return http.get(`${API}${state}/${ups}`);
    }

    static fetchGeographic(state, ups, area) {
        return http.get(`${API}${state}/${ups}/${area}/geographic`);
    }

    static fetchBlocksByArea(state, ups, area) {
        return http.get(`${API}${state}/${ups}/${area}/blocks`);
    }
}
