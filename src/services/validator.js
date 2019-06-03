import {
    size, inRange, isNaN, map, toNumber, isEmpty, assign, forEach
} from 'lodash';

import {messages} from '../constants';

export default class ValidatorService {
    static validateText(input, max = 50, min = 2) {
        return inRange(size(input), min, max);
    }

    static validateBlocks(blocks, streets) {
        return map(blocks, block => {
            const number = toNumber(block.number);
            const blockErrors = {};
            if (number > 999 || isNaN(number)) {
                blockErrors.number = true;
            }
            const sidesErrors = ValidatorService.validateSides(block.sides, streets);
            if (!isEmpty(sidesErrors)) {
                blockErrors.sidesErrors = sidesErrors;
            } else {
                delete blockErrors.sidesErrors;
            }

            if (!isEmpty(blockErrors)) {
                assign(block, {blockErrors});
            } else {
                assign(block, {blockErrors});
            }
            return block;
        });
    }

    static validateSides(sides) {
        return forEach(sides, side => {
            Object.assign(side, {sideError: {}});
            if (side.street && side.street.code) {
                const code = toNumber(side.street.code);
                if (isNaN(code) || code < 0) {
                    Object.assign(side.sideError, {_id: side._id, code: true});
                }
                if (isEmpty(side.postalCode)) {
                    Object.assign(side.sideError, {_id: side._id, postalCode: true});
                }
            }
        });
    }

    static invalidSideMessage(side) {
        const postalCode = toNumber(side.postalCode);
        const code = toNumber(side.street.code);
        const invalidPostalCode = !postalCode || postalCode <= 0;
        const invalidCode = isNaN(code) || code <= 0;
        if (invalidPostalCode && invalidCode) {
            return messages.INVALID_POSTAL_CODE_AND_ZIP_CODE;
        }
        if (invalidPostalCode) {
            return messages.INVALID_POSTAL_CODE;
        }
        if (invalidCode) {
            return messages.INVALID_ZIP_CODE;
        }
        return null;
    }
}
