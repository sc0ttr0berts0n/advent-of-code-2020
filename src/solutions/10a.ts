import InputParser from '../utils/input-parser';

const parser = new InputParser('10-sample-a');
const nums = parser.toArray().map((el) => parseInt(el, 10));

interface Result {
    [key: number]: number;
}

const diffs = nums
    .sort((a, b) => a - b)
    .map((num, i, arr) => arr[i + 1] - num)
    .slice(0, -1)
    .reduce(
        (acc: Result, num) => {
            acc[num]++;
            return acc;
        },
        { 1: 1, 3: 1 }
    );
console.log(diffs);
console.log(diffs[1] * diffs[3]);

const TOTAL = Math.max(...nums) + 3;
const combos = [];
for (let threes = 0; threes < TOTAL + 1; threes++) {
    let remainder_threes = TOTAL - 3 * threes;
    for (let ones = 0; ones < remainder_threes + 1; ones++) {
        if (3 * threes + 1 * ones == TOTAL) {
            combos.push({ d: threes, n: ones });
            break;
        }
        if (10 * threes + 5 * ones > TOTAL) {
            break;
        }
    }
}

console.log(combos);

debugger;
