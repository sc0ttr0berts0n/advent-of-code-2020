import InputParser from '../utils/input-parser';

const parser = new InputParser('05');
const rawSeats = parser.toArray();
// const rawSeats = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

interface Seat {
    raw: string;
    row: number;
    column: number;
    id: number;
}

// convert raw seat strings into Seat Object
function processRawSeats(raw: string[]) {
    return raw.map(
        (line): Seat => {
            // const lineArr = line.split('');
            const raw = line;
            const row = parseInt(
                line.slice(0, 7).split('B').join('1').split('F').join('0'),
                2
            );
            const column = parseInt(
                line.slice(-3).split('L').join('0').split('R').join('1'),
                2
            );
            const id = row * 8 + column;
            return { raw, row, column, id };
        }
    );
}

const seats = processRawSeats(rawSeats);

// determines if a seat exists
const seatLookup = (id: number) => seats.some((seat) => seat.id === id);

// finds the index of the lowest seat id
const firstSeat = () => {
    for (let i = 0; i < seats.length; i++) {
        if (seatLookup(i)) {
            return i;
        }
    }
};

// finds the index of the highest seat id
const lastSeat = () => {
    for (let i = seats.length - 1; i >= 0; i--) {
        if (seatLookup(i)) {
            return i;
        }
    }
};

// finds the first empty seat in a given range
const findMissingSeatInRange = (low: number, high: number) => {
    for (let i = low; i <= high; i++) {
        if (!seatLookup(i)) {
            return i;
        }
    }
};

const missingSeat = findMissingSeatInRange(firstSeat(), lastSeat());

console.log(missingSeat);

debugger;
