import {CLEAR_ERROR} from '../actions';

const defaultState = {errorMsg: null};

export default function session(state = defaultState, action) {
    switch (action.type) {
        case CLEAR_ERROR:
            return {...state, ...defaultState};
        default:
            return state;
    }
}
