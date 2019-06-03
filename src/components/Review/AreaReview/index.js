import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Col, Row} from 'react-bootstrap';
import {
    includes, isEmpty, size, find
} from 'lodash';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {PageHeader} from '@indec/react-commons';

import HeaderButtons from './HeaderButtons';
import Editor from './Editor';
import Geographic from './Geographic';
import Modals from './Modals';

import Messages from './Messages';
import {areaStatus} from '../../../constants';
import {
    requestApproveArea,
    requestClearArea,
    requestFetchAreaData,
    requestCloseArea,
    requestFetchRadiosByArea,
    requestFetchGeographicByArea,
    requestFinishArea,
    requestReassignArea,
    requestReopenArea,
    requestSaveSides,
    requestSaveStreets,
    requestSuperviseArea,
    requestValidateBlocksAndStreets
} from '../../../actions/review';
import ApproveErrorsMessage from './ErrorsList/ApproveErrorsMessage';

class AreaReview extends PureComponent {
    static propTypes = {
        requestApproveArea: PropTypes.func.isRequired,
        requestFetchAreaData: PropTypes.func.isRequired,
        requestClearArea: PropTypes.func.isRequired,
        requestCloseArea: PropTypes.func.isRequired,
        requestFetchRadiosByArea: PropTypes.func.isRequired,
        requestFetchGeographicByArea: PropTypes.func.isRequired,
        requestFinishArea: PropTypes.func.isRequired,
        requestReassignArea: PropTypes.func.isRequired,
        requestReopenArea: PropTypes.func.isRequired,
        requestSaveSides: PropTypes.func.isRequired,
        requestSaveStreets: PropTypes.func.isRequired,
        requestSuperviseArea: PropTypes.func.isRequired,
        requestValidateBlocksAndStreets: PropTypes.func.isRequired,
        radios: PropTypes.arrayOf(PropTypes.shape({})),
        sides: PropTypes.arrayOf(PropTypes.shape({})),
        usersList: PropTypes.arrayOf(PropTypes.shape({})),
        dwellingsForSupervision: PropTypes.arrayOf(PropTypes.string),
        geographic: PropTypes.shape({}),
        areaData: PropTypes.shape({}),
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string.isRequired,
                radio: PropTypes.string,
                state: PropTypes.string,
                area: PropTypes.string,
                ups: PropTypes.string
            }).isRequired
        }).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        terminating: PropTypes.bool.isRequired,
        changes: PropTypes.bool.isRequired,
        loading: PropTypes.bool,
        success: PropTypes.bool.isRequired,
        supervising: PropTypes.bool,
        working: PropTypes.bool,
        validating: PropTypes.bool,
        hasErrors: PropTypes.bool
    };

    static defaultProps = {
        usersList: [],
        geographic: {},
        areaData: null,
        loading: false,
        working: false,
        validating: false,
        supervising: false,
        hasErrors: false,
        radios: [],
        sides: [],
        dwellingsForSupervision: []
    };

    constructor(props) {
        super(props);
        this.state = {
            backPath: '/review',
            modal: null,
            pollster: {}
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestFetchRadiosByArea(id);
        this.props.requestFetchGeographicByArea(id);
        this.props.requestFetchAreaData(id);
        this.setState(() => ({
            backPath: this.getOnBackPath()
        }));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.validating && !this.props.validating && !this.props.hasErrors) {
            this.props.requestApproveArea(this.props.match.params.id);
        }
        if (prevProps.terminating && !this.props.terminating) {
            this.props.history.push('/review');
        }
    }

    getOnBackPath() {
        const {state, area, ups} = this.props.match.params;
        if (area) {
            return `/review/${state}/${ups}/${area}`;
        }
        if (ups) {
            return `/review/${state}/${ups}`;
        }
        if (state) {
            return `/review/${state}`;
        }
        return '/review';
    }

    handleChangePollster({target: {id, value}}) {
        this.setState(() => ({[id]: value}));
    }

    handleApproveArea() {
        this.props.requestValidateBlocksAndStreets(this.props.match.params.id);
        this.handleCloseModal();
    }

    handleClearArea() {
        this.props.requestClearArea(this.props.match.params.id);
        this.handleCloseModal();
    }

    handleCloseModal() {
        this.setState(() => ({modal: null}));
    }

    handleCloseArea() {
        this.props.requestCloseArea(this.props.match.params.id);
        this.handleCloseModal();
    }

    handleFinishArea() {
        this.props.requestFinishArea(this.props.match.params.id);
        this.handleCloseModal();
    }

    handleReassignArea() {
        const {pollster} = this.state;
        this.props.requestReassignArea(this.props.match.params.id, pollster);
        this.handleCloseModal();
    }

    handleReopenArea(supervision) {
        this.props.requestReopenArea(this.props.match.params.id, supervision);
        this.handleCloseModal();
    }

    handleSuperviseArea() {
        const {dwellingsForSupervision} = this.props;
        this.props.requestSuperviseArea(this.props.match.params.id, dwellingsForSupervision);
        this.handleCloseModal();
    }

    handleOpenModal(modal) {
        const {loading, working} = this.props;
        if (!loading && !working) {
            this.setState(() => ({modal}));
        }
    }

    render() {
        const {
            areaData,
            success,
            loading,
            changes,
            working,
            dwellingsForSupervision,
            usersList,
            geographic,
            validating,
            supervising
        } = this.props;
        const {modal, pollster, backPath} = this.state;
        return (
            <Grid fluid>
                <PageHeader path={backPath} title="Revisión del Area" icon={faEdit}/>
                <Row className="text-center">
                    <Col sm={6} smOffset={3}>
                        <Messages
                            {...{
                                success, loading, working, validating, supervising
                            }}
                        />
                    </Col>
                </Row>
                {!isEmpty(areaData) && !isEmpty(geographic) && (
                    <Fragment>
                        <Row>
                            <Col smOffset={8} sm={4}>
                                <HeaderButtons
                                    area={{
                                        ...areaData,
                                        _id: this.props.match.params.id,
                                        stateId: geographic.stateId,
                                        currentUser: geographic.currentUser
                                    }}
                                    changes={changes}
                                    onOpenModal={e => this.handleOpenModal(e)}
                                    onChange={e => this.handleChangePollster(e)}
                                    pollster={pollster || areaData.user}
                                    handleReassignArea={() => this.handleReassignArea()}
                                />
                            </Col>
                        </Row>
                        <ApproveErrorsMessage idArea={areaData._id}/>
                        <Row>
                            <Col sm={12}>
                                <Geographic geographic={geographic}/>
                            </Col>
                        </Row>
                        <Editor
                            hasSupervision={areaData.hasSupervision}
                            disabledEdit={
                                !includes([areaStatus.CLOSED, areaStatus.SUPERVISED], areaData.status)
                            }
                            enableSupervision={areaStatus.CLOSED === areaData.status}
                            area={areaData._id}
                            state={geographic.stateId}
                        />
                        {modal && (
                            <Modals
                                {...{
                                    modal,
                                    pollster: find(usersList, user => user._id === pollster),
                                    area: {
                                        pollster,
                                        pollsterName: geographic.pollster,
                                        supervisorName: geographic.supervisor
                                    }
                                }}
                                dwellingsForSupervision={size(dwellingsForSupervision)}
                                handleApproveArea={() => this.handleApproveArea()}
                                handleClearArea={() => this.handleClearArea()}
                                handleCloseModal={() => this.handleCloseModal()}
                                handleCloseArea={() => this.handleCloseArea()}
                                handleFinishArea={() => this.handleFinishArea()}
                                handleReopenArea={supervision => this.handleReopenArea(supervision)}
                                handleSuperviseArea={() => this.handleSuperviseArea()}
                            />
                        )}
                    </Fragment>
                )}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        areaData: state.review.areaData,
        loading: state.review.loading,
        supervising: state.review.supervising,
        usersList: state.user.users,
        success: state.review.success,
        working: state.review.working,
        geographic: state.review.geographic,
        changes: state.review.changes,
        sides: state.review.sides,
        dwellingsForSupervision: state.review.dwellingsForSupervision,
        validating: state.review.validating,
        terminating: state.review.terminating,
        hasErrors: state.review.hasErrors
    }),
    dispatch => ({
        requestApproveArea: area => dispatch(requestApproveArea(area)),
        requestClearArea: id => dispatch(requestClearArea(id)),
        requestCloseArea: area => dispatch(requestCloseArea(area)),
        requestFinishArea: id => dispatch(requestFinishArea(id)),
        requestReassignArea: (area, pollster) => dispatch(requestReassignArea(area, pollster)),
        requestReopenArea: (area, supervision) => dispatch(requestReopenArea(area, supervision)),
        requestSaveSides: (idArea, idBlock, editedSides) => dispatch(requestSaveSides(idArea, idBlock, editedSides)),
        requestSuperviseArea: (id, dwellingsForSupervision) => dispatch(
            requestSuperviseArea(id, dwellingsForSupervision)
        ),
        requestFetchGeographicByArea: (id, state) => dispatch(requestFetchGeographicByArea(id, state)),
        requestFetchRadiosByArea: idArea => dispatch(requestFetchRadiosByArea(idArea)),
        requestFetchAreaData: idArea => dispatch(requestFetchAreaData(idArea)),
        requestSaveStreets: (idArea, idBlock, streets) => dispatch(requestSaveStreets(idArea, idBlock, streets)),
        requestValidateBlocksAndStreets: id => dispatch(requestValidateBlocksAndStreets(id))
    })
)(AreaReview);
