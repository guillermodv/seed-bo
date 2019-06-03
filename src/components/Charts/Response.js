import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    Grid, Row, Col, Button, ButtonGroup
} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import {isEmpty} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartArea} from '@fortawesome/free-solid-svg-icons';
import {LoadingButton} from '@indec/react-commons';

import {dwellings, households, members} from './utils';
import {fetchResponseMonitoring} from '../../actions/monitoring';
import {requestFetchStates} from '../../actions/review';
import {DropDown} from '../common/fields';

class Response extends Component {
    static propTypes = {
        fetchResponseMonitoring: PropTypes.func.isRequired,
        requestFetchStates: PropTypes.func.isRequired,
        responseMonitoring: PropTypes.arrayOf(PropTypes.shape),
        loading: PropTypes.bool.isRequired,
        states: PropTypes.arrayOf(PropTypes.shape())
    };

    static defaultProps = {
        responseMonitoring: null,
        states: null
    };

    constructor(props) {
        super(props);
        this.state = {
            state: ''
        };
    }

    componentDidMount() {
        /* eslint-disable react/destructuring-assignment */
        this.props.requestFetchStates();
        this.props.fetchResponseMonitoring({});
    }

    onChange(state) {
        this.setState(state);
        this.props.fetchResponseMonitoring(!isEmpty(state.state) ? state : '');
        /* eslint-enable */
    }

    render() {
        const {responseMonitoring, states, loading} = this.props;
        const {state} = this.state;
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <h3>
                            <FontAwesomeIcon icon={faChartArea}/>
                            {' '}
                            Métrica de Respuestas
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <ButtonGroup>
                            <Button componentClass={Link} to="/charts/pollsters">
                                Monitoreo de Encuestadores
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col sm={2} className="push-down">
                        Filtro por Jurisdicción
                    </Col>
                    <Col sm={4}>
                        {states
                        && (
                            <DropDown
                                value={state}
                                onChange={e => this.onChange({state: e.target.value})}
                            >
                                <option value="">
                                [Seleccione]
                                </option>
                                {states.map(s => (
                                    <option value={s._id} key={s._id}>
                                        {s.name}
                                    </option>
                                ))}
                            </DropDown>
                        )}
                    </Col>
                    <Col sm={2}/>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        {loading && <LoadingButton label="Cargando..."/>}
                        {!loading && responseMonitoring && responseMonitoring.map(response => (
                            <Row className="margin-chart">
                                <Fragment>
                                    <Col sm={4}>
                                        <Bar
                                            data={dwellings(response)}
                                            width={20}
                                            height={10}
                                            options={{
                                                maintainAspectRatio: true,
                                                barThickness: 1
                                            }}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Bar
                                            data={households(response)}
                                            width={20}
                                            height={10}
                                            options={{
                                                maintainAspectRatio: true,
                                                barThickness: 1
                                            }}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Bar
                                            data={members(response)}
                                            width={20}
                                            height={10}
                                            options={{
                                                maintainAspectRatio: true,
                                                barThickness: 1
                                            }}
                                        />
                                    </Col>
                                </Fragment>
                            </Row>
                        )
                        )}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        responseMonitoring: state.monitoring.responseMonitoring,
        loading: state.monitoring.loading,
        states: state.review.states
    }),
    dispatch => ({
        fetchResponseMonitoring: filters => dispatch(fetchResponseMonitoring(filters)),
        requestFetchStates: () => dispatch(requestFetchStates())
    })
)(Response);
