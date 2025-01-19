import { Gameboard } from "./gameboard"

export class Player {

    gameboard = new Gameboard(10)

    constructor(name, type) {
        this.name = name
        this.type = type
    }
}

// module.exports = Player