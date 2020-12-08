import InputParser from '../utils/input-parser';
import Gameboy from '../utils/gameboy';

const parser = new InputParser('08');
const lines = parser.toArray();
const gameboy = new Gameboy(lines);

gameboy.logLevel = 0;
for (let i = 0; i < gameboy.instructionCount; i++) {
    gameboy.recompile();

    if (gameboy.getOp(i) !== 'acc') {
        gameboy.toggleJMPandNOP(i);

        gameboy.run();
        if (gameboy.exitCode === 0) {
            console.log(gameboy.accumulator);
            break;
        }
    }
}

debugger;
