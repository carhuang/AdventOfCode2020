const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split('\n').map(Number)
}

/**
 * Find 2 numbers that add up to 2020
 * @param report: array of int
 */
function fixExpenseReport(report) {
    const cache = new Map()

    for (const entry of report) {
        const diff = 2020 - entry
        if (cache.has(diff)) return new Array(diff, entry)
        cache.set(entry, 0)
    }

    return null
}

const input = readInput()
const targetPair = fixExpenseReport(input)
const answer = targetPair[0] * targetPair[1]
console.log(answer)