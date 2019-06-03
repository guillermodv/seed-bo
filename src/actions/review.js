export const AREAS_FETCH_REQUESTED = 'AREAS_FETCH_REQUESTED';
export const AREAS_FETCH_SUCCEEDED = 'AREAS_FETCH_SUCCEEDED';

export const requestFetchAreas = (searchParams, skip) => ({
    type: AREAS_FETCH_REQUESTED,
    searchParams,
    skip
});

export const receiveAreasSucceeded = (areas, areasCount, pageSize) => ({
    type: AREAS_FETCH_SUCCEEDED,
    areas,
    areasCount,
    pageSize
});

export const STATES_FETCH_REQUESTED = 'STATES_FETCH_REQUESTED';
export const STATES_FETCH_SUCCEEDED = 'STATES_FETCH_SUCCEEDED';

export const requestFetchStates = () => ({type: STATES_FETCH_REQUESTED});
export const receiveStates = states => ({type: STATES_FETCH_SUCCEEDED, states});

export const SET_REVIEW_SEARCH_PARAMS = 'SET_REVIEW_SEARCH_PARAMS';
export const setReviewSearchParams = searchParams => ({type: SET_REVIEW_SEARCH_PARAMS, searchParams});

export const FETCH_DEPARTMENTS_REQUESTED = 'FETCH_DEPARTMENTS_REQUESTED';
export const FETCH_DEPARTMENTS_SUCCEEDED = 'FETCH_DEPARTMENTS_SUCCEEDED';

export const requestFetchDepartments = state => ({
    type: FETCH_DEPARTMENTS_REQUESTED,
    state
});

export const receiveDepartments = departments => ({
    type: FETCH_DEPARTMENTS_SUCCEEDED,
    departments
});

export const FETCH_LOCALITIES_REQUESTED = 'FETCH_LOCALITIES_REQUESTED';
export const FETCH_LOCALITIES_SUCCEEDED = 'FETCH_LOCALITIES_SUCCEEDED';

export const requestFetchLocalities = (state, department) => ({
    type: FETCH_LOCALITIES_REQUESTED,
    state,
    department
});

export const receiveLocalities = localities => ({
    type: FETCH_LOCALITIES_SUCCEEDED,
    localities
});

export const FETCH_FRACTIONS_REQUESTED = 'FETCH_FRACTIONS_REQUESTED';
export const FETCH_FRACTIONS_SUCCEEDED = 'FETCH_FRACTIONS_SUCCEEDED';

export const requestFetchFractions = (state, department, locality) => ({
    type: FETCH_FRACTIONS_REQUESTED,
    state,
    department,
    locality
});

export const receiveFractions = fractions => ({
    type: FETCH_FRACTIONS_SUCCEEDED,
    fractions
});

export const FETCH_RADIOS_REQUESTED = 'FETCH_RADIOS_REQUESTED';
export const FETCH_RADIOS_SUCCEEDED = 'FETCH_RADIOS_SUCCEEDED';

export const requestFetchRadios = (state, department, locality, fraction) => ({
    type: FETCH_RADIOS_REQUESTED,
    state,
    department,
    locality,
    fraction
});

export const receiveRadios = radios => ({
    type: FETCH_RADIOS_SUCCEEDED,
    radios
});

export const FETCH_USERS_BY_AREA_REQUESTED = 'FETCH_USERS_BY_AREA_REQUESTED';
export const FETCH_USERS_BY_AREA_SUCCEEDED = 'FETCH_USERS_BY_AREA_SUCCEEDED';

export const requestFetchUsersByArea = params => ({
    type: FETCH_USERS_BY_AREA_REQUESTED,
    params
});

export const receiveUsersByArea = users => ({
    type: FETCH_USERS_BY_AREA_SUCCEEDED,
    users
});

export const CLEAR_AREAS_REQUESTED = 'CLEAR_AREAS_REQUESTED';

export const requestClearAreas = () => ({
    type: CLEAR_AREAS_REQUESTED
});

