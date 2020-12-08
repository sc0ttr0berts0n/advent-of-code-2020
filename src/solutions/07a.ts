import InputParser from '../utils/input-parser';

interface Child {
    parent: string;
    name: string;
    count: number;
}

interface Rule {
    children: Child[];
    isShinyGold: boolean;
    isTerminal: boolean;
    hasShinyGoldWithin: boolean;
}

const parser = new InputParser('07');

const rawRules = parser.toArray();

const ruleMap: Map<string, Rule> = new Map(
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
                children: children,
                isTerminal: !children,
                isShinyGold: parent === 'shiny gold',
                hasShinyGoldWithin: false,
            },
        ];
    })
);

let change = true;

do {
    let i = 0;
    change = false;
    ruleMap.forEach((shinyRule, shinyColor) => {
        if (!shinyRule.hasShinyGoldWithin) {
            ruleMap.forEach((rule, color) => {
                
            });
        }
    });
} while (change);

console.log(
    [...ruleMap.entries()].filter((el) => el[1].hasShinyGoldWithin).length
);
