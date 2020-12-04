import InputParser from '../utils/input-parser';

type PassportEntry = Record<string, string>;

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

const validatePassport = (ppt: Map<string, string>) => {
    if (ppt.size < 7) return false;
    if (ppt.has('cid') && ppt.size < 8) return false;

    const byr = parseInt(ppt.get('byr'));
    const iyr = parseInt(ppt.get('iyr'));
    const eyr = parseInt(ppt.get('eyr'));
    const hgt = ppt.get('hgt');
    const hgtNum = parseInt(hgt?.match(/(\d*)/)?.[1]);
    const hgtUnit = hgt?.match(/(cm|in)/)?.[1];
    const hcl = ppt.get('hcl');
    const ecl = ppt.get('ecl');
    const pid = ppt.get('pid');

    const validByr = byr >= 1920 && byr <= 2002;
    const validIyr = iyr >= 2010 && iyr <= 2020;
    const validEyr = eyr >= 2020 && eyr <= 2030;
    const validHgtUnit = hgtUnit === 'cm' || hgtUnit === 'in';
    const validHgt =
        hgtUnit === 'cm'
            ? hgtNum >= 150 && hgtNum <= 193
            : hgtNum >= 59 && hgtNum <= 76;
    const validHcl = RegExp(/^#[0-9a-f]{6}$/).test(hcl);
    const validEcl = RegExp(/amb|blu|brn|gry|grn|hzl|oth/).test(ecl);
    const validPid = RegExp(/^\d{9}$/).test(pid);

    const Zflags =
        validByr &&
        validIyr &&
        validEyr &&
        validHgt &&
        validHgtUnit &&
        validHcl &&
        validEcl &&
        validPid;

    // if (Zflags) debugger;

    return Zflags;
};

const counter = getPassportMap(data).filter(validatePassport).length;

console.log(counter);
