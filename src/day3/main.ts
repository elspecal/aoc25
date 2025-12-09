import { readInput } from "../utils.ts";

export function partOne() {
    const path = new URL("input.txt", import.meta.url);
    const banks = readInput(path);

    const totalJoltage = banks.reduce((sum, bank) => {
        let idx1 = 0;
        for (let i = 0; i < bank.length - 1 && bank[idx1] != "9"; i++) {
            if (bank[i] > bank[idx1]) {
                idx1 = i;
            }
        }

        let second = "";
        for (let i = idx1 + 1; i < bank.length; i++) {
            if (bank[i] > second) {
                second = bank[i];
            }
        }

        return sum + parseInt(bank[idx1] + second);
    }, 0);

    return totalJoltage;
}
