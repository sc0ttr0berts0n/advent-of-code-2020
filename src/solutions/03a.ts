import InputParser from '../utils/input-parser';

const parser = new InputParser('03');
const strips = parser.toArray();

let impacts = 0;
let x = 0;

for (let y = 0; y < strips.length; y++) {
    let char = '🎅';

    let strip = strips[y].trim().split('');
    if (strip[x % strip.length] === '#') {
        impacts++;
        char = '💥';
    }

    // just for visualization
    strip = strip.map((char, index) => (char === '.' ? '↘️' : '🌲'));
    strip[x] = char;
    const ascii = strip.join('');
    setTimeout(() => {
        console.log(ascii);
    }, y * 250);

    x = (x + 3) % strip.length;
}

console.log(impacts);
