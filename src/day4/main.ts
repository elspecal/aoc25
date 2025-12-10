import { readInput } from "../utils.ts";

const input = new URL("input.txt", import.meta.url);
const grid = readInput(input);

export function partOne() {
    return grid.reduce(
        (gridSum, row, rowIdx, _grid) =>
            gridSum +
            row.split("").reduce((rowSum, cell, colIdx) => {
                if (cell != "@") return rowSum;

                return isRollAccessible(_grid, rowIdx, colIdx)
                    ? rowSum + 1
                    : rowSum;
            }, 0),
        0,
    );
}

export function partTwo() {
    let modifiedGrid = grid.map((r) => r.split(""));
    let removed = 0;

    while (true) {
        const previouselyRemoved = removed;

        modifiedGrid = modifiedGrid.map((row, rowIdx, _grid) =>
            row.map((cell, colIdx) => {
                if (cell != "@") return cell;
                if (!isRollAccessible(_grid, rowIdx, colIdx)) return "@";

                removed++;

                return ".";
            }),
        );
        if (previouselyRemoved == removed) break;
    }

    return removed;
}

function isRollAccessible(
    grid: string[] | string[][],
    rIdx: number,
    cIdx: number,
) {
    const adjacents = [
        [rIdx - 1, cIdx - 1],
        [rIdx - 1, cIdx],
        [rIdx - 1, cIdx + 1],
        [rIdx, cIdx - 1],
        [rIdx, cIdx + 1],
        [rIdx + 1, cIdx - 1],
        [rIdx + 1, cIdx],
        [rIdx + 1, cIdx + 1],
    ];

    for (let i = 0, cnt = 0; i < 8; i++) {
        const [r, c] = adjacents[i];
        if (grid[r]?.[c] == "@") cnt++;
        if (cnt == 4) return false;
    }

    return true;
}
