import { readInput } from "../utils.ts";

export function part1() {
    return sumInvalidIds(isIdInvalid);
}

export function part2() {
    const filePath = new URL("input.txt", import.meta.url);
    const idRanges = readInput(filePath, ",");

    let sum = 0;

    idRanges.forEach((range) => {
        const [firstId, lastId] = range.split("-");
        const invalids = collectInvalids(firstId, lastId);

        invalids.forEach((invalid) => (sum += invalid));
    });

    return sum;
}

function sumInvalidIds(invalidator: (id: string) => boolean) {
    const filePath = new URL("input.txt", import.meta.url);
    const idRanges = readInput(filePath, ",");

    const checkedIds = new Map<number, boolean>();
    let sum = 0;

    idRanges.forEach((range) => {
        const [firstId, lastId] = range.split("-");

        for (let id = parseInt(firstId); id <= parseInt(lastId); id++) {
            if (!checkedIds.has(id)) {
                if (invalidator(id.toString(10))) {
                    sum += id;
                    checkedIds.set(id, true);
                } else {
                    checkedIds.set(id, false);
                }
            } else if (checkedIds.get(id)) {
                sum += id;
            }
        }
    });

    return sum;
}

function isIdInvalid(id: string) {
    const len = id.length;

    if (len % 2) return false;

    const firstHalf = id.slice(0, len / 2);
    const secondHalf = id.slice(len / 2);

    return firstHalf == secondHalf;
}

function collectInvalids(lowerLimit: string, upperLimit: string) {
    const initialLength = lowerLimit.length > 1 ? lowerLimit.length : 2;
    const invalids = new Set<number>();

    for (let len = initialLength; len <= upperLimit.length; len++) {
        for (
            let divisor = 1;
            divisor <= Math.floor(upperLimit.length / 2);
            divisor++
        ) {
            if (len % divisor) continue;

            const min = Math.pow(10, len - 1);
            const max = Math.pow(10, len) - 1;

            let initialSample = "";
            let sampleUpperLimit = "";

            if (min > parseInt(lowerLimit)) {
                initialSample = getBaseInts(min, divisor);
            } else if (
                parseInt(
                    getBaseInts(lowerLimit, divisor).repeat(len / divisor),
                ) >= parseInt(lowerLimit)
            ) {
                initialSample = getBaseInts(lowerLimit, divisor);
            } else {
                initialSample = getBaseInts(lowerLimit, divisor, 1);
            }

            if (max < parseInt(upperLimit)) {
                sampleUpperLimit = getBaseInts(max, divisor);
            } else if (
                parseInt(
                    getBaseInts(upperLimit, divisor).repeat(len / divisor),
                ) <= parseInt(upperLimit)
            ) {
                sampleUpperLimit = getBaseInts(upperLimit, divisor);
            } else {
                sampleUpperLimit = getBaseInts(upperLimit, divisor, -1);
            }

            for (
                let sample = parseInt(initialSample);
                sample <= parseInt(sampleUpperLimit);
                sample++
            ) {
                invalids.add(
                    parseInt(sample.toString(10).repeat(len / divisor)),
                );
            }
        }
    }

    return invalids;
}

function getBaseInts(id: string | number, length: number, modifier?: -1 | 1) {
    const _id = typeof id == "number" ? id.toString(10) : id;
    const base = _id.slice(0, length);

    return typeof modifier == "undefined"
        ? base
        : (parseInt(base) + modifier).toString(10);
}
