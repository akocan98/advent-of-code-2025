import * as fs from 'fs';

const input = fs.readFileSync(`./day-8/input.txt`, `utf8`);

/**
 * Day 8:
 * https://adventofcode.com/2025/day/8
 */

type Box = {
  x: number;
  y: number;
  z: number;
};

const getDistanceBetween = (box1: Box, box2: Box) => {
  return Math.sqrt(
    Math.pow(box2.x - box1.x, 2) +
      Math.pow(box2.y - box1.y, 2) +
      Math.pow(box2.z - box1.z, 2)
  );
};

const boxes: Box[] = [];

for (const line of input.trim().split(`\n`)) {
  const [x, y, z] = line.split(`,`).map(Number);
  boxes.push({ x, y, z });
}

const distancesCache: Record<string, number> = {};

for (const [i, box1] of boxes.entries()) {
  for (const [j, box2] of boxes.entries()) {
    if (i === j) {
      continue;
    }

    const key1 = `${box1.x},${box1.y},${box1.z}-${box2.x},${box2.y},${box2.z}`;
    const key2 = `${box2.x},${box2.y},${box2.z}-${box1.x},${box1.y},${box1.z}`;

    if (key1 in distancesCache || key2 in distancesCache) {
      continue;
    }

    distancesCache[key1] = getDistanceBetween(box1, box2);
  }
}

const sortedDistances = Object.entries(distancesCache).sort(
  (a, b) => a[1] - b[1]
);

let circuits: Set<string>[] = [];

const connectCircuits = ({
  take,
  keepGoingTillSingleCircuit
}: {
  take?: number;
  keepGoingTillSingleCircuit?: boolean;
}) => {
  for (const [key] of sortedDistances) {
    const [key1, key2] = key.split(`-`);

    if (take-- <= 0 && !keepGoingTillSingleCircuit) {
      break;
    }

    const box1CircuitId = circuits.findIndex((circuit) => {
      return circuit.has(key1);
    });

    const box2CircuitId = circuits.findIndex((box) => {
      return box.has(key2);
    });

    if (box1CircuitId === -1 && box2CircuitId === -1) {
      circuits.push(new Set([key1, key2]));
    }

    if (box1CircuitId !== -1 && box2CircuitId === -1) {
      circuits[box1CircuitId].add(key2);
    } else if (box1CircuitId === -1 && box2CircuitId !== -1) {
      circuits[box2CircuitId].add(key1);
    }

    if (
      box1CircuitId !== -1 &&
      box2CircuitId !== -1 &&
      box1CircuitId !== box2CircuitId
    ) {
      circuits[box1CircuitId] = new Set([
        ...circuits[box1CircuitId],
        ...circuits[box2CircuitId]
      ]);

      circuits = circuits.filter((_, index) => {
        return index !== box2CircuitId;
      });
    }

    if (keepGoingTillSingleCircuit) {
      if (circuits[0].size === boxes.length) {
        const x1 = key1.split(`,`).map(Number)[0];
        const x2 = key2.split(`,`).map(Number)[0];

        console.log(`PART 2: ${x1 * x2}`);

        break;
      }
    }
  }

  circuits = circuits.sort((a, b) => b.size - a.size);
};

connectCircuits({ take: 1000 });

console.log(
  `PART 1: ${circuits[0].size * circuits[1].size * circuits[2].size}`
);

// lets just keep connecting lol :D
connectCircuits({ keepGoingTillSingleCircuit: true });
