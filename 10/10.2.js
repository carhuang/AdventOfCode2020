const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split('\n').map(Number)
}

const memo = {}
function countArrangements(jolt, index) {
    if (index >= adaptors.length) return 0

    const diff = adaptors[index] - jolt
    if (adaptors[index] === max_jolt && diff <= 3) {
        memo[adaptors[index]] = 1
        return memo[adaptors[index]]
    }
    if (diff <= 3) {
        if (memo.hasOwnProperty(adaptors[index])) return memo[adaptors[index]]
        memo[adaptors[index]] = countArrangements(adaptors[index], index+1) + countArrangements(adaptors[index], index+2) + countArrangements(adaptors[index], index+3)
        return memo[adaptors[index]]
    } 
    return 0
}

function getTotalArrangements() {
    return countArrangements(0, 0) + countArrangements(0, 1) + countArrangements(0, 2)
}

const adaptors = readInput().sort((a, b) => a - b)
const max_jolt = adaptors[adaptors.length - 1]
const answer = getTotalArrangements()
console.log("Total number of distinct ways to arrange the adapters: ", answer)