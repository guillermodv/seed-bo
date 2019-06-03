import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';

import TypesTable from './TypesTable';

const DwellingTypesReport = ({
    dwellings: {
        added, noEligible, eligible, eligibleWithoutNumberAndLote
    }
}) => (
    <Fragment>
        <Row>
            <table className="table-width">
                <tbody>
                    <tr>
                        <td className="column-md column-lg">Tipos de viviendas agregadas</td>
                    </tr>
                </tbody>
            </table>
            <TypesTable types={added}/>
        </Row>
        <br/>
        <Row>
            <table className="table-width">
                <tbody>
                    <tr>
                        <td className="column-md column-lg">Tipos de viviendas no elegibles</td>
                    </tr>
                </tbody>
            </table>
            <TypesTable types={noEligible}/>
        </Row>
        <br/>
        <Row>
            <table className="table-width">
                <tbody>
                    <tr>
                        <td className="column-md column-lg">Tipos de viviendas elegibles</td>
                    </tr>
                </tbody>
            </table>
            <TypesTable types={eligible}/>
        </Row>
        <br/>
        <Row>
            <table className="table-width">
                <tbody>
                    <tr>
                        <td className="column-md column-lg">
                            Cantidad de viviendas elegibles S/N o Casa/Lote vacio
                        </td>
                    </tr>
                </tbody>
            </table>
            <div key={Date.now()} className="page-break">
                <table className="table-width">
                    <tbody>
                        <tr>
                            <td className="column-md">S/N</td>
                            {eligibleWithoutNumberAndLote.types.map(type => (
                                <td key={type.value} className="column-sm">{type.name}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="column-md">{eligibleWithoutNumberAndLote.withoutNumberTotal}</td>
                            {eligibleWithoutNumberAndLote.types.map(type => (
                                <td key={type.value} className="column-sm">{type.value}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <br/>
            </div>
        </Row>
    </Fragment>
);

DwellingTypesReport.propTypes = {
    dwellings: PropTypes.shape({
        _id: PropTypes.string,
        added: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.number
        })),
        noEligible: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.number
        })),
        eligible: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.number
        })),
        eligibleWithoutNumberAndLote: PropTypes.shape({
            withoutNumberTotal: PropTypes.number,
            types: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                value: PropTypes.number
            }))
        })
    }).isRequired
};

export default DwellingTypesReport;
