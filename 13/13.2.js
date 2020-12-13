const fs = require('fs')
const lcm = require('compute-lcm')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function getBusIDs(schedule) {
    const ids = new Map()
    for (let i = 0; i < schedule.length; i++) {
        const bus = schedule[i]
        if (bus != 'x') ids.set(parseInt(bus, 10), i)
    }
    return ids
}

function getCommonWaitTime(schedule) {
    const cache = new Set()
    const common = new Set()

    for (const [bus, wait] of schedule.entries()) {
        if (cache.has(wait)) {
            common.add(wait)
            common.add(bus)
        }
        cache.add(bus)
    }

    return Array.from(common)
}

function isValidTimestamp(t) {
    for (const [bus, wait] of bus_ids.entries()) {
        if ((t + wait) % bus != 0) return false
    }
    return true
}

function getEarliestTimestamp() {
    let t = lcm_wait
    while (t < Number.MAX_SAFE_INTEGER) {
        const timestamp = t - common_wait_bus[0]
        if (isValidTimestamp(timestamp)) return timestamp
        t += lcm_wait
    }
    return null
}

const input = readInput()
const bus_ids = getBusIDs(input[1].split(","))
const common_wait_bus = getCommonWaitTime(bus_ids)
const lcm_wait = lcm(common_wait_bus)
const earliest_t = getEarliestTimestamp()  // warning! runs for a long time
console.log("Earliest timestamp: ", earliest_t)