export const FETCH_AREAS_REQUESTED = 'FETCH_AREAS_REQUESTED';
export const FETCH_AREAS_SUCCEEDED = 'FETCH_AREAS_SUCCEEDED';

export const FETCH_SURVEY = 'FETCH_SURVEY';
export const SURVEY_FETCHED = 'SURVEY_FETCHED';

export const surveyFetched = survey => ({type: SURVEY_FETCHED, survey});

export const ACTION_SUCCEEDED = 'ACTION_SUCCEEDED';
export const CLEAR_SUCCEEDED = 'CLEAR_SUCCEEDED';

export const REASSIGN_AREA_REQUESTED = 'REASSIGN_AREA_REQUESTED';
export const REASSIGN_AREA_SUCCEEDED = 'REASSIGN_AREA_SUCCEEDED';

export const requestReassignArea = (id, pollster) => ({
    type: REASSIGN_AREA_REQUESTED, id, pollster
});

export const notifyReassignAreaSuccess = () => ({
    type: REASSIGN_AREA_SUCCEEDED
});

export const APPROVE_AREA_REQUESTED = 'APPROVE_AREA_REQUESTED';
export const APPROVE_AREA_SUCCEEDED = 'APPROVE_AREA_SUCCEEDED';

export const requestApproveArea = id => ({type: APPROVE_AREA_REQUESTED, id});

export const notifyApproveAreaSuccess = () => ({
    type: APPROVE_AREA_SUCCEEDED
});

export const REOPEN_AREA_REQUESTED = 'REOPEN_AREA_REQUESTED';
export const REOPEN_AREA_SUCCEEDED = 'REOPEN_AREA_SUCCEEDED';

export const requestReopenArea = (id, supervision) => ({type: REOPEN_AREA_REQUESTED, id, supervision});

export const notifyReopenAreaSuccess = () => ({
    type: REOPEN_AREA_SUCCEEDED
});

export const CLOSE_AREA_REQUESTED = 'CLOSE_AREA_REQUESTED';
export const CLOSE_AREA_SUCCEEDED = 'CLOSE_AREA_SUCCEEDED';

export const requestCloseArea = id => ({type: CLOSE_AREA_REQUESTED, id});
export const notifyCloseAreaSuccess = () => ({type: CLOSE_AREA_SUCCEEDED});

export const SEARCH_STREETS_REQUESTED = 'SEARCH_STREETS_REQUESTED';
export const SEARCH_STREETS_SUCCEEDED = 'SEARCH_STREETS_SUCCEEDED';
export const CLEAR_STREETS_REQUESTED = 'CLEAR_STREETS_REQUESTED';

export const requestSearchStreet = (id, term) => ({type: SEARCH_STREETS_REQUESTED, id, term});
export const receivedStreets = streets => ({type: SEARCH_STREETS_SUCCEEDED, streets});
export const requestClearStreets = () => ({type: CLEAR_STREETS_REQUESTED});

export const ADD_DWELLING_FOR_SUPERVISION = 'ADD_DWELLING_FOR_SUPERVISION';
export const addDwellingForSupervision = (ids, selected) => ({type: ADD_DWELLING_FOR_SUPERVISION, ids, selected});

export const SUPERVISE_AREA_REQUESTED = 'SUPERVISE_AREA_REQUESTED';
export const SUPERVISE_AREA_SUCCEEDED = 'SUPERVISE_AREA_SUCCEEDED';

export const requestSuperviseArea = (id, dwellings) => ({
    type: SUPERVISE_AREA_REQUESTED,
    id,
    dwellings
});

export const notifyAreaSuperviseSuccess = () => ({
    type: SUPERVISE_AREA_SUCCEEDED
});

export const CLEAR_AREA_REQUESTED = 'CLEAR_AREA_REQUESTED';
export const CLEAR_AREA_SUCCEEDED = 'CLEAR_AREA_SUCCEEDED';

