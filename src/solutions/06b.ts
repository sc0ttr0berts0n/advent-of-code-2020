import { createLogicalNot, forEachChild } from 'typescript';
import InputParser from '../utils/input-parser';

const parser = new InputParser('06');
const lines = parser.toArray();
const groups = lines
    .join('??')
    .split('????')
    .map((el) => el.split('??'));

const count = groups
    .map((group) => {
        const uniques = Array.from(new Set(group.join('')));
        const consensuses = uniques.filter((char) => {
            return group.every((person) => {
                // debugger;
                const test = person.split('').includes(char);
                return test;
            });
        });
        return consensuses.length;
    })
    .reduce((acc, el) => (acc += el), 0);

console.log(count);

debugger;
