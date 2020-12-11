const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function countTrees(map) {
    const mapWidth = map[0].length
    let numTree = 0
    let x = 3
    for (let y = 1; y < map.length; y += 1) {
        const location = map[y][x % mapWidth]
        if (location === '#') numTree++
        x += 3
    }
    return numTree
}

const input = readInput()
const numTree = countTrees(input)
console.log(numTree)