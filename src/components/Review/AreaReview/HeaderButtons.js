import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faThumbsUp, faCheckDouble, faCodeBranch, faEye, faTrashAlt, faProjectDiagram, faScroll
} from '@fortawesome/free-solid-svg-icons';
import {includes} from 'lodash';
import {IconLinkButton, Role} from '@indec/react-commons';

import {roles, reviewModalsEnum as modalsEnum, areaStatus} from '../../../constants';
import AreaReassign from './Reassign';
import AreaReopen from './AreaReopen';

const validateReopen = areaState => {
    if (areaState === areaStatus.DONE) {
        return [roles.NATIONAL_COORDINATOR];
    }
    if (areaState >= areaStatus.APPROVED) {
        return [roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR];
    }
    return [roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR, roles.SUPERVISOR];
};

const HeaderButtons = ({
    area, onOpenModal, onChange, pollster, handleReassignArea, sessionRoles
}) => (
    <ButtonToolbar>
        {includes([
            areaStatus.CLOSED, areaStatus.SUPERVISED, areaStatus.APPROVED, areaStatus.DONE
        ], area.status) && (
            <Role
                roles={[
                    roles.NATIONAL_COORDINATOR,
                    roles.COORDINATOR,
                    roles.SUB_COORDINATOR,
                    roles.SUPERVISOR
                ]}
                sessionRoles={sessionRoles}
            >
                <IconLinkButton to={`/compare/${area._id}/${area.area}`} icon={faCodeBranch}>
                    Comparar
                </IconLinkButton>
            </Role>
        )}
        {includes([
            areaStatus.CLOSED, areaStatus.SUPERVISED, areaStatus.APPROVED, areaStatus.DONE
        ], area.status) && (
            <Role
                roles={validateReopen(area.status)}
                sessionRoles={sessionRoles}
            >
                <AreaReopen
                    area={area}
                    onSupervisorDwellings={() => onOpenModal(modalsEnum.REOPEN_AREA)}
                    onPollsterDwellings={() => onOpenModal(modalsEnum.REOPEN_SUPERVISION_AREA)}
                />
            </Role>
        )}
        {includes([areaStatus.OPEN, areaStatus.IN_PROGRESS, areaStatus.SUPERVISION], area.status) && (
            <Role
                roles={[
                    roles.NATIONAL_COORDINATOR,
                    roles.COORDINATOR,
                    roles.SUB_COORDINATOR,
                    roles.SUPERVISOR
                ]}
                sessionRoles={sessionRoles}
            >
                <AreaReassign
                    {...{area, pollster}}
                    onChange={e => onChange(e)}
                    onSubmit={handleReassignArea}
                />
            </Role>
        )}
        {includes([areaStatus.CLOSED], area.status) && (
            <Role
                roles={[
                    roles.NATIONAL_COORDINATOR,
                    roles.COORDINATOR
                ]}
                sessionRoles={sessionRoles}
            >
                <Button onClick={() => onOpenModal(modalsEnum.SUPERVISION_AREA)}>
                    <FontAwesomeIcon icon={faEye}/>
                    &nbsp;Supervisar
                </Button>
            </Role>
        )}
        {includes([areaStatus.CLOSED, areaStatus.SUPERVISED], area.status) && (
            <Role
                roles={[
                    roles.NATIONAL_COORDINATOR,
                    roles.COORDINATOR,
                    roles.SUB_COORDINATOR
                ]}
                sessionRoles={sessionRoles}
            >
                <Button onClick={() => onOpenModal(modalsEnum.APPROVE_AREA)}>
                    <FontAwesomeIcon icon={faThumbsUp}/>
                    &nbsp;Aprobar
                </Button>
            </Role>
        )}
        {includes([areaStatus.APPROVED], area.status) && (
            <Role
                roles={[
                    roles.NATIONAL_COORDINATOR,
                    roles.COORDINATOR,
                    roles.SUB_COORDINATOR
                ]}
                sessionRoles={sessionRoles}
            >
                <Button onClick={() => onOpenModal(modalsEnum.DONE_AREA)}>
                    <FontAwesomeIcon icon={faCheckDouble}/>
                    &nbsp;Finalizar
                </Button>
            </Role>
        )}
        {area.status === areaStatus.DONE && (
            <Role roles={[roles.NATIONAL_COORDINATOR]} sessionRoles={sessionRoles}>
                <Button onClick={() => onOpenModal(modalsEnum.FINISH_AREA)} bsStyle="success">
                    <FontAwesomeIcon icon={faProjectDiagram}/>
                    &nbsp;Actualizar
                </Button>
            </Role>
        )}
        {includes([
            areaStatus.CLOSED, areaStatus.SUPERVISED, areaStatus.APPROVED, areaStatus.DONE
        ], area.status) && (
            <Role
                roles={[
                    roles.NATIONAL_COORDINATOR
                ]}
                sessionRoles={sessionRoles}
            >
                <Button onClick={() => onOpenModal(modalsEnum.CLEAR_AREA)} bsStyle="danger">
                    <FontAwesomeIcon icon={faTrashAlt}/>
                    &nbsp;Borrar Datos
                </Button>
            </Role>
        )}
        {includes([areaStatus.DONE], area.status) && (
            <Role roles={[roles.NATIONAL_COORDINATOR]} sessionRoles={sessionRoles}>
                <IconLinkButton to={`/reports/${area._id}/${area.area}`} icon={faScroll} bsStyle="warning">
                    Reportes
                </IconLinkButton>
            </Role>
        )}
    </ButtonToolbar>
);

HeaderButtons.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    handleReassignArea: PropTypes.func.isRequired,
    changes: PropTypes.bool.isRequired,
    area: PropTypes.shape({
        status: PropTypes.number.isRequired,
        pollsterName: PropTypes.string.isRequired,
        pollster: PropTypes.shape({}).isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired,
    pollster: PropTypes.shape({}),
    sessionRoles: PropTypes.arrayOf(PropTypes.string)
};

HeaderButtons.defaultProps = {
    pollster: null,
    sessionRoles: []
};

export default connect(state => ({
    sessionRoles: state.session.profile.roles
}))(HeaderButtons);
