/* global ENDPOINT */
import {http} from '@indec/heimdall/client';
import {
    reject, some, concat, map, mapValues
} from 'lodash';
import {CsvService} from '@indec/react-commons/services';
import {buildQueryString} from '../util';
import {messages} from '../constants';
import ValidatorService from './validator';

const API = `${ENDPOINT}api/review/`;

export default class ReviewService {
    static getStates() {
        return http.get(`${API}states`);
    }

    static fetchAreas(params, skip) {
        const searchParams = new URLSearchParams();
        mapValues(params, (value, key) => {
            if (value) {
                searchParams.set(key, value);
            }
        });
        if (skip) {
            searchParams.set('skip', skip);
        }
        return http.get(`${API}areas?${searchParams.toString()}`);
    }

    static fetchGeographic(id) {
        return http.get(`${API}area/${id}/geographic`);
    }

    static fetchDepartments(state) {
        return http.get(`${API}state/${state}/departments`);
    }

    static fetchLocalities(state, department) {
        return http.get(`${API}state/${state}/department/${department}/localities`);
    }

    static fetchFractions(state, department, locality) {
        return http.get(`${API}state/${state}/department/${department}/locality/${locality}/fractions`);
    }

    static fetchRadios(state, department, locality, fraction) {
        return http.get(
            `${API}state/${state}/department/${department}/locality/${locality}/fraction/${fraction}/radios`
        );
    }

    static fetchSurvey(id, stateId, radio) {
        return http.get(`${API}survey/${id}/${stateId}/${radio}/null/details`);
    }

    static fetchSurveyToCompare(id, type) {
        return http.get(`${API}survey/${id}/${type}/details`);
    }

    static fetchDwellings(area, side) {
        return http.get(`${API}area/${area}/side/${side}/dwellings`);
    }

    static fetchDwellingsType(id, type) {
        return http.get(`${API}side/${id}/type/${type}/dwellings`);
    }

    static requestReassignArea(id, pollster) {
        return http.put(`${API}area/${id}/reassign`, {pollster});
    }

    static approveArea(id) {
        return http.put(`${API}area/${id}/approve`);
    }

    static requestReopenArea(id, supervision) {
        return http.put(`${API}area/${id}/reopen`, {supervision});
    }

    static closeArea(id) {
        return http.put(`${API}area/${id}/close`);
    }

    static searchStreets(id, term) {
        return http.get(`${API}area/${id}/searchStreets?term=${term}`);
    }

    static requestSuperviseArea(id, dwellings) {
        return http.put(`${API}area/${id}/supervise`, {dwellings});
    }

    static clearArea(id) {
        return http.put(`${API}area/${id}/clear`);
    }

    static finishArea(id) {
        return http.put(`${API}area/${id}/finish`);
    }

    static fetchAreaData(id) {
        return http.get(`${API}area/${id}`);
    }

    static fetchRadiosWithBlocks(idArea) {
        return http.get(`${API}area/${idArea}/blocks`);
    }

    static fetchSidesByBlock(area, block) {
        return http.get(`${API}area/${area}/block/${block}/sides`);
    }

    static validateBlocksAndStreets(id) {
        return http.get(`${API}area/${id}/validate`);
    }

    static saveBlocks(idArea, blocks) {
        return http.put(`${API}area/${idArea}/blocks`, {blocks});
    }

    static saveSides(idArea, idBlock, sides) {
        return http.put(`${API}area/${idArea}/block/${idBlock}/sides`, {sides});
    }

    static saveStreets(idArea, idBlock, streets) {
        return http.put(`${API}area/${idArea}/block/${idBlock}/streets`, {streets});
    }

    static validateBlockNumberAvailability(blocks, blockId, value) {
        return some(
            reject(
                blocks, block => block._id === blockId
            ), block => block.number === value
        );
    }

    static validateStreetCodeAvailability(id, streetId, code) {
        return http.get(`${API}area/${id}/street/${streetId}/validateStreetCode${buildQueryString({code})}`);
    }

    static fetchUsersByArea(params) {
        return http.get(`${API}users${buildQueryString(params)}`);
    }

    static fetchAreaErrors(id) {
        return http.get(`${API}area/${id}/errors`);
    }

    static downloadAreaErrors(blockErrors, sideErrors, geographic) {
        const data = concat(
            [
                ['Prov', 'Radio', 'Manz', 'Lado', 'Cod. Calle', 'Nom. Calle', 'Error']
            ],
            map(
                blockErrors,
                blockError => [
                    geographic.state,
                    blockError.radio,
                    blockError.number,
                    '',
                    '',
                    '',
                    messages.INVALID_BLOCK
                ]
            ),
            map(
                sideErrors,
                sideError => [
                    geographic.state,
                    sideError.block.radio,
                    sideError.block.number,
                    sideError.number,
                    sideError.street ? sideError.street.code : '',
                    sideError.street ? sideError.street.name : '',
                    ValidatorService.invalidSideMessage(sideError)
                ]
            )
        );
        return CsvService.download(data, 'errors');
    }

    static fetchRadiosData({
        stateId, department, locality, fraction, radio
    }) {
        return http.get(`${API}${stateId}/${department}/${locality}/${fraction}/${radio}/dwellings`);
    }

    static fetchBlocksAndStreetsByRadio({
        stateId, department, locality, fraction, radio
    }) {
        return http.get(`${API}${stateId}/${department}/${locality}/${fraction}/${radio}/blocks`);
    }

    static fetchUsersByUps(state, ups) {
        return http.get(`${API}${state}/${ups}/users`);
    }

    static fetchUpsOpenByState(state) {
        return http.get(`${API}${state}/ups`);
    }

    static fetchAreasOpenByUps(state, ups) {
        return http.get(`${API}${state}/${ups}/areas`);
    }
}
