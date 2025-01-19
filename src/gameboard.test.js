const Ship = require('./shipClass')
const Gameboard = require('./gameboard')

/*
beforeEach(() => {
    const patrolBoat = new Ship('Patrol Boat', 2)
    const submarine = new Ship('Submarine', 3)
    const destroyer = new Ship('Destroyer', 3)
    const battleship = new Ship('Battleship', 4)
    const carrier = new Ship('carrier', 5)
    
    const game = new Gameboard(10)
    game.placeShip(patrolBoat, 0, 0, 0, 1)      // [0, 0] to [0, 1] horizontal positoned 
    game.placeShip(submarine, 5, 5, 7, 5)       // [5, 5] to [7, 5] vertical positioned 
    game.placeShip(destroyer, 6, 8, 8, 8)       // [8, 8] to [6, 8] vertical potioned 
    game.placeShip(battleship, 2, 2, 2, 5)      // [2, 2] to [2, 5] horizontal positoned 
    game.placeShip(carrier, 4, 4, 4, 8)         // [4, 8] to [4, 4] horizontal positioned
})
*/

describe('Patrol Boat', () => {
    it('test', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const game = new Gameboard(10)
        expect(game.placeShip(patrolBoat, 0, 0, 0, 1)).toBe('Patrol Boat placed')
    })

    it('should have patrol boat at [0,0]', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)
        expect(game.board[0][0]).not.toBe(null)
    })

    it('should have patrol boat at [0,1]', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)
        expect(game.board[0][1]).not.toBe(null)
    })

    it('should return hit', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)
        expect(game.receiveAttack(0, 0)).toBe('Hit')
    })

    it('should return sunk after ship destroyed', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)
        game.receiveAttack(0, 0)
        expect(game.receiveAttack(0, 1)).toBe('Patrol Boat sunk')
    })
})

describe('Submarine', () => {
    it('test', () => {
        const submarine = new Ship('Submarine', 3)
        const game = new Gameboard(10)
        expect(game.placeShip(submarine, 5, 5, 7, 5)).toBe('Submarine placed')
    })

    it('should have submarine at [5,5]', () => {
        const submarine = new Ship('Submarine', 3)
        const game = new Gameboard(10)
        game.placeShip(submarine, 5, 5, 7, 5)
        expect(game.board[5][5]).not.toBe(null)
    })

    it('should have submarine at [6,5]', () => {
        const submarine = new Ship('Submarine', 3)
        const game = new Gameboard(10)
        game.placeShip(submarine, 5, 5, 7, 5)
        expect(game.board[6][5]).not.toBe(null)
    })

    it('should have submarine at [7,5]', () => {
        const submarine = new Ship('Submarine', 3)
        const game = new Gameboard(10)
        game.placeShip(submarine, 5, 5, 7, 5)
        expect(game.board[7][5]).not.toBe(null)
    })

    it('should return hit', () => {
        const submarine = new Ship('Submarine', 3)
        const game = new Gameboard(10)
        game.placeShip(submarine, 5, 5, 7, 5)
        expect(game.receiveAttack(5, 5)).toBe('Hit')
    })

    it('should return sunk', () => {
        const submarine = new Ship('Submarine', 3)
        const game = new Gameboard(10)
        game.placeShip(submarine, 5, 5, 7, 5)
        game.receiveAttack(5, 5)
        game.receiveAttack(6, 5)
        expect(game.receiveAttack(7, 5)).toBe('Submarine sunk')
    })

})

describe('Submarine', () => {
    it('test', () => {
        const destroyer = new Ship('Destroyer', 3)
        const game = new Gameboard(10)
        expect(game.placeShip(destroyer, 6, 8, 8, 8)).toBe('Destroyer placed')
    })

    it('should have destroyer at [6,8]', () => {
        const destroyer = new Ship('Destroyer', 3)
        const game = new Gameboard(10)
        game.placeShip(destroyer, 6, 8, 8, 8)
        expect(game.board[6][8]).not.toBe(null)
    })

    it('should have destroyer at [7,8]', () => {
        const destroyer = new Ship('Destroyer', 3)
        const game = new Gameboard(10)
        game.placeShip(destroyer, 6, 8, 8, 8)
        expect(game.board[7][8]).not.toBe(null)
    })

    it('should have destroyer at [8,8]', () => {
        const destroyer = new Ship('Destroyer', 3)
        const game = new Gameboard(10)
        game.placeShip(destroyer, 6, 8, 8, 8)
        expect(game.board[8][8]).not.toBe(null)
    })

    it('should return hit', () => {
        const destroyer = new Ship('Destroyer', 3)
        const game = new Gameboard(10)
        game.placeShip(destroyer, 6, 8, 8, 8)
        expect(game.receiveAttack(8, 8)).toBe('Hit')
    })

    it('should return sunk', () => {
        const destroyer = new Ship('Destroyer', 3)
        const game = new Gameboard(10)
        game.placeShip(destroyer, 6, 8, 8, 8)
        game.receiveAttack(6, 8)
        game.receiveAttack(7, 8)
        expect(game.receiveAttack(8, 8)).toBe('Destroyer sunk')
    })

})

