import InputParser from '../utils/input-parser';

const parser = new InputParser('04');
const data = parser.toArray();

const getPassportMap = (arr: string[]) => {
    let oneLiners = [arr.shift()];

    while (arr.length) {
        const current = arr.shift();
        if (current === '' && arr.length) {
            oneLiners.unshift(arr.shift());
        } else {
            oneLiners[0] = `${oneLiners[0]} ${current}`;
        }
    }

    const passports = oneLiners.map((line) => {
        const directives = line.split(' ');
        const pairs = directives.map((el) => el.split(':'));
        const map = new Map();
        pairs.forEach((pair) => {
            map.set(pair[0], pair[1]);
        });
        return map;
    });

    return passports;
};

const counter = getPassportMap(data).filter((passport) => {
    if (passport.size === 8) {
        return true;
    } else if (passport.size === 7 && !passport.has('cid')) {
        return true;
    }
    return false;
}).length;

console.log(counter);
debugger;
