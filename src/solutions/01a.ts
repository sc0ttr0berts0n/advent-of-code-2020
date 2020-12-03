import InputParser from '../utils/input-parser';

const parser = new InputParser('01');
const numbers = parser.toArray().map((str) => parseInt(str));

let a: number, b: number;
let breakFlag = false;
const target = 2020;
label: for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        a = numbers[i];
        b = numbers[j];

        if (a + b === target) {
            console.log(a * b);
            break label;
        }
    }
}
