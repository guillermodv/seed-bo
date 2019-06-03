import {find, map} from 'lodash';

import {
    AREA_OPEN_SUCCEEDED,
    AREAS_OPEN_SUCCEEDED,
    AREAS_FETCH_TO_UNLOCK_REQUESTED,
    AREAS_FETCH_TO_UNLOCK_SUCCEEDED,
    AREAS_SET_SEARCH_PARAMS,
    CLEAR_UNLOCK
} from '../actions/unlock';
import {areaStatus} from '../constants';

export default function assign(state = {
    saving: false, loading: false, success: false
}, action) {
    switch (action.type) {
        case AREAS_FETCH_TO_UNLOCK_REQUESTED:
            return {...state, loading: true, areas: []};
        case AREAS_FETCH_TO_UNLOCK_SUCCEEDED:
            return {...state, loading: false, areas: action.areas};
        case AREAS_SET_SEARCH_PARAMS:
            return {...state, searchParams: action.searchParams};
        case AREA_OPEN_SUCCEEDED: {
            const areas = state.areas.slice();
            const area = find(areas, a => a._id === action.id);
            Object.assign(area, {status: areaStatus.OPEN});
            return {...state, areas};
        }
        case AREAS_OPEN_SUCCEEDED: {
            const areas = state.areas.slice();
            return {...state, areas: map(areas, area => ({...area, status: areaStatus.OPEN}))};
        }
        case CLEAR_UNLOCK:
            return {...state, areas: [], searchParams: {}};
        default:
            return state;
    }
}
