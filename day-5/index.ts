import * as fs from 'fs';

const input = fs.readFileSync(`./day-5/input.txt`, `utf8`);

/**
 * Day 5:
 * https://adventofcode.com/2025/day/5
 */

const ranges = [];

const availableIngredients = [];

const availableFreshIngredients = new Set<number>();

for (const line of input.trim().split(`\n`)) {
  if (line.includes(`-`)) {
    const [from, to] = line.split(`-`).map(Number);

    ranges.push([from, to]);
  } else if (line.length) {
    availableIngredients.push(Number(line));
  }
}

// Part 1:
for (const ingredient of availableIngredients) {
  for (const [from, to] of ranges) {
    if (ingredient >= from && ingredient <= to) {
      availableFreshIngredients.add(ingredient);
    }
  }
}

// Part 2:
const mergedRanges = [];

const sortRanges = (ranges: number[][]) => {
  return ranges.sort((a, b) => a[0] - b[0]);
};

for (const range of sortRanges(ranges)) {
  let foundOverlap = false;

  for (const [i, mergedRange] of mergedRanges.entries()) {
    if (mergedRange[0] <= range[0] && mergedRange[1] >= range[0]) {
      const newFrom = Math.min(...mergedRange, ...range);

      const newTo = Math.max(...mergedRange, ...range);

      mergedRanges[i] = [newFrom, newTo];

      foundOverlap = true;

      break;
    }
  }

  if (!foundOverlap) {
    mergedRanges.push(range);
  }
}

let totalFreshIngredientsCount = 0;

for (const mergedRange of sortRanges(mergedRanges)) {
  totalFreshIngredientsCount =
    totalFreshIngredientsCount + (mergedRange[1] - mergedRange[0]) + 1;
}

console.log(
  `PART 1: Available fresh ingredients: ${availableFreshIngredients.size}`
);

console.log(`PART 2: Total fresh ingredients: ${totalFreshIngredientsCount}`);
