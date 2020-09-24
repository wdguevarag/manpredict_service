import _ from 'lodash';

export const isStringWithArrayIntegers = (value: string): boolean => {
    if (value.length >= 3) {
        if (_.startsWith(value, '[') && _.endsWith(value, ']')) {
            let numbersString: string[] = _.split(value.slice(1, -1), ',');
            if (numbersString.length > 0) {
                let isAllNumber = true;
                _.forEach(numbersString, (n) => {
                    const number = _.toNumber(n);
                    if (!_.isInteger(number) || _.isNaN(numbersString)) {
                        isAllNumber = false;
                    }
                });
                if (isAllNumber) {
                    return true;
                }
            }
        }
    }
    return false;
}

export const stringToArrayIntegers = (value: string): number[] => {
    if (_.startsWith(value, '[') && _.endsWith(value, ']')) {
        let numbersString: string[] = _.split(value.slice(1, -1), ',');
        if (numbersString.length > 0) {
            return _.map(numbersString, (n) => {
                return parseInt(n);
            });
        }
    } else {
        return [parseInt(value)];
    }
    return [];
}

export const valueToArrayIntegers = (value: any): number[] => {
    return _.map(value, (v) => _.toInteger(v));
};
