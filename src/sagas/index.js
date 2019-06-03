import {takeEvery, all, throttle} from 'redux-saga/effects';
import {
    DWELLINGS_BY_SIDE_FETCH_REQUESTED,
    BLOCK_EXPORT_REQUESTED,
    BLOCK_SPREADSHEETS_FETCH_REQUESTED,
    DWELLING_SPREADSHEETS_FETCH_REQUESTED,
    FETCH_SYNC_LOG_REQUESTED,
    OVERVIEW_FETCH_REQUESTED,
    SESSION_REQUESTED,
    MANUALS_FETCH_REQUESTED,
    SIDES_BY_BLOCK_FETCH_REQUESTED,
    RADIOS_FETCH_REQUESTED
} from '@indec/react-address-commons/actions';
import {
    exportBlock,
    fetchBlockSpreadsheets,
    fetchDwellingSpreadsheets,
    fetchDwellingsBySide,
    fetchRadios,
    fetchSidesByBlock,
    fetchSyncTask,
    fetchOverview,
    fetchSession,
    fetchManuals,
    findUsers,
    findUser,
    fetchUsers
} from '@indec/react-address-commons/sagas';

import {
    ERROR_OCCURRED,
    USER_FETCH_REQUESTED,
    USERS_FETCH_REQUESTED,
    USERS_FIND_REQUESTED,
    VERSION_FETCH_REQUESTED
} from '../actions';
import {
    FETCH_REGIONAL_INFO,
    SAVE_REGIONAL_ASSIGN,
    FETCH_ASSIGN_LEVEL,
    ASSIGN_SAVE_UPS_REQUESTED,
    FETCH_UPS_REQUESTED,
    FETCH_AREAS_NUMBERS_REQUESTED,
    FETCH_ASSIGN_BY_UPS_REQUESTED,
    FETCH_ASSIGN_BY_AREA_REQUESTED,
    ASSIGN_SAVE_AREA_REQUESTED
} from '../actions/assign';
import {FETCH_GENERAL_MONITORING, FETCH_RESPONSE_MONITORING} from '../actions/monitoring';
import {
    BLOCK_REPORTS_FETCH_REQUESTED,
    DWELLING_REPORTS_FETCH_REQUESTED,
    DWELLING_REPORT_BY_TYPE_FETCH_REQUESTED
} from '../actions/reports';
import {
    AREAS_FETCH_REQUESTED,
    AREAS_OPEN_BY_UPS_FETCH_REQUESTED,
    STATES_FETCH_REQUESTED,
    APPROVE_AREA_REQUESTED,
    AREA_DOWNLOAD_ERRORS_REQUESTED,
    BLOCKS_AND_STREETS_BY_RADIO_FETCH_REQUESTED,
    BLOCKS_BY_RADIO_FETCH_REQUESTED,
    CLEAR_AREA_REQUESTED,
    CLOSE_AREA_REQUESTED,
    FETCH_AREA_DATA_REQUESTED,
    FETCH_AREA_ERRORS_REQUESTED,
    FETCH_RADIOS_BY_AREA_REQUESTED,
    FETCH_DEPARTMENTS_REQUESTED,
    FETCH_DWELLINGS_REQUESTED,
    FETCH_FRACTIONS_REQUESTED,
    FETCH_LOCALITIES_REQUESTED,
    FETCH_RADIOS_REQUESTED,
    FETCH_SIDES_REQUESTED,
    FETCH_SURVEY,
    FETCH_USERS_BY_AREA_REQUESTED,
    FINISH_AREA_REQUESTED,
    REASSIGN_AREA_REQUESTED,
    REOPEN_AREA_REQUESTED,
    SAVE_BLOCKS_REQUESTED,
    SAVE_SIDES_REQUESTED,
    SAVE_STREETS_REQUESTED,
    SEARCH_STREETS_REQUESTED,
    SUPERVISE_AREA_REQUESTED,
    UPS_OPEN_BY_STATE_FETCH_REQUESTED,
    VALIDATE_BLOCK_NUMBER_AVAILABILITY_REQUESTED,
    VALIDATE_BLOCKS_AND_SIDES_REQUESTED,
    VALIDATE_STREET_CODE_AVAILABILITY_REQUESTED,
    AREA_GEOGRAPHIC_FETCH_REQUESTED,
    USERS_BY_UPS_FETCH_REQUESTED
} from '../actions/review';
import {
    BLOCKS_BY_AREA_FETCH_REQUESTED,
    FIELD_MATERIALS_FETCH_REQUESTED,
    FIELD_MATERIALS_BY_STATE_FETCH_REQUESTED,
    FIELD_MATERIALS_BY_UPS_FETCH_REQUESTED,
    GEOGRAPHIC_FETCH_REQUESTED
} from '../actions/fieldMaterials';
import {FETCH_POLLSTERS, FETCH_POLLSTER} from '../actions/pollsters';
import {AREAS_FETCH_TO_UNLOCK_REQUESTED, AREA_OPEN_REQUESTED, AREAS_OPEN_REQUESTED} from '../actions/unlock';
import {FETCH_SURVEY_WITH_TYPE_REQUESTED, DWELLINGS_FETCH_WITH_TYPE_REQUESTED} from '../actions/compare';
import {USERS_FETCH_BY_AREA_REQUESTED} from '../actions/user';
import {fetchVersion} from './app';
import {
    fetchRegionalInfo,
    saveRegionalInfo,
    fetchAssignLevel,
    saveAssignByUps,
    fetchUps,
    fetchAreas,
    fetchAssignByUps,
    fetchAssignByArea,
    saveAssignByArea
} from './assign';
import {
    fetch,
    fetchFieldMaterialsByState,
    fetchByUps,
    fetchGeographic,
    fetchBlocksByArea
} from './fieldMaterials';
import {fetchGeneralMonitoring, fetchResponseMonitoring} from './monitoring';
import {fetchBlockReports, fetchDwellingReports, fetchDwellingReportByType} from './reports';
import {
    fetchGeographicByArea,
    fetchStates,
    getAreas,
    approveArea,
    clearArea,
    closeArea,
    downloadAreaErrors,
    fetchAreaData,
    fetchAreaErrors,
    fetchAreasOpenByUps,
    fetchRadiosWithBlocks,
    fetchBlocksAndStreetsByRadio,
    fetchBlocksByRadio,
    fetchDepartments,
    fetchDwellingRequested,
    fetchFractions,
    fetchLocalities,
    fetchSides,
    fetchUpsOpenByState,
    fetchRadiosByFraction,
    fetchSurvey,
    fetchUsersByArea,
    finishArea,
    requestReassignArea,
    requestReopenArea,
    requestSuperviseArea,
    saveBlocks,
    saveSides,
    saveStreets,
    searchStreets,
    validateBlockNumberAvailability,
    validateBlocksAndStreets,
    validateStreetCodeAvailability,
    fetchUsersByUps
} from './review';
import {fetchPollsters, fetchPollster} from './pollsters';
import {fetchAreasRequested, openArea, openAreas} from './unlock';
import {fetchByArea} from './user';
import {fetchSurveyWithType, fetchDwellingWithType} from './compare';
import handleError from './common';

