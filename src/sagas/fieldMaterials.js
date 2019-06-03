import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {
    receiveBlocksByArea,
    receiveFieldMaterials,
    receiveFieldMaterialsByState,
    receiveFieldMaterialsByUps,
    receiveGeographic
} from '../actions/fieldMaterials';
import FieldMaterialsService from '../services/fieldMaterials';

export function* fetch() {
    try {
        const fieldMaterials = yield call(FieldMaterialsService.fetch);
        yield put(receiveFieldMaterials(fieldMaterials));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchFieldMaterialsByState({state}) {
    try {
        const fieldMaterials = yield call(FieldMaterialsService.fetchByState, state);
        yield put(receiveFieldMaterialsByState(fieldMaterials));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchByUps({state, ups}) {
    try {
        const fieldMaterials = yield call(FieldMaterialsService.fetchByUps, state, ups);
        yield put(receiveFieldMaterialsByUps(fieldMaterials));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchGeographic({state, ups, area}) {
    try {
        const geographic = yield call(FieldMaterialsService.fetchGeographic, state, ups, area);
        yield put(receiveGeographic(geographic));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchBlocksByArea({state, ups, area}) {
    try {
        const blocks = yield call(FieldMaterialsService.fetchBlocksByArea, state, ups, area);
        yield put(receiveBlocksByArea(blocks));
    } catch (err) {
        yield put(handleError(err));
    }
}
