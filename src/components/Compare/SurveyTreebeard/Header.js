import React from 'react';
import PropTypes from 'prop-types';

const Header = ({node, style}) => (
    <div style={style.base}>
        <div id={node.id} style={{color: node.haveDifference ? '#eb3d3d' : '#9da5ab'}}>
            {node.name}
        </div>
    </div>
);

Header.propTypes = {
    node: PropTypes.shape({}).isRequired,
    style: PropTypes.shape({}).isRequired
};

export default Header;
