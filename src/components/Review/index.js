import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons';
import {Col, Grid, Row} from 'react-bootstrap';
import {PageHeader, Pages, LoadingIndicator} from '@indec/react-commons';
import {
    identity, isEmpty, mapValues, toNumber, pickBy
} from 'lodash';

import {requestFetchAreas, setReviewSearchParams} from '../../actions/review';
import ReviewList from './ReviewList';
import SearchParams from './SearchParams';

class Review extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        requestFetchAreas: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                area: PropTypes.string,
                state: PropTypes.string,
                ups: PropTypes.string
            })
        }).isRequired,
        searchParams: PropTypes.shape({
            state: PropTypes.number,
            ups: PropTypes.number,
            area: PropTypes.number
        }),
        areas: PropTypes.arrayOf(
            PropTypes.shape({
                area: PropTypes.number,
                radio: PropTypes.number,
                dwellingCount: PropTypes.number,
                supervisor: PropTypes.string,
                pollster: PropTypes.string,
                status: PropTypes.number
            })
        ),
        pageSize: PropTypes.number,
        areasCount: PropTypes.number,
        loading: PropTypes.bool
    };

    static defaultProps = {
        searchParams: null,
        areas: null,
        loading: false,
        pageSize: 0,
        areasCount: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 0
        };
    }

    componentDidMount() {
        if (!isEmpty(pickBy(this.props.match.params, identity))) {
            this.searchAreas(this.props.match.params);
        }
    }

    searchAreas(params) {
        const {area, state, ups} = params;
        this.props.onChange({area: toNumber(area), state: toNumber(state), ups: toNumber(ups)});
        this.props.requestFetchAreas({area, state, ups});
    }

    handleSearchParamsState({target: {id, value}}) {
        this.props.onChange({
            ...this.props.searchParams, [id]: value, ups: null, area: null
        });
    }

    handleSearchParamsUps({target: {id, value}}) {
        this.props.onChange({...this.props.searchParams, [id]: value, area: null});
    }

    handleSearchParams({target: {id, value}}) {
        this.props.onChange({...this.props.searchParams, [id]: value});
    }

    handleChangePage(page) {
        this.setState(() => ({selectedPage: page}));
        this.props.requestFetchAreas(this.props.searchParams, page * this.props.pageSize);
    }

    render() {
        const {
            areas, searchParams, match: {params}, areasCount, pageSize, loading
        } = this.props;
        const {selectedPage} = this.state;
        return (
            <Grid fluid>
                <PageHeader title="Revisión" icon={faClipboardList}/>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <SearchParams
                    matchParams={!isEmpty(params) ? mapValues(params, param => toNumber(param)) : null}
                    onChangeState={e => this.handleSearchParamsState(e)}
                    onChangeUps={e => this.handleSearchParamsUps(e)}
                    onChange={e => this.handleSearchParams(e)}
                    onSubmit={() => this.props.requestFetchAreas(searchParams)}
                />
                <br/>
                {areas && (
                    <Fragment>
                        <ReviewList/>
                        <Pages
                            pageSize={pageSize}
                            resultsCount={areasCount}
                            selectedPage={selectedPage}
                            onChange={page => this.handleChangePage(page)}
                        />
                    </Fragment>
                )}
                {loading && (
                    <Row>
                        <Col sm={12} className="text-center">
                            <LoadingIndicator/>
                        </Col>
                    </Row>
                )}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        areas: state.review.areas,
        searchParams: state.review.searchParams,
        loading: state.review.loading,
        areasCount: state.review.areasCount,
        usersList: state.review.usersList,
        pageSize: state.review.pageSize
    }),
    dispatch => ({
        requestFetchAreas: (searchParams, skip) => dispatch(requestFetchAreas(searchParams, skip)),
        onChange: searchParams => dispatch(setReviewSearchParams(searchParams))
    })
)(Review);
