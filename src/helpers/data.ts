/**
 * Compare objects in array and return order for sort function
 * Usage: [{}].sort(compare(item, order))}
 *
 * @param {string} item ordering item name
 * @param {string} order desc/asc
 *
 * @returns {void} return {number} compare result for sort function [-1,0,1]
 */
export const compare = (item: string, order: string) => {

    return (a: any, b: any) => {
        if (!a.hasOwnProperty(item) || !b.hasOwnProperty(item)) {
            return 0;
        }

        const varA = typeof a[item] === 'string'
            ? a[item].toLowerCase()
            : a[item] instanceof Date
                ? new Date(a[item])
                : a[item];

        const varB = typeof b[item] === 'string'
            ? b[item].toLowerCase()
            : b[item] instanceof Date
                ? new Date(b[item])
                : b[item];

        let result = 0;

        if (varA < varB) {
            result = -1;
        }
        if (varA > varB) {
            result = 1;
        }

        return order === 'DESC' ? result * -1 : result;
    };
};

/**
 * Push or remove val from array regarding to if already exists there
 *
 * @param arr {array}
 * @param val {any}
 *
 * @returns arr {array} modified input array
 */
export const toggleArrVal = <T>(arr: Array<T>, val: T): Array<T> => {

    const result: Array<T> = !!arr.length ? [...arr] : [];

    result.includes(val)
        ? result.splice(result.indexOf(val), 1)
        : result.push(val);

    return result;
};

/**
 * Add val to array regarding to if already exists there
 *
 * @param arr {array}
 * @param val {string|number}
 *
 * @returns arr {array} modified input array
 */
export const addArrVal = (arr: Array<string|number>, val: string|number) => {

    if (!arr.includes(val)) {
        arr.push(val);
    }

    return arr;
};

/**
 * Remove val from array regarding to if already exists there
 *
 * @param arr {array}
 * @param val {string|number}
 *
 * @returns arr {array} modified input array
 */
export const deleteArrVal = (arr: Array<string|number>, val: string|number) => {

    if (arr.includes(val)) {
        arr.splice(arr.indexOf(val), 1);
    }

    return arr;
};

/**
 * Safe switch values in array
 *
 * @param arr {array}
 * @param values {del: string|number, add: string|number}
 *
 * @returns arr {array} modified input array
 */
export const switchArrVals = (arr: Array<any>, values: {del: any, add: any}) => {

    if (!!arr.length && !!values.del && !!values.add) {
        arr = deleteArrVal(arr, values.del);
        arr = addArrVal(arr, values.add);
    }

    return arr;
};

/**
 * Create array of number's sequence from start to end
 *
 * @param rangePar[0] {number} start
 * @param rangePar[1] {number} end
 *
 * @returns {array}
 */
export const rangeArr = (rangePar: Array<number>) => {

    return rangePar[1] > rangePar[0]
        ? Array.from({length: (rangePar[1] - rangePar[0] + 1)}, (v, k) => k + rangePar[0])
        : [];
};

/**
 * Create new object from data object of concrete keys from list
 *
 * @param list {string} list of searching keys
 * @param data {[key: string]: any} data source object
 *
 * @returns {[key: string]: any}
 */
export const getObjectFromList = (list: Array<string>, data: {[key: string]: any}) => {

    const newObj: any = {};

    const objKeys = Object.keys(data);
    list.map((key: string) => {
        if (objKeys.includes(key)) {
            newObj[key] = data[key];
        }
    });

    return newObj;
};

/**
 * Get difference object of two same structured objects
 *
 * @param obj {any} current object state
 * @param nObj {any} new object state
 *
 * @returns {obj}
 */
export const getObjDiff = (obj: any, nObj: any) => {

    const result: any = {};

    for (const key in obj) {
        if (!areFuncs(obj[key], nObj[key])) {

            const areArr = areArrays(obj[key], nObj[key]);
            const areObj = areObjects(obj[key], nObj[key]);
            const arrDiff = areArr && areDiffArrays(obj[key], nObj[key]);
            const objDiff = areObj && areDiffObjects(obj[key], nObj[key]);
            const otherDiff = !areArr && !areObj && JSON.stringify(obj[key]) !== JSON.stringify(nObj[key]);

            if (arrDiff || objDiff || otherDiff) {
                let diff = {};
                if (areArr) {
                    diff = getArrayDiff(obj[key], nObj[key], diff);
                }
                if (areObj) {
                    diff = getObjectDiff(obj[key], nObj[key], diff);
                }
                result[key] = {old: obj[key], new: nObj[key], diff};
            }
        }
    }

    return result;
};

