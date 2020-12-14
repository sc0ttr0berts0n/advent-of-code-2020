import InputParser from '../utils/input-parser';
import WaitingArea from '../utils/waiting-area';

const parser = new InputParser('11');
const raw = parser.toArray();
const waitingArea = new WaitingArea(raw);

while (!waitingArea.isStable && waitingArea.counter < 100) {
    waitingArea.visualize();
    const counter = waitingArea.counter;
    const occupiedSeats = waitingArea.occupiedSeats;
    console.log({ counter });
    console.log({ occupiedSeats });
    waitingArea.tick();
}
debugger;
