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

console.log({ answer });
