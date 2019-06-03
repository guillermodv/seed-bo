import {call, put} from 'redux-saga/effects';

import {notifyOpenAreaSucceeded, notifyOpenAreasSucceeded, receiveAreasToUnlock} from '../actions/unlock';
import UnlockService from '../services/unlock';
import {handleError} from '../actions';

export function* fetchAreasRequested({searchParams}) {
    try {
        const {areas} = yield call(UnlockService.fetchAreasToUnlock, searchParams);
        yield put(receiveAreasToUnlock(areas));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* openArea({id}) {
    try {
        yield call(UnlockService.openArea, id);
        yield put(notifyOpenAreaSucceeded(id));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* openAreas({state, ups}) {
    try {
        yield call(UnlockService.openAreas, state, ups);
        yield put(notifyOpenAreasSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}
