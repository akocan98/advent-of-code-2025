import * as fs from 'fs';

const input = fs.readFileSync('./day-4/input.txt', 'utf8');

/**
 * Day 4:
 * https://adventofcode.com/2025/day/4
 */

const diagram = [];

for (const line of input.split('\n')) {
  diagram.push(line);
}

const findAccessibleRolls = ({ flagAsRemoved }: { flagAsRemoved: boolean }) => {
  let accessibleRollsCount = 0;

  for (let i = 0; i < diagram.length; i++) {
    const line = diagram[i];

    for (let j = 0; j < line.length; j++) {
      if (diagram[i][j] !== '@') {
        continue;
      }

      let rollCount = 0;

      // x[i][j] ... from (i-1, i, i+1) to (j-1, j, j+1)
      for (let ii = i - 1; ii <= i + 1; ii++) {
        for (let jj = j - 1; jj <= j + 1; jj++) {
          if (ii == i && jj == j) {
            continue;
          }

          if (diagram[ii]?.[jj] === '@') {
            rollCount++;
          }
        }
      }

      if (rollCount < 4) {
        accessibleRollsCount++;

        if (flagAsRemoved) {
          // mutating woops 🙈
          diagram[i] =
            diagram[i].substring(0, j) + 'x' + diagram[i].substring(j + 1);
        }
      }
    }
  }

  return accessibleRollsCount;
};

const findAllPossibleRolls = () => {
  let accessibleRollsCount = 0;

  let previousAccessibleRollsCount: number | undefined = undefined;

  do {
    previousAccessibleRollsCount = findAccessibleRolls({ flagAsRemoved: true });

    accessibleRollsCount = accessibleRollsCount + previousAccessibleRollsCount;
  } while (previousAccessibleRollsCount > 0);

  return accessibleRollsCount;
};

console.log(
  `PART 1: Total accessible rolls: ${findAccessibleRolls({ flagAsRemoved: false })}`
);

console.log(`PART 2: Total accessible rolls: ${findAllPossibleRolls()}`);
