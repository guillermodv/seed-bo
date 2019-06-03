import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import {faArrowsAlt} from '@fortawesome/free-solid-svg-icons';
import {PageHeader} from '@indec/react-commons';
import {every} from 'lodash';

import {
    requestFetchUps,
    requestFetchAreasNumbers,
    requestFetchAssignByUps,
    setSearchParams,
    setSubCoordinatorAssign,
    requestAssignUps,
    requestFetchAssignByArea,
    setUserByArea,
    requestAssignArea,
    clearAssign,
    clearSuccess
} from '../../actions/assign';
import {requestFetchStates} from '../../actions/review';
import {types} from '../../constants';
import {User} from '../../model';
import {areaPropTypes, statePropTypes, upsPropTypes} from '../../util/propTypes';
import {ConfirmModal} from '../common';
import AreaAssignTable from './AreaAssignTable';
import SearchParams from './SearchParams';
import UpsAssignTable from './UpsAssignTable';
import Messages from './Messages';

const disableAssignButton = assignments => every(assignments, assign => !assign.toAssign);

class Assign extends PureComponent {
    static propTypes = {
        requestFetchStates: PropTypes.func.isRequired,
        requestFetchAreasNumbers: PropTypes.func.isRequired,
        requestFetchUps: PropTypes.func.isRequired,
        requestFetchAssignByUps: PropTypes.func.isRequired,
        requestAssignUps: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        setUserByArea: PropTypes.func.isRequired,
        setSubCoordinatorAssign: PropTypes.func.isRequired,
        requestFetchAssignByArea: PropTypes.func.isRequired,
        requestAssignArea: PropTypes.func.isRequired,
        clearAssign: PropTypes.func.isRequired,
        clearSuccess: PropTypes.func.isRequired,
        profile: PropTypes.instanceOf(User).isRequired,
        states: PropTypes.arrayOf(statePropTypes),
        upsOptions: PropTypes.arrayOf(upsPropTypes),
        ups: PropTypes.arrayOf(upsPropTypes),
        areaOptions: PropTypes.arrayOf(areaPropTypes),
        searchParams: PropTypes.shape({
            state: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            type: PropTypes.number,
            ups: PropTypes.number,
            area: PropTypes.number
        }),
        assignments: PropTypes.arrayOf(
            PropTypes.shape({
                ups: PropTypes.number.isRequired,
                area: PropTypes.number.isRequired,
                dwellingsCount: PropTypes.number.isRequired
            })
        ),
        subCoordinators: PropTypes.arrayOf(PropTypes.instanceOf(User)),
        supervisors: PropTypes.arrayOf(PropTypes.instanceOf(User)),
        pollsters: PropTypes.arrayOf(PropTypes.instanceOf(User)),
        success: PropTypes.bool,
        loading: PropTypes.bool,
        saving: PropTypes.bool
    };

    static defaultProps = {
        areaOptions: [],
        states: [],
        upsOptions: [],
        ups: [],
        assignments: [],
        loading: false,
        saving: false,
        success: false,
        subCoordinators: [],
        supervisors: [],
        pollsters: [],
        searchParams: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    componentDidMount() {
        this.props.requestFetchStates();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.success && this.props.success) {
            window.alert('Guardado con éxito');
            this.props.clearSuccess();
        }
    }

    componentWillUnmount() {
        this.props.clearAssign();
    }

    handleChange({target: {id, value}}) {
        this.props.onChange({...this.props.searchParams, [id]: value});
    }

    handleChangeType({target: {id, value}}) {
        this.props.onChange({...this.props.searchParams, [id]: value});
        if (value === types.AREA) {
            this.props.requestFetchUps(this.props.searchParams.state);
        }
    }

    handleChangeUps({target: {id, value}}) {
        this.props.onChange({...this.props.searchParams, [id]: value, area: null});
        this.props.requestFetchAreasNumbers(this.props.searchParams.state, value);
        this.props.requestFetchAssignByArea({...this.props.searchParams, [id]: value});
    }

    handleChangeArea(e) {
        this.handleChange(e);
        const {id, value} = e.target;
        this.props.requestFetchAssignByArea({...this.props.searchParams, [id]: value});
    }

