import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Col, Panel, Row} from 'react-bootstrap';

import {geographicPropTypes} from '../../util/propTypes';

const Geographic = ({geographic}) => (
    <Col sm={12}>
        <Panel className="margin-top-panel">
            <Panel.Heading>
                Ubicación Geográfica
            </Panel.Heading>
            <Panel.Body>
                <Row className="form-group">
                    <Col sm={6}>
                        <strong>
                            Jurisdicción:
                        </strong>
                        &nbsp;
                        {geographic.stateName}
                    </Col>
                    <Col sm={6}>
                        <strong>
                            Departamento:
                        </strong>
                        &nbsp;
                        {geographic.departmentName}
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm={4}>
                        <strong>
                            Localidad:
                        </strong>
                        &nbsp;
                        {geographic.localityName}
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
            </Panel.Body>
        </Panel>
    </Col>
);

Geographic.propTypes = {
    geographic: geographicPropTypes
};

Geographic.defaultProps = {
    geographic: {}
};

export default connect(state => ({
    geographic: state.fieldMaterials.geographic
}))(memo(Geographic));
