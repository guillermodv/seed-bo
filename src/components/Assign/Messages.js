import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {LoadingButton} from '@indec/react-commons';

const Messages = ({saving, loading}) => (
    <Row>
        <Col sm={12}>
            {!saving && loading && <LoadingButton label="Cargando..."/>}
            {saving && <LoadingButton label="Guardando..."/>}
        </Col>
    </Row>
);

Messages.propTypes = {
    saving: PropTypes.bool,
    loading: PropTypes.bool
};

Messages.defaultProps = {
    saving: false,
    loading: false
};

export default Messages;
