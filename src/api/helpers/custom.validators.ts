import _ from 'lodash';
import niv from 'node-input-validator';
import { isStringWithArrayIntegers, valueToArrayIntegers } from '../helpers/helper';
/**
 * Validates that the field is a
 * number or a collection of numbers
 * example: 1 | [1, 2, 3]
 */

niv.extend('numberOrArrayNumber', ({ attr, value }: any, validator: any) => {
    if (isStringWithArrayIntegers(value)) {
        return true;
    }
    const numberValue = _.toNumber(value);
    if (_.isInteger(numberValue) && !_.isNaN(numberValue)) {
        return true;
    }
    return false;
});

/**
 * Validates that the field is collection of numbers
 * example: [0, 1, 2, 3]
 */
niv.extend('arrayOfIntegers', ({ attr, value }: any, validator: any) => {
    if (_.isArray(value)) {
        if (value.length > 0) {
            let allInteger = true;
            _.forEach(value, (v) => {
                const vNumber = _.toNumber(v);
                if (!_.isInteger(vNumber)) {
                    allInteger = false;
                }
            });
            return allInteger;
        }
    }
    return false;
});

/**
 * Validates that the field is collection of numbers
 * example: []
 */
niv.extend('arrayEmptyOfIntegers', ({ attr, value }: any, validator: any) => {
    if (_.isArray(value)) {
        if (value.length > 0) {
            let allInteger = true;
            _.forEach(value, (v) => {
                const vNumber = _.toNumber(v);
                if (!_.isInteger(vNumber)) {
                    allInteger = false;
                }
            });
            return allInteger;
        }
        return true;
    }
    return false;
});

/**
 * Validates that the field is number greather than zero
 * example: value > 0
 */
niv.extend('greaterThanZero', ({ attr, value }: any, validator: any) => {
    if (_.isNumber(value)) {
        return value > 0;
    }
    return false;
});

/**
 * Validate that the field is hour and minute format
 * example: 07:00
 */
niv.extend('hourMinute', ({ attr, value }: any, validator: any) => {
    const regExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g;
    const valueTest = String(value);
    const result = regExp.exec(valueTest);
    if (result == null) {
        return false;
    }
    return true;
});

niv.extend('enumInteger', ({ attr, value, args }: any, validator: any) => {
    if (_.isArray(args)) {
        const argsValues = valueToArrayIntegers(args);
        return argsValues.includes(parseInt(value));
    }
    return false;
});

export const RequestValidator = niv;
