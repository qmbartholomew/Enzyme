import _ from 'lodash'

let deepHash1 = {
    'string': 'Hello',
    'bool': true,
    'num': 4,
    'array': [1,2,3,4],
    'hash': {a:1,b:2},
    'anotherString': "I'm the difference!"
}
let deepHash2 = {
    'string': 'Hello',
    'bool': true,
    'num': 4,
    'array': [1,2,3,4],
    'hash': {a:1,b:2}
}
let shallowHash1 = {
    'string': 'Hello World!',
    'bool': false,
    'number': 12
}
let shallowHash2 = {
    'string': 'Hello World!',
    'bool': false,
    'number': 12
}

const hashIsEqualShallow = (hash1, hash2) => {
    let keys1 = Object.keys(hash1)
    let keys2 = Object.keys(hash2)
    let diff = []
    if (keys1.length !== keys2.length) {
        if (keys1.length > keys2.length) {
            for (let [key, value] of Object.entries(hash1)) {
                if (hash1[key] !== hash2[key]) {
                    diff.push(`{${key}: ${value}}`)
                }
            }
            console.log(`False, the following key/value pair(s) are missing from the second hash:`) 
        }
        return diff
    } 
    if (keys1.length === keys2.length) {
        for (let [key, value] of Object.entries(hash1)) {
            if(hash1[key] !== hash2[key]) {
                diff.push(`{${key}: ${value}}`)
            }
        }
        if (diff.length === 0) {
            return true
        } else {
            console.log(`False, the following key/value pair(s) in the first hash differ from the second:`) 
        }
    }
    return diff
}
// Lodash comparison works on multi-level nested objects/hashes/arrays regardless of the order of properties.
const hashIsEqualLodash = (hash1, hash2) => {

    let diff1 = _.reduce(hash1, function(result, value, key) {
        return _.isEqual(value, hash2[key]) ?
            result :  result.concat(`{${key}: ${JSON.stringify(value)}}`);
    }, [])
    let diff2 = _.reduce(hash2, function(result, value, key) {
        return _.isEqual(value, hash1[key]) ?
            result :  result.concat(`{${key}: ${JSON.stringify(value)}}`);
    }, [])

    if (diff1.length !== 0 && diff2.length === 0) {
        console.log('The following key/value pairs are missing or differ from the two hashes:')
        return `Hash1: ${diff1}`
    } if (diff1.length === 0 && diff2.length !== 0) {
        console.log('The following key/value pairs are missing or differ from the two hashes:')
        return `Hash2: ${diff2}`
    } if (diff1.length !== 0 && diff2.length !== 0) {
        console.log('The following key/value pairs are missing or differ from the two hashes:')
        return `Hash1: ${diff1}\nHash2: ${diff2}`
    } else {
        return true
    }
}

const isObject = (obj) => {
    return obj != null && typeof obj === 'object'
}
// This function works for first-level nested objects/hashes/arrays, however would not work for further deep comparison unless all properties of further nested objects/hashes/arrays were in the same order.
const hashisEqualDeep = (hash1, hash2) => {
    let keys1 = Object.keys(hash1)
    let keys2 = Object.keys(hash2)
    const length1 = keys1.length
    const length2 = keys2.length
    let diff1 = []
    let diff2 = []

    if (length1 === length2) {
        for (let key of keys1) {
            let val1 = hash1[key]
            let val2 = hash2[key]
            let objectCheck = isObject(val1) && isObject(val2)
            if ( objectCheck && !deepEqual(val1, val2) || !objectCheck && val1 !== val2) {
                diff1.push(`{${key}: ${JSON.stringify(val1)}}`)
            }
        }
        for (let key of keys2) {
            let val1 = hash1[key]
            let val2 = hash2[key]
            let objectCheck = isObject(val1) && isObject(val2)
            if ( objectCheck && !deepEqual(val1, val2) || !objectCheck && val1 !== val2) {
                diff2.push(`{${key}: ${JSON.stringify(val2)}}`)
            }
        }
    } else if (keys1.length !== keys2.length) {
            for (let [key, value] of Object.entries(hash1)) {
                if (JSON.stringify(hash1[key]) !== JSON.stringify(hash2[key])) {
                    diff1.push(`{${key}: ${JSON.stringify(value)}}`)
                }
            }
            for (let [key, value] of Object.entries(hash2)) {
                if (JSON.stringify(hash2[key]) !== JSON.stringify(hash1[key])) {
                    diff2.push(`{${key}: ${JSON.stringify(value)}}`)
                }
            }
    }
    if (diff1.length === 0 && diff2.length === 0) {
        return true
    } else {
        console.log('The following key/value pairs are missing or differ from the two hashes:')
        if (diff1.length !== 0 && diff2.length === 0) {
            return `Hash1: ${diff1}`
        } if (diff1.length === 0 && diff2.length !== 0) {
            return `Hash2: ${diff2}`
        }
        return `Hash1: ${diff1}\nHash2: ${diff2}`
    }
}

const hashComparison = (hash1, hash2, depth) => {
    switch (depth) {
        case 'shallow':
            console.log(hashIsEqualShallow(hash1, hash2))
            break;
        case 'deep':
            console.log(hashisEqualDeep(hash1, hash2))
            break;
        case 'lodash':
            console.log(hashIsEqualLodash(hash1, hash2))
            break;
        default:
            console.log(hashIsEqualLodash(hash1, hash2))
    }
}
hashComparison(deepHash1, deepHash2, 'deep')
hashComparison(deepHash1, deepHash2, 'lodash')
hashComparison(shallowHash1, shallowHash2, 'shallow')