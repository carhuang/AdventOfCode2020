const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split("\n\n")
}

function isValidPassport(passport) {
    const fields = passport.split(/\s+/)
    if (fields.length < REQ_FIELDS.size - 1) return false
    let checker = new Set(REQ_FIELDS)
    for (field of fields) {
        const fieldCode = field.substring(0, 3)
        checker.delete(fieldCode)
    }
    if (checker.size === 0) return true
    if (checker.size === 1 && checker.has('cid')) return true
    return false
}

function countValidPassports(passports) {
    let numValidPassports = 0

    for (let i = 0; i < passports.length; i++) {
        if(isValidPassport(passports[i])) numValidPassports++
    }

    return numValidPassports
}

const input = readInput()
const REQ_FIELDS = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'])
const numValidPassports = countValidPassports(input)
console.log(numValidPassports)