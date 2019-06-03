import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faBan} from '@fortawesome/free-solid-svg-icons';

const ConfirmModal = ({
    message, title, onAccept, onDismiss, children, large
}) => (
    <Modal show onHide={onDismiss} bsSize={large ? 'large' : ''}>
        <Modal.Header closeButton>
            <Modal.Title>
                {title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
            {children}
        </Modal.Body>
        <Modal.Footer>
            {onAccept && (
                <Button onClick={onAccept} bsStyle="primary">
                    <FontAwesomeIcon icon={faCheck}/>
                &nbsp;Confirmar
                </Button>
            )}
            <Button onClick={onDismiss}>
                <FontAwesomeIcon icon={faBan}/>
                &nbsp;Cancelar
            </Button>
        </Modal.Footer>
    </Modal>
);

ConfirmModal.propTypes = {
    onDismiss: PropTypes.func.isRequired,
    message: PropTypes.string,
    onAccept: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.element,
    large: PropTypes.bool
};

ConfirmModal.defaultProps = {
    title: 'Confirme Acción',
    message: null,
    children: null,
    onAccept: null,
    large: false
};

export default ConfirmModal;
