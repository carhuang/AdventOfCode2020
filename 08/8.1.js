const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
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
runCode(boot_code)
console.log("accumulator is: ", accumulator)