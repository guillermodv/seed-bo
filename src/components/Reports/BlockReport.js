import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const BlockReport = ({block}) => (
    <Fragment>
        <table className="table-width">
            <tbody>
                <tr>
                    <td className="column-md column-lg">{`Manzana Nro: ${block.number}`}</td>
                </tr>
            </tbody>
        </table>
        <div className="page-break">
            <table className="table-width">
                <tbody>
                    <tr>
                        <td className="column-sm">Lado</td>
                        <td className="column-sm">Código</td>
                        <td className="column-md column-lg">Nombre Calle</td>
                        <td className="column-sm">Alt. Mín.</td>
                        <td className="column-sm">Alt. Máx.</td>
                        <td className="column-sm">C. Postal</td>
                        <td className="column-md">Cant de viv.</td>
                        <td className="column-sm">Alta</td>
                        <td className="column-sm">Modif.</td>
                        <td className="column-md column-lg">Observaciones:</td>
                    </tr>
                    {block.sides.map(side => (
                        <tr key={side.id}>
                            <td className="column-sm">{side.number}</td>
                            <td className="column-sm">{side.zipCode}</td>
                            <td className="column-md column-lg">{side.streetName}</td>
                            <td className="column-sm">{side.initialNumber}</td>
                            <td className="column-sm">{side.finalNumber}</td>
                            <td className="column-sm">{side.postalCode}</td>
                            <td className="column-md">{side.dwellingsCount}</td>
                            <td className="column-sm">{side.added ? 'Si' : 'No'}</td>
                            <td className="column-sm">{side.edited ? 'Si' : 'No'}</td>
                            <td className="column-md column-lg">{side.observations || 'Sin observaciones'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
        </div>
    </Fragment>
);

BlockReport.propTypes = {
    block: PropTypes.shape({
        blockNumber: PropTypes.string,
        sides: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                number: PropTypes.number,
                added: PropTypes.bool,
                edited: PropTypes.bool,
                initialNumber: PropTypes.number,
                finalNumber: PropTypes.number,
                zipCode: PropTypes.number,
                streetName: PropTypes.string,
                postalCode: PropTypes.string,
                observations: PropTypes.string,
                dwellingsCount: PropTypes.number
            }))
    }).isRequired
};

export default BlockReport;
