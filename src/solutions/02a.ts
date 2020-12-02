import { isVariableDeclarationList } from 'typescript';
import InputParser from '../utils/input-parser';

const parser = new InputParser('02');
const entries = parser.toArray();

// 10-11 w: ldslpwbbqwpwtd

const countValidEntries = (arr: string[]) => {
    return arr.filter((el) => {
        // pattern to match
        const regex = /(\d+)-(\d+)\s([a-z]):\s([a-z]+)/;
        const tokens = el.match(regex);

        // min and max char count
        const min = parseInt(tokens[1]);
        const max = parseInt(tokens[2]);

        // the character
        const char = tokens[3];

        // the password as an array
        const password = tokens[4].split('');

        // the char count of the key char in the password
        const charCount = password.filter((letter) => letter === char).length;

        // test if its within bounds
        return charCount >= min && charCount <= max;
    });
};

console.log(countValidEntries(entries).length);
