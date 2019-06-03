import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {receiveBlockReports, receiveDwellingReports, receiveDwellingReportByType} from '../actions/reports';
import ReportsService from '../services/reports';

export function* fetchBlockReports({params}) {
    try {
        const blocks = yield call(ReportsService.fetchBlockReports, params);
        yield put(receiveBlockReports(blocks));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingReports({params}) {
    try {
        const [dwellings] = yield call(ReportsService.fetchDwellingReports, params);
        yield put(receiveDwellingReports(dwellings));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingReportByType({params, reportType}) {
    try {
        const {report, filters} = yield call(ReportsService.fetchDwellingReportByType, params, reportType);
        yield put(receiveDwellingReportByType(report, filters));
    } catch (err) {
        yield put(handleError(err));
    }
}
