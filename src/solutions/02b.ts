import InputParser from '../utils/input-parser';

const parser = new InputParser('02');
const entries = parser.toArray();

// 10-11 w: ldslpwbbqwpwtd

const getValidEntries = (arr: string[]) => {
    return arr.filter((el) => {
        // pattern to match
        const regex = /(\d+)-(\d+)\s([a-z]):\s([a-z]+)/;
        const tokens = el.match(regex);

        // the character
        const char = tokens[3];

        // the password as an array
        const password = tokens[4].split('');

        // min and max char count
        const checkA = password[parseInt(tokens[1]) - 1];
        const checkB = password[parseInt(tokens[2]) - 1];

        // check for matches
        const matchA = checkA === char;
        const matchB = checkB === char;

        // test if its within bounds
        return (matchA || matchB) && matchA !== matchB;
    });
};

const validEntries = getValidEntries(entries);
console.log(validEntries.length);
