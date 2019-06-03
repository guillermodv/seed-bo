import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

const AreaDescription = ({selectedRadio, selectedBlock, selectedSide}) => selectedBlock && (
    <Fragment>
        <Row>
            <Col sm={6} smOffset={3} className="text-center">
                <h4>
                    {selectedRadio ? `Radio ${selectedRadio} -` : ''}
                    {' '}
                    {`Manzana ${selectedBlock} ${selectedSide ? `- Lado ${selectedSide.number}` : ''}`}
                </h4>
            </Col>
        </Row>
        {selectedSide && selectedSide.observations && (
            <Row>
                <Col sm={6} smOffset={3} className="text-center">
                    <h4>{`Observaciones: ${selectedSide.observations}`}</h4>
                </Col>
            </Row>
        )}
    </Fragment>
);

AreaDescription.propTypes = {
    selectedRadio: PropTypes.number,
    selectedBlock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedSide: PropTypes.shape({
        number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        observations: PropTypes.string
    })
};

AreaDescription.defaultProps = {
    selectedRadio: null,
    selectedBlock: null,
    selectedSide: null
};

export default AreaDescription;
