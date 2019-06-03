import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';

const DwellingWarningsModal = ({warnings, onDismiss}) => (
    <Modal show>
        <Modal.Header>
            Listado de errores de la vivienda
        </Modal.Header>
        <Modal.Body>
            <ul>
                {warnings.map(warning => <li key={warning}>{warning}</li>)}
            </ul>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onDismiss} bsStyle="primary">Cerrar</Button>
        </Modal.Footer>
    </Modal>
);

DwellingWarningsModal.propTypes = {
    onDismiss: PropTypes.func.isRequired,
    warnings: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DwellingWarningsModal;
