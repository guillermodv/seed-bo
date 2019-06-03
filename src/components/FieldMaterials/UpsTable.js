import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Table} from 'react-bootstrap';
import {IconLinkButton, PageHeader} from '@indec/react-commons';

import {requestFetchFieldMaterialsByState} from '../../actions/fieldMaterials';

const getNextRoute = ({state, ups}) => `/fieldMaterials/state/${state}/ups/${ups}`;

class UpsTable extends PureComponent {
    static propTypes = {
        requestFetchFieldMaterialsByState: PropTypes.func.isRequired,
        fieldMaterials: PropTypes.arrayOf(
            PropTypes.shape({
                state: PropTypes.number.isRequired,
                stateName: PropTypes.string.isRequired,
                ups: PropTypes.number.isRequired,
                areas: PropTypes.number.isRequired,
                dwellingCount: PropTypes.number
            })
        ),
        match: PropTypes.shape({
            params: PropTypes.shape({
                state: PropTypes.string.isRequired
            })
        }).isRequired
    };

    static defaultProps = {
        fieldMaterials: []
    };

    componentDidMount() {
        this.props.requestFetchFieldMaterialsByState(this.props.match.params.state);
    }

    render() {
        const {fieldMaterials} = this.props;
        return (
            <Fragment>
                <PageHeader path="/fieldMaterials" title="Composición de la Muestra - UPS"/>
                <Row>
                    <Col sm={12}>
                        <Table responsive striped bordered>
                            <thead>
                                <tr>
                                    <th>Jurisdicción</th>
                                    <th>Cant. Areas</th>
                                    <th>Cant. Viviendas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fieldMaterials.map(fieldMaterial => (
                                    <tr key={`${fieldMaterial.state}${fieldMaterial.ups}`}>
                                        <td className="text-center">
                                            <IconLinkButton to={getNextRoute(fieldMaterial)} icon={faAlignJustify}>
                                                {`${fieldMaterial.stateName} - UPS ${fieldMaterial.ups}`}
                                            </IconLinkButton>
                                        </td>
                                        <td className="text-center">{fieldMaterial.areas}</td>
                                        <td className="text-center">{fieldMaterial.dwellingCount}</td>
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
        fieldMaterials: state.fieldMaterials.fieldMaterials
    }),
    dispatch => ({
        requestFetchFieldMaterialsByState: state => dispatch(requestFetchFieldMaterialsByState(state))
    })
)(UpsTable);
