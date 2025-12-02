import { readInput } from "../utils.ts";

try {
    const filePath = new URL("input.txt", import.meta.url);
    const inputArr = readInput(filePath);

    const CUTOFF = 100;

    let dial = 50;
    let cnt = 0;

    inputArr.forEach((rotation) => {
        const length = parseInt(rotation.slice(1)) % CUTOFF;
        const point = rotation[0] == "R" ? dial + length : dial - length;

        dial = (CUTOFF + point) % CUTOFF;

        if (dial == 0) cnt++;
    });

    console.log(cnt);
} catch (e) {
    console.error(e);
}
