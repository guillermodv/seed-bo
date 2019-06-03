export const USERS_FETCH_BY_AREA_REQUESTED = 'USERS_FETCH_BY_AREA_REQUESTED';
export const USERS_FETCH_BY_AREA_SUCCEEDED = 'USERS_FETCH_BY_AREA_SUCCEEDED';

export const requestFetchUsersByArea = area => ({
    type: USERS_FETCH_BY_AREA_REQUESTED,
    area
});

export const receiveUsersByArea = users => ({
    type: USERS_FETCH_BY_AREA_SUCCEEDED,
    users
});