describe('Battleship', () => {
    it('test', () => {
        const battleship = new Ship('Battleship', 4)
        const game = new Gameboard(10)
        expect(game.placeShip(battleship, 2, 2, 2, 5)).toBe('Battleship placed')
    })

    it('should have battleship at [2,2]', () => {
        const battleship = new Ship('Battleship', 4)
        const game = new Gameboard(10)
        game.placeShip(battleship, 2, 2, 2, 5)
        expect(game.board[2][2]).not.toBe(null)
    })

    it('should have battleship at [2,3]', () => {
        const battleship = new Ship('Battleship', 4)
        const game = new Gameboard(10)
        game.placeShip(battleship, 2, 2, 2, 5)
        expect(game.board[2][3]).not.toBe(null)
    })

    it('should have battleship at [2,4]', () => {
        const battleship = new Ship('Battleship', 4)
        const game = new Gameboard(10)
        game.placeShip(battleship, 2, 2, 2, 5)
        expect(game.board[2][4]).not.toBe(null)
    })

    it('should have battleship at [2,5]', () => {
        const battleship = new Ship('Battleship', 4)
        const game = new Gameboard(10)
        game.placeShip(battleship, 2, 2, 2, 5)
        expect(game.board[2][5]).not.toBe(null)
    })

    it('should return hit', () => {
        const battleship = new Ship('Battleship', 4)
        const game = new Gameboard(10)
        game.placeShip(battleship, 2, 2, 2, 5)
        expect(game.receiveAttack(2, 4)).toBe('Hit')
    })

    it('should return sunk', () => {
        const battleship = new Ship('Battleship', 4)
        const game = new Gameboard(10)
        game.placeShip(battleship, 2, 2, 2, 5)
        game.receiveAttack(2, 2)
        game.receiveAttack(2, 3)
        game.receiveAttack(2, 4)
        expect(game.receiveAttack(2, 5)).toBe('Battleship sunk')
    })

})

describe('Carrier', () => {
    it('test', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        expect(game.placeShip(carrier, 4, 4, 4, 8)).toBe('Carrier placed')
    })

    it('should have carrier at [4,4]', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        expect(game.board[4][4]).not.toBe(null)
    })

    it('should have carrier at [4,5]', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        expect(game.board[4][5]).not.toBe(null)
    })

    it('should have carrier at [4,6]', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        expect(game.board[4][6]).not.toBe(null)
    })

    it('should have carrier at [4,7]', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        expect(game.board[4][7]).not.toBe(null)
    })

    it('should have carrier at [4,8]', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        expect(game.board[4][8]).not.toBe(null)
    })

    it('should return hit', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        expect(game.receiveAttack(4, 6)).toBe('Hit')
    })

    it('should return sunk', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        game.receiveAttack(4, 4)
        game.receiveAttack(4, 5)
        game.receiveAttack(4, 6)
        game.receiveAttack(4, 7)
        expect(game.receiveAttack(4, 8)).toBe('Carrier sunk')
    })

})

describe('Potential board bugs', () => {
    it('should throw an error when trying to place a ship on a coordinate where there is one already', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)
        expect(game.placeShip(carrier, 0, 0, 0, 3)).toBe('Ship already in co-ordinates')
    })

    it('should throw an error when trying to place a ship on a coordinate where there is one already', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        game.placeShip(carrier, 4, 4, 4, 8)
        expect(game.placeShip(patrolBoat, 4, 6, 5, 6)).toBe('Ship already in co-ordinates')
    })

    it('should throw an error when you try to place a ship outside the board', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const game = new Gameboard(10)
        expect(game.placeShip(patrolBoat, 10, 10, 10, 11)).toBe('Out of bounds')
    })

    it('should throw an error when the ships co-ordinates dont match the length of it', () => {
        const carrier = new Ship('Carrier', 5)
        const game = new Gameboard(10)
        expect(game.placeShip(carrier, 0, 0, 1, 0)).toBe('Co-ordinates dont match length')
    })

})

