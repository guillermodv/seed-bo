import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faLockOpen, faWrench} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '@indec/react-commons';
import {DateUtilsService} from '@indec/react-commons/services';

import {areaStatus} from '../../constants';

const AreasTable = ({onOpenArea, areas}) => (
    <Row>
        <Col sm={12}>
            <Table responsive bordered condensed striped size="sm">
                <thead>
                    <tr>
                        <th colSpan="1" rowSpan="2">UPS</th>
                        <th colSpan="1" rowSpan="2">Area</th>
                        <th colSpan="1" rowSpan="2">Departamento</th>
                        <th colSpan="1" rowSpan="2">Localidad</th>
                        <th colSpan="3">Cantidades de</th>
                        <th colSpan="1" rowSpan="2">Última Actualización</th>
                        <th colSpan="1" rowSpan="2"><FontAwesomeIcon icon={faWrench}/></th>
                    </tr>
                    <tr>
                        <th>Manzanas</th>
                        <th>Lados</th>
                        <th>Viviendas</th>
                    </tr>
                </thead>
                <tbody>
                    {areas.map(area => (
                        <tr key={area._id}>
                            <td className="text-center">{area.ups}</td>
                            <td className="text-center">{area.area}</td>
                            <td className="text-center">{area.departmentName}</td>
                            <td className="text-center">{area.localityName}</td>
                            <td className="text-center">{area.blocks}</td>
                            <td className="text-center">{area.sides}</td>
                            <td className="text-center">{area.dwellingCount}</td>
                            <td className="text-center">{DateUtilsService.formatDateTime(area.finishDate)}</td>
                            <td className="text-center">
                                {area.status >= areaStatus.OPEN ? (
                                    <FontAwesomeIcon icon={faLockOpen}/>
                                ) : (
                                    <IconButton
                                        icon={faLock}
                                        onClick={() => onOpenArea(area._id, area.area)}
                                        bsStyle="primary"
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

AreasTable.propTypes = {
    onOpenArea: PropTypes.func.isRequired,
    areas: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            ups: PropTypes.number,
            area: PropTypes.number,
            blocks: PropTypes.number,
            sides: PropTypes.number,
            dwellingCount: PropTypes.number
        })
    )
};

AreasTable.defaultProps = {
    areas: []
};

export default AreasTable;
