import InputParser from '../utils/input-parser';

const parser = new InputParser('01');
const numbers = parser.toArray().map((str) => parseInt(str));

const target = 2020;

const findSumInArray = (arr: number[], targetSum: number, count: number) => {
    for (let i = 0; i < arr.length ** count; i++) {
        // get three values from the list
        const values = [...new Array(count)].map((value, index) => {
            const len = arr.length;
            const pow = index + 1;
            const targetIndex = Math.floor(((i / len ** pow) * len) % len);
            return arr[targetIndex];
        });

        // if duplicates, skip
        if (new Set(values).size !== values.length) continue;

        // get the value total
        const valueSum = values.reduce((a, b) => a + b, 0);

        if (valueSum === targetSum) {
            // if the target sum is found, return the product of its values
            return values.reduce((a, b) => a * b, 1);
        }
    }
};

// run the function
console.log(findSumInArray(numbers, target, 3));
