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
            if (id == 822) {
                debugger;
            }
            return { raw, row, column, id };
        }
    );
}

const seats = processRawSeats(rawSeats);

const highestSeat = seats.reduce((acc, seat) => {
    return Math.max(acc, seat.id);
}, 0);

console.log(highestSeat);

debugger;
