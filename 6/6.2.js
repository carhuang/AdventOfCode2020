const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split('\n\n')
}

function getGroupYesCount(forms) {
    const yes = {}
    let yesCount = 0
    forms = forms.split(/\r\n|\r|\n/)
    const groupSize = forms.length

    for (const form of forms) {
        for (let i = 0; i < form.length; i++) {
            const question = form.charAt(i)
            yes[question] = (yes[question] || 0) + 1
        }
    }

    for (const question in yes) {
        if (yes[question] === groupSize) yesCount++
    }

    return yesCount
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