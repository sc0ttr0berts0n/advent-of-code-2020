import InputParser from '../utils/input-parser';

const parser = new InputParser('03');
const field = parser.toArray();

const sendToboganGetHits = (
    field: string[],
    xSlope: number,
    ySlope: number
) => {
    // tracker for impacts
    let impacts = 0;
    let x = 0;
    let y = 0;

    while (y < field.length) {
        // get the strip as an array
        const strip = field[y].split('');

        // count the impacts by finding hashes
        impacts += strip[x % strip.length] === '#' ? 1 : 0;

        // move for the next loop
        x += xSlope;
        y += ySlope;
    }

    return impacts;
};

const tests = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
];

const result = tests.reduce((acc, el) => {
    return acc * sendToboganGetHits(field, el.x, el.y);
}, 1);

console.log(result);
