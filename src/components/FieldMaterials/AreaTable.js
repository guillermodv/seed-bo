import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {faAlignJustify, faFileExport} from '@fortawesome/free-solid-svg-icons';
import {
    ButtonGroup, Col, Row, Table
} from 'react-bootstrap';
import {IconLinkButton, PageHeader, Role} from '@indec/react-commons';

import {requestFetchFieldMaterialsByUps} from '../../actions/fieldMaterials';
import {roles} from '../../constants';

const getNextRoute = ({state, ups, area}) => `/fieldMaterials/state/${state}/ups/${ups}/area/${area}`;
const fieldMaterialTitle = ({stateName, ups, area}) => `${stateName} - UPS ${ups} - Area: ${area}`;
const buildSpreadsheetRoute = ({state, ups, area}) => `state/${state}/ups/${ups}/area/${area}`;

class AreaTable extends PureComponent {
    static propTypes = {
        requestFetchFieldMaterialsByUps: PropTypes.func.isRequired,
        fieldMaterials: PropTypes.arrayOf(
            PropTypes.shape({
                state: PropTypes.number.isRequired,
                stateName: PropTypes.string.isRequired,
                ups: PropTypes.number.isRequired,
                area: PropTypes.number.isRequired,
                dwellingCount: PropTypes.number,
                blocks: PropTypes.number.isRequired,
                sides: PropTypes.number.isRequired
            })
        ),
        match: PropTypes.shape({
            params: PropTypes.shape({
                state: PropTypes.string.isRequired,
                ups: PropTypes.string.isRequired
            })
        }).isRequired,
        sessionRoles: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    static defaultProps = {
        fieldMaterials: []
    };

    componentDidMount() {
        const {state, ups} = this.props.match.params;
        this.props.requestFetchFieldMaterialsByUps(state, ups);
    }

    render() {
        const {fieldMaterials, sessionRoles} = this.props;
        return (
            <Fragment>
                <PageHeader
                    path={`/fieldMaterials/state/${this.props.match.params.state}`}
                    title="Composición de la Muestra - Áreas"
                />
                <Row>
                    <Col sm={12}>
                        <Table responsive striped bordered>
                            <thead>
                                <tr>
                                    <th>Jurisdicción</th>
                                    <th>Cant. Manzanas</th>
                                    <th>Cant. Lados</th>
                                    <th>Cant. Viviendas</th>
                                    <Role
                                        roles={[roles.NATIONAL_COORDINATOR, roles.NATIONAL_COORDINATOR_RO]}
                                        sessionRoles={sessionRoles}
                                    >
                                        <th/>
                                    </Role>
                                </tr>
                            </thead>
                            <tbody>
                                {fieldMaterials.map(fieldMaterial => (
                                    <tr key={`${fieldMaterial.state}${fieldMaterial.ups}${fieldMaterial.area}`}>
                                        <td className="text-center">
                                            <IconLinkButton to={getNextRoute(fieldMaterial)} icon={faAlignJustify}>
                                                {fieldMaterialTitle(fieldMaterial)}
                                            </IconLinkButton>
                                        </td>
                                        <td className="text-center">{fieldMaterial.blocks}</td>
                                        <td className="text-center">{fieldMaterial.sides}</td>
                                        <td className="text-center">{fieldMaterial.dwellingCount}</td>
                                        <Role
                                            roles={[roles.NATIONAL_COORDINATOR, roles.NATIONAL_COORDINATOR_RO]}
                                            sessionRoles={sessionRoles}
                                        >
                                            <td className="text-center">
                                                <ButtonGroup>
                                                    <IconLinkButton
                                                        icon={faFileExport}
                                                        // eslint-disable-next-line
                                                        to={`/dwellingSpreadsheets/${buildSpreadsheetRoute(fieldMaterial)}`}
                                                    >
                                                        Viviendas
                                                    </IconLinkButton>
                                                    <IconLinkButton
                                                        icon={faFileExport}
                                                        // eslint-disable-next-line
                                                        to={`/blockSpreadsheets/${buildSpreadsheetRoute(fieldMaterial)}`}
                                                    >
                                                        Manzanas
                                                    </IconLinkButton>
                                                </ButtonGroup>
                                            </td>
                                        </Role>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        fieldMaterials: state.fieldMaterials.fieldMaterials,
        sessionRoles: state.session.profile.roles
    }),
    dispatch => ({
        requestFetchFieldMaterialsByUps: (state, ups) => dispatch(requestFetchFieldMaterialsByUps(state, ups))
    })
)(AreaTable);
