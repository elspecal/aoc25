import { readInput } from "../utils.ts";

const path = new URL("input.txt", import.meta.url);
const manifold = readInput(path);

export function partOne() {
    const column = manifold[0].indexOf("S");
    const row = findRowOfSplit(1, column);
    const splits = new Set([`${row}-${column}`] as const);
    const keys = splits.keys();
    let next = keys.next();

    while (!next.done) {
        const [y, x] = next.value.split("-").map(Number);
        const left = findRowOfSplit(y + 1, x - 1);
        const right = findRowOfSplit(y + 1, x + 1);

        if (left > y) {
            splits.add(`${left}-${x - 1}`);
        }
        if (right > y) {
            splits.add(`${right}-${x + 1}`);
        }
        next = keys.next();
    }

    return splits.size;
}

function findRowOfSplit(y: number, x: number) {
    return manifold.slice(y).findIndex((r) => r[x] == "^") + y;
}