export const requestClearArea = id => ({type: CLEAR_AREA_REQUESTED, id});
export const notifyClearAreaSuccess = () => ({type: CLEAR_AREA_SUCCEEDED});

export const FINISH_AREA_REQUESTED = 'FINISH_AREA_REQUESTED';
export const FINISH_AREA_SUCCEEDED = 'FINISH_AREA_SUCCEEDED';

export const requestFinishArea = id => ({type: FINISH_AREA_REQUESTED, id});
export const notifyFinishAreaSuccess = () => ({type: FINISH_AREA_SUCCEEDED});

export const VALIDATE_BLOCK_NUMBER_AVAILABILITY_REQUESTED = 'VALIDATE_BLOCK_NUMBER_AVAILABILITY_REQUESTED';
export const VALIDATE_BLOCK_NUMBER_AVAILABILITY_SUCCEEDED = 'VALIDATE_BLOCK_NUMBER_AVAILABILITY_SUCCEEDED';

export const requestValidateBlockNumberAvailability = (blocks, blockId, value) => ({
    type: VALIDATE_BLOCK_NUMBER_AVAILABILITY_REQUESTED,
    blocks,
    blockId,
    value
});

export const notifyValidateBlockNumberAvailability = isBlockNumberUnavailable => ({
    type: VALIDATE_BLOCK_NUMBER_AVAILABILITY_SUCCEEDED,
    isBlockNumberUnavailable
});

export const VALIDATE_STREET_CODE_AVAILABILITY_REQUESTED = 'VALIDATE_STREET_CODE_AVAILABILITY_REQUESTED';
export const VALIDATE_STREET_CODE_AVAILABILITY_SUCCEEDED = 'VALIDATE_STREET_CODE_AVAILABILITY_SUCCEEDED';

export const requestValidateStreetCodeAvailability = (id, streetId, code) => ({
    type: VALIDATE_STREET_CODE_AVAILABILITY_REQUESTED,
    id,
    streetId,
    code
});

export const notifyValidateStreetCodeAvailability = isStreetCodeUnavailable => ({
    type: VALIDATE_STREET_CODE_AVAILABILITY_SUCCEEDED,
    isStreetCodeUnavailable
});

export const FETCH_AREA_DATA_REQUESTED = 'AREA_DATA_REQUESTED';
export const FETCH_AREA_DATA_SUCCEEDED = 'AREA_DATA_SUCCEEDED';

export const requestFetchAreaData = idArea => ({
    type: FETCH_AREA_DATA_REQUESTED,
    idArea
});

export const receiveAreaData = areaData => ({
    type: FETCH_AREA_DATA_SUCCEEDED,
    areaData
});

export const AREA_GEOGRAPHIC_FETCH_REQUESTED = 'AREA_GEOGRAPHIC_FETCH_REQUESTED';
export const AREA_GEOGRAPHIC_FETCH_SUCCEEDED = 'AREA_GEOGRAPHIC_FETCH_SUCCEEDED';

export const requestFetchGeographicByArea = id => ({
    type: AREA_GEOGRAPHIC_FETCH_REQUESTED,
    id
});

export const receiveGeographic = geographic => ({
    type: AREA_GEOGRAPHIC_FETCH_SUCCEEDED,
    geographic
});

export const FETCH_RADIOS_BY_AREA_REQUESTED = 'FETCH_RADIOS_BY_AREA_REQUESTED';
export const FETCH_RADIOS_BY_AREA_SUCCEEDED = 'FETCH_RADIOS_BY_AREA_SUCCEEDED';

export const requestFetchRadiosByArea = idArea => ({
    type: FETCH_RADIOS_BY_AREA_REQUESTED,
    idArea
});

export const receiveRadiosByArea = radios => ({
    type: FETCH_RADIOS_BY_AREA_SUCCEEDED,
    radios
});

export const FETCH_SIDES_REQUESTED = 'FETCH_SIDES_REQUESTED';
export const FETCH_SIDES_SUCCEEDED = 'FETCH_SIDES_SUCCEEDED';

