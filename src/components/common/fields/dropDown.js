import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControl} from 'react-bootstrap';


import {randomString} from '../../../services/utils';

const DropDown = ({
    options, onChange, value, children, className
}) => (
    <FormGroup {...className && className}>
        <FormControl
            componentClass="select"
            value={value}
            onChange={e => onChange(e)}
        >
            {children}
            {!children && (
                <option value="">
                [Seleccione]
                </option>
            )}
            {!children && options.map(option => (
                <option value={option._id} key={randomString()}>
                    {option.name || option.label}
                </option>
            )
            )}
        </FormControl>
    </FormGroup>
);

DropDown.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape()),
    children: PropTypes.oneOfType([PropTypes.any, React]),
    className: PropTypes.string
};

DropDown.defaultProps = {
    children: null,
    options: null,
    className: null
};

export default DropDown;
