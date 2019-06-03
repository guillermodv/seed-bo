import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle
} from 'react-bootstrap';

import {requestedHideModal} from '../../actions/modal';

const AppModal = ({
    body, buttons, requestedHideModal: hideModal, show, title
}) => (
    <Modal show={show}>
        <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
            {buttons}
            <Button bsStyle="primary" onClick={hideModal}>Cerrar</Button>
        </ModalFooter>
    </Modal>
);

AppModal.propTypes = {
    requestedHideModal: PropTypes.func.isRequired,
    show: PropTypes.bool,
    body: PropTypes.oneOfType([
        PropTypes.instanceOf(Component),
        PropTypes.func,
        PropTypes.element,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.instanceOf(Component),
            PropTypes.func,
            PropTypes.element,
            PropTypes.string
        ]))
    ]),
    buttons: PropTypes.bool,
    title: PropTypes.string
};

AppModal.defaultProps = {
    body: '',
    buttons: null,
    show: false,
    title: ''
};

export default connect(
    state => ({
        body: state.modal.body,
        buttons: state.modal.buttons,
        show: state.modal.show,
        title: state.modal.title
    }),
    dispatch => ({
        requestedHideModal: () => dispatch(requestedHideModal())
    })
)(AppModal);
