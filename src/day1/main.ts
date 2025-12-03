import { readInput } from "../utils.ts";

type SolveFn = (
    rotation: string,
    cutoff: number,
    dial: number,
    count: number,
) => readonly [number, number];

export function part1() {
    return run((rotation, cutoff, dial, count) => {
        const length = parseInt(rotation.slice(1)) % cutoff;
        const point = rotation[0] == "R" ? dial + length : dial - length;

        dial = (cutoff + point) % cutoff;

        if (dial == 0) count++;

        return [dial, count];
    });
}

export function part2() {
    return run((rotation, cutoff, dial, count) => {
        const length = parseInt(rotation.slice(1));
        const remainder = length % cutoff;
        const point = rotation[0] == "R" ? dial + remainder : dial - remainder;
        const prev = dial;

        dial = (cutoff + point) % cutoff;
        count += Math.floor(length / 100);

        if (dial == 0 || (prev != 0 && point != dial)) count++;

        return [dial, count];
    });
}

function run(solve: SolveFn) {
    try {
        const filePath = new URL("input.txt", import.meta.url);
        const inputArr = readInput(filePath);

        const CUTOFF = 100;
        const INITIAL_DIAL = 50;
        const INITIAL_COUNT = 0;

        const [_, cnt] = inputArr.reduce(
            ([dial, count], rotation) => solve(rotation, CUTOFF, dial, count),
            [INITIAL_DIAL, INITIAL_COUNT] as const,
        );

        return cnt;
    } catch (e) {
        console.error(e);
    }
}
