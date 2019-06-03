import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {IconButton, Role} from '@indec/react-commons';

const AssignButton = ({
    onSubmit, disabled, sessionRoles, roles
}) => (
    <Role {...{roles, sessionRoles}}>
        <IconButton
            icon={faSave}
            onClick={onSubmit}
            disabled={disabled}
            bsStyle="primary"
        >
            Guardar
        </IconButton>
    </Role>
);

AssignButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    sessionRoles: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool
};

AssignButton.defaultProps = {
    roles: [],
    sessionRoles: [],
    disabled: false
};

export default connect(state => ({
    sessionRoles: state.session.profile.roles
}))(AssignButton);
