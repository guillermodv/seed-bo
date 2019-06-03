import {
    chunk, size, orderBy, find, get, head, map, filter
} from 'lodash';
import {
    AREAS_FETCH_REQUESTED,
    AREAS_FETCH_SUCCEEDED,
    AREAS_OPEN_BY_UPS_FETCH_SUCCEEDED,
    SET_REVIEW_SEARCH_PARAMS,
    STATES_FETCH_REQUESTED,
    STATES_FETCH_SUCCEEDED,
    ACTION_SUCCEEDED,
    ADD_DWELLING_FOR_SUPERVISION,
    APPROVE_AREA_REQUESTED,
    APPROVE_AREA_SUCCEEDED,
    BLOCKS_AND_STREETS_BY_RADIO_FETCH_SUCCEEDED,
    BLOCKS_AND_RADIO_DATA_CLEAN,
    BLOCKS_BY_RADIO_FETCH_SUCCEEDED,
    CLEAR_AREA_REQUESTED,
    CLEAR_AREA_SUCCEEDED,
    CLEAR_AREAS_REQUESTED,
    CLEAR_STREETS_REQUESTED,
    CLEAR_SUCCEEDED,
    CLOSE_AREA_REQUESTED,
    CLOSE_AREA_SUCCEEDED,
    FETCH_AREA_DATA_SUCCEEDED,
    FETCH_AREA_ERRORS_REQUESTED,
    FETCH_AREA_ERRORS_SUCCEEDED,
    FETCH_AREAS_REQUESTED,
    FETCH_AREAS_SUCCEEDED,
    FETCH_RADIOS_BY_AREA_REQUESTED,
    FETCH_RADIOS_BY_AREA_SUCCEEDED,
    FETCH_DEPARTMENTS_REQUESTED,
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DWELLINGS_REQUESTED,
    FETCH_DWELLINGS_SUCCEEDED,
    FETCH_FRACTIONS_REQUESTED,
    FETCH_FRACTIONS_SUCCEEDED,
    AREA_GEOGRAPHIC_FETCH_REQUESTED,
    AREA_GEOGRAPHIC_FETCH_SUCCEEDED,
    FETCH_LOCALITIES_REQUESTED,
    FETCH_LOCALITIES_SUCCEEDED,
    FETCH_RADIOS_REQUESTED,
    FETCH_RADIOS_SUCCEEDED,
    FETCH_SIDES_REQUESTED,
    FETCH_SIDES_SUCCEEDED,
    FETCH_SURVEY,
    FETCH_USERS_BY_AREA_SUCCEEDED,
    FINISH_AREA_REQUESTED,
    FINISH_AREA_SUCCEEDED,
    REASSIGN_AREA_REQUESTED,
    REASSIGN_AREA_SUCCEEDED,
    REOPEN_AREA_REQUESTED,
    REOPEN_AREA_SUCCEEDED,
    SAVE_BLOCKS_SUCCEEDED,
    SAVE_SIDES_SUCCEEDED,
    SAVE_STREETS_SUCCEEDED,
    SEARCH_STREETS_REQUESTED,
    SEARCH_STREETS_SUCCEEDED,
    SUPERVISE_AREA_REQUESTED,
    SUPERVISE_AREA_SUCCEEDED,
    SURVEY_FETCHED,
    UPS_OPEN_BY_STATE_FETCH_SUCCEEDED,
    VALIDATE_BLOCK_NUMBER_AVAILABILITY_SUCCEEDED,
    VALIDATE_BLOCKS_AND_SIDES_REQUESTED,
    VALIDATE_BLOCKS_AND_SIDES_SUCCEEDED,
    VALIDATE_STREET_CODE_AVAILABILITY_SUCCEEDED,
    USERS_BY_UPS_FETCH_SUCCEEDED
} from '../actions/review';
import {DEFAULT_PAGE_SIZE} from '../constants';
import {setDwellingsForSupervision} from '../services/utils';
import {getBlocks} from '../util';

const defaultState = {
    loading: false,
    success: false,
    searchParams: {},
    working: false,
    dwellings: null,
    filterParams: {
        block: null,
        side: null,
        dwelling: null
    },
    dwellingLoading: false,
    changes: false,
    streets: null,
    dwellingsForSupervision: []
};

