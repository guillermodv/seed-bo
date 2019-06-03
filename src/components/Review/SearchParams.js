import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {IconButton, Dropdown} from '@indec/react-commons';

import {
    requestFetchStates, requestFetchUsersByUps, requestFetchUpsOpenByState, requestFetchAreasOpenByUps
} from '../../actions/review';
import {areaStateTranslate, areaStatus} from '../../constants';
import {areaPropTypes, statePropTypes, upsPropTypes} from '../../util/propTypes';

class SearchParams extends PureComponent {
    static propTypes = {
        requestFetchStates: PropTypes.func.isRequired,
        requestFetchUpsOpenByState: PropTypes.func.isRequired,
        requestFetchAreasOpenByUps: PropTypes.func.isRequired,
        requestFetchUsersByUps: PropTypes.func.isRequired,
        onChangeState: PropTypes.func.isRequired,
        onChangeUps: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        searchParams: PropTypes.shape({
            state: PropTypes.number,
            ups: PropTypes.number,
            area: PropTypes.number
        }),
        matchParams: PropTypes.shape({
            state: PropTypes.number,
            ups: PropTypes.number,
            area: PropTypes.number
        }),
        areas: PropTypes.arrayOf(areaPropTypes),
        states: PropTypes.arrayOf(statePropTypes),
        upsOptions: PropTypes.arrayOf(upsPropTypes),
        users: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        searchParams: {},
        matchParams: {},
        areas: [],
        states: [],
        upsOptions: [],
        users: []
    };

    componentDidMount() {
        this.props.requestFetchStates();
        if (this.props.matchParams.ups) {
            this.handleChangeState({target: {id: 'state', value: this.props.matchParams.state}});
        }
        if (this.props.matchParams.area) {
            this.handleChangeUps({target: {id: 'area', value: this.props.matchParams.area}});
        }
    }

    handleChangeState(e) {
        this.props.onChangeState(e);
        this.props.requestFetchUpsOpenByState(e.target.value);
    }

    handleChangeUps(e) {
        const {state} = this.props.searchParams;
        this.props.onChangeUps(e);
        this.props.requestFetchAreasOpenByUps(state, e.target.value);
        this.props.requestFetchUsersByUps(state, e.target.value);
    }

    render() {
        const {
            areas, searchParams, states, upsOptions, users, onChange, onSubmit
        } = this.props;
        return (
            <Row>
                <Col sm={2}>
                    <Dropdown
                        label="Jurisdiccion"
                        onChange={e => this.handleChangeState(e)}
                        value={searchParams.state}
                        control="state"
                        options={states}
                        isClearable
                    />
                </Col>
                <Col sm={2}>
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
                <Col sm={2}>
                    <Dropdown
                        label="Area"
                        onChange={onChange}
                        value={searchParams.area}
                        control="area"
                        options={areas}
                        getOptionValue={option => option.area}
                        getOptionLabel={option => option.area}
                        isClearable
                    />
                </Col>
                <Col sm={2}>
                    <Dropdown
                        label="Usuario"
                        onChange={onChange}
                        value={searchParams.user}
                        control="user"
                        options={users}
                        getOptionLabel={option => `${option.surname}, ${option.name} (${option.username})`}
                        isClearable
                    />
                </Col>
                <Col sm={2}>
                    <Dropdown
                        label="Estado"
                        onChange={onChange}
                        value={searchParams.status}
                        control="status"
                        options={areaStateTranslate}
                        getOptionLabel={option => option.description}
                        isClearable
                    />
                </Col>
                <Col sm={2} className="text-right">
                    <br/>
                    <IconButton
                        icon={faSearch}
                        onClick={onSubmit}
                        disabled={
                            (!searchParams.state || !searchParams.ups)
                            && (!searchParams.state || searchParams.status !== areaStatus.DONE)
                        }
                    >
                        Buscar
                    </IconButton>
                </Col>
            </Row>
        );
    }
}

export default connect(
    state => ({
        areas: state.review.areaOptions,
        upsOptions: state.review.upsOptions,
        states: state.review.states,
        users: state.review.users,
        searchParams: state.review.searchParams
    }),
    {
        requestFetchStates, requestFetchUsersByUps, requestFetchAreasOpenByUps, requestFetchUpsOpenByState
    }
)(SearchParams);
