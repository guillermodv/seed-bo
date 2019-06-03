import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Col, Row} from 'react-bootstrap';
import {
    faCircle, faPlusCircle, faEdit, faEraser, faCheckDouble
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import {Role} from '@indec/react-commons';

import WarningsErrorsInfo from '../WarningsErrorsInfo';
import {roles} from '../../../../../constants';

const Sides = ({
    sides, onClick, handleClickMenu, disable, sessionRoles
}) => sides.map(side => (
    <Fragment key={side._id}>
        <Role
            roles={[roles.NATIONAL_COORDINATOR, roles.SUB_COORDINATOR, roles.COORDINATOR]}
            rolesReadOnly={[roles.NATIONAL_COORDINATOR_RO]}
            sessionRoles={sessionRoles}
        >
            <ContextMenu id={side._id}>
                <MenuItem data={{street: side.street, side}} onClick={() => handleClickMenu(side)}>
                    Editar
                </MenuItem>
            </ContextMenu>
        </Role>
        <ContextMenuTrigger id={side._id} disable={disable}>
            <Button
                key={side._id}
                onClick={() => onClick(side._id)}
            >
                <Row className="no-paddings">
                    <Col sm={1} className="no-padding">
                        {side.number}
                    </Col>
                    <Col sm={11} className="no-padding">
                        <Row>
                            <Col sm={12} className="two-line-text">
                                <code>
                                    {side.street.code}
                                </code>
                                <br/>
                                {side.street.name}
                                {!!side.postalCode && ` (${side.postalCode})`}
                                <br/>
                                {` ${side.initialNumber} a ${side.finalNumber} - (${side.totalDwellings})`}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="text-left">
                                <WarningsErrorsInfo
                                    type="CODE"
                                    show={side.sideError.code}
                                    icon={faCircle}
                                    className={
                                        classNames('', {
                                            'text-danger': side.sideError && side.sideError.code,
                                            'text-success': !side.sideError || !side.sideError.code
                                        })
                                    }
                                />
                                <WarningsErrorsInfo
                                    type="CP"
                                    show={side.sideError.postalCode}
                                    icon={faCircle}
                                    className={
                                        classNames('', {
                                            'text-danger': side.sideError && side.sideError.postalCode,
                                            'text-success': !side.sideError || !side.sideError.postalCode
                                        })
                                    }
                                />
                            </Col>
                            <Col sm={6} className="text-left">
                                <WarningsErrorsInfo
                                    type="SIDE_ADDED"
                                    show={side.added}
                                    icon={faPlusCircle}
                                    className={classNames('', {'text-danger': side.added})}
                                />
                                &nbsp;
                                <WarningsErrorsInfo
                                    type="SIDE_EDITED"
                                    show={side.edited}
                                    icon={faEdit}
                                    className={classNames('', {'text-danger': side.edited})}
                                />
                                &nbsp;
                                <WarningsErrorsInfo
                                    type="SIDE_DELETED"
                                    show={side.deleted}
                                    icon={faEraser}
                                    className={classNames('', {'text-danger': side.deleted})}
                                />
                                &nbsp;
                                <WarningsErrorsInfo
                                    type="SIDE_CLOSED"
                                    show={side.closed}
                                    icon={faCheckDouble}
                                    className={classNames('', {'text-danger': side.closed})}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Button>
        </ContextMenuTrigger>
    </Fragment>
));

Sides.propTypes = {
    onClick: PropTypes.func.isRequired,
    handleClickMenu: PropTypes.func.isRequired,
    sides: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    sessionRoles: PropTypes.arrayOf(PropTypes.string),
    disable: PropTypes.bool.isRequired
};

Sides.defaultProps = {
    sessionRoles: []
};

export default connect(state => ({
    sessionRoles: state.session.profile.roles
}))(Sides);
