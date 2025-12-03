import { readInput } from "../utils.ts";

export function part1() {
    const filePath = new URL("input.txt", import.meta.url);
    const idRanges = readInput(filePath, ",");

    let sum = 0;

    idRanges.forEach((range) => {
        const [firstId, lastId] = range.split("-");

        for (let id = parseInt(firstId); id <= parseInt(lastId); id++) {
            if (isIdInvalid(id)) {
                sum += id;
            }
        }
    });

    return sum;
}

function isIdInvalid(id: number) {
    const idStr = id.toString(10);
    const len = idStr.length;

    if (len % 2) return false;

    const firstHalf = idStr.slice(0, len / 2);
    const secondHalf = idStr.slice(len / 2);

    return firstHalf == secondHalf;
}
