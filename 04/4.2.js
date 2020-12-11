const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split('\n\n')
}

function isValidPassport(passport) {
    const fields = passport.split(" ")
    if (fields.length < 7) return false
    let checker = new Set(REQ_FIELDS)

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i].split(":")
        const fieldCode = field[0]
        const value = field[1]
        checker.delete(fieldCode)

        switch(fieldCode) {
            case 'byr':
                if (!RULES.byr.isValid(parseInt(value, 10))) return false
                break
            case 'iyr':
                if (!RULES.iyr.isValid(parseInt(value, 10))) return false
                break
            case 'eyr':
                if (!RULES.eyr.isValid(parseInt(value, 10))) return false
                break
            case 'hgt':
                if (!RULES.hgt.isValid(value)) return false
                break
            case 'hcl':
                if (!RULES.hcl.isValid(value)) return false
                break
            case 'ecl':
                if (!RULES.ecl.isValid(value)) return false
                break
            case 'pid':
                if (!RULES.pid.isValid(value)) return false
                break
            default:
                break
        }
    }

    if (checker.size === 0) return true
    if (checker.size === 1 && checker.has('cid')) return true
    return false
}

function countValidPassports(passports) {
    let numValidPassports = 0

    for (let i = 0; i < passports.length; i++) {
        if (isValidPassport(passports[i].replace(/\n/g, " "))) numValidPassports++
    }

    return numValidPassports
}

const input = readInput()
const REQ_FIELDS = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'])
const RULES = {
    byr: {
        isValid: function(value) {
            return value >= 1920 && value <= 2002
        }
    },
    iyr: {
        isValid: function(value) {
            return value >= 2010 && value <= 2020
        }
    },
    eyr: {
        isValid: function(value) {
            return value >= 2020 && value <= 2030
        }
    },
    hgt: {
        isValid: function(value) {
            u = value.match(/^(\d+)(cm|in)$/)
            if (u && u[2] && u[2] == "in") {
                return u[1] >= 59 && u[1] <= 76
            }
            if (u && u[2] && u[2] == "cm") {
                return u[1] >= 150 && u[1] <= 193
            }
            return false
        }
    },
    hcl: {
        isValid: function(value) {
            return /^#[0-9a-f]{6}$/.test(value)
        }
    },
    ecl: {
        isValid: function(value) {
            return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value)
        }
    },
    pid: {
        isValid: function(value) {
            return /^\d{9}$/.test(value)
        }
    }
}
const numValidPassports = countValidPassports(input)
console.log("Valid passports: ", numValidPassports)