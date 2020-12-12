const fs = require('fs')

function readInput() {
    const input = fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].split("")
    }
    return input
}

function isValidPosition(row, col) {
    return row >= 0 && row < states.length && col >= 0 && col < states[row].length
}

function findFirstViewableSeat(row, col, direction, prev_state) {
    const adj_row = row + direction[0]
    const adj_col = col + direction[1]
    if (!isValidPosition(adj_row, adj_col)) return null
    const seat_state = prev_state[adj_row][adj_col]
    if ((seat_state == 'L') || (seat_state == '#')) return seat_state
    return(findFirstViewableSeat(adj_row, adj_col, direction, prev_state))
}

function countAdjOccupiedSeats(row, col, prev_state) {
    let occupied_seats = 0
    const adjs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    for (const adj of adjs) {
        const state = findFirstViewableSeat(row, col, adj, prev_state)
        if (state == '#') occupied_seats++
    }
    return occupied_seats
}

function nextState(prev_state) {
    let changed = false

    for (let row = 0; row < states.length; row++) {
        for (let col = 0; col < states[row].length; col++) {
            const local_state = prev_state[row][col]
            switch(local_state) {
                case 'L':
                    if (countAdjOccupiedSeats(row, col, prev_state) === 0) {
                        states[row][col] = '#'
                        changed = true
                    }
                    break
                case '#':
                    if (countAdjOccupiedSeats(row, col, prev_state) >= 5) {
                        states[row][col] = 'L'
                        changed = true
                    }
                    break
                default:
                    break
            }
        }
    }

    return changed
}

function findFinalState() {
    let changedState = true
    while (changedState) {
        const prev_state = []
        for (let row = 0; row < states.length; row++) {
            prev_state[row] = []
            for (let col = 0; col < states[row].length; col++) {
                prev_state[row].push(states[row][col])
            }
        }
        changedState = nextState(prev_state)
    }
}

function countOccupiedSeats() {
    let seats = 0
    for (let row = 0; row < states.length; row++) {
        for (let col = 0; col < states[row].length; col++) {
            if (states[row][col] == '#') seats++
        }
    }
    return seats
}

const states = readInput()
findFinalState()
const occupied_seats = countOccupiedSeats()
console.log("Number of occupied seats is ", occupied_seats)
