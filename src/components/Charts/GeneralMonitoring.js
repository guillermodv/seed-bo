import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Grid, Row, Col, Button
} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAddressBook, faEraser} from '@fortawesome/free-solid-svg-icons';
import {LoadingButton} from '@indec/react-commons';

import Argentina from './Argentina';
import DrawDonuts from './DrawDonuts';
import PersonsByRole from './PersonsByRole';
import {requestUsers} from '../../actions';

class GeneralDashBoard extends Component {
    static propTypes = {
        requestUsers: PropTypes.func.isRequired,
        generalMonitoring: PropTypes.arrayOf(PropTypes.shape),
        responseMonitoring: PropTypes.arrayOf(PropTypes.shape),
        users: PropTypes.arrayOf(PropTypes.shape),
        children: PropTypes.element,
        loading: PropTypes.bool.isRequired
    };

    static defaultProps = {
        generalMonitoring: null,
        responseMonitoring: null,
        users: null,
        children: null
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            province: {
                state: null,
                name: null
            }
        };
    }

    componentDidMount() {
        this.props.requestUsers();
    }

    handleCountryClick(country) {
        this.setState({province: country.properties});
    }

    render() {
        const {
            generalMonitoring, responseMonitoring, loading, children, users
        } = this.props;
        const {province} = this.state;
        const availableStates = generalMonitoring && generalMonitoring.map(g => g._id.state);
        return (
            <Grid fluid>
                <Row className="no-padding">
                    <Col sm={12} className="no-padding">
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row className="no-padding">
                    <Col sm={12} className="no-padding">
                        {loading && <LoadingButton label="Cargando..."/>}
                        {!loading && (
                            <Row className="no-padding">
                                <Col sm={3} className="no-padding">
                                    <Row className="no-padding">
                                        <Col sm={10} className="no-padding">
                                            <Button
                                                onClick={() => this.setState({
                                                    province: {
                                                        state: null,
                                                        name: null
                                                    }
                                                })}
                                                className="btn-xs btn-clean"
                                            >
                                                <FontAwesomeIcon icon={faEraser}/>
                                                &nbsp;
                                                Limpiar Selección
                                            </Button>
                                            {children}
                                        </Col>
                                    </Row>
                                    <div className="info">
                                        <Row>
                                            <Col sm={1}>
                                                <div className="reference light-blue"/>
                                            </Col>
                                            <Col sm={9}>
                                                Contiene datos
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={1}>
                                                <div className="reference blue"/>
                                            </Col>
                                            <Col sm={9}>
                                                Selección actual
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={1}>
                                                <div className="reference light-gray"/>
                                            </Col>
                                            <Col sm={9}>
                                                Sin datos
                                            </Col>
                                        </Row>
                                    </div>
                                    <Argentina
                                        handleClick={country => this.handleCountryClick(country)}
                                        availableStates={availableStates}
                                        province={province}
                                    />
                                </Col>
                                <Col sm={9} className="no-padding">
                                    {generalMonitoring && responseMonitoring && (
                                        <Fragment>
                                            <Row className="no-padding">
                                                <Col sm={12} className="no-padding">
                                                    <DrawDonuts
                                                        province={generalMonitoring}
                                                        state={province.state}
                                                        stateName={province.name}
                                                        responses={responseMonitoring}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="no-padding">
                                                <Col sm={6} className="no-padding">
                                                    <Row>
                                                        <Col sm={12}>
                                                            <h4>
                                                                <FontAwesomeIcon icon={faAddressBook}/>
                                                            &nbsp;Personal Asignado al Operativo
                                                            </h4>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <PersonsByRole
                                                            users={users}
                                                            state={province.state}
                                                        />
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    )
                                    }
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
export default connect(state => ({
    responseMonitoring: state.monitoring.responseMonitoring,
    generalMonitoring: state.monitoring.generalMonitoring,
    users: state.user.users,
    loading: state.monitoring.loading,
    profile: state.session.profile
}), dispatch => ({
    /*
    fetchGeneralMonitoring: () => dispatch(fetchGeneralMonitoring()),
    fetchResponseMonitoring: () => dispatch(fetchResponseMonitoring({})),
    */
    requestUsers: () => dispatch(requestUsers())
}))(GeneralDashBoard);
