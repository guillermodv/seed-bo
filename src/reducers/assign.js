import {find, map} from 'lodash';

import {
    REGIONAL_INFO_FETCHED,
    SAVE_REGIONAL_ASSIGN,
    SAVE_SUCCESS,
    ASSIGN_LEVEL_FETCHED,
    FETCH_ASSIGN_LEVEL,
    SUBMIT_ASSIGN,
    CLEAR_ASSIGN_LEVEL,
    CLEAR_SUCCESS,
    FETCH_UPS_REQUESTED,
    FETCH_UPS_SUCCEEDED,
    FETCH_AREAS_NUMBERS_SUCCEEDED,
    FETCH_ASSIGN_BY_UPS_SUCCEEDED,
    SET_SEARCH_PARAMS,
    SET_SUB_COORDINATOR_ASSIGN,
    ASSIGN_SAVE_UPS_REQUESTED,
    ASSIGN_SAVE_UPS_SUCCEEDED,
    ASSIGN_SAVE_AREA_REQUESTED,
    ASSIGN_SAVE_AREA_SUCCEEDED,
    FETCH_ASSIGN_BY_AREA_SUCCEEDED,
    SET_USER_BY_AREA,
    CLEAR_ASSIGN
} from '../actions/assign';

const handleAssignments = assignments => (map(assignments, assignment => ({...assignment, toAssign: false})));

export default function assign(state = {
    saving: false, loading: false, info: null, success: false
}, action) {
    switch (action.type) {
        case FETCH_ASSIGN_LEVEL:
            return {...state, loading: true, info: null};
        case REGIONAL_INFO_FETCHED:
            return {...state, regional: action.regional};
        case SAVE_REGIONAL_ASSIGN:
        case SUBMIT_ASSIGN:
            return {...state, saving: true, success: false};
        case SAVE_SUCCESS:
            return {
                ...state,
                saving: false,
                success: true,
                loading: false
            };
        case ASSIGN_LEVEL_FETCHED:
            return {...state, loading: false, info: action.info};
        case CLEAR_ASSIGN_LEVEL:
            return {...state, info: null};
        case CLEAR_ASSIGN:
            return {
                ...state, upsOptions: [], areaOptions: [], searchParams: {}
            };
        case CLEAR_SUCCESS:
            return {...state, success: false};
        case FETCH_UPS_REQUESTED:
            return {...state, upsOptions: []};
        case FETCH_UPS_SUCCEEDED:
            return {...state, upsOptions: action.ups};
        case FETCH_AREAS_NUMBERS_SUCCEEDED:
            return {...state, areaOptions: action.areas};
        case FETCH_ASSIGN_BY_UPS_SUCCEEDED:
            return {...state, ups: action.ups, subCoordinators: action.subCoordinators};
        case SET_SEARCH_PARAMS:
            return {...state, searchParams: action.searchParams};
        case SET_SUB_COORDINATOR_ASSIGN: {
            const ups = state.ups.slice();
            const foundUps = find(ups, u => u.ups === action.ups);
            Object.assign(foundUps, action.subCoordinator, {toAssign: true});
            return {...state, ups};
        }
        case ASSIGN_SAVE_UPS_REQUESTED:
            return {...state, saving: true, success: false};
        case ASSIGN_SAVE_UPS_SUCCEEDED:
            return {
                ...state, saving: false, success: true, loading: false, ups: handleAssignments(state.ups)
            };
        case ASSIGN_SAVE_AREA_REQUESTED:
            return {...state, saving: true, success: false};
        case ASSIGN_SAVE_AREA_SUCCEEDED:
            return {
                ...state,
                saving: false,
                success: true,
                loading: false,
                assignments: handleAssignments(state.assignments)
            };
        case FETCH_ASSIGN_BY_AREA_SUCCEEDED:
            return {
                ...state,
                assignments: action.assignments,
                pollsters: action.pollsters,
                supervisors: action.supervisors
            };
        case SET_USER_BY_AREA: {
            const assignments = state.assignments.slice();
            const foundAssign = find(assignments, assignment => assignment._id === action.assign._id);
            Object.assign(foundAssign, action.user);
            foundAssign.toAssign = foundAssign.pollster && foundAssign.supervisor;
            return {...state, assignments};
        }
        default:
            return state;
    }
}
