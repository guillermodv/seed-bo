import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';
import {LoadingIndicator} from '@indec/react-commons';

const Messages = ({
    success, loading, working, validating, supervising
}) => (
    <Fragment>
        {success && (
            <Alert bsStyle="success">
                    Guardado con éxito
            </Alert>
        )}
        {loading && <LoadingIndicator/>}
        {working && <LoadingIndicator label="Salvando..."/>}
        {validating && <LoadingIndicator label="Buscando errores..."/>}
        {supervising && <LoadingIndicator label="Enviando a supervisar..."/>}
    </Fragment>
);

Messages.propTypes = {
    success: PropTypes.bool,
    loading: PropTypes.bool,
    working: PropTypes.bool,
    validating: PropTypes.bool,
    supervising: PropTypes.bool
};

Messages.defaultProps = {
    success: false,
    loading: false,
    working: false,
    validating: false,
    supervising: false
};

export default Messages;
