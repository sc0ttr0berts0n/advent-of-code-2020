import { parse } from 'path';
import InputParser from '../utils/input-parser';
import WaitingArea from '../utils/waiting-area';

interface Result {
    id: number;
    bestTime: number;
    delta: number;
    answer: number;
}

const parser = new InputParser('13');
const raw = parser.toArray();
const depart = parseInt(raw[0]);
const schedule = raw[1]
    .split(',')
    .filter((el) => el !== 'x')
    .map(
        (el): Result => {
            const id = parseInt(el);
            const bestTime = Math.floor(depart / id) * id + id;
            const delta = bestTime - depart;
            const answer = delta * id;
            return { id, bestTime, delta, answer };
        }
    );

const bestDelta = Math.min(...schedule.map((el) => el.delta));

console.log(schedule.find((el) => el.delta === bestDelta).answer);

debugger;
