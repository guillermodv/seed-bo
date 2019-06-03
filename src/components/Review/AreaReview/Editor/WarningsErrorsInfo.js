import React from 'react';
import PropTypes from 'prop-types';
import {find} from 'lodash';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import {Icon} from '@indec/react-commons';
import {fontAwesomeIconPropTypes} from '@indec/react-commons/src/util';

import {warningsAndErrors, deleteCodes} from '../../../../constants';

const getErrors = (code, deleteDescription) => {
    const codeDesc = find(deleteCodes, codes => codes.value === code) || {label: ''};
    if (code) {
        return `${codeDesc.label}: ${deleteDescription || ''}`;
    }
    return null;
};

const renderPopover = (type, show, deleteDescription) => (
    <Popover
        id="warningAndErrors"
        style={{zIndex: 9999}}
        className="text-center"
        title="Error o Advertencia"
    >
        {show && type !== 'DWELLING_DELETED' && warningsAndErrors[type]}
        {type === 'DWELLING_DELETED' && getErrors(deleteDescription.code, deleteDescription.description)}
        {(!deleteDescription.code && !show) && 'Sin Errores y/o Advertencias'}
    </Popover>
);

const WarningAndErrors = ({
    type, show, deleteDescription, icon, ...props
}) => (
    <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="top"
        overlay={renderPopover(type, show, deleteDescription)}
    >
        <Icon icon={icon} {...props}/>
    </OverlayTrigger>
);

WarningAndErrors.propTypes = {
    type: PropTypes.string.isRequired,
    show: PropTypes.bool,
    deleteDescription: PropTypes.shape({
        code: PropTypes.string,
        description: PropTypes.string
    }),
    icon: fontAwesomeIconPropTypes.isRequired
};

WarningAndErrors.defaultProps = {
    show: false,
    deleteDescription: {
        code: null
    }
};

export default WarningAndErrors;
