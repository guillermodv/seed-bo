/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

import {buildQueryString} from '../util';

const API = `${ENDPOINT}api/reports/`;

class ReportsService {
    static fetchBlockReports(params) {
        return http.get(`${API}blocks/${buildQueryString(params)}`);
    }

    static fetchDwellingReports(params) {
        return http.get(`${API}dwellings/${buildQueryString(params)}`);
    }

    static fetchDwellingReportByType(params, reportType) {
        return http.get(`${API}dwellings/report/${buildQueryString({...params, reportType})}`);
    }
}

export default ReportsService;
