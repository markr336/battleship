
// Need to console log the return messages to confirm it's working
// need to switch betweeen export (& comment out import) & modules.export
// import { placeShipOnSquare } from "./gameboard-UI";

export class Gameboard {
    constructor(size) {
        this.size = size;
        this.board = Array(size).fill(null).map(() => Array(size).fill(null))
        this.boardState = Array(size).fill(null).map(() => Array(size).fill(null))
        this.ships = []
    }

    placeShip(ship, verticalStart, horizontalStart, verticalEnd, horizontalEnd, player) {

        // Check if co-ordinates are within the board
        if (verticalStart > 9 || horizontalStart > 9 || verticalEnd > 9 || horizontalEnd > 9) return 'Out of bounds'
        if (verticalStart < 0 || horizontalStart < 0 || verticalEnd < 0 || horizontalEnd < 0) return 'Out of bounds'

        // Check if co-ordintes & in between are emoty
        let emptyCells = this.checkIfSquaresAreEmpty(ship, verticalStart, horizontalStart, verticalEnd, horizontalEnd)
        if (emptyCells != null) return emptyCells

        // Check if co-ordinates match length
        if (verticalStart != verticalEnd) {
            if (verticalEnd - verticalStart + 1 != ship.length) return 'Co-ordinates dont match length'
        }
        if (horizontalStart != horizontalEnd) {
            if (horizontalEnd - horizontalStart + 1 != ship.length) return 'Co-ordinates dont match length'
        }

        this.ships.push(ship)
        this.board[verticalStart][horizontalStart] = ship
        
        // placeShipOnSquare gets called for each square
        // placeShipOnSquare(player, ship.name, verticalStart, horizontalStart)

        // Fill in remaining spaces
        // Patrol boat has a lenght of 2 so no need to fill in gaps
        if (ship.name != 'Patrol Boat') {

            // Vertical positioning
            if (verticalStart != verticalEnd) {
                let column = horizontalStart
                // As there's start & end co-ordinates, only need to fill gaps in between
                // hence ship.length - 1
                for (let i = 1; i < ship.length - 1; i++) {
                    this.board[verticalStart + i][column] = ship
                    // placeShipOnSquare(player, ship.name, verticalStart + i, column)
                }
            }
            
            // Horizontal positioning
            if (horizontalStart != horizontalEnd) {
                let row = verticalStart
                // As there's start & end co-ordinates, only need to fill gaps in between
                // hence ship.length - 1
                for (let i = 1; i < ship.length - 1; i++) {
                    this.board[row][horizontalStart + i] = ship
                    // placeShipOnSquare(player, ship.name, row, horizontalStart + i)
                }
            }

        }

        this.board[verticalEnd][horizontalEnd] = ship
        // placeShipOnSquare(player, ship.name, verticalEnd, horizontalEnd)

        // console.log(`${ship.name} placed`)
        return `${ship.name} placed`
    }

    checkIfSquaresAreEmpty(ship, verticalStart, horizontalStart, verticalEnd, horizontalEnd) {
        // Check starting & end co-ordinates
        if(this.board[verticalStart][horizontalStart] != null || this.board[verticalEnd][horizontalEnd] != null) {
            return 'Ship already in co-ordinates'
        }
        // Check co-ordinates in between
        if (ship.name != 'Patrol Boat') {

            // Vertical positioning
            if (verticalStart != verticalEnd) {
                let column = horizontalStart
                // As there's start & end co-ordinates, only need to fill gaps in between
                // hence ship.length - 1
                for (let i = 1; i < ship.length - 1; i++) {
                    if (this.board[verticalStart + i][column] != null) return 'Ship already in co-ordinates'
                }
            }
            
            // Horizontal positioning
            if (horizontalStart != horizontalEnd) {
                let row = verticalStart
                // As there's start & end co-ordinates, only need to fill gaps in between
                // hence ship.length - 1
                for (let i = 1; i < ship.length - 1; i++) {
                    if (this.board[row][horizontalStart + i] != null) return 'Ship already in co-ordinates'
                }
            }

        }

        return null
    }

    receiveAttack(vertical, horizontal) {

        if (vertical < 0 || vertical > 9 || horizontal < 0 || horizontal > 9) return 'Out of bounds'
        
        if (this.board[vertical][horizontal] != null) {
            this.boardState[vertical][horizontal] = 'Hit'
            // console.log('Hit')
            return this.board[vertical][horizontal].hit()
        }
        else {
            this.boardState[vertical][horizontal] = 'Miss'
            // console.log('Miss')
            return 'Miss'
        }
    }

    getBoardState() {
        return this.boardState
    }

    allShipsSunk() {

        if (this.ships.length != 0) {
            let shipsSank = 0
            for (const ship of this.ships) {
                if (ship.sunk == true) shipsSank++
            }
            if (shipsSank == this.ships.length) {
                console.log('All ships sunk')
                return 'All ships sunk'
            }
            else {
                console.log('Ships remaining')
                return 'Ships remaining'
            }
        }
        else {
            return 'No ships on the board'
        }
    }
}

// module.exports = Gameboard

