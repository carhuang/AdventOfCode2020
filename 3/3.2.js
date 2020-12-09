const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function countTrees(map, slopeX, slopeY) {
    const mapWidth = map[0].length
    let numTree = 0
    let x = slopeX
    for (let y = slopeY; y < map.length; y += slopeY) {
        const location = map[y][x % mapWidth]
        if (location === '#') numTree++
        x += slopeX
    }
    return numTree
}

const input = readInput()
const numTreeForSlope1 = countTrees(input, 1, 1)
const numTreeForSlope2 = countTrees(input, 3, 1)
const numTreeForSlope3 = countTrees(input, 5, 1)
const numTreeForSlope4 = countTrees(input, 7, 1)
const numTreeForSlope5 = countTrees(input, 1, 2)
console.log(numTreeForSlope1 * numTreeForSlope2 * numTreeForSlope3 * numTreeForSlope4 * numTreeForSlope5)