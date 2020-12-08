import InputParser from '../utils/input-parser';
import Gameboy from '../utils/gameboy';

const parser = new InputParser('08');
const lines = parser.toArray();
const gameboy = new Gameboy(lines);

gameboy.run();
console.log(gameboy.accumulator);

debugger;
