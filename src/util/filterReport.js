import {
    filter, toNumber, toArray, pickBy, identity
} from 'lodash';

const filterReport = (report, newFilters, oldFilters) => {
    if (!report || (oldFilters.dwellingReportType && !newFilters.dwellingReportType)) {
        return null;
    }
    const filters = pickBy(newFilters, identity);
    let filteredReport = toArray(report);
    if (filters.block) {
        filteredReport = filter(filteredReport, item => (
            toNumber(item.block.number) === toNumber(newFilters.block.value)
        ));
    }
    if (filters.side) {
        filteredReport = filter(filteredReport, item => toNumber(item.side.number) === toNumber(newFilters.side.value));
    }
    if (filters.dwellingType) {
        filteredReport = filter(filteredReport, item => item.dwelling.type === newFilters.dwellingType.value);
    }
    return filteredReport;
};

export default filterReport;
