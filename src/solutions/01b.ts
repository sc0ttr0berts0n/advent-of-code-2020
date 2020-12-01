import InputParser from '../utils/input-parser';

const parser = new InputParser('01');
const numbers = parser.toArray().map((str) => parseInt(str));

let a: number, b: number, c: number;
const target = 2020;

sum2020: for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        for (let k = 0; k < numbers.length; k++) {
            a = numbers[i];
            b = numbers[j];
            c = numbers[k];

            if (a + b + c === target) {
                console.log(a * b * c);
                break sum2020;
            }
        }
    }
}