export default function* root() {
    yield all([
        takeEvery(USERS_FETCH_REQUESTED, fetchUsers),
        takeEvery(USERS_FIND_REQUESTED, findUsers),
        takeEvery(USER_FETCH_REQUESTED, findUser),
        takeEvery(SESSION_REQUESTED, fetchSession),
        takeEvery(MANUALS_FETCH_REQUESTED, fetchManuals),
        takeEvery(FETCH_REGIONAL_INFO, fetchRegionalInfo),
        takeEvery(SAVE_REGIONAL_ASSIGN, saveRegionalInfo),
        takeEvery(ASSIGN_SAVE_UPS_REQUESTED, saveAssignByUps),
        takeEvery(FETCH_ASSIGN_LEVEL, fetchAssignLevel),
        takeEvery(FETCH_GENERAL_MONITORING, fetchGeneralMonitoring),
        takeEvery(FETCH_RESPONSE_MONITORING, fetchResponseMonitoring),
        takeEvery(STATES_FETCH_REQUESTED, fetchStates),
        takeEvery(FIELD_MATERIALS_FETCH_REQUESTED, fetch),
        takeEvery(FIELD_MATERIALS_BY_STATE_FETCH_REQUESTED, fetchFieldMaterialsByState),
        takeEvery(FIELD_MATERIALS_BY_UPS_FETCH_REQUESTED, fetchByUps),
        takeEvery(FETCH_POLLSTERS, fetchPollsters),
        takeEvery(FETCH_POLLSTER, fetchPollster),
        takeEvery(AREAS_FETCH_TO_UNLOCK_REQUESTED, fetchAreasRequested),
        takeEvery(FETCH_SURVEY_WITH_TYPE_REQUESTED, fetchSurveyWithType),
        takeEvery(DWELLINGS_FETCH_WITH_TYPE_REQUESTED, fetchDwellingWithType),
        takeEvery(FETCH_UPS_REQUESTED, fetchUps),
        takeEvery(FETCH_AREAS_NUMBERS_REQUESTED, fetchAreas),
        takeEvery(FETCH_ASSIGN_BY_UPS_REQUESTED, fetchAssignByUps),
        takeEvery(FETCH_ASSIGN_BY_AREA_REQUESTED, fetchAssignByArea),
        takeEvery(ASSIGN_SAVE_AREA_REQUESTED, saveAssignByArea),
        takeEvery(AREA_OPEN_REQUESTED, openArea),
        takeEvery(AREAS_OPEN_REQUESTED, openAreas),
        takeEvery(AREAS_FETCH_REQUESTED, getAreas),
        takeEvery(ERROR_OCCURRED, handleError),
        takeEvery(FETCH_SYNC_LOG_REQUESTED, fetchSyncTask),
        takeEvery(VERSION_FETCH_REQUESTED, fetchVersion),
        takeEvery(AREA_GEOGRAPHIC_FETCH_REQUESTED, fetchGeographicByArea),
        takeEvery(GEOGRAPHIC_FETCH_REQUESTED, fetchGeographic),
        takeEvery(SIDES_BY_BLOCK_FETCH_REQUESTED, fetchSidesByBlock),
        takeEvery(DWELLINGS_BY_SIDE_FETCH_REQUESTED, fetchDwellingsBySide),
        takeEvery(BLOCK_EXPORT_REQUESTED, exportBlock),
        takeEvery(BLOCKS_BY_AREA_FETCH_REQUESTED, fetchBlocksByArea),
        takeEvery(BLOCK_SPREADSHEETS_FETCH_REQUESTED, fetchBlockSpreadsheets),
        takeEvery(OVERVIEW_FETCH_REQUESTED, fetchOverview),
        takeEvery(FETCH_SURVEY, fetchSurvey),
        takeEvery(APPROVE_AREA_REQUESTED, approveArea),
        takeEvery(REASSIGN_AREA_REQUESTED, requestReassignArea),
        takeEvery(REOPEN_AREA_REQUESTED, requestReopenArea),
        takeEvery(FETCH_DWELLINGS_REQUESTED, fetchDwellingRequested),
        takeEvery(CLOSE_AREA_REQUESTED, closeArea),
        throttle(500, SEARCH_STREETS_REQUESTED, searchStreets),
        takeEvery(SUPERVISE_AREA_REQUESTED, requestSuperviseArea),
        takeEvery(CLEAR_AREA_REQUESTED, clearArea),
        takeEvery(FINISH_AREA_REQUESTED, finishArea),
        takeEvery(FETCH_SIDES_REQUESTED, fetchSides),
        takeEvery(VALIDATE_BLOCK_NUMBER_AVAILABILITY_REQUESTED, validateBlockNumberAvailability),
        takeEvery(VALIDATE_STREET_CODE_AVAILABILITY_REQUESTED, validateStreetCodeAvailability),
        takeEvery(FETCH_RADIOS_BY_AREA_REQUESTED, fetchRadiosWithBlocks),
        takeEvery(FETCH_AREA_DATA_REQUESTED, fetchAreaData),
        takeEvery(SAVE_BLOCKS_REQUESTED, saveBlocks),
        takeEvery(SAVE_SIDES_REQUESTED, saveSides),
        takeEvery(SAVE_STREETS_REQUESTED, saveStreets),
        takeEvery(FETCH_DEPARTMENTS_REQUESTED, fetchDepartments),
        takeEvery(FETCH_FRACTIONS_REQUESTED, fetchFractions),
        takeEvery(FETCH_LOCALITIES_REQUESTED, fetchLocalities),
        takeEvery(FETCH_RADIOS_REQUESTED, fetchRadiosByFraction),
        takeEvery(FETCH_USERS_BY_AREA_REQUESTED, fetchUsersByArea),
        takeEvery(VALIDATE_BLOCKS_AND_SIDES_REQUESTED, validateBlocksAndStreets),
        takeEvery(FETCH_AREA_ERRORS_REQUESTED, fetchAreaErrors),
        takeEvery(AREA_DOWNLOAD_ERRORS_REQUESTED, downloadAreaErrors),
        takeEvery(BLOCKS_BY_RADIO_FETCH_REQUESTED, fetchBlocksByRadio),
        takeEvery(BLOCKS_AND_STREETS_BY_RADIO_FETCH_REQUESTED, fetchBlocksAndStreetsByRadio),
        takeEvery(USERS_FETCH_BY_AREA_REQUESTED, fetchByArea),
        takeEvery(AREA_GEOGRAPHIC_FETCH_REQUESTED, fetchGeographicByArea),
        takeEvery(RADIOS_FETCH_REQUESTED, fetchRadios),
        takeEvery(BLOCKS_BY_AREA_FETCH_REQUESTED, fetchBlocksByArea),
        takeEvery(RADIOS_FETCH_REQUESTED, fetchRadios),
        takeEvery(DWELLING_SPREADSHEETS_FETCH_REQUESTED, fetchDwellingSpreadsheets),
        takeEvery(USERS_BY_UPS_FETCH_REQUESTED, fetchUsersByUps),
        takeEvery(AREAS_OPEN_BY_UPS_FETCH_REQUESTED, fetchAreasOpenByUps),
        takeEvery(UPS_OPEN_BY_STATE_FETCH_REQUESTED, fetchUpsOpenByState),
        takeEvery(BLOCK_REPORTS_FETCH_REQUESTED, fetchBlockReports),
        takeEvery(DWELLING_REPORTS_FETCH_REQUESTED, fetchDwellingReports),
        takeEvery(DWELLING_REPORT_BY_TYPE_FETCH_REQUESTED, fetchDwellingReportByType)
    ]);
}
