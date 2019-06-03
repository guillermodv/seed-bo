import {chunkBlocksDwellings, getRadioData} from '@indec/react-address-commons/util';

import {
    BLOCKS_BY_AREA_FETCH_SUCCEEDED,
    FIELD_MATERIALS_FETCH_REQUESTED,
    FIELD_MATERIALS_BY_STATE_FETCH_REQUESTED,
    FIELD_MATERIALS_BY_UPS_FETCH_REQUESTED,
    FIELD_MATERIALS_FETCH_SUCCEEDED,
    FIELD_MATERIALS_BY_STATE_FETCH_SUCCEEDED,
    FIELD_MATERIALS_BY_UPS_FETCH_SUCCEEDED,
    GEOGRAPHIC_FETCH_SUCCEEDED
} from '../actions/fieldMaterials';

export default function fieldMaterials(state = {}, action) {
    switch (action.type) {
        case FIELD_MATERIALS_BY_STATE_FETCH_REQUESTED:
        case FIELD_MATERIALS_BY_UPS_FETCH_REQUESTED:
        case FIELD_MATERIALS_FETCH_REQUESTED:
            return {...state, fieldMaterials: []};
        case FIELD_MATERIALS_BY_STATE_FETCH_SUCCEEDED:
        case FIELD_MATERIALS_FETCH_SUCCEEDED:
        case FIELD_MATERIALS_BY_UPS_FETCH_SUCCEEDED:
            return {...state, fieldMaterials: action.fieldMaterials};
        case GEOGRAPHIC_FETCH_SUCCEEDED:
            return {...state, geographic: action.geographic};
        case BLOCKS_BY_AREA_FETCH_SUCCEEDED:
            return {
                ...state,
                blocks: chunkBlocksDwellings({blocks: action.blocks, firstDwellingChunkSize: 5, dwellingChunkSize: 7}),
                radioData: getRadioData(action.blocks)
            };
        default:
            return state;
    }
}
