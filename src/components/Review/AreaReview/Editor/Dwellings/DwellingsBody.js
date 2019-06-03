import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Badge, Button} from 'react-bootstrap';
import classNames from 'classnames';
import {
    faPlusCircle, faEdit, faEraser, faCheckDouble, faUser, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {
    get, includes, isEmpty, map, max
} from 'lodash';
import {Icon} from '@indec/react-commons';

import UserDetails from './UserDetails';
import WarningsErrorsInfo from '../WarningsErrorsInfo';

const getLastActualizationDate = dwelling => {
    const dates = [
        dwelling.addedDate,
        dwelling.closedDate,
        dwelling.deleteDate,
        dwelling.editedDate
    ];
    const date = new Date(max(dates));
    return /^Invalid.+/.test(date) ? 'Sin Dato' : date.toLocaleString('es-AR');
};

const cellColor = deleted => (deleted ? {backgroundColor: '#cecccc'} : {});

const DwellingsBody = ({
    dwellings, current, onClick, checkedDwellings, enableSupervision, onShowModal
}) => map(
    get(dwellings, current), dwelling => (
        <Fragment key={dwelling._id}>
            <tr>
                <td style={cellColor(dwelling.deleted)}>
                    <Badge>
                        {dwelling.listNumber}
                    </Badge>
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.withoutNumber ? 'S/N' : dwelling.streetNumber}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.sector}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.building}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.entrance}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.groundFloor ? 'PB' : dwelling.floor}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.department}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.lote}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.dwellingSubtype ? dwelling.dwellingSubtype : dwelling.dwellingTypeCode}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {dwelling.areaVisitOrder}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    {getLastActualizationDate(dwelling)}
                </td>
            </tr>
            <tr style={cellColor(dwelling.deleted)}>
                <td colSpan={2} style={cellColor(dwelling.deleted)}>
                    Comentarios:
                </td>
                <td colSpan={6} style={cellColor(dwelling.deleted)}>
                    {dwelling.description}
                </td>
                <td/>
                <td style={cellColor(dwelling.deleted)}>
                    {enableSupervision && (
                        <div style={{cursor: 'pointer'}}>
                            Supervisar&nbsp;
                            <input
                                type="checkbox"
                                checked={includes(checkedDwellings, dwelling._id)}
                                onClick={e => onClick(dwelling._id, e.target.checked)}
                            />
                        </div>
                    )}
                </td>
                <td style={cellColor(dwelling.deleted)}>
                    <WarningsErrorsInfo
                        type="DWELLING_ADDED"
                        show={dwelling.added}
                        icon={faPlusCircle}
                        className={classNames('', {'fa-trash': dwelling.added})}
                    />
                    &nbsp;
                    <WarningsErrorsInfo
                        type="DWELLING_EDITED"
                        show={dwelling.edited}
                        icon={faEdit}
                        className={classNames('', {'fa-trash': dwelling.edited})}
                    />
                    &nbsp;
                    <WarningsErrorsInfo
                        type="DWELLING_DELETED"
                        show={dwelling.deleted}
                        deleteDescription={
                            {
                                code: dwelling.deleteCode,
                                description: dwelling.deleteDescription
                            }
                        }
                        icon={faEraser}
                        className={classNames('', {'fa-trash': dwelling.deleted})}
                    />
                    &nbsp;
                    <WarningsErrorsInfo
                        type="DWELLING_CLOSED"
                        show={dwelling.closed}
                        icon={faCheckDouble}
                        className={classNames('', {'fa-trash': dwelling.closed})}
                    />
                    &nbsp;
                    <UserDetails userDetails={dwelling.editor} icon={faUser}/>
                    &nbsp;
                    {!isEmpty(dwelling.warnings) && (
                        <Button bsSize="xsmall" onClick={() => onShowModal(dwelling.warnings)}>
                            <Icon icon={faExclamationTriangle} style={{color: '#8a6d3b'}}/>
                        </Button>
                    )}
                </td>
            </tr>
        </Fragment>
    )
);

DwellingsBody.propTypes = {
    onClick: PropTypes.func.isRequired,
    onShowModal: PropTypes.func.isRequired,
    dwellings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    current: PropTypes.shape({}).isRequired,
    checkedDwellings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    enableSupervision: PropTypes.bool.isRequired
};

export default DwellingsBody;
