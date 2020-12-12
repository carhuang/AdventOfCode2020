const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

/**
 * Rotate waypoint around the ship clockwise by specified degree
 * @param  x current x coordinate
 * @param  y current y coordinate
 * @param  degree degree to rotate by clockwise
 * @returns [x, y] new x, y coordinate
 */
function rotateWaypoint(x, y, degree) {
    degree %= 360
    let new_x = 0
    let new_y = 0
    switch (degree) {
        case 0:
            new_x = x
            new_y = y
            break
        case 90:
            new_x = y
            new_y = -x
            break
        case 180:
            new_x = -x
            new_y = -y
            break
        case 270:
            new_x = -y
            new_y = x
            break
    }
    return [new_x, new_y]
}

function navigate() {
    let waypoint_x = 10, waypoint_y = 1
    let x = 0, y = 0

    for (const instruction of instructions) {
        const action = instruction.substring(0, 1)
        const value = Number(instruction.substring(1))
        let new_coord = null
        switch(action) {
            case 'N':
                waypoint_y += value
                break
            case 'S':
                waypoint_y -= value
                break
            case 'E':
                waypoint_x += value
                break
            case 'W':
                waypoint_x -= value
                break
            case 'L':
                const clockwise = 360 - value
                new_coord = rotateWaypoint(waypoint_x, waypoint_y, clockwise)
                waypoint_x = new_coord[0]
                waypoint_y = new_coord[1]
                break
            case 'R':
                new_coord = rotateWaypoint(waypoint_x, waypoint_y, value)
                waypoint_x = new_coord[0]
                waypoint_y = new_coord[1]
                break
            case 'F':
                x += (waypoint_x * value)
                y += (waypoint_y * value)
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