export const requestFetchSides = (area, block) => ({
    type: FETCH_SIDES_REQUESTED,
    area,
    block
});

export const receiveSides = sides => ({
    type: FETCH_SIDES_SUCCEEDED,
    sides
});

export const FETCH_DWELLINGS_REQUESTED = 'FETCH_DWELLINGS_REQUESTED';
export const FETCH_DWELLINGS_SUCCEEDED = 'FETCH_DWELLINGS_SUCCEEDED';

export const fetchDwellings = (area, side) => ({
    type: FETCH_DWELLINGS_REQUESTED,
    area,
    side
});

export const fetchDwellingsSucceeded = dwellings => ({
    type: FETCH_DWELLINGS_SUCCEEDED,
    dwellings
});

export const SAVE_BLOCKS_REQUESTED = 'SAVE_BLOCKS_REQUESTED';
export const SAVE_BLOCKS_SUCCEEDED = 'SAVE_BLOCKS_SUCCEEDED';

export const requestSaveBlocks = (idArea, editedBlocks) => ({
    type: SAVE_BLOCKS_REQUESTED,
    idArea,
    editedBlocks
});

export const notifyBlocksSaveSuccess = editedBlocks => ({
    type: SAVE_BLOCKS_SUCCEEDED,
    editedBlocks
});

export const SAVE_SIDES_REQUESTED = 'SAVE_SIDES_REQUESTED';
export const SAVE_SIDES_SUCCEEDED = 'SAVE_SIDES_SUCCEEDED';

export const requestSaveSides = (idArea, idBlock, editedSides) => ({
    type: SAVE_SIDES_REQUESTED,
    idArea,
    idBlock,
    editedSides
});

export const notifySidesSaveSuccess = editedSides => ({
    type: SAVE_SIDES_SUCCEEDED,
    editedSides
});

export const SAVE_STREETS_REQUESTED = 'SAVE_STREETS_REQUESTED';
export const SAVE_STREETS_SUCCEEDED = 'SAVE_STREETS_SUCCEEDED';

export const requestSaveStreets = (idArea, idBlock, editedStreets) => ({
    type: SAVE_STREETS_REQUESTED,
    idArea,
    idBlock,
    editedStreets
});

export const notifyStreetsSaveSuccess = editedStreets => ({
    type: SAVE_STREETS_SUCCEEDED,
    editedStreets
});

export const VALIDATE_BLOCKS_AND_SIDES_REQUESTED = 'VALIDATE_BLOCKS_AND_SIDES_REQUESTED';
export const VALIDATE_BLOCKS_AND_SIDES_SUCCEEDED = 'VALIDATE_BLOCKS_AND_SIDES_SUCCEEDED';

export const requestValidateBlocksAndStreets = id => ({
    type: VALIDATE_BLOCKS_AND_SIDES_REQUESTED,
    id
});

export const notifyValidateBlocksAndStreets = hasErrors => ({
    type: VALIDATE_BLOCKS_AND_SIDES_SUCCEEDED,
    hasErrors
});

export const FETCH_AREA_ERRORS_REQUESTED = 'FETCH_AREA_ERRORS_REQUESTED';
export const FETCH_AREA_ERRORS_SUCCEEDED = 'FETCH_AREA_ERRORS_SUCCEEDED';

export const requestFetchAreaErrors = id => ({
    type: FETCH_AREA_ERRORS_REQUESTED,
    id
});

export const receiveAreaErrors = (blockErrors, sideErrors) => ({
    type: FETCH_AREA_ERRORS_SUCCEEDED,
    blockErrors,
    sideErrors
});

export const AREA_DOWNLOAD_ERRORS_REQUESTED = 'AREA_DOWNLOAD_ERRORS_REQUESTED';
export const AREA_DOWNLOAD_ERRORS_SUCCEEDED = 'AREA_DOWNLOAD_ERRORS_SUCCEEDED';

