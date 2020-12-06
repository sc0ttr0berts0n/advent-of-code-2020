import { createLogicalNot } from 'typescript';
import InputParser from '../utils/input-parser';

const parser = new InputParser('06');
const lines = parser.toArray();
const groups = lines
    .join('??')
    .split('????')
    .map((el) => new Set(el.split('??').join('')))
    .map((el) => Array.from(el))
    .map((el) => el.length)
    .reduce((acc, el) => {
        return acc + el;
    }, 0);

console.log(groups);
