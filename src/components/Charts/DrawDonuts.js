/* global Chart */
import React from 'react';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';
import {Row, Col, Grid} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt, faWarehouse, faHome, faMale
} from '@fortawesome/free-solid-svg-icons';
import Util from './Util';

const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw() {
        // eslint-disable-next-line
        originalDoughnutDraw.apply(this, arguments);
        const {chart} = this.chart;
        const {ctx, width, height} = chart;
        ctx.font = '1.5em Arial';
        ctx.fillStyle = '#000';
        const {text} = chart.config.data;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const minHeight = height / 2.5;
        const textY = minHeight < 55 ? 55 : minHeight;
        ctx.fillText(text, textX, textY);
    }
});

function DrawDonuts({
    province, state, stateName, responses
}) {
    const {
        provinceData,
        dwellingResponse,
        dwellingNoResponseCause,
        householdResponse,
        householdNoResponseCause,
        membersResponse,
        membersNoResponseCause
    } = Util(state, province, responses);

    return (
        <Grid fluid>
            <Row>
                <Col sm={5} className="no-padding">
                    <div className="box-doughnut">
                        <h4 className="province text-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            {' '}
                            Jurisdicción:
                            {' '}
                            {stateName || 'Argentina'}
                        </h4>
                        <div>
                            <Doughnut
                                data={provinceData}
                                height={310}
                                width={310}
                                options={{
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            boxWidth: 12
                                        }
                                    },
                                    maintainAspectRatio: false,
                                    responsive: true
                                }}
                            />
                        </div>
                    </div>
                </Col>
                <Col sm={7} className="no-padding">
                    <Row className="no-padding">
                        <Col sm={4} className="no-padding">
                            <div className="box-doughnut">
                                <h4 className="dwelling text-center">
                                    <FontAwesomeIcon icon={faWarehouse}/>
                                    {' '}
                                    Viviendas
                                </h4>
                                <div>
                                    <Doughnut
                                        data={dwellingResponse}
                                        height={170}
                                        width={170}
                                        options={{
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    boxWidth: 12
                                                }
                                            },
                                            maintainAspectRatio: false,
                                            responsive: true
                                        }}
                                    />
                                </div>
                                <hr/>
                                <h5 className="dwelling-no-response-text">
                                    Razón de no respuesta
                                </h5>
                                <div>
                                    <Doughnut
                                        data={dwellingNoResponseCause}
                                        height={100}
                                        width={100}
                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            maintainAspectRatio: false,
                                            responsive: true
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col sm={4} className="no-padding">
                            <div className="box-doughnut">
                                <h4 className="household text-center">
                                    <FontAwesomeIcon icon={faHome}/>
                                    {' '}
                                    Hogares
                                </h4>
                                <div>
                                    <Doughnut
                                        data={householdResponse}
                                        height={170}
                                        width={170}
                                        options={{
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    boxWidth: 12
                                                }
                                            },
                                            maintainAspectRatio: false,
                                            responsive: true
                                        }}
                                    />
                                </div>
                                <hr/>
                                <h5 className="household-no-response-text">
                                    Razón de no respuesta
                                </h5>
                                <div>
                                    <Doughnut
                                        data={householdNoResponseCause}
                                        height={100}
                                        width={100}
                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            maintainAspectRatio: false,
                                            responsive: true
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col sm={4} className="no-padding">
                            <div className="box-doughnut">
                                <h4 className="members text-center">
                                    <FontAwesomeIcon icon={faMale}/>
                                    {' '}
                                    Personas
                                </h4>
                                <div>
                                    <Doughnut
                                        data={membersResponse}
                                        height={170}
                                        width={170}
                                        options={{
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    boxWidth: 12
                                                }
                                            },
                                            maintainAspectRatio: false,
                                            responsive: true
                                        }}
                                    />
                                </div>
                                <hr/>
                                <h5 className="members-no-response-text">
                                    Razón de no respuesta
                                </h5>
                                <div>
                                    <Doughnut
                                        data={membersNoResponseCause}
                                        height={100}
                                        width={100}
                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            maintainAspectRatio: false,
                                            responsive: true
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    );
}

DrawDonuts.propTypes = {
    state: PropTypes.number,
    stateName: PropTypes.string,
    province: PropTypes.shape({}).isRequired,
    responses: PropTypes.shape({}).isRequired
};

DrawDonuts.defaultProps = {
    state: null,
    stateName: null
};

export default DrawDonuts;
