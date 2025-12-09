import { readInput } from "../utils.ts";

const path = new URL("input.txt", import.meta.url);
const banks = readInput(path);

export function partOne() {
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

export function partTwo() {
    const len = banks[0].length;
    const numOfBatteries = 12;

    const totalJoltage = banks.reduce((sum, bank) => {
        let throwAwayCounter = len - numOfBatteries;
        let selectedBatteries = "";

        for (let i = 0; i <= len - throwAwayCounter; i++) {
            const chunk = bank.slice(i, i + throwAwayCounter + 1);
            let idxOfMax = 0;

            for (let j = 0; j < chunk.length; j++) {
                if (chunk[j] > chunk[idxOfMax]) {
                    idxOfMax = j;
                }
            }

            throwAwayCounter -= idxOfMax;

            if (throwAwayCounter == 0) {
                selectedBatteries += bank.slice(idxOfMax + i);
                break;
            }

            selectedBatteries += chunk[idxOfMax];
            i += idxOfMax;
        }

        if (throwAwayCounter) {
            selectedBatteries = selectedBatteries.slice(0, numOfBatteries);
        }

        return sum + parseInt(selectedBatteries);
    }, 0);

    return totalJoltage;
}
