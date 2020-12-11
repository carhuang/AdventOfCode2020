const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function makeCodeCopy(index, new_op) {
    const copy = []
    for (let i = 0; i < boot_code.length; i++) {
        if (i === index) {
            const arg = boot_code[i].split(" ")[1]
            copy[i] = new_op + " " + arg
        } else {
            copy[i] = boot_code[i]
        }
    }
    return copy
}

function searchForCorrectCode() {
    for (let i = 0; i < boot_code.length; i++) {
        const op = boot_code[i].split(" ")[0]
        if (op == 'jmp') {
            let copy = makeCodeCopy(i, 'nop')
            if (terminatesCorrectly(copy)) return copy
        }
        if (op == 'nop') {
            copy = makeCodeCopy(i, 'jmp')
            if (terminatesCorrectly(copy)) return copy
        }
    }
    return null
}

function terminatesCorrectly(code) {
    const lastPC = runCode(code)
    return lastPC === code.length
}

function runCode(code) {
    let PC = 0
    accumulator = 0
    const executed = new Set()

    while (PC < code.length) {
        if (executed.has(PC)) return PC

        const instruction = code[PC].split(" ")
        const op = instruction[0]
        const arg = Number(instruction[1])
        executed.add(PC)
        switch(op) {
            case 'acc':
                accumulator += arg
                PC++
                break
            case 'jmp':
                PC += arg
                break
            case 'nop':
                PC++
                break
        }
    }
    return PC
}

const boot_code = readInput()
let accumulator = 0
const correct_code = searchForCorrectCode()
runCode(correct_code)
console.log("accumulator is: ", accumulator)