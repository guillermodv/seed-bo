import {call, put} from 'redux-saga/effects';

import {handleError, receiveVersion} from '../actions';
import {getVersion} from '../services/utils';

// eslint-disable-next-line
export function* fetchVersion() {
    try {
        const {app: {version, date}} = yield call(getVersion);
        yield put(receiveVersion(version, date));
    } catch (err) {
        yield put(handleError(err));
    }
}
