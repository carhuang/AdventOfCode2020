const starting_nums = [18,8,0,5,4,1,20]

function getithNumber(i) {
    const cache = {}
    let number = null
    for (let turn = 1; turn < starting_nums.length; turn++) {
        number = starting_nums[turn - 1]
        cache[number] = turn
    }
    number = starting_nums[starting_nums.length - 1]
    for (turn = starting_nums.length + 1; turn <= i; turn++) {
        if (!cache.hasOwnProperty(number)) {
            cache[number] = turn - 1
            number = 0
        } else {
            const last_number = number
            number = turn - 1 - cache[number]
            cache[last_number] = turn - 1
        }
    }
    return number
}

console.log("Part 1 2020th number: ", getithNumber(2020))
console.log("Part 2 30000000th number: ", getithNumber(30000000))