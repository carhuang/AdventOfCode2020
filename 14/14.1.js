const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

/**
 * Returns the decimal value after applying the mask
 * @param  val number in base 10
 * @param  mask 36-bits mask in string made up of 1, 0, or X
 */
function getMaskedResult(val, mask) {
    val = val.toString(2)
    let masked_val = ''
    for (let i = 0; i < 36 - val.length; i++) {
        if (mask.charAt(i) == '1') {
            masked_val += '1'
        } else {
            masked_val += '0'
        }
    }
    for (i = 0; i < val.length; i++) {
        const m = mask.charAt(i + 36 - val.length)
        if (m == 'X') {
            masked_val += val.charAt(i)
        } else {
            masked_val += m
        }
    }
    return parseInt(masked_val, 2)
}

function run(program) {
    const memory = {}
    let mask = null

    for (let instruction of program) {
        instruction = instruction.split(" = ")
        let subject = instruction[0] 
        let val = instruction[1]
        if (subject == 'mask') {
            mask = val
        } else {
            subject = subject.match(/mem\[(\d+)\]/)
            const index = parseInt(subject[1], 10)
            val = getMaskedResult(parseInt(val, 10), mask)
            memory[index] = val
        }
    }
    return memory
}

function sum(memory) {
    let sum = 0
    for (const slot in memory) {
        sum += memory[slot]
    }
    return sum
}

const input = readInput()
const memory = run(input)
const answer = sum(memory)
console.log(answer)