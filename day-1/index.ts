import * as fs from 'fs';

const input = fs.readFileSync(`./day-1/input.txt`, `utf8`);

/**
 * Day 1:
 * https://adventofcode.com/2025/day/1
 */

let dial = 50;

let part1Count = 0;

let part2Count = 0;

for (const line of input.trim().split(`\n`)) {
  const direction = line.charAt(0);

  const value = Number(line.slice(1));

  const turnBy = value % 100;

  const fullRotations = Math.floor(value / 100);

  part2Count = part2Count + fullRotations;

  const prevDial = dial;

  if (direction === `L`) {
    dial = dial - turnBy;
  }

  if (direction === `R`) {
    dial = dial + turnBy;
  }

  if (dial < 0) {
    dial = dial + 100;

    if (prevDial !== 0) {
      part2Count++;
    }
  } else if (dial >= 100) {
    dial = dial - 100;

    if (prevDial !== 0) {
      part2Count++;
    }
  } else if (dial === 0) {
    part2Count++;
  }

  if (dial === 0) {
    part1Count++;
  }
}

console.log(`PART 1: Password is: ${part1Count} (dial ended at ${dial})`);

console.log(`PART 2: Password is: ${part2Count} (dial ended at ${dial})`);
