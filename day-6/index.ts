import * as fs from 'fs';

const input = fs.readFileSync(`./day-6/input.txt`, `utf8`);

/**
 * Day 6:
 * https://adventofcode.com/2025/day/6
 */

const inputSplit = input.split(`\n`);

const problems: {
  items: number[];
  itemsPadded: string[];
  sign: string | undefined;
  cephalopodItems?: number[];
}[] = [];

// 🤫🤫
for (let i = 0; i < inputSplit[0].length; i++) {
  if (!inputSplit.every((line) => line[i] === ` `)) {
    for (let j = 0; j < inputSplit.length; j++) {
      if (inputSplit[j][i] === ` `) {
        inputSplit[j] =
          inputSplit[j].substring(0, i) + `_` + inputSplit[j].substring(i + 1);
      }
    }
  }
}

for (const line of input.split(`\n`)) {
  const items = line.split(` `);

  const isLineWithSigns = items[0] === `*` || items[0] === `+`;

  let index = 0;

  for (const item of items) {
    if (!item.length) {
      continue;
    }

    if (!problems[index]) {
      problems[index] = {
        items: [],
        itemsPadded: [],
        sign: undefined
      };
    }

    if (!isLineWithSigns) {
      const itemAsNumber = Number(item.replaceAll(`_`, ``));

      if (!isNaN(itemAsNumber)) {
        problems[index].items.push(itemAsNumber);
      }

      problems[index].itemsPadded.push(item);
    } else {
      problems[index].sign = item;
    }

    index++;
  }
}

// Part 1:
let grandTotal = 0;

for (const problem of problems) {
  const total = problem.items.reduce(
    (acc, curr) => (problem.sign === `+` ? acc + curr : acc * curr),
    problem.sign === `+` ? 0 : 1
  );

  grandTotal = grandTotal + total;
}

// Part 2:
let celaphodGrandTotal = 0;

for (const problem of problems) {
  const cephalopodItems = [];

  for (const item of problem.itemsPadded) {
    for (let i = 0; i < item.length; i++) {
      cephalopodItems[i] =
        `${cephalopodItems[i] || ``}${item[item.length - (1 + i)]}`;
    }
  }

  problem.cephalopodItems = cephalopodItems.map((item) =>
    Number(item.replaceAll(`_`, ``))
  );
}

for (const problem of problems) {
  const total = problem.cephalopodItems.reduce(
    (acc, curr) => (problem.sign === `+` ? acc + curr : acc * curr),
    problem.sign === `+` ? 0 : 1
  );

  celaphodGrandTotal = celaphodGrandTotal + total;
}

console.log(`PART 1: Grand total is ${grandTotal}`);

console.log(`PART 1: Grand total is ${celaphodGrandTotal}`);
