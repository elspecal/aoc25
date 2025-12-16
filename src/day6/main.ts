import { readInput } from "../utils.ts";

const path = new URL("input.txt", import.meta.url);
const homework = readInput(path);

const NUM_OF_ROWS = homework.length;

export function partOne() {
    const rows = homework.map((row) => row.trim().split(/\s+/));
    const rowLength = rows[0].length;
    let sum = 0;

    for (let i = 0; i < rowLength; i++) {
        const operator = rows[NUM_OF_ROWS - 1][i];
        let result = operator == "+" ? 0 : 1;

        for (let j = 0; j < NUM_OF_ROWS - 1; j++) {
            if (operator == "+") result += parseInt(rows[j][i]);
            if (operator == "*") result *= parseInt(rows[j][i]);
        }
        sum += result;
    }

    return sum;
}

export function partTwo() {
    const rowsOfDigits = homework.slice(0, -1).map((row) => row.split(""));
    const rowLength = rowsOfDigits[0].length;
    const operators = homework.at(-1).trim().split(/\s+/) as ("+" | "*")[];

    const initValue = { "+": 0, "*": 1 };
    let operator = operators.pop();
    let result = initValue[operator];
    let sum = 0;

    for (let i = rowLength - 1; i >= 0; i--) {
        let operandStr = "";

        for (let j = 0; j < NUM_OF_ROWS - 1; j++) {
            operandStr += rowsOfDigits[j][i];
        }

        const operand = parseInt(operandStr);

        if (isNaN(operand)) {
            sum += result;
            operator = operators.pop();
            result = initValue[operator];
            continue;
        }

        if (operator == "+") result += operand;
        if (operator == "*") result *= operand;
    }

    return sum + result;
}
