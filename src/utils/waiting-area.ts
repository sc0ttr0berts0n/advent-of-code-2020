interface Vec2 {
    x: number;
    y: number;
}
interface Spot {
    isSeat: boolean;
    occupied: boolean;
    x: number;
    y: number;
    id: number;
    char: string;
    nextState: Spot | null;
    isStable: boolean;
}

interface Neighbors {
    n: Spot;
    ne: Spot;
    e: Spot;
    se: Spot;
    s: Spot;
    sw: Spot;
    w: Spot;
    nw: Spot;
    [key: string]: Spot;
}

interface Directions {
    n?: boolean;
    ne?: boolean;
    e?: boolean;
    se?: boolean;
    s?: boolean;
    sw?: boolean;
    w?: boolean;
    nw?: boolean;
    [key: string]: boolean;
}

export default class WaitingArea {
    public counter = 0;
    private layout: Spot[];
    private width: number;
    private height: number;
    private FLOOR_CHAR = '.';
    private EMPTY_SEAT_CHAR = 'L';
    private OCCUPIED_SEAT_CHAR = '#';
    private previousOccupiedSeats = NaN;

    constructor(raw: string[]) {
        this.processInput(raw);
    }

    private processInput(raw: string[]) {
        this.width = raw[0].length;
        this.height = raw.length;
        this.layout = raw
            .join('')
            .split('')
            .map(
                (el, index): Spot => {
                    return {
                        isSeat: el === this.EMPTY_SEAT_CHAR,
                        occupied: false,
                        x: index % this.width,
                        y: Math.floor(index / this.width),
                        id: index,
                        char: el,
                        nextState: null,
                        isStable: el === this.FLOOR_CHAR,
                    };
                }
            );
    }

    private getNeighbors(spot: Spot, ringDist = 1): Neighbors {
        const neighbors = {
            n: this.getSpot(spot.x, spot.y - ringDist),
            ne: this.getSpot(spot.x + ringDist, spot.y - ringDist),
            e: this.getSpot(spot.x + ringDist, spot.y),
            se: this.getSpot(spot.x + ringDist, spot.y + ringDist),
            s: this.getSpot(spot.x, spot.y + ringDist),
            sw: this.getSpot(spot.x - ringDist, spot.y + ringDist),
            w: this.getSpot(spot.x - ringDist, spot.y),
            nw: this.getSpot(spot.x - ringDist, spot.y - ringDist),
        };

        return neighbors;
    }

    private countNeighbors(spot: Spot) {
        return Object.values(this.getNeighbors(spot)).filter(
            (neighbor) => neighbor?.occupied
        ).length;
    }

    private countAdjacentNeighbors(spot: Spot) {
        // alias for countNeighbors()
        return this.countNeighbors(spot);
    }

    private countNeighborsToWall(spot: Spot) {
        const directions: Directions = {};
        let ringDist = 1;
        let neighbors = this.getNeighbors(spot);
        while (Object.values(neighbors).some((el) => el)) {
            for (let dir in neighbors) {
                if (!directions[dir] && neighbors[dir]?.occupied) {
                    directions[dir] = true;
                }
            }
            if (Object.keys(directions).length === 8) {
                break;
            }
            ringDist++;
            neighbors = this.getNeighbors(spot, ringDist);
        }
        return Object.values(directions).filter((el) => el).length;
    }

    private getSpot(x: number, y: number) {
        // out of range checks
        if (
            x + 1 * y + 1 > this.layout.length ||
            x * y < 0 ||
            x < 0 ||
            x > this.width - 1 ||
            y < 0 ||
            y > this.height - 1
        ) {
            return null;
        }
        return this.layout[x + y * this.width];
    }

    public visualize() {
        console.clear();
        const arr = [...this.layout];
        while (arr.length) {
            const line = arr
                .splice(0, this.width)
                .reduce((acc, el) => `${acc}${el.char}`, '');
            console.log(line);
        }
    }

    public tick(toleratedNeighbors = 4, countToWall = false) {
        this.previousOccupiedSeats = this.occupiedSeats;
        this.determineState(toleratedNeighbors, countToWall);
        this.applyState();
        this.counter++;
    }

    private determineState(
        toleratedNeighbors: number,
        countToWall: boolean = false
    ) {
        this.layout.forEach((spot) => {
            if (spot.char !== this.FLOOR_CHAR) {
                const neighborCount = countToWall
                    ? this.countNeighborsToWall(spot)
                    : this.countAdjacentNeighbors(spot);
                spot.nextState = { ...spot };
                if (spot.occupied) {
                    spot.nextState.occupied =
                        neighborCount < toleratedNeighbors;
                } else {
                    spot.nextState.occupied = neighborCount === 0;
                }
            }
        });
    }

    private determineStateToWalls(toleratedNeighbors: number) {
        this.layout.forEach((spot) => {
            if (spot.char !== this.FLOOR_CHAR) {
                const neighborCount = this.countNeighbors(spot);
                spot.nextState = { ...spot };
                if (spot.occupied) {
                    spot.nextState.occupied =
                        neighborCount < toleratedNeighbors;
                } else {
                    spot.nextState.occupied = neighborCount === 0;
                }
            }
        });
    }

    private applyState() {
        this.layout.forEach((spot) => {
            const isStable = spot.occupied === spot.nextState?.occupied;
            Object.assign(spot, spot.nextState);
            spot.isStable = isStable;
            spot.nextState = null;
            if (spot.isSeat) {
                spot.char = spot.occupied
                    ? this.OCCUPIED_SEAT_CHAR
                    : this.EMPTY_SEAT_CHAR;
            }
        });
    }

    public get isStable() {
        return this.previousOccupiedSeats === this.occupiedSeats;
    }

    public get occupiedSeats() {
        return this.layout.filter((spot) => spot.occupied).length;
    }
}
