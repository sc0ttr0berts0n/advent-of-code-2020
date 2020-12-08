interface Instruction {
    op: string;
    arg: number;
    hasRun: boolean;
    line: number;
}

export default class Gameboy {
    private program: string[];
    private instructions: Instruction[];
    private pointer = 0;
    public accumulator = 0;
    private halted = true;
    private haltReason = 'No Instructions Executed';
    public exitCode: boolean | number = false;
    public logLevel = 1;
    constructor(program: string[]) {
        this.program = program;
        this.instructions = this.compileInstructions();
    }

    private compileInstructions(): Instruction[] {
        return this.program.map((line, index) => {
            const tokens = line.split(' ');
            return {
                op: tokens[0],
                arg: parseInt(tokens[1]),
                hasRun: false,
                line: index,
            };
        });
    }

    public run() {
        this.halted = false;
        this.pointer = 0;
        this.accumulator = 0;
        while (!this.halted) {
            // check for null pointer
            if (this.pointer >= this.instructions.length) {
                this.halt(0, 'Refeneced NULL Pointer');
                break;
            }
            // grab the current instruction using the pointer
            const currentInstruction = this.instructions[this.pointer];

            // break if the inst has already run
            if (currentInstruction.hasRun) {
                this.halt(1, 'Instruction Repeated');
                break;
            }

            // run the instruction
            this.exec(currentInstruction);
        }
    }

    private exec(inst: Instruction) {
        inst.hasRun = true;
        if (inst.op === 'acc') {
            this.acc(inst.arg);
        } else if (inst.op === 'jmp') {
            this.jmp(inst.arg);
        } else if (inst.op === 'nop') {
            this.nop(inst.arg);
        } else {
            this.halted = true;
            this.log('Unknown Operation', inst.line);
        }
        this.log(`Accumulator: ${this.accumulator}`);
    }

    public halt(exitCode: number = 0, reason: string | boolean = false) {
        this.exitCode = exitCode;
        this.halted = true;
        this.log(`Exec Halted: ${reason ?? this.haltReason}`, this.pointer);
    }

    private acc(num: number) {
        this.accumulator += num;
        this.log(`ACC: ${num}`, this.pointer);
        // increment the pointer
        this.pointer++;
    }

    private jmp(num: number) {
        this.pointer += num;
        this.log(`JMP: ${num}, Jumping to ${this.pointer}`, this.pointer - num);
    }

    private nop(num: number) {
        num;
        this.log(`NOP: ${num}`, this.pointer);
        // increment the pointer
        this.pointer++;
    }

    public log(message: string, line?: number) {
        if (this.logLevel >= 1) {
            if (line) {
                console.log(`Gameboy: ${message} on line ${line}`);
            } else {
                console.log(`Gameboy: ${message}`);
            }
        }
    }

    public recompile() {
        this.instructions = this.compileInstructions();
    }

    public toggleJMPandNOP(line: number) {
        const inst = this.instructions[line];
        if (inst.op === 'nop') {
            inst.op = 'jmp';
        } else if (inst.op === 'jmp') {
            inst.op = 'nop';
        } else {
            this.log('Line is neither JMP or NOP');
            return false;
        }
        return true;
    }

    public getOp(line: number) {
        return this.instructions[line].op;
    }

    get instructionCount() {
        return this.instructions.length;
    }
}
