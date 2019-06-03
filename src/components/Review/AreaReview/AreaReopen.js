import React from 'react';
import PropTypes from 'prop-types';
import {Button, Popover, OverlayTrigger} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUnlock} from '@fortawesome/free-solid-svg-icons';

const renderPopover = (
    area, onSupervisorDwellings, onPollsterDwellings
) => (
    <Popover id="reassignPopover" className="text-center popover-reasign">
        <Button onClick={() => onPollsterDwellings()} className="btn-block">
            Con datos de actualizador
        </Button>
        {area.hasSupervision && (
            <Button onClick={() => onSupervisorDwellings()} className="btn-block">
                Con datos de supervisión
            </Button>
        )}
    </Popover>
);

const AreaReopen = ({
    area, onSupervisorDwellings, onPollsterDwellings
}) => (
    <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose
        overlay={
            renderPopover(area, onPollsterDwellings, onSupervisorDwellings)
        }
    >
        <Button>
            <FontAwesomeIcon icon={faUnlock}/>
            &nbsp;
            Reabrir
        </Button>
    </OverlayTrigger>
);

AreaReopen.propTypes = {
    area: PropTypes.shape({}).isRequired,
    onSupervisorDwellings: PropTypes.func.isRequired,
    onPollsterDwellings: PropTypes.func.isRequired
};

export default AreaReopen;
