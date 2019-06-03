import {
    BLOCK_REPORTS_FETCH_REQUESTED,
    BLOCK_REPORTS_FETCH_SUCCEEDED,
    DWELLING_REPORTS_FETCH_REQUESTED,
    DWELLING_REPORTS_FETCH_SUCCEEDED,
    DWELLING_REPORT_BY_TYPE_FETCH_REQUESTED,
    DWELLING_REPORT_BY_TYPE_FETCH_SUCCEEDED,
    REPORT_FILTERS_SET_REQUESTED
} from '../actions/reports';
import {filterReport} from '../util';

const initialState = {
    loading: false,
    selectedFilters: {
        dwellingReportType: null,
        block: null,
        side: null,
        dwellingType: null
    }
};

export default function reports(state = initialState, action) {
    switch (action.type) {
        case BLOCK_REPORTS_FETCH_SUCCEEDED:
            return {
                ...state,
                loading: false,
                blocks: action.blocks
            };
        case DWELLING_REPORTS_FETCH_SUCCEEDED:
            return {...state, loading: false, dwellings: action.dwellings};
        case DWELLING_REPORT_BY_TYPE_FETCH_SUCCEEDED:
            return {
                ...state, loading: false, report: action.report, filters: action.filters, filteredReport: null
            };
        case REPORT_FILTERS_SET_REQUESTED:
            return {
                ...state,
                selectedFilters: action.filters,
                filteredReport: filterReport(state.report, action.filters, state.selectedFilters)
            };
        case BLOCK_REPORTS_FETCH_REQUESTED:
        case DWELLING_REPORTS_FETCH_REQUESTED:
        case DWELLING_REPORT_BY_TYPE_FETCH_REQUESTED:
            return {...state, loading: true};
        default:
            return state;
    }
}
