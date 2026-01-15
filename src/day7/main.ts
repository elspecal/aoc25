import { readInput } from "../utils.ts";

const path = new URL("input.txt", import.meta.url);
const manifold = readInput(path);

const COLUMN = manifold[0].indexOf("S");

export function partOne() {
    let splits = 0;
    const beams = Array<boolean>(manifold[0].length).fill(false);
    beams[COLUMN] = true;

    for (let row = 1; row < manifold.length; row++) {
        for (let col = 0; col < manifold[0].length; col++) {
            if (manifold[row][col] == "^" && beams[col]) {
                beams[col - 1] = true;
                beams[col + 1] = true;
                beams[col] = false;

                splits++;
            }
        }
    }

    return splits;
}

export function partTwo() {
    let timelines = 1;
    const beams = Array<number>(manifold[0].length).fill(0);
    beams[COLUMN] = 1;

    for (let row = 1; row < manifold.length; row++) {
        for (let col = 0; col < manifold[0].length; col++) {
            if (manifold[row][col] == "^") {
                const encounters = beams[col];

                beams[col - 1] += encounters;
                beams[col + 1] += encounters;
                beams[col] = 0;

                timelines += encounters;
            }
        }
    }

    return timelines;
}
