import {call, put} from 'redux-saga/effects';
import {forEach} from 'lodash';

import {handleError} from '../actions';
import {
    requestFetchRadiosByArea,
    receiveAreasSucceeded,
    receiveStates,
    fetchDwellingsSucceeded,
    notifyApproveAreaSuccess,
    notifyAreaSuperviseSuccess,
    notifyBlocksSaveSuccess,
    notifyClearAreaSuccess,
    notifyCloseAreaSuccess,
    notifyDownloadAreaErrorsSucceeded,
    notifyFinishAreaSuccess,
    notifyReassignAreaSuccess,
    notifyReopenAreaSuccess,
    notifyValidateBlockNumberAvailability,
    notifyValidateBlocksAndStreets,
    notifyValidateStreetCodeAvailability,
    notifySidesSaveSuccess,
    notifyStreetsSaveSuccess,
    receiveAreaData,
    receiveAreaErrors,
    receiveRadiosByArea,
    receiveBlocksAndStreetsByRadio,
    receiveBlocksByRadio,
    receiveDepartments,
    receiveFractions,
    receiveLocalities,
    receiveRadios,
    receiveSides,
    receiveUsersByArea,
    receivedStreets,
    requestFetchAreaData,
    requestFetchGeographicByArea,
    surveyFetched,
    receiveGeographic,
    receiveUsersByUps,
    receiveUpsOpenByState,
    receiveAreasOpenByUps
} from '../actions/review';
import ReviewService from '../services/review';
import ValidatorService from '../services/validator';

