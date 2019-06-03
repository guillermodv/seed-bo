import {combineReducers} from 'redux';
import {
    log, overview, manuals, version, session, spreadsheet, radio
} from '@indec/react-address-commons/reducers';

import app from './app';
import assign from './assign';
import compare from './compare';
import error from './error';
import fieldMaterials from './fieldMaterial';
import modal from './modal';
import monitoring from './monitoring';
import pollsters from './pollsters';
import reports from './reports';
import review from './review';
import unlock from './unlock';
import user from './user';

export default combineReducers({
    app,
    assign,
    compare,
    error,
    fieldMaterials,
    log,
    modal,
    monitoring,
    pollsters,
    radio,
    reports,
    review,
    session,
    spreadsheet,
    unlock,
    user,
    overview,
    manuals,
    version
});
