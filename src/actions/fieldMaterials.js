export const FIELD_MATERIALS_FETCH_REQUESTED = 'FIELD_MATERIALS_FETCH_REQUESTED';
export const FIELD_MATERIALS_FETCH_SUCCEEDED = 'FIELD_MATERIALS_FETCH_SUCCEEDED';

export const requestFetchFieldMaterials = () => ({type: FIELD_MATERIALS_FETCH_REQUESTED});
export const receiveFieldMaterials = fieldMaterials => ({type: FIELD_MATERIALS_FETCH_SUCCEEDED, fieldMaterials});

export const FIELD_MATERIALS_BY_STATE_FETCH_REQUESTED = 'FIELD_MATERIALS_BY_STATE_FETCH_REQUESTED';
export const FIELD_MATERIALS_BY_STATE_FETCH_SUCCEEDED = 'FIELD_MATERIALS_BY_STATE_FETCH_SUCCEEDED';

export const requestFetchFieldMaterialsByState = state => ({
    type: FIELD_MATERIALS_BY_STATE_FETCH_REQUESTED,
    state
});

export const receiveFieldMaterialsByState = fieldMaterials => ({
    type: FIELD_MATERIALS_BY_STATE_FETCH_SUCCEEDED,
    fieldMaterials
});

export const FIELD_MATERIALS_BY_UPS_FETCH_REQUESTED = 'FIELD_MATERIALS_BY_UPS_FETCH_REQUESTED';
export const FIELD_MATERIALS_BY_UPS_FETCH_SUCCEEDED = 'FIELD_MATERIALS_BY_UPS_FETCH_SUCCEEDED';

export const requestFetchFieldMaterialsByUps = (state, ups) => ({
    type: FIELD_MATERIALS_BY_UPS_FETCH_REQUESTED,
    state,
    ups
});

export const receiveFieldMaterialsByUps = fieldMaterials => ({
    type: FIELD_MATERIALS_BY_UPS_FETCH_SUCCEEDED,
    fieldMaterials
});

export const GEOGRAPHIC_FETCH_REQUESTED = 'GEOGRAPHIC_FETCH_REQUESTED';
export const GEOGRAPHIC_FETCH_SUCCEEDED = 'GEOGRAPHIC_FETCH_SUCCEEDED';

export const requestFetchGeographic = (state, ups, area) => ({
    type: GEOGRAPHIC_FETCH_REQUESTED, state, ups, area
});

export const receiveGeographic = geographic => ({type: GEOGRAPHIC_FETCH_SUCCEEDED, geographic});

export const BLOCKS_BY_AREA_FETCH_REQUESTED = 'BLOCKS_BY_AREA_FETCH_REQUESTED';
export const BLOCKS_BY_AREA_FETCH_SUCCEEDED = 'BLOCKS_BY_AREA_FETCH_SUCCEEDED';

export const requestFetchBlocksByArea = (state, ups, area) => ({
    type: BLOCKS_BY_AREA_FETCH_REQUESTED, state, ups, area
});

export const receiveBlocksByArea = blocks => ({type: BLOCKS_BY_AREA_FETCH_SUCCEEDED, blocks});