export function* fetchStates() {
    try {
        const {states} = yield call(ReviewService.getStates);
        yield put(receiveStates(states));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* getAreas({searchParams, skip}) {
    try {
        const {areas, areasCount, pageSize} = yield call(ReviewService.fetchAreas, searchParams, skip);
        yield put(receiveAreasSucceeded(areas, areasCount, pageSize));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchGeographicByArea({id}) {
    try {
        const {geographic} = yield call(ReviewService.fetchGeographic, id);
        yield put(receiveGeographic(geographic));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchSurvey({id, stateId, radio}) {
    try {
        const {survey} = yield call(ReviewService.fetchSurvey, id, stateId, radio);
        survey.blocks = ValidatorService.validateBlocks(survey.blocks);
        yield put(surveyFetched(survey));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingRequested({area, side}) {
    try {
        const {dwellings} = yield call(ReviewService.fetchDwellings, area, side);
        yield put(fetchDwellingsSucceeded(dwellings));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* requestReassignArea({id, pollster}) {
    try {
        yield call(ReviewService.requestReassignArea, id, pollster);
        yield put(notifyReassignAreaSuccess());
        yield put(requestFetchAreaData(id));
        yield put(requestFetchGeographicByArea(id));
        yield put(requestFetchRadiosByArea(id));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* approveArea({id}) {
    try {
        yield call(ReviewService.approveArea, id);
        yield put(notifyApproveAreaSuccess());
        yield put(requestFetchAreaData(id));
        yield put(requestFetchGeographicByArea(id));
        yield put(requestFetchRadiosByArea(id));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* closeArea({id}) {
    try {
        yield call(ReviewService.closeArea, id);
        yield put(notifyCloseAreaSuccess());
        yield put(requestFetchAreaData(id));
        yield put(requestFetchGeographicByArea(id));
        yield put(requestFetchRadiosByArea(id));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* searchStreets({id, term}) {
    try {
        const {streets} = yield call(ReviewService.searchStreets, id, term);
        yield put(receivedStreets(streets));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* requestSuperviseArea({id, dwellings}) {
    try {
        yield call(ReviewService.requestSuperviseArea, id, dwellings);
        yield put(notifyAreaSuperviseSuccess());
        yield put(requestFetchAreaData(id));
        yield put(requestFetchRadiosByArea(id));
        yield put(requestFetchGeographicByArea(id));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* clearArea({id}) {
    try {
        yield call(ReviewService.clearArea, id);
        yield put(notifyClearAreaSuccess());
        yield put(requestFetchAreaData(id));
        yield put(requestFetchRadiosByArea(id));
        yield put(requestFetchGeographicByArea(id));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* finishArea({id}) {
    try {
        yield call(ReviewService.finishArea, id);
        yield put(notifyFinishAreaSuccess());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* validateBlockNumberAvailability({blocks, blockId, value}) {
    try {
        const isBlockNumberUnavailable = yield call(
            ReviewService.validateBlockNumberAvailability, blocks, blockId, value
        );
        yield put(notifyValidateBlockNumberAvailability(isBlockNumberUnavailable));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* validateStreetCodeAvailability({id, streetId, code}) {
    try {
        const {isStreetCodeUnavailable} = yield call(
            ReviewService.validateStreetCodeAvailability, id, streetId, code
        );
        yield put(notifyValidateStreetCodeAvailability(isStreetCodeUnavailable));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAreaData({idArea}) {
    try {
        const {areaData} = yield call(ReviewService.fetchAreaData, idArea);
        yield put(receiveAreaData(areaData));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchRadiosWithBlocks({idArea}) {
    try {
        const radios = yield call(ReviewService.fetchRadiosWithBlocks, idArea);
        forEach(radios, radio => ValidatorService.validateBlocks(radio.blocks));
        yield put(receiveRadiosByArea(radios));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchSides({area, block}) {
    try {
        const {sides} = yield call(ReviewService.fetchSidesByBlock, area, block);
        yield put(receiveSides(ValidatorService.validateSides(sides)));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveBlocks({idArea, editedBlocks}) {
    try {
        yield call(ReviewService.saveBlocks, idArea, editedBlocks);
        yield put(notifyBlocksSaveSuccess(editedBlocks));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveSides({idArea, idBlock, editedSides}) {
    try {
        yield call(ReviewService.saveSides, idArea, idBlock, editedSides);
        yield put(notifySidesSaveSuccess(editedSides));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveStreets({idArea, idBlock, editedStreets}) {
    try {
        yield call(ReviewService.saveStreets, idArea, idBlock, editedStreets);
        yield put(notifyStreetsSaveSuccess(editedStreets));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* requestReopenArea({id, supervision}) {
    try {
        yield call(ReviewService.requestReopenArea, id, supervision);
        yield put(requestFetchGeographicByArea(id));
        yield put(requestFetchAreaData(id));
        yield put(requestFetchRadiosByArea(id));
        yield put(notifyReopenAreaSuccess());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDepartments({state}) {
    try {
        const {departments} = yield call(ReviewService.fetchDepartments, state);
        yield put(receiveDepartments(departments));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchLocalities({state, department}) {
    try {
        const {localities} = yield call(ReviewService.fetchLocalities, state, department);
        yield put(receiveLocalities(localities));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchFractions({state, department, locality}) {
    try {
        const {fractions} = yield call(ReviewService.fetchFractions, state, department, locality);
        yield put(receiveFractions(fractions));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchRadiosByFraction({
    state, department, locality, fraction
}) {
    try {
        const {radios} = yield call(ReviewService.fetchRadios, state, department, locality, fraction);
        yield put(receiveRadios(radios));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchUsersByArea({params}) {
    try {
        const {users} = yield call(ReviewService.fetchUsersByArea, params);
        yield put(receiveUsersByArea(users));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* validateBlocksAndStreets({id}) {
    try {
        const {hasErrors} = yield call(ReviewService.validateBlocksAndStreets, id);
        yield put(notifyValidateBlocksAndStreets(hasErrors));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAreaErrors({id}) {
    try {
        const {blockErrors, sideErrors} = yield call(ReviewService.fetchAreaErrors, id);
        yield put(receiveAreaErrors(blockErrors, sideErrors));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* downloadAreaErrors({idArea}) {
    try {
        const {blockErrors, sideErrors} = yield call(ReviewService.fetchAreaErrors, idArea);
        const {geographic} = yield call(ReviewService.fetchGeographic, idArea);
        yield call(ReviewService.downloadAreaErrors, blockErrors, sideErrors, geographic);
        yield put(notifyDownloadAreaErrorsSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchBlocksByRadio({params}) {
    try {
        const {blocks, radioData} = yield call(ReviewService.fetchRadiosData, params);
        yield put(receiveBlocksByRadio(blocks, radioData));
    } catch (err) {
        yield put(handleError(err));
    }
}


export function* fetchBlocksAndStreetsByRadio({params}) {
    try {
        const {blocks, radioData} = yield call(ReviewService.fetchBlocksAndStreetsByRadio, params);
        yield put(receiveBlocksAndStreetsByRadio(blocks, radioData));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchUsersByUps({state, ups}) {
    try {
        const users = yield call(ReviewService.fetchUsersByUps, state, ups);
        yield put(receiveUsersByUps(users));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchUpsOpenByState({state}) {
    try {
        const ups = yield call(ReviewService.fetchUpsOpenByState, state);
        yield put(receiveUpsOpenByState(ups));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAreasOpenByUps({state, ups}) {
    try {
        const areas = yield call(ReviewService.fetchAreasOpenByUps, state, ups);
        yield put(receiveAreasOpenByUps(areas));
    } catch (err) {
        yield put(handleError(err));
    }
}
