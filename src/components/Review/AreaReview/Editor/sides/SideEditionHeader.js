import React from 'react';
import PropTypes from 'prop-types';

const SideEditionHeader = ({sideToEdit}) => (
    <h5>
        Datos de campo:
        <ul>
            <li>
                {`Código: ${sideToEdit.street.code}`}
            </li>
            <li>
                {`Nombre: ${sideToEdit.street.name}`}
            </li>
            <li>
                {`Número Inicial: ${sideToEdit.initialNumber}`}
            </li>
            <li>
                {`Número Final: ${sideToEdit.finalNumber}`}
            </li>
            <li>
                {`Código Postal: ${sideToEdit.postalCode}`}
            </li>
        </ul>
    </h5>
);

SideEditionHeader.propTypes = {
    sideToEdit: PropTypes.shape({}).isRequired
};

export default SideEditionHeader;
