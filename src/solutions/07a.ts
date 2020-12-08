import InputParser from '../utils/input-parser';

interface Child {
    parent: string;
    name: string;
    count: number;
}

interface Rule {
    name: string;
    children: Child[];
    isShinyGold: boolean;
    isTerminal: boolean;
    hasShinyGoldWithin: boolean;
}

const parser = new InputParser('07');

const rawRules = parser.toArray();

const bagMap: Map<string, Rule> = new Map(
    rawRules.map((rule) => {
        // regex to find parent
        const regex = /(?<parent>\w+\s+\w+)\sbags\scontain\s(?<endFlag>no.*|(?<children>\d.*))/;

        // get tokens from regex
        const tokens = rule.match(regex);

        // id parent
        const parent = tokens.groups.parent;

        // get plain text of the children for parsing,
        // split into arr by comma or period, trim end array
        // because its only an emty string.
        const childrenStrings = tokens.groups.children
            ?.split(/[,\.]/)
            .slice(0, -1);
        const children: Child[] = childrenStrings?.map(
            (string): Child => {
                const regex = /.*(?<count>\d)\s(?<name>\w+\s\w+)/;
                const child = string.match(regex);
                return {
                    parent: parent,
                    name: child.groups.name,
                    count: parseInt(child.groups.count),
                };
            }
        );
        return [
            parent,
            {
                name: parent,
                children: children,
                isTerminal: !children,
                isShinyGold: parent === 'shiny gold',
                hasShinyGoldWithin: false,
            },
        ];
    })
);

const getCountOfBagsContainingShinyGoldBags = (count: number = 0): number => {
    let loopCount = count;
    bagMap.forEach((val) => {
        if (!val.isTerminal) {
            // only applies on first lap, finds gold
            if (count === 0) {
                const childIsShinyGold = val.children.some(
                    (el) => el.name === 'shiny gold'
                );
                if (childIsShinyGold) {
                    val.hasShinyGoldWithin = true;
                    loopCount++;
                }
            }

            // applies hereafter
            if (!val.hasShinyGoldWithin) {
                const hasShinyChild = val.children.some((el) => {
                    return bagMap.get(el.name).hasShinyGoldWithin;
                });
                if (hasShinyChild) {
                    val.hasShinyGoldWithin = true;
                    loopCount++;
                }
            }
        }
    });

    // the cool recursion part
    if (loopCount > count) {
        return getCountOfBagsContainingShinyGoldBags(loopCount);
    } else {
        return loopCount;
    }
};

console.log(getCountOfBagsContainingShinyGoldBags());
