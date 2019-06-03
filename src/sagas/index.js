import {takeEvery, all} from 'redux-saga/effects';
import {
    fetchSession
} from '@indec/react-address-commons/sagas';

import {
    ERROR_OCCURRED,
    SESSION_REQUESTED
} from '../actions';

import handleError from './common';

export default function* root() {
    yield all([
        takeEvery(SESSION_REQUESTED, fetchSession),
        takeEvery(ERROR_OCCURRED, handleError)
    ]);
}
