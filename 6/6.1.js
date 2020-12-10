const { group } = require('console')
const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split('\n\n')
}

function getGroupYesCount(forms) {
    let yes = new Set()
    forms = forms.split(/\r\n|\r|\n/)

    for (const form of forms) {
        for (let i = 0; i < form.length; i++) {
            yes.add(form.charAt(i))
        }
    }

    return yes.size
}

function getSumOfYesCounts(input) {
    let sum = 0
    for (const group of input) {
        sum += getGroupYesCount(group)
    }
    return sum
}

const input = readInput()
const sum = getSumOfYesCounts(input)
console.log("Sum of yes count: ", sum)