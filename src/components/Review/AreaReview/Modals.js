import React from 'react';
import PropTypes from 'prop-types';
import {ModalConfirm} from '../../common';
import {reviewModalsEnum as modalsEnum} from '../../../constants';

const Modals = ({
    modal,
    area,
    dwellingsForSupervision,
    handleApproveArea,
    handleCloseModal,
    handleCloseArea,
    handleClearArea,
    handleFinishArea,
    handleReopenArea,
    handleSuperviseArea
}) => {
    if (modalsEnum.APPROVE_AREA === modal) {
        return (
            <ModalConfirm
                title="Aprobar Area"
                message="Confirme la aprobación"
                onAccept={handleApproveArea}
                onDismiss={handleCloseModal}
            />
        );
    }
    if (modalsEnum.REOPEN_AREA === modal) {
        return (
            <ModalConfirm
                title="Reabrir Area"
                message="Confirme la reapertura usando los datos de actualizador"
                onAccept={() => handleReopenArea(false)}
                onDismiss={handleCloseModal}
            />
        );
    }
    if (modalsEnum.REOPEN_SUPERVISION_AREA === modal) {
        return (
            <ModalConfirm
                title="Reabrir Area"
                message="Confirme la reapertura usando los datos de supervisión"
                onAccept={() => handleReopenArea(true)}
                onDismiss={handleCloseModal}
            />
        );
    }
    if (modalsEnum.SUPERVISION_AREA === modal) {
        if (area.supervisorName === 'N/A') {
            return (
                <ModalConfirm
                    title="Confirme Supervisión"
                    onDismiss={handleCloseModal}
                >
                    <h4 className="text-center text-danger">
                        No se puede continuar, no contiene un supervisor asignado
                    </h4>
                </ModalConfirm>
            );
        }
        return (
            <ModalConfirm
                title="Confirme Supervisión"
                onAccept={handleSuperviseArea}
                onDismiss={handleCloseModal}
            >
                {dwellingsForSupervision === 0 && (
                    <h4 className="text-center text-danger">
                        Confirme la selección aleatoria para la supervisión de viviendas
                    </h4>
                )}
                {dwellingsForSupervision > 0 && (
                    <h4 className="text-center">
                        Confirme la supervisión de&nbsp;
                        {dwellingsForSupervision}
                        &nbsp;viviendas
                    </h4>
                )}
            </ModalConfirm>
        );
    }
    if (modalsEnum.DONE_AREA === modal) {
        return (
            <ModalConfirm
                title="Cierre del Área"
                message="Confirme el cierre del Área"
                onAccept={handleCloseArea}
                onDismiss={handleCloseModal}
            />
        );
    }
    if (modalsEnum.CLEAR_AREA === modal) {
        return (
            <ModalConfirm
                title="Confirme borrado de datos"
                onAccept={handleClearArea}
                onDismiss={handleCloseModal}
            >
                <h3 className="text-center text-danger">
                    ¡Atención esta acción no se puede deshacer!
                </h3>
            </ModalConfirm>
        );
    }
    if (modalsEnum.FINISH_AREA === modal) {
        return (
            <ModalConfirm
                title="Confirme actualización de datos"
                onAccept={handleFinishArea}
                onDismiss={handleCloseModal}
            >
                <h3 className="text-center text-danger">
                    ¡Atención esta acción no se puede deshacer!
                </h3>
            </ModalConfirm>
        );
    }
    return null;
};

Modals.propTypes = {
    modal: PropTypes.instanceOf(modalsEnum),
    pollster: PropTypes.shape({}),
    area: PropTypes.shape({}),
    dwellingsForSupervision: PropTypes.number,
    handleApproveArea: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleCloseArea: PropTypes.func.isRequired,
    handleClearArea: PropTypes.func.isRequired,
    handleFinishArea: PropTypes.func.isRequired,
    handleReopenArea: PropTypes.func.isRequired,
    handleSuperviseArea: PropTypes.func.isRequired
};

Modals.defaultProps = {
    modal: null,
    pollster: null,
    area: null,
    dwellingsForSupervision: 0
};

export default Modals;
