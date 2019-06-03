import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckDouble, faSquare} from '@fortawesome/free-solid-svg-icons';
import {isEmpty} from 'lodash';

const BlockButton = ({block, color, onChange}) => (
    <Button
        onClick={() => onChange(block._id)}
        bsStyle={!isEmpty(block.blockErrors) ? 'warning' : 'default'}
    >
        <FontAwesomeIcon icon={faSquare} color={color}/>
        &nbsp;
        {block.number}
        &nbsp;-
        (
        {block.dwellings}
        )
        &nbsp;
        {block.closed && <FontAwesomeIcon icon={faCheckDouble} className="text-center"/>}
    </Button>
);

BlockButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    block: PropTypes.shape({}).isRequired,
    color: PropTypes.string.isRequired
};

export default BlockButton;
