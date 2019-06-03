import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    Grid, Row, Col, Button, Table
} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faClone} from '@fortawesome/free-solid-svg-icons';
import {IconButton, LoadingButton} from '@indec/react-commons';

import {fetchResponseMonitoring} from '../../../actions/monitoring';
import {requestedShowModal} from '../../../actions/modal';
import getModalBodyDwellingTypes from './getModalBodyDwellingTypes';
import TableHeader from './TableHeader';

const getJurisdiction = ({
    _id: {
        stateName, ups, area, radio
    }
}) => {
    if (radio) {
        return `${stateName} - UPS: ${ups} - Area: ${area} - Radio: ${radio}`;
    }
    if (area) {
        return `${stateName} - UPS: ${ups} - Area: ${area}`;
    }
    if (ups) {
        return `${stateName} - UPS: ${ups}`;
    }
    return `${stateName}`;
};

const urlTo = params => {
    if (params.radio) {
        return `/review/${params.state}/${params.ups}/${params.area}`;
    }
    if (params.area) {
        return `/monitoring/response/${params.state}/${params.ups}/${params.area}`;
    }
    if (params.ups) {
        return `/monitoring/response/${params.state}/${params.ups}`;
    }
    return `/monitoring/response/${params.state}`;
};

class MonitoringResponse extends PureComponent {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({}).isRequired
        }).isRequired,
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired
        }).isRequired,
        fetchResponseMonitoring: PropTypes.func.isRequired,
        requestedShowModal: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        responseMonitoring: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        responseMonitoring: []
    };

    componentDidMount() {
        const {match} = this.props;
        this.props.fetchResponseMonitoring(match.params || {});
    }

    componentDidUpdate(prevProps) {
        const {match: {params}} = prevProps;
        if (params !== this.props.match.params) {
            this.fetchMonitoring();
        }
    }

    fetchMonitoring() {
        this.props.fetchResponseMonitoring(this.props.match.params);
    }

    render() {
        const {responseMonitoring, loading} = this.props;
        return (
            <Grid>
                <Row className="monitoring">
                    <Col sm={1} className="text-left">
                        <br/>
                        <IconButton onClick={() => this.props.history.goBack()} icon={faArrowLeft}/>
                    </Col>
                    <Col sm={11}>
                        <h2>
                            <FontAwesomeIcon icon={faClone}/>
                            &nbsp;Monitoreo de Áreas
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table responsive bordered condensed size="sm" className="monitoring">
                            <TableHeader onPressIcon={() => this.fetchMonitoring()}/>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={26}>
                                            <LoadingButton label="Cargando..."/>
                                        </td>
                                    </tr>
                                )}
                                {!loading && responseMonitoring && responseMonitoring.map(response => {
                                    const jurisdiction = getJurisdiction(response);
                                    return (
                                        <tr key={response._id.stateName + response._id.ups + response._id.area}>
                                            <td colSpan={2}>
                                                <Button
                                                    componentClass={Link}
                                                    to={urlTo(response._id)}
                                                >
                                                    {jurisdiction}
                                                </Button>
                                            </td>
                                            <td>
                                                {response.blocks}
                                            </td>
                                            <td>
                                                {response.editedBlocks}
                                            </td>
                                            <td>
                                                {response.addedBlocks}
                                            </td>
                                            <td>
                                                {response.trimmedBlocks}
                                            </td>
                                            <td>
                                                {response.deletedBlocks}
                                            </td>
                                            <td>
                                                {response.sides}
                                            </td>
                                            <td>
                                                {response.addedSides}
                                            </td>
                                            <td>
                                                {response.deletedSides}
                                            </td>
                                            <td>
                                                {response.dwellings}
                                            </td>
                                            <td>
                                                {response.addedDwellings}
                                            </td>
                                            <td>
                                                {response.deletedDwellings}
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={() => this.props.requestedShowModal(
                                                        jurisdiction, getModalBodyDwellingTypes(response.dwellingTypes)
                                                    )}
                                                >
                                                    Detalle
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        responseMonitoring: state.monitoring.responseMonitoring,
        loading: state.monitoring.loading
    }),
    dispatch => ({
        fetchResponseMonitoring: filters => dispatch(fetchResponseMonitoring(filters)),
        requestedShowModal: (title, body) => dispatch(requestedShowModal(title, body))
    })
)(MonitoringResponse);
