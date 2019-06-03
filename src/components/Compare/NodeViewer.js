import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {nodeInformation} from '../../services/utils';
import styles from './styles';

const HELP_MSG = 'Seleccione un Radio para previsualizar';

const drawData = data => {
    const {
        dwellingTotal,
        dwellingAdded,
        dwellingEdited,
        dwellingDeleted,
        sides,
        blocks,
        areBlocks,
        insideBlock
    } = nodeInformation(data);
    return (
        <ul>
            {areBlocks && (
                <Fragment>
                    {!insideBlock && (
                        <Fragment>
                            <li>
                                Cantidad de Manzanas:&nbsp;
                                {blocks}
                            </li>
                            <li>
                                Cantidad de lados:&nbsp;
                                {sides}
                            </li>
                        </Fragment>
                    )}
                    {insideBlock && (
                        <li>
                            Cantidad de lados:&nbsp;
                            {sides}
                        </li>
                    )}
                </Fragment>
            )}
            <li>
                Viviendas totales:&nbsp;
                {dwellingTotal}
            </li>
            <li>
                Viviendas Editadas:&nbsp;
                {dwellingEdited}
            </li>
            <li>
                Viviendas Agregadas:&nbsp;
                {dwellingAdded}
            </li>
            <li>
                Viviendas Borradas:&nbsp;
                {dwellingDeleted}
            </li>
        </ul>
    );
};

const NodeViewer = ({node}) => {
    const style = styles.viewer;
    return (
        <div style={style.base}>
            {node && drawData(node)}
            {!node && HELP_MSG}
        </div>
    );
};

NodeViewer.propTypes = {
    node: PropTypes.shape({})
};

NodeViewer.defaultProps = {
    node: null
};

export default NodeViewer;
