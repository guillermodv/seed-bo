import React from 'react';
import PropTypes from 'prop-types';
import {Panel, Col, Row} from 'react-bootstrap';
import {find, get} from 'lodash';

import DateUtilsService from '../../../services/dateUtils';
import {areaStateTranslate} from '../../../constants';

const getState = status => get(find(areaStateTranslate, state => state._id === status), 'description');

const Geographic = ({geographic}) => (
    <Panel className="margin-top-panel">
        <Panel.Heading>
            Ubicación Geográfica
        </Panel.Heading>
        <Panel.Body>
            <Col sm={12}>
                <Row>
                    <Col sm={4}>
                        <strong>
                            Jurisdicción:
                        </strong>
                        &nbsp;
                        {geographic.stateName}
                    </Col>
                    <Col sm={4}>
                        <strong>
                            UPS:
                        </strong>
                        &nbsp;
                        {geographic.ups}
                    </Col>
                    <Col sm={4}>
                        <strong>
                            Area:
                        </strong>
                        &nbsp;
                        {geographic.area}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <strong>
                            Departamento:
                        </strong>
                        &nbsp;
                        {geographic.departmentName}

                    </Col>
                    <Col sm={5}>
                        <strong>
                            Localidad:
                        </strong>
                        &nbsp;
                        {geographic.localityName}
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm={4}>
                        <strong>
                            Supervisor:
                        </strong>
                        &nbsp;
                        {geographic.supervisor}
                    </Col>
                    <Col sm={4}>
                        <strong>
                            Actualizador:
                        </strong>
                        &nbsp;
                        {geographic.pollster}
                    </Col>
                    <Col sm={4}>
                        <strong>
                            Asignada a:
                        </strong>
                        &nbsp;
                        {geographic.currentUser}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <strong>
                            Estado:
                        </strong>
                        &nbsp;
                        {getState(geographic.status)}
                    </Col>
                    <Col sm={4}>
                        <strong>
                            Última modificación:
                            &nbsp;
                        </strong>
                        {DateUtilsService.formatDateTime(geographic.updatedAt)}
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>
);

Geographic.propTypes = {
    geographic: PropTypes.shape({}).isRequired
};

export default Geographic;