    handleAssignUps({target: {id, value}}, ups) {
        this.props.setSubCoordinatorAssign(ups, {[id]: value});
    }

    handleChangeAssignArea({target: {id, value}}, assign) {
        this.props.setUserByArea(assign, {[id]: value});
    }

    handleSearchAssigns() {
        const {searchParams} = this.props;
        this.props.requestFetchAssignByUps(searchParams.state);
    }

    handleSaveAssigns() {
        const {searchParams, ups, assignments} = this.props;
        if (searchParams.type === types.UPS) {
            this.props.requestAssignUps(searchParams.state, ups);
        } else {
            this.props.requestAssignArea(assignments);
        }
        this.setState(() => ({modal: false}));
    }

    render() {
        const {
            assignments,
            states,
            loading,
            saving,
            upsOptions,
            ups,
            areaOptions,
            subCoordinators,
            searchParams,
            supervisors,
            pollsters,
            profile
        } = this.props;
        const {modal} = this.state;
        return (
            <Grid fluid>
                <PageHeader title="Asignaciones" icon={faArrowsAlt}/>
                <SearchParams
                    {...{
                        searchParams, states, upsOptions, areaOptions, profile, assignments
                    }}
                    onChange={e => this.handleChange(e)}
                    onChangeArea={e => this.handleChangeArea(e)}
                    onChangeUps={e => this.handleChangeUps(e)}
                    onChangeType={e => this.handleChangeType(e)}
                    onSubmit={type => this.handleSearchAssigns(type)}
                    onAssign={() => this.setState(() => ({modal: true}))}
                    disabled={
                        searchParams.type === types.AREA ? disableAssignButton(assignments) : disableAssignButton(ups)
                    }
                />
                <br/>
                <Messages {...{loading, saving}}/>
                <br/>
                {searchParams.type === types.UPS && (
                    <UpsAssignTable
                        {...{subCoordinators, ups}}
                        onChange={(e, currentUps) => this.handleAssignUps(e, currentUps)}
                    />
                )}
                {searchParams.type === types.AREA && (
                    <AreaAssignTable
                        {...{
                            assignments, supervisors, pollsters, subCoordinators, profile
                        }}
                        onChange={(e, assign) => this.handleChangeAssignArea(e, assign)}
                    />
                )}
                {modal && (
                    <ConfirmModal
                        title="Guardado de Asignaciones"
                        message="Confirme la/s asignación/es"
                        onAccept={() => this.handleSaveAssigns()}
                        onDismiss={() => this.setState(() => ({modal: false}))}
                    />
                )}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        states: state.review.states,
        upsOptions: state.assign.upsOptions,
        areaOptions: state.assign.areaOptions,
        subCoordinators: state.assign.subCoordinators,
        searchParams: state.assign.searchParams,
        success: state.assign.success,
        assignments: state.assign.assignments,
        supervisors: state.assign.supervisors,
        profile: state.session.profile,
        pollsters: state.assign.pollsters,
        ups: state.assign.ups
    }),
    dispatch => ({
        requestFetchStates: () => dispatch(requestFetchStates()),
        requestFetchUps: state => dispatch(requestFetchUps(state)),
        requestFetchAreasNumbers: (state, ups) => dispatch(requestFetchAreasNumbers(state, ups)),
        requestFetchAssignByUps: state => dispatch(requestFetchAssignByUps(state)),
        onChange: searchParams => dispatch(setSearchParams(searchParams)),
        setSubCoordinatorAssign: (ups, subCoordinator) => dispatch(setSubCoordinatorAssign(ups, subCoordinator)),
        requestAssignUps: (state, assignments) => dispatch(requestAssignUps(state, assignments)),
        requestFetchAssignByArea: searchParams => dispatch(requestFetchAssignByArea(searchParams)),
        setUserByArea: (assign, user) => dispatch(setUserByArea(assign, user)),
        requestAssignArea: assignments => dispatch(requestAssignArea(assignments)),
        clearAssign: () => dispatch(clearAssign()),
        clearSuccess: () => dispatch(clearSuccess())
    })
)(Assign);
