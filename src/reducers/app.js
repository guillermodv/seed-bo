import {
    VERSION_FETCH_REQUESTED,
    VERSION_FETCH_SUCCEEDED
} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case VERSION_FETCH_REQUESTED:
            return {...state, version: null, date: null};
        case VERSION_FETCH_SUCCEEDED:
            return {...state, version: action.version, date: action.date};
        default:
            return state;
    }
}
