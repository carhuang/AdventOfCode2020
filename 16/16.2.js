const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split('\n\n')
}

function getMyTicket() {
    const data = input[1].split('\n')
    return data[1].split(",").map(Number)
}

function getNearbyTickets() {
    const data = input[2].split('\n')
    const tickets = []
    for (let i = 1; i < data.length; i++) {
        const ticket = []
        data[i].split(",").forEach(num => ticket.push(parseInt(num, 10)))
        tickets.push(ticket)
    }
    return tickets
}

function getValidNums() {
    const valids = new Set()
    let data = input[0].split('\n')
    for (const rule of data) {
        const entry = rule.split(":")[0]
        const ranges = rule.match(/\d+\-\d+/g)
        const greater = [], lesser = []
        for (let range of ranges) {
            range = range.split("-")
            const start = parseInt(range[0], 10)
            const end = parseInt(range[1], 10)
            greater.push(start)
            lesser.push(end)
            for (let i = start; i <= end; i++) {
                valids.add(i)
            }
        }
        rules[entry] = {
            '>': greater,
            '<': lesser
        }
    }
    return valids
}

function purgeInvalidTickets(tickets) {
    const valid_tickets = []
    for (const ticket of tickets) {
        let isValid = true
        for (const field of ticket) {
            isValid = isValid && valids.has(field)
        }
        if (isValid) valid_tickets.push(ticket)
    }
    return valid_tickets
}

function isValidFieldIndex(index, rule) {
    const greater = rule['>'], lesser = rule['<']
    for (const ticket of tickets) {
        const num = ticket[index]
        if ((num < greater[0]) || (num > lesser[0] && num < greater[1]) || (num > lesser[1])) return false
    }
    return true
}

function findPossibleFieldIndex(field, indexes) {
    const possibilities = []
    const range = rules[field]
    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i]
        if (isValidFieldIndex(index, range)) {
            possibilities.push(index)
        }
    }
    return possibilities
}

function mapFields(match) {
    const order = Array.from(Object.keys(match))
    .sort(function(a, b) { return match[a].length - match[b].length })
    const indexes = new Set()
    for (let i = 0; i < tickets[0].length; i++) {
        indexes.add(i)
    }

    for (const key of order) {
        if (match[key].length === 1) {
            const index = match[key][0]
            match[key] = index
            indexes.delete(index)
        } else {
            for (const index of match[key]) {
                if (indexes.has(index)) {
                    match[key] = index
                    indexes.delete(index)
                }
            }
        }
    }
    return match
}

function matchFields() {
    const indexes = Array.from(Array(tickets[0].length).keys())
    const match = {}
    for (const rule in rules) {
        const index = findPossibleFieldIndex(rule, indexes)
        match[rule] = index
    }
    mapFields(match)
    return match
}

function getAnswer() {
    const regex = RegExp('departure')
    let answer = 1
    for (const field in mapping) {
        if (regex.test(field)) {
            const index = mapping[field]
            answer *= my_ticket[index]
        }
    }
    return answer
}

const input = readInput()
const rules = {}
const valids = getValidNums()
let tickets = getNearbyTickets()
tickets = purgeInvalidTickets(tickets)
const mapping = matchFields()
const my_ticket = getMyTicket()
const answer = getAnswer()
console.log(answer)