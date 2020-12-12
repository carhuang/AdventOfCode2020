const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function navigate() {
    let direction = 90
    let x = 0
    let y = 0

    for (const instruction of instructions) {
        const action = instruction.substring(0, 1)
        const value = Number(instruction.substring(1))
        switch(action) {
            case 'N':
                y += value
                break
            case 'S':
                y -= value
                break
            case 'E':
                x += value
                break
            case 'W':
                x -= value
                break
            case 'L':
                const val = 360 - value
                direction = (direction + val) % 360
                break
            case 'R':
                direction = (direction + value) % 360
                break
            case 'F':
                if (direction === 0) y += value
                if (direction === 90) x += value
                if (direction === 180) y-= value
                if (direction === 270) x -= value
                break
        }
    }

    return [x, y]
}

function getManhattanDistance(x, y) {
    return Math.abs(x) + Math.abs(y)
}

const instructions = readInput()
const destination = navigate()
const distance = getManhattanDistance(destination[0], destination[1])
console.log("The Manhattan distance between that location and the ship's starting position: ", distance)