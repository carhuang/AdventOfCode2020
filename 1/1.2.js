const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split('\n').map(Number)
}

/**
 * Find 3 numbers that add up to 2020
 * @param report: array of int
 */
function fixExpenseReport(report) {
    for (let i = 0; i < report.length; i++) {
        const diff = 2020 - report[i]
        for (let j = i+1; j < report.length; j++) {
            const diff2 = diff - report[j]
            for (let x = j+1; x < report.length; x++) {
                if (diff2 === report[x]) return new Array(report[i], report[j], report[x])
            }
        }
    }
    return null
}

const input = readInput()
const target = fixExpenseReport(input)
const answer = target[0] * target[1] * target[2]
console.log(answer)