export const requestDownloadAreaErrors = idArea => ({type: AREA_DOWNLOAD_ERRORS_REQUESTED, idArea});

export const notifyDownloadAreaErrorsSucceeded = () => ({type: AREA_DOWNLOAD_ERRORS_SUCCEEDED});

export const BLOCKS_BY_RADIO_FETCH_REQUESTED = 'BLOCKS_BY_RADIO_FETCH_REQUESTED';
export const BLOCKS_BY_RADIO_FETCH_SUCCEEDED = 'BLOCKS_BY_RADIO_FETCH_SUCCEEDED';

export const requestFetchBlocksByRadio = params => ({type: BLOCKS_BY_RADIO_FETCH_REQUESTED, params});

export const receiveBlocksByRadio = (blocks, radioData) => ({
    type: BLOCKS_BY_RADIO_FETCH_SUCCEEDED,
    blocks,
    radioData
});

export const BLOCKS_AND_STREETS_BY_RADIO_FETCH_REQUESTED = 'BLOCKS_AND_STREETS_BY_RADIO_FETCH_REQUESTED';
export const BLOCKS_AND_STREETS_BY_RADIO_FETCH_SUCCEEDED = 'BLOCKS_AND_STREETS_BY_RADIO_FETCH_SUCCEEDED';

export const requestFetchBlocksAndStreetsByRadio = params => ({
    type: BLOCKS_AND_STREETS_BY_RADIO_FETCH_REQUESTED,
    params
});

export const receiveBlocksAndStreetsByRadio = (blocks, radioData) => ({
    type: BLOCKS_AND_STREETS_BY_RADIO_FETCH_SUCCEEDED,
    blocks,
    radioData
});

export const BLOCKS_AND_RADIO_DATA_CLEAN = 'BLOCKS_AND_RADIO_DATA_CLEAN';

export const cleanBlocksAndRadioData = () => ({
    type: BLOCKS_AND_RADIO_DATA_CLEAN
});

export const requestFetchAreaGeographic = id => ({type: AREA_GEOGRAPHIC_FETCH_REQUESTED, id});
export const receiveAreaGeographic = geographic => ({type: AREA_GEOGRAPHIC_FETCH_SUCCEEDED, geographic});

export const USERS_BY_UPS_FETCH_REQUESTED = 'USERS_BY_UPS_FETCH_REQUESTED';
export const USERS_BY_UPS_FETCH_SUCCEEDED = 'USERS_BY_UPS_FETCH_SUCCEEDED';

export const requestFetchUsersByUps = (state, ups) => ({type: USERS_BY_UPS_FETCH_REQUESTED, state, ups});
export const receiveUsersByUps = users => ({type: USERS_BY_UPS_FETCH_SUCCEEDED, users});

export const UPS_OPEN_BY_STATE_FETCH_REQUESTED = 'UPS_OPEN_BY_STATE_FETCH_REQUESTED';
export const UPS_OPEN_BY_STATE_FETCH_SUCCEEDED = 'UPS_OPEN_BY_STATE_FETCH_SUCCEEDED';

export const requestFetchUpsOpenByState = state => ({type: UPS_OPEN_BY_STATE_FETCH_REQUESTED, state});
export const receiveUpsOpenByState = ups => ({type: UPS_OPEN_BY_STATE_FETCH_SUCCEEDED, ups});

export const AREAS_OPEN_BY_UPS_FETCH_REQUESTED = 'AREAS_OPEN_BY_UPS_FETCH_REQUESTED';
export const AREAS_OPEN_BY_UPS_FETCH_SUCCEEDED = 'AREAS_OPEN_BY_UPS_FETCH_SUCCEEDED';

export const requestFetchAreasOpenByUps = (state, ups) => ({type: AREAS_OPEN_BY_UPS_FETCH_REQUESTED, state, ups});
export const receiveAreasOpenByUps = areas => ({type: AREAS_OPEN_BY_UPS_FETCH_SUCCEEDED, areas});
