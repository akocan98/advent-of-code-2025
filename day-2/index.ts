import * as fs from 'fs';

const input = fs.readFileSync('./day-2/input.txt', 'utf8');

/**
 * Day 2:
 * https://adventofcode.com/2025/day/2
 */

let part1Count = 0;

let part2Count = 0;

const explode = (str: string, n: number) => {
  // let's get https://www.php.net/explode into the standard lib
  const chunks = [];

  for (let i = 0, charsLength = str.length; i < charsLength; i += n) {
    chunks.push(str.substring(i, i + n));
  }

  return chunks;
};

for (const pair of input.trim().split(',')) {
  const split = pair.split('-');

  const from = Number(split[0]);

  const to = Number(split[1]);

  for (let i = from; i <= to; i++) {
    const length = `${i}`.length;

    // Part 1:
    const leftSide = `${i}`.substring(0, length / 2);

    const rightSide = `${i}`.substring(length / 2);

    if (leftSide === rightSide) {
      part1Count = part1Count + i;
    }

    // Part 2:
    for (let j = length; j >= 1; j--) {
      const exploded = explode(`${i}`, j);

      if (
        exploded.length > 1 &&
        exploded.every((item) => item === exploded[0])
      ) {
        part2Count = part2Count + i;
        break;
      }
    }
  }
}

console.log(`PART 1: Invalid ID count is: ${part1Count}`);

console.log(`PART 2: Invalid ID count is: ${part2Count}`);
