import {chunk, size} from 'lodash';

import {
    CLEAN_SURVEYS,
    DWELLINGS_FETCH_WITH_TYPE_SUCCEEDED,
    FETCH_SURVEY_WITH_TYPE_REQUESTED,
    FETCH_SURVEY_WITH_TYPE_SUCCEEDED
} from '../actions/compare';

import {buildTreeBeard} from '../services/utils';
import {DEFAULT_PAGE_SIZE} from '../constants';

const defaultState = {
    loading: false, surveyA: null, surveyB: null, selectA: '', selectB: '', dwellingsA: null, dwellingsB: null
};

export default function fieldMaterials(state = defaultState, action) {
    switch (action.type) {
        case CLEAN_SURVEYS:
            return {...state, ...defaultState};
        case DWELLINGS_FETCH_WITH_TYPE_SUCCEEDED:
            return {
                ...state,
                [`dwellings${action.sample}`]: {
                    dwellings: chunk(action.dwellings, DEFAULT_PAGE_SIZE),
                    dwellingTotal: size(action.dwellings)
                }
            };
        case FETCH_SURVEY_WITH_TYPE_REQUESTED:
            return {...state, loading: true, [`select${action.sample}`]: action.collectionType};
        case FETCH_SURVEY_WITH_TYPE_SUCCEEDED:
            return {
                ...state,
                [`survey${action.sample}`]: buildTreeBeard(action, state),
                [`dwellings${action.sample}`]: null,
                loading: false
            };
        default:
            return state;
    }
}
