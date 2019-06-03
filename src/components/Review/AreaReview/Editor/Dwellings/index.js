/* global window */
import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button, Table, Row, Col
} from 'react-bootstrap';
import {flatten, map, size} from 'lodash';
import {LoadingIndicator, Role} from '@indec/react-commons';

import {Pagination} from '../../../../common';
import {roles} from '../../../../../constants';
import {addDwellingForSupervision} from '../../../../../actions/review';
import DwellingWarningsModal from './DwellingWarningsModal';
import DwellingsHead from './DwellingsHead';
import DwellingsBody from './DwellingsBody';

class Dwellings extends PureComponent {
    static propTypes = {
        addDwellingForSupervision: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        dwellings: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.shape({})),
            PropTypes.arrayOf(PropTypes.array)
        ]),
        dwellingsForSupervision: PropTypes.arrayOf(PropTypes.string),
        sessionRoles: PropTypes.arrayOf(PropTypes.string),
        dwellingTotal: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        enableSupervision: PropTypes.bool.isRequired,
        hasSupervision: PropTypes.bool.isRequired
    };

    static defaultProps = {
        dwellings: null,
        dwellingTotal: 0,
        dwellingsForSupervision: [],
        sessionRoles: []
    };

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            showModal: false,
            warnings: []
        };
    }

    handlePagination(current) {
        window.scrollTo(0, 0);
        this.setState(() => ({current}));
    }

    handleCheck(id, check) {
        this.props.onClick(id, check);
    }

    superviseSide(supervise) {
        const {dwellings} = this.props;
        this.props.addDwellingForSupervision(map(flatten(dwellings), dwelling => dwelling._id), supervise);
    }

    handleShowModal(warnings) {
        this.setState(() => ({showModal: true, warnings}));
    }

    handleCloseModal() {
        this.setState(() => ({showModal: false, warnings: []}));
    }

    render() {
        const {current, showModal} = this.state;
        const {
            dwellings,
            dwellingTotal,
            loading,
            enableSupervision,
            dwellingsForSupervision,
            sessionRoles
        } = this.props;
        return (
            <Fragment>
                {showModal && (
                    <DwellingWarningsModal
                        warnings={this.state.warnings}
                        onDismiss={() => this.handleCloseModal()}
                    />
                )}
                <Table responsive striped condensed bordered>
                    <thead>
                        <DwellingsHead/>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td>
                                    <LoadingIndicator/>
                                </td>
                            </tr>
                        )}
                        {dwellings && (
                            <DwellingsBody
                                {...{
                                    dwellings, current, enableSupervision, showModal
                                }}
                                onClick={(id, check) => this.handleCheck(id, check)}
                                checkedDwellings={dwellingsForSupervision}
                                onShowModal={warnings => this.handleShowModal(warnings)}
                            />
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={9}>
                                <Pagination
                                    current={current}
                                    onClick={page => this.handlePagination(page)}
                                    size={size(dwellings || 0)}
                                    total={dwellingTotal}
                                />
                            </td>
                            <Role
                                roles={[
                                    roles.COORDINATOR,
                                    roles.SUPERVISOR,
                                    roles.SUB_COORDINATOR,
                                    roles.NATIONAL_COORDINATOR
                                ]}
                                rolesReadOnly={[roles.NATIONAL_COORDINATOR_RO]}
                                sessionRoles={sessionRoles}
                            >
                                <td colSpan={2}>
                                    {dwellings && enableSupervision && (
                                        <Fragment>
                                            <Row className="text-center">
                                                <h5>
                                                    Supervisión por lado
                                                </h5>
                                                <hr/>
                                            </Row>
                                            <Row className>
                                                <Col sm={6} className="button-supervise-container">
                                                    <Button onClick={() => this.superviseSide(true)}>
                                                        Marcar todo
                                                    </Button>
                                                </Col>
                                                <Col sm={6} className="button-supervise-container">
                                                    <Button onClick={() => this.superviseSide(false)}>
                                                        Desmarcar todo
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    )}
                                </td>
                            </Role>
                        </tr>
                    </tfoot>
                </Table>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        dwellingTotal: state.review.dwellingTotal,
        dwellingsForSupervision: state.review.dwellingsForSupervision,
        sessionRoles: state.session.profile.roles
    }),
    dispatch => ({
        addDwellingForSupervision: (ids, dwellings) => dispatch(addDwellingForSupervision(ids, dwellings))
    })
)(Dwellings);
