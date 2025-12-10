import { readInput } from "../utils.ts";

const input = new URL("input.txt", import.meta.url);
const grid = readInput(input);

export function partOne() {
    return grid.reduce(
        (gridSum, row, rowIdx, _grid) =>
            gridSum +
            row.split("").reduce((rowSum, cell, colIdx) => {
                if (cell != "@") return rowSum;

                const adjacents = [
                    [rowIdx - 1, colIdx - 1],
                    [rowIdx - 1, colIdx],
                    [rowIdx - 1, colIdx + 1],
                    [rowIdx, colIdx - 1],
                    [rowIdx, colIdx + 1],
                    [rowIdx + 1, colIdx - 1],
                    [rowIdx + 1, colIdx],
                    [rowIdx + 1, colIdx + 1],
                ];

                let cnt = 0;

                for (let i = 0; i < 8 && cnt < 4; i++) {
                    const [r, c] = adjacents[i];
                    if (_grid[r]?.[c] == "@") {
                        cnt++;
                    }
                }

                return cnt < 4 ? rowSum + 1 : rowSum;
            }, 0),
        0,
    );
}
