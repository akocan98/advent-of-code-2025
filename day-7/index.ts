import * as fs from 'fs';

const input = fs.readFileSync(`./day-7/input.txt`, `utf8`);

/**
 * Day 7:
 * https://adventofcode.com/2025/day/7
 */

const inputLines = input.split(`\n`);

inputLines[0] = inputLines[0].replace(`S`, `|`);

// Part 1:
let beamSplitCount = 0;

const replaceAt = (str: string, at: number, replacement: string) =>
  str.substring(0, at) + replacement + str.substring(at + replacement.length);

for (const [i, line] of inputLines.entries()) {
  for (let j = 0; j < line.length; j++) {
    const currentCharacter = line[j];
    const characterAboveCurrentCharacter = inputLines[i - 1]?.[j];

    const nextCharacter = line[j + 1];
    const characterAboveNextCharacter = inputLines[i - 1]?.[j + 1];

    if (nextCharacter === `^` && characterAboveNextCharacter === `|`) {
      beamSplitCount++;

      inputLines[i] = replaceAt(inputLines[i], j, `|`);
      inputLines[i] = replaceAt(inputLines[i], j + 2, `|`);
    }

    if (currentCharacter === `.` && characterAboveCurrentCharacter === `|`) {
      inputLines[i] =
        inputLines[i].slice(0, j) + `|` + inputLines[i].slice(j + 1);
    }
  }
}

// Part 2:
const startingPoint = { i: 0, j: inputLines[0].indexOf(`|`) };

const beamFallsCache = {};

const beamFall = (from: { i: number; j: number }) => {
  const characterBelow = inputLines[from.i + 1]?.[from.j];

  if (beamFallsCache[`${from.i},${from.j}`]) {
    return beamFallsCache[`${from.i},${from.j}`];
  }

  if (characterBelow === `^`) {
    beamFallsCache[`${from.i},${from.j - 1}`] = beamFall({
      i: from.i + 1,
      j: from.j - 1
    });

    beamFallsCache[`${from.i},${from.j + 1}`] = beamFall({
      i: from.i + 1,
      j: from.j + 1
    });

    return (
      beamFallsCache[`${from.i},${from.j - 1}`] +
      beamFallsCache[`${from.i},${from.j + 1}`]
    );
  } else if (characterBelow === `.` || characterBelow === `|`) {
    beamFallsCache[`${from.i},${from.j}`] = beamFall({
      i: from.i + 1,
      j: from.j
    });

    return beamFallsCache[`${from.i},${from.j}`];
  }

  beamFallsCache[`${from.i},${from.j}`] = 1;

  return beamFallsCache[`${from.i},${from.j}`];
};

const beamFallsCount = beamFall(startingPoint);

console.log(`PART 1: Beam split count: ${beamSplitCount}`);

console.log(`PART 2: Path count ${beamFallsCount}`);
