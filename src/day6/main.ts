import { readInput } from "../utils.ts";

const path = new URL("input.txt", import.meta.url);
const homework = readInput(path);

export function partOne() {
    const numOfRows = homework.length;
    const rows = homework.map((row) => row.trim().split(/\s+/));

    let sum = 0;

    for (let i = 0; i < rows[0].length; i++) {
        const symbol = rows.at(-1)[i];
        let columnResult = symbol == "+" ? 0 : 1;

        for (let j = 0; j < numOfRows - 1; j++) {
            const number = parseInt(rows[j][i]);
            columnResult =
                symbol == "+" ? columnResult + number : columnResult * number;
        }
        sum += columnResult;
    }

    return sum;
}
