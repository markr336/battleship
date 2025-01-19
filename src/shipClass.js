export class Ship {

    numberOfHits = 0
    sunk = false

    constructor(name, length) {
        this.name = name
        this.length = length
    }

    hit() {
        this.numberOfHits++
        return this.isSunk()
    }
    isSunk() {
        if (this.numberOfHits == this.length) {
            this.sunk = true
            return `${this.name} sunk`
        }
        else {
            return 'Hit'
        }
    }
}

// module.exports = Ship