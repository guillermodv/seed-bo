import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Table} from 'react-bootstrap';
import {IconLinkButton} from '@indec/react-commons';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons';

const GeneralTable = ({fieldMaterials}) => (
    <Row>
        <Col sm={12}>
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Jurisdicción</th>
                        <th>Cant. UPS</th>
                        <th>Cant. Areas</th>
                        <th>Cant. Viviendas</th>
                    </tr>
                </thead>
                <tbody>
                    {fieldMaterials.map(fieldMaterial => (
                        <tr key={fieldMaterial.state}>
                            <td className="text-center">
                                <IconLinkButton
                                    to={`/fieldMaterials/state/${fieldMaterial.state}`}
                                    icon={faAlignJustify}
                                >
                                    {fieldMaterial.stateName}
                                </IconLinkButton>
                            </td>
                            <td className="text-center">{fieldMaterial.ups}</td>
                            <td className="text-center">{fieldMaterial.areas}</td>
                            <td className="text-center">{fieldMaterial.dwellingCount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

GeneralTable.propTypes = {
    fieldMaterials: PropTypes.arrayOf(
        PropTypes.shape({
            state: PropTypes.number.isRequired,
            stateName: PropTypes.string.isRequired,
            ups: PropTypes.number.isRequired,
            areas: PropTypes.number.isRequired,
            dwellingCount: PropTypes.number
        })
    )
};

GeneralTable.defaultProps = {
    fieldMaterials: []
};

export default connect(
    state => ({
        fieldMaterials: state.fieldMaterials.fieldMaterials
    })
)(GeneralTable);
