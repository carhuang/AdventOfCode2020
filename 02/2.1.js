const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function extractInfo(line) {
    line = line.split(":")
    const rule = line[0].split(" ")
    const count = rule[0].split("-")
    const password = line[1].trim()
    const info = {
        target: rule[1],
        min: parseInt(count[0], 10),
        max: parseInt(count[1], 10),
        password: password
    }
    return info
}

function isValidPassword(entry) {
    let targetCount = 0;
    for (let i = 0; i < entry.password.length; i++) {
        if (entry.password.charAt(i) == entry.target) targetCount++
    }

    return (targetCount >= entry.min) && (targetCount <= entry.max)
}

function getNumOfValidPasswords(input) {
    let numOfValidPasswords = 0

    for (let i = 0; i < input.length; i++) {
        const line = input[i]
        const entry = extractInfo(line)
        if (isValidPassword(entry)) numOfValidPasswords++
    }

    return numOfValidPasswords
}

const input = readInput()
const numOfValidPasswords = getNumOfValidPasswords(input)
console.log(numOfValidPasswords)
