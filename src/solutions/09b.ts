import InputParser from '../utils/input-parser';
import Gameboy from '../utils/gameboy';

const parser = new InputParser('09');
const nums = parser.toArray().map((el) => parseInt(el, 10));

const preambleLength = 25;
const preamble = [...nums].splice(0, preambleLength);
const body = [...nums].slice(preambleLength);

let answer: number | boolean = false;

while (body.length || answer) {
    const _testArrForSum = (arr: number[], sum: number) => {
        return arr.some((item, i) => arr.slice(i + 1).includes(sum - item));
    };

    const target = body.shift();

    if (!_testArrForSum(preamble, target)) {
        answer = target;
        break;
    }

    preamble.shift();
    preamble.push(target);
}

let sum = 0;
let min = -Infinity;
let max = Infinity;

for (let i = 0; i < nums.length; i++) {
    const arr = [...nums].slice(i);
    for (let j = 0; j < arr.length; j++) {
        sum += arr[j];
        if (sum === answer) {
            min = Math.min(...[...arr].splice(0, j));
            max = Math.max(...[...arr].splice(0, j));
            break;
        } else if (sum > answer) {
            min = -Infinity;
            max = Infinity;
            sum = 0;
            break;
        }
    }
    if (min > -Infinity && max < Infinity) {
        break;
    } else {
        sum = 0;
    }
}

console.log({ min, max, sum: min + max });
