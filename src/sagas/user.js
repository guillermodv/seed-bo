import {call, put} from 'redux-saga/effects';

import {receiveUsersByArea} from '../actions/user';
import {handleError} from '../actions';
import UserService from '../services/user';

// eslint-disable-next-line
export function* fetchByArea({area}) {
    try {
        const {users} = yield call(UserService.fetchByArea, area);
        yield put(receiveUsersByArea(users));
    } catch (err) {
        yield put(handleError({handleError: true, errorMsg: err}));
    }
}
