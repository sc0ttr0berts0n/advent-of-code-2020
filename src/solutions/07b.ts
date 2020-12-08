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

const countBagsInSpecificBag = (starter: string) => {
    // after dumping a bags contents, put it in the bag pile
    const bagPile = [];

    // empty parents bags into this pile
    const unprocessed = [starter];

    // while you havent processed all the bags
    while (unprocessed.length) {
        // grab the next bag
        const bag = bagMap.get(unprocessed.shift());
        {
            // if the bag isnt a dead end, dump
            // the children into unprocessed
            if (!bag.isTerminal) {
                bag.children.forEach((child) => {
                    for (let i = 0; i < child.count; i++) {
                        unprocessed.push(child.name);
                    }
                });
            }

            // push the emptied bag into the bag pile
            bagPile.push(bag.name);
        }
    }

    // return the bag pile without any starter bags in it
    return bagPile.filter((el) => el !== starter).length;
};

console.log(countBagsInSpecificBag('shiny gold'));
