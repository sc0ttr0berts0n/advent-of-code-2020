import InputParser from '../utils/input-parser';
import WaitingArea from '../utils/waiting-area';

const parser = new InputParser('11-sample');
const raw = parser.toArray();
const waitingArea = new WaitingArea(raw);

while (!waitingArea.isStable && waitingArea.counter < 100) {
    console.clear();
    waitingArea.visualize();
    console.log(waitingArea.counter);
    debugger;
    waitingArea.tick(5, true);
}
console.log(`Counter: ${waitingArea.counter}`);
console.log(`Occupied Seats: ${waitingArea.occupiedSeats}`);
debugger;
