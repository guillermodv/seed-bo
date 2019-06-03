export const FETCH_REGIONAL_INFO = 'FETCH_REGIONAL_INFO';
export const REGIONAL_INFO_FETCHED = 'REGIONAL_INFO_FETCHED';
export const SAVE_REGIONAL_ASSIGN = 'SAVE_REGIONAL_ASSIGN';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const FETCH_ASSIGN_LEVEL = 'FETCH_ASSIGN_LEVEL';
export const ASSIGN_LEVEL_FETCHED = 'ASSIGN_LEVEL_FETCHED';
export const SUBMIT_ASSIGN = 'SUBMIT_ASSIGN';
export const CLEAR_ASSIGN_LEVEL = 'CLEAR_ASSIGN_LEVEL';
export const CLEAR_ASSIGN = 'CLEAR_ASSIGN';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';

export const regionalInfoFetched = regionalData => ({type: REGIONAL_INFO_FETCHED, regional: regionalData});
export const saveSuccess = () => ({type: SAVE_SUCCESS});
export const assignLevelFetched = info => ({type: ASSIGN_LEVEL_FETCHED, info});

export const FETCH_UPS_REQUESTED = 'FETCH_UPS_REQUESTED';
export const FETCH_UPS_SUCCEEDED = 'FETCH_UPS_SUCCEEDED';

export const requestFetchUps = state => ({
    type: FETCH_UPS_REQUESTED,
    state
});

export const receiveUps = ups => ({
    type: FETCH_UPS_SUCCEEDED,
    ups
});

export const FETCH_AREAS_NUMBERS_REQUESTED = 'FETCH_AREAS_NUMBERS_REQUESTED';
export const FETCH_AREAS_NUMBERS_SUCCEEDED = 'FETCH_AREAS_NUMBERS_SUCCEEDED';

export const requestFetchAreasNumbers = (state, ups) => ({
    type: FETCH_AREAS_NUMBERS_REQUESTED,
    state,
    ups
});

export const receiveAreas = areas => ({
    type: FETCH_AREAS_NUMBERS_SUCCEEDED,
    areas
});

export const FETCH_ASSIGN_BY_UPS_REQUESTED = 'FETCH_ASSIGN_BY_UPS_REQUESTED';
export const FETCH_ASSIGN_BY_UPS_SUCCEEDED = 'FETCH_ASSIGN_BY_UPS_SUCCEEDED';

export const requestFetchAssignByUps = state => ({
    type: FETCH_ASSIGN_BY_UPS_REQUESTED,
    state
});

export const receiveAssignByUps = (ups, subCoordinators) => ({
    type: FETCH_ASSIGN_BY_UPS_SUCCEEDED,
    ups,
    subCoordinators
});

export const ASSIGN_SAVE_UPS_REQUESTED = 'ASSIGN_SAVE_UPS_REQUESTED';
export const ASSIGN_SAVE_UPS_SUCCEEDED = 'ASSIGN_SAVE_UPS_SUCCEEDED';

export const requestAssignUps = (state, assignments) => ({
    type: ASSIGN_SAVE_UPS_REQUESTED,
    state,
    assignments
});

export const notifyAssignUpsSuccess = () => ({
    type: ASSIGN_SAVE_UPS_SUCCEEDED
});

export const SET_SEARCH_PARAMS = 'SET_SEARCH_PARAMS';

export const setSearchParams = searchParams => ({
    type: SET_SEARCH_PARAMS,
    searchParams
});

export const SET_SUB_COORDINATOR_ASSIGN = 'SET_SUB_COORDINATOR_ASSIGN';

export const setSubCoordinatorAssign = (ups, subCoordinator) => ({
    type: SET_SUB_COORDINATOR_ASSIGN,
    ups,
    subCoordinator
});

export const FETCH_ASSIGN_BY_AREA_REQUESTED = 'FETCH_ASSIGN_BY_AREA_REQUESTED';
export const FETCH_ASSIGN_BY_AREA_SUCCEEDED = 'FETCH_ASSIGN_BY_AREA_SUCCEEDED';

export const requestFetchAssignByArea = searchParams => ({
    type: FETCH_ASSIGN_BY_AREA_REQUESTED,
    searchParams
});

export const receiveAssignByArea = (assignments, pollsters, supervisors) => ({
    type: FETCH_ASSIGN_BY_AREA_SUCCEEDED,
    assignments,
    pollsters,
    supervisors
});

export const SET_USER_BY_AREA = 'SET_USER_BY_AREA';

export const setUserByArea = (assign, user) => ({
    type: SET_USER_BY_AREA,
    assign,
    user
});

export const ASSIGN_SAVE_AREA_REQUESTED = 'ASSIGN_SAVE_AREA_REQUESTED';
export const ASSIGN_SAVE_AREA_SUCCEEDED = 'ASSIGN_SAVE_AREA_SUCCEEDED';

export const requestAssignArea = assignments => ({
    type: ASSIGN_SAVE_AREA_REQUESTED,
    assignments
});

export const notifyAssignAreaSuccess = () => ({
    type: ASSIGN_SAVE_AREA_SUCCEEDED
});

export const clearSuccess = () => ({
    type: CLEAR_SUCCESS
});

export const clearAssign = () => ({
    type: CLEAR_ASSIGN
});
