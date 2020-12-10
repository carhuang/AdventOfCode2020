const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function constructRuleGraph(rules) {
    for (let rule of rules) {
        rule = rule.split(" bags contain ")
        const outerBag = rule[0]
        const innerBags = rule[1].split(', ')

        if (innerBags.length == 1 && innerBags[0] == 'no other bags.') continue
        const regex = /([0-9]+)\s(.+)\s[(bag)]/
        for (const innerBag of innerBags) {
            const info = innerBag.match(regex)
            const num = parseInt(info[1], 10)
            const color = info[2]
            if (!GRAPH.hasOwnProperty(color)) GRAPH[color] = {}
            GRAPH[color][outerBag] = num
        }
    }
}

let numBagColors = 0

function bfs(root) {
    const queue = []
    const visited = new Set()
    visited.add(root)
    Object.keys(root).forEach(key => queue.push(key))

    while (queue.length > 0) {
        const current = queue.shift()
        if (visited.has(current)) continue

        if (GRAPH.hasOwnProperty(current)) {
            Object.keys(GRAPH[current]).forEach(key => {if (!visited.has(key)) queue.push(key)})
        }
        visited.add(current)
        numBagColors++
    }
}

function countBagColors() {
    bfs(GRAPH["shiny gold"])
}

const input = readInput()
const GRAPH = {}
constructRuleGraph(input)
countBagColors()
console.log("Number of bag colors: ", numBagColors)

