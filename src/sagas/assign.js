/* eslint no-param-reassign: 0 */
import {call, put} from 'redux-saga/effects';
import {filter, reduce} from 'lodash';

import {handleError} from '../actions';
import {
    regionalInfoFetched,
    saveSuccess,
    assignLevelFetched,
    receiveUps,
    receiveAreas,
    receiveAssignByUps,
    notifyAssignUpsSuccess,
    requestFetchUps, receiveAssignByArea, notifyAssignAreaSuccess
} from '../actions/assign';
import AssignService from '../services/assign';

export function* fetchRegionalInfo() {
    try {
        const regionalInto = yield call(AssignService.getRegionalAssign);
        yield put(regionalInfoFetched(regionalInto));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveRegionalInfo(regionalInfo) {
    try {
        const status = yield call(AssignService.saveRegionalAssign, regionalInfo.assingRegional);
        yield fetchRegionalInfo();
        yield put(saveSuccess(status));
    } catch (err) {
        yield put(handleError(err));
    }
}

function* fillAssignLevel(info) {
    info.regionalInfo = reduce(info.regionalInfo, (result, value) => {
        const {
            state, ups, area, _id, subCoordinator, supervisor, pollster
        } = value;
        let filterKey = null;
        if (_id) {
            filterKey = _id;
        } else {
            filterKey = state;
            if (ups) {
                filterKey = `${filterKey}${ups}`;
            }
            if (area) {
                filterKey = `${filterKey}${area}`;
            }
            if (subCoordinator) {
                filterKey = `${filterKey}${subCoordinator}`;
            }
            if (supervisor) {
                filterKey = `${filterKey}${supervisor}`;
            }
            if (pollster) {
                filterKey = `${filterKey}${pollster}`;
            }
        }
        if (value.status && value.status > 0) {
            result[filterKey] = value;
        }

        return result;
    }, {});
    yield put(assignLevelFetched(info));
}

export function* fetchAssignLevel({level, state}) {
    try {
        const info = yield call(AssignService.fetchAssignLevel, level, state);
        yield fillAssignLevel(info);
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveAssignByUps({state, assignments}) {
    try {
        yield call(AssignService.saveAssignByUps, state, filter(assignments, assign => assign.toAssign));
        yield put(notifyAssignUpsSuccess());
        yield put(requestFetchUps(state));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchUps({state}) {
    try {
        const {ups} = yield call(AssignService.fetchUps, state);
        yield put(receiveUps(ups));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAreas({state, ups}) {
    try {
        const {areas} = yield call(AssignService.fetchAreas, state, ups);
        yield put(receiveAreas(areas));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAssignByUps({state}) {
    try {
        const {ups, subCoordinators} = yield call(AssignService.fetchAssignByUps, state);
        yield put(receiveAssignByUps(ups, subCoordinators));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAssignByArea({searchParams}) {
    try {
        const {
            assignments, pollsters, supervisors
        } = yield call(AssignService.fetchAssignByArea, searchParams);
        yield put(receiveAssignByArea(assignments, pollsters, supervisors));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveAssignByArea({assignments}) {
    try {
        yield call(AssignService.saveAssignByArea, filter(assignments, assign => assign.toAssign));
        yield put(notifyAssignAreaSuccess());
    } catch (err) {
        yield put(handleError(err));
    }
}
