import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo} from '@fortawesome/free-solid-svg-icons';

const TableHeader = ({onPressIcon}) => (
    <thead>
        <tr>
            <th colSpan="2" rowSpan="2">
                <Button bsSize="sm" onClick={onPressIcon} className="text-left">
                    <FontAwesomeIcon icon={faRedo}/>
                </Button>
                &nbsp;Jurisdicción
            </th>
            <th colSpan="5">
                Manzanas
            </th>
            <th colSpan="3">
                Lados
            </th>
            <th colSpan="4">
                Viviendas
            </th>
        </tr>
        <tr>
            <th>
                Total
            </th>
            <th>
                Actualizada
            </th>
            <th>
                Nueva
            </th>
            <th>
                Recorte
            </th>
            <th>
                Baja
            </th>
            <th>
                Total
            </th>
            <th>
                Nuevas
            </th>
            <th>
                Bajas
            </th>
            <th>
                Total
            </th>
            <th>
                Nuevas
            </th>
            <th>
                Bajas
            </th>
            <th>
                Tipos
            </th>
        </tr>
    </thead>
);

TableHeader.propTypes = {
    onPressIcon: PropTypes.func.isRequired
};

export default TableHeader;
