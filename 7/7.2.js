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
            if (!GRAPH.hasOwnProperty(outerBag)) GRAPH[outerBag] = {}
            GRAPH[outerBag][color] = num
        }
    }
}

function getTotalBagCount(bag) {
    let total = 1
    for (const innerBag in GRAPH[bag]) {
        total += GRAPH[bag][innerBag] * getTotalBagCount(innerBag)
    }
    return total
}

const input = readInput()
const GRAPH = {}
constructRuleGraph(input)
const count = getTotalBagCount("shiny gold") - 1  // minus shiny gold itself
console.log("Number of bags: ", count)

