const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').toString().split(/\r\n|\r|\n/)
}

function getAllAddresses(addr) {
    const addresses = []
    function dfsFloatingAddr(addr, i) {
        if (i === addr.length) return addresses.push(addr)
        if (addr.charAt(i) == 'X') {
            dfsFloatingAddr(addr.substring(0, i) + '0' + addr.substring(i + 1), i + 1)
            dfsFloatingAddr(addr.substring(0, i) + '1' + addr.substring(i + 1), i + 1)
        } else {
            dfsFloatingAddr(addr, i + 1)
        }
    }
    dfsFloatingAddr(addr, 0)
    return addresses
}

/**
 * Returns the floating address after applying the mask
 * @param  addr number in base 10
 * @param  mask 36-bits mask in string made up of 1, 0, or X
 */
function getMaskedAddress(addr, mask) {
    addr = addr.toString(2)
    let masked_addr = ''
    for (let i = 0; i < 36 - addr.length; i++) {
        masked_addr += mask.charAt(i)
    }
    for (i = 0; i < addr.length; i++) {
        const m = mask.charAt(i + 36 - addr.length)
        if (m == '0') {
            masked_addr += addr[i]
        } else {
            masked_addr += m
        }
    }
    return masked_addr  
}

function run(program) {
    const memory = {}
    let mask = null

    for (let instruction of program) {
        instruction = instruction.split(" = ")
        let subject = instruction[0] 
        let val = instruction[1]
        if (subject == 'mask') {
            mask = val
        } else {
            subject = subject.match(/\d+/)
            const index = getMaskedAddress(parseInt(subject[0], 10), mask)
            const addresses = getAllAddresses(index)
            val = parseInt(val, 10)
            for (let address of addresses) {
                address = parseInt(address, 2)
                memory[address] = val
            }
        }
    }
    return memory
}

function sum(memory) {
    let sum = 0
    for (const slot in memory) {
        sum += memory[slot]
    }
    return sum
}

const input = readInput()
const memory = run(input)
const answer = sum(memory)
console.log(answer)