const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function getBusIDs(schedule) {
    const ids = []
    for (const bus of schedule) {
        if (bus != 'x') ids.push(parseInt(bus))
    }
    return ids
}

function getEarliestBus() {
    let min_wait = Number.MAX_SAFE_INTEGER
    let earliest_bus = bus_ids[0]
    for (const bus of bus_ids) {
        const arrival = Math.ceil(earliest_timestamp / bus)
        const wait = bus * arrival - earliest_timestamp
        if (wait < min_wait) {
            min_wait = wait
            earliest_bus = bus
        } 
    }
    return min_wait * earliest_bus
}

const input = readInput()
const earliest_timestamp = Number(input[0])
const bus_ids = getBusIDs(input[1].split(","))
const answer = getEarliestBus()
console.log("ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus: ", answer)