import {includes} from 'lodash';

const types = {
    AREA: 1,
    UPS: 2
};

const roles = {
    NATIONAL_COORDINATOR: 'cn',
    NATIONAL_COORDINATOR_RO: 'ro',
    COORDINATOR: 'co',
    SUB_COORDINATOR: 'sc',
    SUPERVISOR: 'su',
    POLLSTER: 'po'
};

const getRoleName = user => {
    if (includes(user.roles, roles.NATIONAL_COORDINATOR)) {
        return 'Coordinador Nacional';
    }
    if (includes(user.roles, roles.NATIONAL_COORDINATOR_RO)) {
        return 'Coordinador Nacional (SL)';
    }
    if (includes(user.roles, roles.COORDINATOR)) {
        return 'Coordinador Provincial';
    }
    if (includes(user.roles, roles.SUB_COORDINATOR)) {
        return 'Subcoordinador Provincial';
    }
    if (includes(user.roles, roles.SUPERVISOR)) {
        return 'Supervisor';
    }
    return 'Actualizadores';
};

const appLabel = {
    APPNAME: 'SDDS',
    APPDESCRIPTION: 'Special Data Dissemination Standard'
};

const DEFAULT_PAGE_SIZE = 30;

export {roles};
export {DEFAULT_PAGE_SIZE};
export {getRoleName};
export {types};
export {appLabel};
