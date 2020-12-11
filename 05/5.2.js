const fs = require('fs')
const numRows = 128
const numCols = 8

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function getAllIDs() {
    let ids = new Set()
    const maxID = getSeatID(numRows - 2, numCols - 1)
    for (let id = 8; id <= maxID; id++) {
        ids.add(id)
    }
    return ids
}

function getRow(code) {
    let min = 0
    let max = numRows - 1
    for (let i = 0; i < code.length; i++) {
        if (code.charAt(i) == 'F') {
            max = Math.floor((min + max) / 2)
        }
        if (code.charAt(i) == 'B') {
            min = Math.ceil((min + max) / 2)
        }
    }
    return min
}

function getCol(code) {
    let min = 0
    let max = numCols - 1
    for (let i = 0; i < code.length; i++) {
        if (code.charAt(i) == 'L') {
            max = Math.floor((min + max) / 2)
        }
        if (code.charAt(i) == 'R') {
            min = Math.ceil((min + max) / 2)
        }
    }
    return min
}

function getSeatID(row, col) {
    return row * 8 + col
}

function getNonOccupiedIDs(bpasses, ids) {
    for (bpass of bpasses) {
        const id = getSeatID(getRow(bpass.substring(0, 7)), getCol(bpass.substring(7)))
        ids.delete(id)
    }

    return ids
}

const input = readInput()
let ids = getAllIDs()
const nonOccupiedIDs = getNonOccupiedIDs(input, ids)
console.log(nonOccupiedIDs)