export const areArrays = (inpA: any, inpB: any) => inpA instanceof Array && inpB instanceof Array;

export const areDiffArrays = (inpA: any, inpB: any) => {

    let result: boolean = false;

    if (inpA.length !== inpB.length) {
        result = true;
    }
    else {
        result = !!Object.keys(getArrayDiff(inpA, inpB, {})).length;
    }

    return result;
};

export const getArrayDiff = (arrA: Array<any>, arrB: Array<any>, diff: any = {}) => {
    arrA.map((itemA: any, i: number) => {
        if (JSON.stringify(itemA) !== JSON.stringify(arrB[i])) {
            diff[i] = {old: itemA, new: arrB[i]};
        }
    });

    return diff;
};

export const areObjects = (inpA: any, inpB: any) => (
    (inpA !== null && typeof inpA === 'object') && (inpB !== null && typeof inpB === 'object')
);

export const areDiffObjects = (inpA: any, inpB: any) => JSON.stringify(inpA) !== JSON.stringify(inpB);

export const getObjectDiff = (objA: any, objB: any, diff: any = {}) => {
    Object.keys(objA).map((key: string) => {
        if (JSON.stringify(objA[key]) !== JSON.stringify(objB[key])) {
            diff[key] = {old: objA[key], new: objB[key]};
        }
    });

    return diff;
};

export const areFuncs = (inpA: any, inpB: any) => typeof inpA === 'function' && typeof inpB === 'function';

/**
 * Get difference of two objects by iterating through them
 *
 * @param obj {any} current object state
 * @param newObj {any} new object state
 *
 * @returns {obj} change
 */
export const getObjChange = (obj: any, newObj: any) => {

    const change: any = {};

    const objKeys = Object.keys(obj);
    const newObjKeys = Object.keys(newObj);

    const unionKeys = new Set([...objKeys, ...newObjKeys]);
    for (const deepKey of Array.from(unionKeys)) {
        if (!obj[deepKey]) {
            change[`added_${deepKey}`] = newObj[deepKey];
        }
        if (!newObj[deepKey]) {
            change[`removed_${deepKey}`] = obj[deepKey];
        }
        if (obj[deepKey] && newObj[deepKey]
        && JSON.stringify(obj[deepKey]) !== JSON.stringify(newObj[deepKey])) {
            change[`changed_${deepKey}`] = newObj[deepKey];
        }
    }

    return change;
};

/**
 * Modify input data object keys to first letter in upper case
 *
 * @param list {string} list of searching keys
 * @param data {[key: string]: any} data source object
 *
 * @returns {[key: string]: any}
 */
export const objectUpperCaseKeys = (list: Array<string>, data: {[key: string]: any}) => {

    const objKeys = Object.keys(data);
    list.map((key: string) => {
        if (objKeys.includes(key)) {
            const newKey = key.charAt(0).toUpperCase() + key.slice(1);
            data[newKey] = data[key];
            delete data[key];
        }
    });

    return data;
};

/**
 * Swap keys and values in JSON key value pair object
 *
 * @param obj {[key: number | string]: value}
 *
 * @returns newObj swapped object
 */
export const swapObject = (obj: any) => {

    const newObj: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[obj[key]] = key;
        }
    }

    return newObj;
};

export const uniqueArr = (arr: Array<any>, checkName: string) => (
    arr.filter((item, index, self) => (
        self.findIndex((searchItem) => searchItem[checkName] === item[checkName]) === index
    ))
);

export const isBool = (checkMe: any): boolean => typeof checkMe === 'boolean';

export const isNum = (checkMe: any): boolean => typeof checkMe === 'number';

export const isString = (checkMe: any): boolean => typeof checkMe === 'string';

export const isDataString = (checkMe: any): boolean => isString(checkMe) && !!checkMe;

export const exist = (checkMe: any): boolean => typeof checkMe !== 'undefined';

export const isObj = (checkMe: any): boolean => checkMe !== null && typeof checkMe === 'object';

export const isDataObj = (checkMe: any): boolean => isObj(checkMe) && !!Object.keys(checkMe).length;

export const isArr = (checkMe: any): boolean => checkMe instanceof Array;

export const isDataArr = (checkMe: any): boolean => isArr(checkMe) && !!checkMe.length;

export const isObjOrArr = (checkMe: any): boolean => isObj(checkMe) || isArr(checkMe);
