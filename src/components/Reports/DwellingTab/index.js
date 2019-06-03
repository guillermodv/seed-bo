import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator} from '@indec/react-commons';

import {requestDwellingReportByType, requestSetReportFilters} from '../../../actions/reports';
import Filters from './Filters';
import DwellingReport from './DwellingReport';
import DwellingTypesReport from './DwellingTypesReport';

class DwellingTab extends PureComponent {
    static propTypes = {
        requestDwellingReportByType: PropTypes.func.isRequired,
        requestSetReportFilters: PropTypes.func.isRequired,
        filters: PropTypes.shape({
            blocks: PropTypes.arrayOf(PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            })),
            sides: PropTypes.arrayOf(PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            })),
            dwellingTypes: PropTypes.arrayOf(PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            }))
        }),
        selectedFilters: PropTypes.shape({
            dwellingReportType: PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            }),
            block: PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            }),
            side: PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            }),
            dwellingType: PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            })
        }),
        filteredReport: PropTypes.arrayOf(PropTypes.shape({})),
        params: PropTypes.shape({
            area: PropTypes.number,
            state: PropTypes.number,
            ups: PropTypes.number
        }).isRequired,
        dwellings: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.shape({})),
            PropTypes.shape({})
        ]),
        report: PropTypes.arrayOf(PropTypes.shape({})),
        loading: PropTypes.bool
    };

    static defaultProps = {
        dwellings: null,
        filters: {
            blocks: [],
            sides: [],
            dwellingTypes: []
        },
        loading: false,
        report: null,
        selectedFilters: {
            dwellingReportType: null,
            block: null,
            side: null,
            dwellingType: null
        },
        filteredReport: null
    };

    handleFilter(value, name) {
        this.props.requestSetReportFilters({...this.props.selectedFilters, [name]: value});
    }

    handleReportType(type) {
        if (type) {
            this.props.requestDwellingReportByType(this.props.params, type.value);
        }
        this.props.requestSetReportFilters({
            dwellingReportType: type, block: null, side: null, dwellingType: null
        });
    }

    renderContent() {
        const {
            dwellings,
            report,
            filteredReport,
            filters: {blocks, sides, dwellingTypes},
            selectedFilters: {
                block, dwellingType, dwellingReportType, side
            }
        } = this.props;
        return (
            <Fragment>
                <Filters
                    {...{
                        block, blocks, dwellingType, dwellingTypes, dwellingReportType, side, sides
                    }}
                    onSelectFilter={(value, {name}) => this.handleFilter(value, name)}
                    onSelectType={type => this.handleReportType(type)}
                />
                {dwellingReportType && report ? (
                    <DwellingReport reports={filteredReport || report}/>
                ) : (
                    <DwellingTypesReport dwellings={dwellings}/>
                )}
            </Fragment>
        );
    }

    render() {
        return this.props.dwellings && !this.props.loading ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        dwellings: state.reports.dwellings,
        filters: state.reports.filters,
        loading: state.reports.loading,
        report: state.reports.report,
        selectedFilters: state.reports.selectedFilters,
        filteredReport: state.reports.filteredReport
    }),
    {
        requestDwellingReportByType, requestSetReportFilters
    }
)(DwellingTab);
