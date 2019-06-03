import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Alert, Col, Modal, Row
} from 'react-bootstrap';
import {IconButton} from '@indec/react-commons';
import {faFileExcel} from '@fortawesome/free-solid-svg-icons';

import ErrorsTable from './ErrorsTable';

import {requestDownloadAreaErrors} from '../../../../actions/review';

class ApproveErrorsMessage extends PureComponent {
    static propTypes = {
        requestDownloadAreaErrors: PropTypes.func.isRequired,
        idArea: PropTypes.string.isRequired,
        hasErrors: PropTypes.bool
    };

    static defaultProps = {
        hasErrors: false
    };

    constructor(props) {
        super(props);
        this.state = {
            showErrorModal: false
        };
    }

    render() {
        const {hasErrors, idArea} = this.props;
        const {showErrorModal} = this.state;
        return (
            <Fragment>
                {hasErrors && (
                    <Row>
                        <Col sm={5} smOffset={2}>
                            <Alert bsStyle="danger">
                                Persisten errores a corregir antes de poder aprobar
                            </Alert>
                        </Col>
                        <Col sm={2}>
                            <IconButton
                                onClick={() => this.setState(() => ({showErrorModal: true}))}
                                bsStyle="primary"
                            >
                                Ver errores
                            </IconButton>
                        </Col>
                    </Row>
                )}
                <Modal show={showErrorModal}>
                    <Modal.Body>
                        <ErrorsTable idArea={idArea}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col sm={2}>
                                <IconButton
                                    icon={faFileExcel}
                                    onClick={() => this.props.requestDownloadAreaErrors(idArea)}
                                    bsStyle="primary"
                                >
                                    Descargar
                                </IconButton>
                            </Col>
                            <Col sm={10}>
                                <IconButton
                                    onClick={() => this.setState(() => ({showErrorModal: false}))}
                                    bsStyle="primary"
                                >
                                    Cerrar
                                </IconButton>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        hasErrors: state.review.hasErrors
    }),
    dispatch => ({
        requestDownloadAreaErrors: errors => dispatch(requestDownloadAreaErrors(errors))
    })
)(ApproveErrorsMessage);
