const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split('\n').map(Number)
}

function connectAdaptors() {
    let diff1 = 0, diff2 = 0, diff3 = 0
    let index = 0
    let jolt = 0

    while (index < adaptors.length) {
        const diff = adaptors[index] - jolt
        switch(diff) {
            case 1:
                diff1++
                break
            case 2:
                diff2++
                break
            case 3:
                diff3++
                break
            default:
                break
        }
        jolt = adaptors[index]
        index++ 
    }
    diff3++  // built-in adaptor
    return diff1 * diff3
}

const adaptors = readInput().sort((a, b) => a - b)
const answer = connectAdaptors()
console.log("Number of 1-jolt differences multiplied by the number of 3-jolt differences: ", answer)