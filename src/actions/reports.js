export const BLOCK_REPORTS_FETCH_REQUESTED = 'BLOCK_REPORTS_FETCH_REQUESTED';
export const BLOCK_REPORTS_FETCH_SUCCEEDED = 'BLOCK_REPORTS_FETCH_SUCCEEDED';

export const requestBlockReports = params => ({
    type: BLOCK_REPORTS_FETCH_REQUESTED,
    params
});

export const receiveBlockReports = blocks => ({
    type: BLOCK_REPORTS_FETCH_SUCCEEDED,
    blocks
});

export const DWELLING_REPORTS_FETCH_REQUESTED = 'DWELLING_REPORTS_FETCH_REQUESTED';
export const DWELLING_REPORTS_FETCH_SUCCEEDED = 'DWELLING_REPORTS_FETCH_SUCCEEDED';

export const requestDwellingReports = params => ({
    type: DWELLING_REPORTS_FETCH_REQUESTED,
    params
});

export const receiveDwellingReports = dwellings => ({
    type: DWELLING_REPORTS_FETCH_SUCCEEDED,
    dwellings
});

export const DWELLING_REPORT_BY_TYPE_FETCH_REQUESTED = 'DWELLING_REPORT_BY_TYPE_FETCH_REQUESTED';
export const DWELLING_REPORT_BY_TYPE_FETCH_SUCCEEDED = 'DWELLING_REPORT_BY_TYPE_FETCH_SUCCEEDED';

export const requestDwellingReportByType = (params, reportType) => ({
    type: DWELLING_REPORT_BY_TYPE_FETCH_REQUESTED,
    params,
    reportType
});

export const receiveDwellingReportByType = (report, filters) => ({
    type: DWELLING_REPORT_BY_TYPE_FETCH_SUCCEEDED,
    report,
    filters
});

export const REPORT_FILTERS_SET_REQUESTED = 'REPORT_FILTERS_SET_REQUESTED';

export const requestSetReportFilters = filters => ({
    type: REPORT_FILTERS_SET_REQUESTED,
    filters
});
