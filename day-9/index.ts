import * as fs from 'fs';

const input = fs.readFileSync(`./day-9/input.txt`, `utf8`);

/**
 * Day 9:
 * https://adventofcode.com/2025/day/9
 */

const tiles = input.split(`\n`).map((line) => line.split(`,`).map(Number));

const areas: Record<string, number> = {};

const getRectangleArea = (tile: number[], innerTile: number[]) => {
  const width = Math.abs(tile[0] - innerTile[0]);
  const height = Math.abs(tile[1] - innerTile[1]);

  return (height + 1) * (width + 1);
};

for (const tile of tiles) {
  for (const innerTile of tiles) {
    const key1 = `${tile.join(`,`)}-${innerTile.join(`,`)}`;
    const key2 = `${innerTile.join(`,`)}-${tile.join(`,`)}`;

    if (key1 === key2 || areas[key1] || areas[key2]) {
      continue;
    }

    areas[`${tile.join(`,`)}-${innerTile.join(`,`)}`] = getRectangleArea(
      tile,
      innerTile
    );
  }
}

const maxAreas: { area: number; key: string }[] = Object.entries(areas)
  .map(([key, area]) => ({
    area,
    key
  }))
  .sort((a, b) => b.area - a.area);

function getRect(corner1: number[], corner2: number[]) {
  let left = corner1[0];
  let right = corner2[0];
  let top = corner1[1];
  let bottom = corner2[1];

  if (right < left) {
    left = corner2[0];
    right = corner1[0];
  }

  if (bottom < top) {
    top = corner2[1];
    bottom = corner1[1];
  }

  return { left, right, top, bottom };
}

// https://kishimotostudios.com/articles/aabb_collision/ 🤷‍♂️🤷‍♂️i dont know why, but it works 😁
function checkAABBCollision(corner1: number[], corner2: number[]) {
  const rect = getRect(corner1, corner2);

  for (const [i, tile] of tiles.entries()) {
    const rect1 = getRect(tile, tiles[i + 1] || tiles[0]);

    if (
      rect.left < rect1.right &&
      rect.right > rect1.left &&
      rect.top < rect1.bottom &&
      rect.bottom > rect1.top
    ) {
      return false;
    }
  }

  for (let i = 0; i < tiles.length; i++) {
    let n = i + 1;

    if (n >= tiles.length) {
      n = 0;
    }
  }

  return true;
}

let maxRestrictedArea = -1;

for (const { area, key } of maxAreas) {
  const [point1Str, point2Str] = key.split(`-`);

  const point1 = point1Str.split(`,`).map(Number);
  const point2 = point2Str.split(`,`).map(Number);

  let allPointsInside = true;

  allPointsInside = checkAABBCollision(point1, point2);

  if (allPointsInside) {
    maxRestrictedArea = area;
    break;
  }
}

console.log(`PART 1: Biggest area`, maxAreas[0].area);
console.log(`PART 2: Biggest restricted`, maxRestrictedArea);
