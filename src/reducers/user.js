import {
    USERS_FETCH_SUCCEEDED,
    USERS_FETCH_REQUESTED,
    USER_FETCH_SUCCEEDED,
    USERS_FIND_SUCCEEDED,
    USER_SAVE_REQUESTED,
    USER_SAVE_SUCCEEDED
} from '../actions';
import {USERS_FETCH_BY_AREA_REQUESTED, USERS_FETCH_BY_AREA_SUCCEEDED} from '../actions/user';

export default function user(state = {saving: false, loading: false}, action) {
    switch (action.type) {
        case USERS_FETCH_SUCCEEDED:
            return {
                ...state,
                users: action.users,
                usersCount: action.usersCount,
                pageSize: action.pageSize,
                states: action.states,
                loading: false
            };
        case USER_FETCH_SUCCEEDED:
            return {...state, user: action.user};
        case USERS_FETCH_REQUESTED:
            return {...state, users: [], loading: true};
        case USERS_FIND_SUCCEEDED:
            return {...state, assignUsers: action.newUsers};
        case USER_SAVE_REQUESTED:
            return {...state, saving: true};
        case USER_SAVE_SUCCEEDED:
            return {...state, saving: false};
        case USERS_FETCH_BY_AREA_REQUESTED:
            return {...state, users: []};
        case USERS_FETCH_BY_AREA_SUCCEEDED:
            return {...state, users: action.users};
        default:
            return state;
    }
}
