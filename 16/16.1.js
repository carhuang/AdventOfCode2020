const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split('\n\n')
}

function getNearbyTickets() {
    const data = input[2].split('\n')
    const tickets = []
    for (let i = 1; i < data.length; i++) {
        data[i].split(",").forEach(num => tickets.push(parseInt(num, 10)))
    }
    return tickets
}

function getValidNums() {
    const valids = new Set()
    let data = input[0].split('\n')
    for (const rule of data) {
        const ranges = rule.match(/\d+\-\d+/g)
        for (let range of ranges) {
            range = range.split("-")
            const start = parseInt(range[0], 10)
            const end = parseInt(range[1], 10)
            for (let i = start; i <= end; i++) {
                valids.add(i)
            }
        }
    }
    return valids
}

function getScanningErrorRate() {
    let rate = 0
    for (const ticket of tickets) {
        if (!valids.has(ticket)) rate += ticket
    }
    return rate
}

const input = readInput()
const tickets = getNearbyTickets()
const valids = getValidNums()
const error_rate = getScanningErrorRate()
console.log(error_rate)

