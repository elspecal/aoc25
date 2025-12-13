import { readInput } from "../utils.ts";

const path = new URL("input.txt", import.meta.url);
const db = readInput(path, "\n\n");
const ranges = db[0].split("\n");

export function partOne() {
    const ids = db[1].split("\n");

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

export function partTwo() {
    let _ranges = ranges;

    while (true) {
        let separateRanges = new Set<string>();
        let modified = false;

        for (let i = 0; i < _ranges.length; i++) {
            let [lower, upper] = _ranges[i].split("-").map(Number);

            for (let j = 0; j < _ranges.length; j++) {
                if (i == j) continue;

                let [_lower, _upper] = _ranges[j].split("-").map(Number);

                if (upper < _lower || lower > _upper) continue;
                if (_lower < lower) {
                    lower = _lower;
                    modified = true;
                }
                if (_upper > upper) {
                    upper = _upper;
                    modified = true;
                }
            }
            separateRanges.add(`${lower}-${upper}`);
        }
        if (!modified) break;

        _ranges = [...separateRanges];
    }

    return _ranges.reduce((idCnt, range) => {
        const [lower, upper] = range.split("-");
        return idCnt + parseInt(upper) - parseInt(lower) + 1;
    }, 0);
}
