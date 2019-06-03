export const AREAS_SET_SEARCH_PARAMS = 'AREAS_SET_SEARCH_PARAMS';

export const setSearchParams = searchParams => ({type: AREAS_SET_SEARCH_PARAMS, searchParams});

export const AREAS_FETCH_TO_UNLOCK_REQUESTED = 'AREAS_FETCH_TO_UNLOCK_REQUESTED';
export const AREAS_FETCH_TO_UNLOCK_SUCCEEDED = 'AREAS_FETCH_TO_UNLOCK_SUCCEEDED';

export const requestFetchAreasToUnlock = searchParams => ({type: AREAS_FETCH_TO_UNLOCK_REQUESTED, searchParams});

export const receiveAreasToUnlock = areas => ({type: AREAS_FETCH_TO_UNLOCK_SUCCEEDED, areas});

export const AREA_OPEN_REQUESTED = 'AREA_OPEN_REQUESTED';
export const AREA_OPEN_SUCCEEDED = 'AREA_OPEN_SUCCEEDED';

export const requestOpenArea = id => ({type: AREA_OPEN_REQUESTED, id});

export const notifyOpenAreaSucceeded = id => ({type: AREA_OPEN_SUCCEEDED, id});

export const AREAS_OPEN_REQUESTED = 'AREAS_OPEN_REQUESTED';
export const AREAS_OPEN_SUCCEEDED = 'AREAS_OPEN_SUCCEEDED';

export const requestOpenAreas = (state, ups) => ({type: AREAS_OPEN_REQUESTED, state, ups});

export const notifyOpenAreasSucceeded = () => ({type: AREAS_OPEN_SUCCEEDED});

export const CLEAR_UNLOCK = 'CLEAR_UNLOCK';

export const clearUnlock = () => ({type: CLEAR_UNLOCK});
