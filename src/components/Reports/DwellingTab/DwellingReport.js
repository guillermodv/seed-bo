import React from 'react';
import PropTypes from 'prop-types';
import {DateUtilsService} from '@indec/react-commons/services';

const DwellingReport = ({reports}) => (
    <table className="table-width">
        <tbody>
            <tr>
                <td className="column-sm">Manzana</td>
                <td className="column-sm">Lado</td>
                <td className="column-sm">N° Lista</td>
                <td className="column-sm">N° Cat.</td>
                <td className="column-sm">Manz. int. o sector</td>
                <td className="column-sm">Edificio</td>
                <td className="column-sm">Entrada o escalera</td>
                <td className="column-sm">Piso</td>
                <td className="column-sm">Dto / Hab</td>
                <td className="column-sm">Casa / Lote</td>
                <td className="column-sm">Tipo</td>
                <td className="column-sm">Orden</td>
                <td className="column-md column-lg">Comentario</td>
                <td className="column-sm">Actualizacion</td>
            </tr>
            {reports.map(report => (
                <tr key={report.dwelling.id}>
                    <td className="column-sm">{report.block.number}</td>
                    <td className="column-sm">{report.side.number}</td>
                    <td className="column-sm">{report.dwelling.listNumber}</td>
                    <td className="column-sm">{report.dwelling.cadastralNumber}</td>
                    <td className="column-sm">{report.dwelling.sector}</td>
                    <td className="column-sm">{report.dwelling.building}</td>
                    <td className="column-sm">{report.dwelling.entrance}</td>
                    <td className="column-sm">{report.dwelling.floor}</td>
                    <td className="column-sm">{report.dwelling.department}</td>
                    <td className="column-sm">{report.dwelling.lote}</td>
                    <td className="column-sm">{report.dwelling.type}</td>
                    <td className="column-sm">{report.dwelling.order}</td>
                    <td className="column-md column-lg">{report.dwelling.comment}</td>
                    <td className="column-sm">{DateUtilsService.formatDateTime(report.dwelling.updateDate)}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

DwellingReport.propTypes = {
    reports: PropTypes.arrayOf(
        PropTypes.shape({
            block: PropTypes.shape({
                id: PropTypes.string,
                number: PropTypes.string
            }),
            side: PropTypes.shape({
                id: PropTypes.string,
                number: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            }),
            listNumber: PropTypes.string,
            cadastralNumber: PropTypes.string,
            sector: PropTypes.string,
            building: PropTypes.string,
            entrance: PropTypes.string,
            floor: PropTypes.string,
            department: PropTypes.string,
            lote: PropTypes.string,
            type: PropTypes.string,
            order: PropTypes.string,
            comment: PropTypes.string,
            updateDate: PropTypes.string
        })
    ).isRequired
};

export default DwellingReport;
