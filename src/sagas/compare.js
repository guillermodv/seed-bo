import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {
    surveyFetchWithTypeSucceeded,
    dwellingsFetchWithTypeSucceeded
} from '../actions/compare';

import ReviewService from '../services/review';

export function* fetchSurveyWithType({
    id, sample, collectionType
}) {
    try {
        const {survey} = yield call(ReviewService.fetchSurveyToCompare, id, collectionType);
        yield put(surveyFetchWithTypeSucceeded(survey, sample));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingWithType({
    id, sample, collectionType
}) {
    try {
        const {dwellings} = yield call(ReviewService.fetchDwellingsType, id, collectionType);
        yield put(dwellingsFetchWithTypeSucceeded(dwellings, sample));
    } catch (err) {
        yield put(handleError(err));
    }
}
