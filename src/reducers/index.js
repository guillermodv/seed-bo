import {combineReducers} from 'redux';
import {
    log, overview, manuals, version, session, spreadsheet, radio
} from '@indec/react-address-commons/reducers';

import app from './app';
import error from './error';
import modal from './modal';

export default combineReducers({
    app,
    error,
    log,
    modal,
    radio,
    session,
    spreadsheet,
    overview,
    manuals,
    version
});