describe('allShipsSunk', () => {
    it('should return no ships on the board', () => {
        const game = new Gameboard(10)
        expect(game.allShipsSunk()).toBe('No ships on the board')
    })

    it('should return ships remaining after no ships had sunk', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const submarine = new Ship('Submarine', 3)
        const destroyer = new Ship('Destroyer', 3)
        const battleship = new Ship('Battleship', 4)
        const carrier = new Ship('carrier', 5)
        
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)      // [0, 0] to [0, 1] horizontal positoned 
        game.placeShip(submarine, 5, 5, 7, 5)       // [5, 5] to [7, 5] vertical positioned 
        game.placeShip(destroyer, 6, 8, 8, 8)       // [8, 8] to [6, 8] vertical potioned 
        game.placeShip(battleship, 2, 2, 2, 5)      // [2, 2] to [2, 5] horizontal positoned 
        game.placeShip(carrier, 4, 4, 4, 8)         // [4, 8] to [4, 4] horizontal positioned

        expect(game.allShipsSunk()).toBe('Ships remaining')
    })

    it('should return ships remaining after no ships had sunk after a few misses', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const submarine = new Ship('Submarine', 3)
        const destroyer = new Ship('Destroyer', 3)
        const battleship = new Ship('Battleship', 4)
        const carrier = new Ship('carrier', 5)
        
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)      // [0, 0] to [0, 1] horizontal positoned 
        game.placeShip(submarine, 5, 5, 7, 5)       // [5, 5] to [7, 5] vertical positioned 
        game.placeShip(destroyer, 6, 8, 8, 8)       // [8, 8] to [6, 8] vertical potioned 
        game.placeShip(battleship, 2, 2, 2, 5)      // [2, 2] to [2, 5] horizontal positoned 
        game.placeShip(carrier, 4, 4, 4, 8)         // [4, 8] to [4, 4] horizontal positioned

        // Missed attacks
        game.receiveAttack(0, 9)
        game.receiveAttack(5, 1)
        game.receiveAttack(6, 3)
        game.receiveAttack(9, 0)
        game.receiveAttack(5, 3)

        expect(game.allShipsSunk()).toBe('Ships remaining')
    })

    it('should return ships remaining after 2 ships had sank after a few misses', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const submarine = new Ship('Submarine', 3)
        const destroyer = new Ship('Destroyer', 3)
        const battleship = new Ship('Battleship', 4)
        const carrier = new Ship('carrier', 5)
        
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)      // [0, 0] to [0, 1] horizontal positoned 
        game.placeShip(submarine, 5, 5, 7, 5)       // [5, 5] to [7, 5] vertical positioned 
        game.placeShip(destroyer, 6, 8, 8, 8)       // [8, 8] to [6, 8] vertical potioned 
        game.placeShip(battleship, 2, 2, 2, 5)      // [2, 2] to [2, 5] horizontal positoned 
        game.placeShip(carrier, 4, 4, 4, 8)         // [4, 8] to [4, 4] horizontal positioned

        // Missed attacks
        game.receiveAttack(0, 9)
        game.receiveAttack(5, 1)
        game.receiveAttack(6, 3)
        game.receiveAttack(9, 0)
        game.receiveAttack(5, 3)

        // Sink patrol boat
        game.receiveAttack(0, 1)
        game.receiveAttack(0, 0)

        // Sink submarine
        game.receiveAttack(5, 5)
        game.receiveAttack(6, 5)
        game.receiveAttack(7, 5)

        expect(game.allShipsSunk()).toBe('Ships remaining')
    })

    it('should return all ships sunk after all ships had sanked', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        const submarine = new Ship('Submarine', 3)
        const destroyer = new Ship('Destroyer', 3)
        const battleship = new Ship('Battleship', 4)
        const carrier = new Ship('carrier', 5)
        
        const game = new Gameboard(10)
        game.placeShip(patrolBoat, 0, 0, 0, 1)      // [0, 0] to [0, 1] horizontal positoned 
        game.placeShip(submarine, 5, 5, 7, 5)       // [5, 5] to [7, 5] vertical positioned 
        game.placeShip(destroyer, 6, 8, 8, 8)       // [8, 8] to [6, 8] vertical potioned 
        game.placeShip(battleship, 2, 2, 2, 5)      // [2, 2] to [2, 5] horizontal positoned 
        game.placeShip(carrier, 4, 4, 4, 8)         // [4, 8] to [4, 4] horizontal positioned

        // Missed attacks
        game.receiveAttack(0, 9)
        game.receiveAttack(5, 1)
        game.receiveAttack(6, 3)
        game.receiveAttack(9, 0)
        game.receiveAttack(5, 3)

        // Sink patrol boat
        game.receiveAttack(0, 1)
        game.receiveAttack(0, 0)

        // Sink submarine
        game.receiveAttack(5, 5)
        game.receiveAttack(6, 5)
        game.receiveAttack(7, 5)

        // Sink battleship
        game.receiveAttack(2, 2)
        game.receiveAttack(2, 3)
        game.receiveAttack(2, 4)
        game.receiveAttack(2, 5)

        // Sink carrier
        game.receiveAttack(4, 4)
        game.receiveAttack(4, 5)
        game.receiveAttack(4, 6)
        game.receiveAttack(4, 7)
        game.receiveAttack(4, 8)

        // Sink destroyer
        game.receiveAttack(6, 8)
        game.receiveAttack(7, 8)
        game.receiveAttack(8, 8)

        expect(game.allShipsSunk()).toBe('All ships sunk')
    })
})