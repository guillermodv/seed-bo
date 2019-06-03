import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Grid, Col, Row, Button, ButtonGroup, Table
} from 'react-bootstrap';
import {
    faPencilAlt, faCheck, faClone, faRedo, faPercent
} from '@fortawesome/free-solid-svg-icons';
import {LoadingButton} from '@indec/react-commons';

import {fetchGeneralMonitoring} from '../../../actions/monitoring';
import renderMonitoring from './renderMonitoring';
import renderMonitoringInPercentage from './renderMonitoringInPercentage';

class MonitoringList extends PureComponent {
    static propTypes = {
        fetchGeneralMonitoring: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        generalMonitoring: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        generalMonitoring: []
    };

    constructor(props) {
        super(props);
        this.state = {
            inPercentage: false
        };
    }

    componentDidMount() {
        this.props.fetchGeneralMonitoring();
    }

    render() {
        const {generalMonitoring, loading} = this.props;
        const {inPercentage} = this.state;
        return (
            <Grid>
                <Row className="monitoring">
                    <Col sm={8}>
                        <h2>
                            <FontAwesomeIcon icon={faPencilAlt}/>
                            &nbsp;Monitoreo de Avance
                        </h2>
                    </Col>
                    <Col sm={4} className="text-right">
                        <h2>
                            <ButtonGroup>
                                <Button
                                    active={inPercentage}
                                    onClick={() => this.setState(() => ({inPercentage: !inPercentage}))}
                                >
                                    <FontAwesomeIcon icon={faPercent}/>
                                    &nbsp;Porcentajes&nbsp;
                                    {inPercentage && <FontAwesomeIcon icon={faCheck}/>}
                                </Button>
                                <Button componentClass={Link} to="/monitoring/response">
                                    <FontAwesomeIcon icon={faClone}/>
                                    &nbsp;Ver más
                                </Button>
                            </ButtonGroup>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                {loading
                && (
                    <Row>
                        <Col sm={12} className="text-center">
                            <LoadingButton label="Cargando..."/>
                        </Col>
                    </Row>
                )}
                {!loading
                && (
                    <Row>
                        <Col sm={12}>
                            <Table responsive bordered condensed striped size="sm" className="monitoring">
                                <thead>
                                    <tr>
                                        <th colSpan="2">
                                            <Button bsSize="sm" onClick={() => this.props.fetchGeneralMonitoring()}>
                                                <FontAwesomeIcon icon={faRedo}/>
                                            </Button>
                                            &nbsp;Jurisdicción
                                        </th>
                                        <th>
                                            Areas
                                        </th>
                                        <th>
                                            Abiertas
                                        </th>
                                        <th>
                                            Sin asignar
                                        </th>
                                        <th>
                                            Asignadas
                                        </th>
                                        <th>
                                            Actualizando
                                        </th>
                                        <th>
                                            Cerradas
                                        </th>
                                        <th>
                                            Supervisando
                                        </th>
                                        <th>
                                            Supervisadas
                                        </th>
                                        <th>
                                            Aprobadas
                                        </th>
                                        <th>
                                            Finalizadas
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    inPercentage
                                        ? renderMonitoringInPercentage(generalMonitoring)
                                        : renderMonitoring(generalMonitoring)
                                }
                            </Table>
                        </Col>
                    </Row>
                )}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        generalMonitoring: state.monitoring.generalMonitoring,
        inPercentage: state.monitoring.inPercentage,
        loading: state.monitoring.loading
    }),
    dispatch => ({
        fetchGeneralMonitoring: () => dispatch(fetchGeneralMonitoring())
    })
)(MonitoringList);