export default function review(state = defaultState, action) {
    switch (action.type) {
        case AREAS_FETCH_REQUESTED:
            return {...state, loading: true};
        case AREAS_FETCH_SUCCEEDED:
            return {
                ...state,
                areas: action.areas,
                areasCount: action.areasCount,
                pageSize: action.pageSize,
                loading: false
            };
        case AREAS_OPEN_BY_UPS_FETCH_SUCCEEDED:
            return {...state, areaOptions: action.areas};
        case SET_REVIEW_SEARCH_PARAMS:
            return {...state, searchParams: action.searchParams};
        case STATES_FETCH_REQUESTED:
            return {
                ...state, loading: true
            };
        case STATES_FETCH_SUCCEEDED:
            return {
                ...state, loading: false, states: action.states
            };
        case FETCH_AREAS_REQUESTED:
            return {...state, searchParams: action.searchParams, loading: true};
        case APPROVE_AREA_REQUESTED:
        case REASSIGN_AREA_REQUESTED:
        case REOPEN_AREA_REQUESTED:
        case CLEAR_AREA_REQUESTED:
        case FINISH_AREA_REQUESTED:
            return {
                ...state, terminating: true, hasErrors: false, loading: true
            };
        case SUPERVISE_AREA_REQUESTED:
            return {
                ...state, terminating: true, hasErrors: false, supervising: true
            };
        case FETCH_SURVEY:
            return {
                ...state,
                loading: true,
                survey: null,
                filterParams: {
                    block: null,
                    side: null,
                    dwelling: null
                }
            };
        case FETCH_AREAS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                areas: action.areas,
                areasCount: action.areasCount,
                pageSize: action.pageSize
            };
        case SURVEY_FETCHED:
            return {
                ...state, loading: false, survey: action.survey, working: false
            };
        case ACTION_SUCCEEDED:
            return {
                ...state,
                loading: false,
                working: false,
                success: true,
                survey: action.survey,
                err: action.err
            };
        case CLEAR_SUCCEEDED:
            return {...state, success: false};
        case FETCH_DWELLINGS_REQUESTED:
            return {
                ...state, dwellings: null, dwellingTotal: 0, dwellingLoading: true
            };
        case FETCH_DWELLINGS_SUCCEEDED:
            return {
                ...state,
                dwellings: chunk(orderBy(action.dwellings, d => d.areaVisitOrder), DEFAULT_PAGE_SIZE),
                dwellingTotal: size(action.dwellings),
                dwellingLoading: false
            };
        case CLEAR_STREETS_REQUESTED:
        case SEARCH_STREETS_REQUESTED:
            return {...state, streets: [], isStreetCodeUnavailable: null};
        case SEARCH_STREETS_SUCCEEDED:
            return {...state, streets: action.streets};
        case ADD_DWELLING_FOR_SUPERVISION:
            return {
                ...state,
                dwellingsForSupervision: setDwellingsForSupervision(
                    action.ids, action.selected, state.dwellingsForSupervision
                )
            };
        case AREA_GEOGRAPHIC_FETCH_REQUESTED:
            return {...state, geographic: {}, loadingGeographic: true};
        case AREA_GEOGRAPHIC_FETCH_SUCCEEDED:
            return {...state, geographic: action.geographic, loadingGeographic: false};
        case FETCH_SIDES_REQUESTED:
            return {...state, sides: [], dwellings: []};
        case SAVE_SIDES_SUCCEEDED: {
            const sides = state.sides.slice();
            const side = find(sides, s => s._id === get(head(action.editedSides), '_id'));
            Object.assign(side, head(action.editedSides));
            return {...state, sides};
        }
        case FETCH_SIDES_SUCCEEDED:
            return {...state, sides: action.sides};
        case VALIDATE_BLOCK_NUMBER_AVAILABILITY_SUCCEEDED:
            return {...state, isBlockNumberUnavailable: action.isBlockNumberUnavailable};
        case VALIDATE_STREET_CODE_AVAILABILITY_SUCCEEDED:
            return {...state, isStreetCodeUnavailable: action.isStreetCodeUnavailable};
        case FETCH_RADIOS_BY_AREA_REQUESTED:
            return {
                ...state, blocks: [], sides: [], dwellings: [], hasErrors: false, loadingBlocks: true
            };
        case SAVE_BLOCKS_SUCCEEDED: {
            const radios = state.radios.slice();
            const blocks = getBlocks(radios);
            const block = find(blocks, b => b._id === get(head(action.editedBlocks), '_id'));
            Object.assign(block, head(action.editedBlocks), {blockErrors: {}});
            return {...state, radios};
        }
        case SAVE_STREETS_SUCCEEDED: {
            const sides = state.sides.slice();
            const filterSides = filter(
                sides, s => s.street._id === get(head(action.editedStreets), '_id')
            );
            map(filterSides, ({street}) => Object.assign(street, head(action.editedStreets)));
            return {...state, sides};
        }
        case FETCH_RADIOS_BY_AREA_SUCCEEDED:
            return {
                ...state, radios: action.radios, loadingBlocks: false, dwellingsForSupervision: []
            };
        case FETCH_AREA_DATA_SUCCEEDED:
            return {...state, areaData: action.areaData};
        case FINISH_AREA_SUCCEEDED:
            return {...state, terminating: false, loading: false};
        case FETCH_DEPARTMENTS_REQUESTED:
            return {
                ...state, departments: [], fractions: [], localities: [], radios: []
            };
        case FETCH_DEPARTMENTS_SUCCEEDED:
            return {...state, departments: action.departments};
        case FETCH_FRACTIONS_REQUESTED:
            return {
                ...state, fractions: [], radios: []
            };
        case FETCH_FRACTIONS_SUCCEEDED:
            return {...state, fractions: action.fractions};
        case FETCH_LOCALITIES_REQUESTED:
            return {
                ...state, localities: [], fractions: [], radios: []
            };
        case FETCH_LOCALITIES_SUCCEEDED:
            return {...state, localities: action.localities};
        case FETCH_RADIOS_REQUESTED:
            return {...state, radios: []};
        case FETCH_RADIOS_SUCCEEDED:
            return {...state, radios: action.radios};
        case FETCH_USERS_BY_AREA_SUCCEEDED:
            return {...state, users: action.users};
        case CLEAR_AREAS_REQUESTED:
            return {...state, areas: null};
        case CLOSE_AREA_REQUESTED:
            return {...state, working: true};
        case CLOSE_AREA_SUCCEEDED:
            return {...state, working: false};
        case VALIDATE_BLOCKS_AND_SIDES_REQUESTED:
            return {...state, validating: true};
        case VALIDATE_BLOCKS_AND_SIDES_SUCCEEDED:
            return {
                ...state,
                hasErrors: action.hasErrors,
                validating: false
            };
        case CLEAR_AREA_SUCCEEDED:
            return {...state, working: false, loading: false};
        case FETCH_AREA_ERRORS_REQUESTED:
            return {
                ...state, blockErrors: [], sideErrors: [], loadingAreaErrors: true
            };
        case FETCH_AREA_ERRORS_SUCCEEDED:
            return {
                ...state, blockErrors: action.blockErrors, sideErrors: action.sideErrors, loadingAreaErrors: false
            };
        case BLOCKS_AND_STREETS_BY_RADIO_FETCH_SUCCEEDED:
        case BLOCKS_BY_RADIO_FETCH_SUCCEEDED:
            return {...state, blocks: action.blocks, radioData: action.radioData};
        case BLOCKS_AND_RADIO_DATA_CLEAN:
            return {...state, blocks: null, radioData: {}};
        case SUPERVISE_AREA_SUCCEEDED:
            return {...state, supervising: false};
        case REOPEN_AREA_SUCCEEDED:
        case APPROVE_AREA_SUCCEEDED:
        case REASSIGN_AREA_SUCCEEDED:
            return {...state, loading: false};
        case UPS_OPEN_BY_STATE_FETCH_SUCCEEDED:
            return {...state, upsOptions: action.ups};
        case USERS_BY_UPS_FETCH_SUCCEEDED:
            return {...state, users: action.users};
        default:
            return state;
    }
}
