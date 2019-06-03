import {call, put} from 'redux-saga/effects';
import {pollstersFetched, pollsterFetched} from '../actions/pollsters';
import PollstersServices from '../services/pollsters';

export function* fetchPollsters({state}) {
    const {pollsters} = yield call(PollstersServices.fetchPollsters, state);
    yield put(pollstersFetched(pollsters));
}

export function* fetchPollster({id}) {
    const {pollster} = yield call(PollstersServices.fetchPollster, id);
    yield put(pollsterFetched(pollster));
}
