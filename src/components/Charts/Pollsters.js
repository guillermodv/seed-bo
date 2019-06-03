import React, {Component} from 'react';
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

import {pollstersChart} from './utils';
import {fetchPollsters} from '../../actions/pollsters';
import {requestFetchStates} from '../../actions/review';
import {DropDown} from '../common/fields';

class Pollsters extends Component {
    static propTypes = {
        requestFetchStates: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({})
        }),
        fetchPollsters: PropTypes.func.isRequired,
        states: PropTypes.arrayOf(PropTypes.shape()),
        pollsterList: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape({})
            )
        )
    };

    static defaultProps = {
        states: null,
        pollsterList: null,
        match: null
    };

    constructor(props) {
        super(props);
        this.state = {
            state: ''
        };
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        if (params && params.state) {
            this.onChange({state: params.state});
        }
        this.props.requestFetchStates();
    }

    onChange(object) {
        this.setState(object);
        if (!isEmpty(object.state)) {
            this.props.fetchPollsters(object);
        }
    }

    render() {
        const {states, loading, pollsterList} = this.props;
        const {state} = this.state;
        let i = 0;
        const getPosition = () => { i += 1; return i; };
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <h2>
                            <FontAwesomeIcon icon={faChartArea}/>
                            {' '}
                            Métrica por Encuestadores
                        </h2>
                    </Col>
                </Row>
                <Col sm={12}>
                    <hr className="hr-title"/>
                </Col>
                <Row>
                    <Col sm={4}>
                        <ButtonGroup>
                            <Button componentClass={Link} to="/charts">
                                Monitoreo de Respuestas
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
                <Col sm={12}>
                    <hr/>
                </Col>
                <Row>
                    <Col sm={12}>
                        {loading && <LoadingButton label="Cargando..."/>}
                        {!loading && pollsterList && pollsterList.map(rows => (
                            <Row className="margin-chart">
                                {rows.map(pollster => (
                                    <Col sm={4} key={pollster._id.id}>
                                        <Button
                                            componentClass={Link}
                                            to={`/charts/pollsters/${pollster._id.id}/${state}`}
                                        >
                                            {getPosition()}
                                            )
                                            {' '}
                                            {pollster._id.pollsterName}
                                            {' '}
                                            {pollster._id.rol}
                                        </Button>
                                        <Bar
                                            data={pollstersChart(pollster)}
                                            width={20}
                                            height={10}
                                            options={{
                                                maintainAspectRatio: true,
                                                barThickness: 1
                                            }}
                                        />
                                    </Col>
                                )
                                )}
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
        loading: state.pollsters.loading,
        pollsterList: state.pollsters.pollsterList,
        states: state.review.states
    }),
    dispatch => ({
        fetchPollsters: state => dispatch(fetchPollsters(state)),
        requestFetchStates: () => dispatch(requestFetchStates())
    })
)(Pollsters);
