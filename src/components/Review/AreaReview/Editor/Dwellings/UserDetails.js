import React from 'react';
import PropTypes from 'prop-types';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import {fontAwesomeIconPropTypes} from '@indec/react-commons/src/util';
import {Icon} from '@indec/react-commons';

const renderPopover = userDetails => (
    <Popover
        id="userDetails"
        style={{zIndex: 9999}}
        className="text-center"
        title="Datos del usuario"
    >
        {userDetails.username}
        :&nbsp;
        <br/>
        <b>
            {userDetails.surname}
            ,&nbsp;
            {userDetails.name}
        </b>
    </Popover>
);

const UserDetails = ({userDetails, icon, ...props}) => (
    <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="top"
        overlay={renderPopover(userDetails)}
    >
        <Icon icon={icon} {...props}/>
    </OverlayTrigger>
);

UserDetails.propTypes = {
    userDetails: PropTypes.shape({
        username: PropTypes.string,
        surname: PropTypes.string,
        name: PropTypes.string
    }),
    icon: fontAwesomeIconPropTypes.isRequired
};

UserDetails.defaultProps = {
    userDetails: {}
};

export default UserDetails;
