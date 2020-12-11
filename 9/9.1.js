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

function checkXMASWeakness() {
    for (let i = preamble_size; i < data.length; i++) {
        if (!isValidNumber(i)) return data[i]
    }
    return null
}

const data = readInput()
const preamble_size = 25
const weakness = checkXMASWeakness()
console.log("Weakness number is: ", weakness)
