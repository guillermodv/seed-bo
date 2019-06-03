import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {
    generalMonitoringFetched,
    responseMonitoringFetched
} from '../actions/monitoring';

import MonitoringService from '../services/monitoring';

export function* fetchGeneralMonitoring() {
    try {
        const {areas} = yield call(MonitoringService.fetchGeneralMonitoring);
        yield put(generalMonitoringFetched(areas));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchResponseMonitoring({filters}) {
    try {
        const responseMonitoring = yield call(MonitoringService.fetchResponseMonitoring, filters);
        yield put(responseMonitoringFetched(responseMonitoring));
    } catch (err) {
        yield put(handleError(err));
    }
}
