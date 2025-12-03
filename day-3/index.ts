import * as fs from 'fs';

const input = fs.readFileSync('./day-3/input.txt', 'utf8');

/**
 * Day 3:
 * https://adventofcode.com/2025/day/3
 */

let joltageCountPart1 = 0;

let joltageCountPart2 = 0;

for (const line of input.trim().split('\n')) {
  // Part 1:
  let first = 0;
  let second = 0;

  for (const [index, char] of line.split('').entries()) {
    const value = Number(char);

    if (index !== line.length - 1 && value > first) {
      first = value;
      second = 0;
    } else if (value > second) {
      second = value;
    }
  }

  joltageCountPart1 = joltageCountPart1 + Number(`${first}${second}`);

  // Part 2:
  let maxJoltageLine = '';

  let from = 0;

  for (let i = from; i < 12; i++) {
    const leadingNumberInAvailableSubstring = line
      .slice(from, line.length - (11 - i))
      .split('')
      .map(Number)
      .reduce((acc, curr) => (curr > acc ? curr : acc), 0);

    from = line.indexOf(String(leadingNumberInAvailableSubstring), from) + 1;

    maxJoltageLine = `${maxJoltageLine}${leadingNumberInAvailableSubstring}`;
  }

  joltageCountPart2 = joltageCountPart2 + Number(maxJoltageLine);
}

console.log(`PART 1: The total joltage is ${joltageCountPart1}`);

console.log(`PART 2: The total joltage is ${joltageCountPart2}`);
