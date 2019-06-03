/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/assign/`;

export default class AssignService {
    static getRegionalAssign() {
        return http.get(`${API}regionalAssign`);
    }

    static saveRegionalAssign(data) {
        return http.post(`${API}`, data);
    }

    static fetchAssignLevel(level, state) {
        return http.get(`${API}getLevels/${level}/${state}`);
    }

    static saveAssignByUps(state, assignments) {
        return http.put(`${API}state/${state}/ups`, {assignments});
    }

    static fetchUps(state) {
        return http.get(`${API}state/${state}/ups`);
    }

    static fetchAreas(state, ups) {
        return http.get(`${API}state/${state}/ups/${ups}/areas`);
    }

    static fetchAssignByUps(state) {
        return http.get(`${API}state/${state}/assign`);
    }

    static fetchAssignByArea(searchParams) {
        const params = new URLSearchParams();
        params.set('ups', searchParams.ups);
        params.set('state', searchParams.state);
        if (searchParams.area) {
            params.set('area', searchParams.area);
        }
        return http.get(`${API}area?${params.toString()}`);
    }

    static saveAssignByArea(assignments) {
        return http.put(`${API}area`, {assignments});
    }
}
