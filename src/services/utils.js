/* eslint-disable */
/* global ENDPOINT */
import {http} from '@indec/heimdall/client';
import {
    assign,
    castArray,
    find,
    findIndex,
    flatten,
    forEach,
    isEmpty,
    isEqual,
    groupBy,
    map,
    orderBy,
    size,
    some,
    uniq
} from 'lodash';

import ValidatorService from './validator';

const randomString = () => Math.round(
    (36 ** (9 + 1)) - (Math.random() * (36 ** 9))
).toString(36).slice(1) + (new Date().toISOString());

function getVersion() {
    return http.get(`${ENDPOINT}version`);
}

const setNewSideValues = (sides, side, newValues) => {
    const currentSide = find(sides, s => s._id === side._id);
    if (newValues.newPostalCode) {
        Object.assign(currentSide, {postalCode: newValues.newPostalCode, modified: true});
    }
    if (newValues.replyCodeToAllArea && newValues.newPostalCode) {
        forEach(sides, s => Object.assign(s, {
            postalCode: newValues.newPostalCode,
            replyCodeToAllArea: true,
            modified: true
        }));
    }
    if (newValues.newFinalNumber) {
        Object.assign(currentSide, {finalNumber: newValues.newFinalNumber, modified: true});
    }
    if (newValues.newInitialNumber) {
        Object.assign(currentSide, {initialNumber: newValues.newInitialNumber, modified: true});
    }
    if (newValues.newName) {
        Object.assign(currentSide.street, {name: newValues.newName, modified: true});
    }
    if (newValues.newCode) {
        Object.assign(currentSide.street, {code: newValues.newCode, modified: true});
    }
    return ValidatorService.validateSides(sides);
};

// TODO refactor this function
const buildTreeBeard = ({survey, sample}, {surveyA}) => {
    const treeBeard = {
        name: `Muestra ${sample}`,
        toggled: true
    };

    let fromSurvey = null;

    if (sample === 'B') {
        fromSurvey = groupBy(surveyA.blocks, block => block.radio);
    }
    const surveyToBeCompared = groupBy(survey.blocks, block => block.radio);
    if (fromSurvey && size(fromSurvey) !== size(surveyToBeCompared)) {
        treeBeard.haveDifference = true;
    }

    treeBeard.children = map(surveyToBeCompared, (radios, radio) => {
        const blocksTree = {
            name: `Radio ${radio}`
        };
        let bsHaveDifference = false;
        if (fromSurvey && !fromSurvey[radio]) {
            bsHaveDifference = true;
        }

        blocksTree.children = map(radios, block => {
            delete block.closed;
            let fromSurveyBlock = null;
            const {
                dwellingTotal, dwellingEdited, dwellingDeleted, dwellingAdded, number
            } = block;
            const blockTree = {
                name: `${number}-(${dwellingTotal})`,
                dwellingEdited,
                dwellingDeleted,
                dwellingAdded,
                dwellingTotal,
                block: true
            };

            let bHaveDifference = false;

            if (sample === 'B' && fromSurvey && fromSurvey[radio]) {
                fromSurveyBlock = find(fromSurvey[radio], fBlock => fBlock._id === block._id) || {};
                bHaveDifference = isEmpty(fromSurveyBlock);
                delete fromSurveyBlock.haveDifference;
                blockTree.haveDifference = !bHaveDifference ? !isEqual(fromSurveyBlock, block) : true;
            }

            blockTree.children = map(orderBy(block.sides, side => side.number), side => {
                delete side.closed;
                const street = find(survey.streets, s => s._id === side.street);
                const {
                    _id,
                    added,
                    edited,
                    deleted,
                    dwellingCount,
                    postalCode,
                    initialNumber,
                    finalNumber,
                    totalDwelling,
                    totalEdited,
                    totalDeleted,
                    totalAdded
                } = side;
                let haveDifference = false;
                if (fromSurveyBlock) {
                    const fromSideBlock = find(fromSurveyBlock.sides, fSide => fSide._id === side._id);
                    haveDifference = !fromSideBlock;
                    haveDifference = !haveDifference ? !isEqual(fromSideBlock, side) : true;
                }
                const name = `Lado ${side.number} (${street.code}) ${street.name} ${postalCode || ''} #${initialNumber}-${finalNumber}`;
                if (sample === 'B') {
                    return {
                        _id,
                        added,
                        deleted,
                        dwellingCount,
                        edited,
                        haveDifference,
                        name,
                        side: true,
                        totalAdded,
                        totalDeleted,
                        totalDwelling,
                        totalEdited
                    };
                }

                return {
                    _id,
                    added,
                    deleted,
                    dwellingCount,
                    edited,
                    name,
                    side: true,
                    totalAdded,
                    totalDeleted,
                    totalDwelling,
                    totalEdited
                };
            });

            if (sample === 'B') {
                blockTree.haveDifference = !bsHaveDifference ? some(
                    blockTree.children, bChilds => bChilds.haveDifference
                ) : true;
            }
            return blockTree;
        });
        if (sample === 'B') {
            blocksTree.haveDifference = !blocksTree.haveDifference ? some(
                blocksTree.children, bChilds => bChilds.haveDifference
            ) : true;
        }
        return blocksTree;
    });
    assign(survey, {treeBeard});
    return survey;
};

const nodeInformation = data => {
    let dwellingTotal = 0;
    let dwellingAdded = 0;
    let dwellingEdited = 0;
    let dwellingDeleted = 0;
    let sides = 0;
    let blocks = 0;
    let areBlocks = true;
    let insideBlock = false;
    if (data.children) {
        forEach(data.children, children => {
            if (children.block) {
                dwellingTotal += children.dwellingTotal;
                dwellingAdded += children.dwellingAdded;
                dwellingEdited += children.dwellingEdited;
                dwellingDeleted += children.dwellingDeleted;
                sides += size(children.children);
                blocks += 1;
            } else if (data.block) {
                dwellingTotal += children.totalDwelling;
                dwellingAdded += children.totalAdded;
                dwellingEdited += children.totalEdited;
                dwellingDeleted += children.totalDeleted;
                sides += 1;
                insideBlock = true;
            }
        });
    } else {
        areBlocks = false;
        dwellingTotal += data.totalDwelling;
        dwellingAdded += data.totalAdded;
        dwellingEdited += data.totalEdited;
        dwellingDeleted += data.totalDeleted;
    }
    return {
        dwellingTotal,
        dwellingAdded,
        dwellingEdited,
        dwellingDeleted,
        sides,
        blocks,
        areBlocks,
        insideBlock
    };
};

const setNewBlockValues = (block, objectEdited) => {
    assign(block, objectEdited);
    return block;
};

const setDwellingsForSupervision = (ids, selected, dwellingsForSupervision) => {
    const dwellings = dwellingsForSupervision || [];
    const dwellingsIds = castArray(ids);
    if (selected) {
        dwellings.push(dwellingsIds);
    } else {
        forEach(dwellingsIds, id => {
            const index = findIndex(dwellings, d => d === id);
            dwellings.splice(index, 1);
        });
    }
    return uniq(flatten(dwellings));
};

export {randomString};
export {getVersion};
export {setNewBlockValues};
export {setNewSideValues};
export {setDwellingsForSupervision};
export {buildTreeBeard};
export {nodeInformation};
