const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split('\n').map(Number)
}

function isValidNumber(index) {
    const cache = new Set()
    for (let i = index - preamble_size; i < index; i++) {
        const diff = data[index] - data[i]
        if (cache.has(diff)) return true
        cache.add(data[i])
    }
    return false
}

function getFirstInvalidNum() {
    for (let i = preamble_size; i < data.length; i++) {
        if (!isValidNumber(i)) return data[i]
    }
    return null
}

function findWeaknessSet() {
    let start = 0, end = 0
    let min = Number.MAX_SAFE_INTEGER, max = 0
    let sum = 0
    while (end < data.length) {
        end++
        const number = data[end]
        sum += number
        if (number < min) min = number
        if (number > max) max = number
        if (sum === invalidNum) return min + max
        if (sum > invalidNum) {
            start++
            end = start
            min = Number.MAX_SAFE_INTEGER
            max = 0
            sum = 0
        }
    }
    return null
}

const data = readInput()
const preamble_size = 25
const invalidNum = getFirstInvalidNum()
const weakness = findWeaknessSet()

console.log("Weakness number is: ", weakness)
