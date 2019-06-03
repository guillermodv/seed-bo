import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {faSearch, faUnlock} from '@fortawesome/free-solid-svg-icons';
import {IconButton, Dropdown} from '@indec/react-commons';
import {isEmpty, some} from 'lodash';

import {requestFetchStates} from '../../actions/review';
import {requestFetchUps, requestFetchAreasNumbers} from '../../actions/assign';
import {areaPropTypes, statePropTypes, upsPropTypes} from '../../util/propTypes';

class SearchParams extends PureComponent {
    static propTypes = {
        requestFetchStates: PropTypes.func.isRequired,
        requestFetchUps: PropTypes.func.isRequired,
        requestFetchAreasNumbers: PropTypes.func.isRequired,
        onChangeState: PropTypes.func.isRequired,
        onChangeUps: PropTypes.func.isRequired,
        onChangeArea: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onOpenAreasByUps: PropTypes.func.isRequired,
        searchParams: PropTypes.shape({
            state: PropTypes.number,
            ups: PropTypes.number,
            area: PropTypes.number
        }),
        areasOptions: PropTypes.arrayOf(areaPropTypes),
        areas: PropTypes.arrayOf(PropTypes.shape({})),
        states: PropTypes.arrayOf(statePropTypes),
        upsOptions: PropTypes.arrayOf(upsPropTypes)
    };

    static defaultProps = {
        searchParams: {},
        areasOptions: [],
        areas: [],
        states: [],
        upsOptions: []
    };

    componentDidMount() {
        if (!isEmpty(this.props.searchParams)) {
            const {state, ups} = this.props.searchParams;
            this.props.requestFetchStates();
            this.props.requestFetchUps(state);
            this.props.requestFetchAreasNumbers(state, ups);
        } else {
            this.props.requestFetchStates();
        }
    }

    handleChangeState(e) {
        this.props.onChangeState(e);
        this.props.requestFetchUps(e.target.value);
    }

    handleChangeUps(e) {
        this.props.onChangeUps(e);
        this.props.requestFetchAreasNumbers(this.props.searchParams.state, e.target.value);
    }

    render() {
        const {
            areas, areasOptions, searchParams, states, upsOptions, onChangeArea, onSubmit, onOpenAreasByUps
        } = this.props;
        return (
            <Fragment>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <Dropdown
                            label="Jurisdiccion"
                            onChange={e => this.handleChangeState(e)}
                            value={searchParams.state}
                            control="state"
                            options={states}
                            isClearable
                        />
                    </Col>
                    <Col sm={3}>
                        <Dropdown
                            label="UPS"
                            onChange={e => this.handleChangeUps(e)}
                            value={searchParams.ups}
                            control="ups"
                            options={upsOptions}
                            getOptionLabel={option => option.ups}
                            getOptionValue={option => option.ups}
                            isClearable
                        />
                    </Col>
                    <Col sm={3}>
                        <Dropdown
                            label="Area"
                            onChange={onChangeArea}
                            value={searchParams.area}
                            control="area"
                            options={areasOptions}
                            getOptionValue={option => option.area}
                            getOptionLabel={option => option.area}
                            isClearable
                        />
                    </Col>
                    <Col sm={3} className="text-right">
                        <br/>
                        <IconButton
                            icon={faSearch}
                            onClick={onSubmit}
                            disabled={!searchParams.state || !searchParams.ups}
                        >
                            Buscar
                        </IconButton>
                        &nbsp;
                        {some(areas, area => !area.status) && (
                            <IconButton
                                icon={faUnlock}
                                onClick={onOpenAreasByUps}
                                bsStyle="primary"
                            >
                                Abrir todas
                            </IconButton>
                        )}
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        areasOptions: state.assign.areaOptions,
        upsOptions: state.assign.upsOptions,
        states: state.review.states,
        areas: state.unlock.areas
    }),
    dispatch => ({
        requestFetchStates: () => dispatch(requestFetchStates()),
        requestFetchUps: state => dispatch(requestFetchUps(state)),
        requestFetchAreasNumbers: (state, ups) => dispatch(requestFetchAreasNumbers(state, ups))
    })
)(SearchParams);
