import { readFileSync, type PathOrFileDescriptor } from "fs";

export function readInput(path: PathOrFileDescriptor) {
    const rawInput = readFileSync(path, { encoding: "utf8" }).trim();

    return rawInput.split("\n");
}
