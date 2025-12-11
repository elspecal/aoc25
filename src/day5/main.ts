import { readInput } from "../utils.ts";

const path = new URL("input.txt", import.meta.url);
const db = readInput(path, "\n\n");
const ranges = db[0].split("\n");
const ids = db[1].split("\n");

export function partOne() {
    return ids.reduce((sum, id) => {
        const _id = parseInt(id);
        return ranges.some((range) => {
            const [lower, upper] = range.split("-").map(Number);
            return _id >= lower && _id <= upper;
        })
            ? sum + 1
            : sum;
    }, 0);
}
