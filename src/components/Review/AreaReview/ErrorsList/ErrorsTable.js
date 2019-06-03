import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, Table} from 'react-bootstrap';
import {isEmpty} from 'lodash';
import {LoadingIndicator} from '@indec/react-commons';

import {requestFetchAreaErrors} from '../../../../actions/review';
import ValidatorService from '../../../../services/validator';
import {messages} from '../../../../constants';

class ErrorsTable extends PureComponent {
    static propTypes = {
        requestFetchAreaErrors: PropTypes.func.isRequired,
        idArea: PropTypes.string.isRequired,
        blockErrors: PropTypes.arrayOf(PropTypes.shape({})),
        sideErrors: PropTypes.arrayOf(PropTypes.shape({})),
        loadingAreaErrors: PropTypes.bool
    };

    static defaultProps = {
        blockErrors: [],
        sideErrors: [],
        loadingAreaErrors: false
    };

    componentDidMount() {
        this.props.requestFetchAreaErrors(this.props.idArea);
    }

    render() {
        const {blockErrors, loadingAreaErrors, sideErrors} = this.props;
        return (
            <Fragment>
                {!isEmpty(blockErrors) && (
                    <Fragment>
                        <Row>
                            <Col sm={4}>
                                <h4>Manzanas</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Table responsive striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>Radio</th>
                                            <th>Numero</th>
                                            <th>Error</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blockErrors.map(block => (
                                            <tr key={block._id}>
                                                <td className="text-center">{block.radio}</td>
                                                <td className="text-center">{block.number}</td>
                                                <td className="text-center">{messages.INVALID_BLOCK}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Fragment>
                )}
                {!isEmpty(sideErrors) && (
                    <Fragment>
                        <Row>
                            <Col sm={4}>
                                <h4>Lados</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Table responsive striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>Radio</th>
                                            <th>Manzana</th>
                                            <th>Lado</th>
                                            <th>Error</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sideErrors.map(side => (
                                            <tr key={side._id}>
                                                <td className="text-center">{side.block.radio}</td>
                                                <td className="text-center">{side.block.number}</td>
                                                <td className="text-center">{side.number}</td>
                                                <td className="text-center">
                                                    {ValidatorService.invalidSideMessage(side)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Fragment>
                )}
                {loadingAreaErrors && <LoadingIndicator/>}
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        blockErrors: state.review.blockErrors,
        sideErrors: state.review.sideErrors,
        loadingAreaErrors: state.review.loadingAreaErrors
    }), dispatch => ({
        requestFetchAreaErrors: id => dispatch(requestFetchAreaErrors(id))
    })
)(ErrorsTable);
