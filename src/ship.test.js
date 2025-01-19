const Ship = require('./shipClass')

// describe(`Ship's public interface`, () => {
//     it('should notify of a ship being hit', () => {
//         const patrolBoat = new Ship()
//         expect(patrolBoat.hit()).toBe('Hit')
//     })
//     it('should notify of a ship being sunk', () => {
//         const patrolBoat = new Ship()
//         expect(patrolBoat.isSunk()).toBe('Ship sunk')
//     })
// })

// describe(`Patrol boat public interface`, () => {
//     it('should notify of a ship being hit', () => {
//         const patrolBoat = new Ship(2)
//         expect(patrolBoat.hit()).toBe('Hit')
//     })
//     it('should notify of a ship being sunk after hits = length', () => {
//         const patrolBoat = new Ship(2)
//         patrolBoat.hit()
//         patrolBoat.hit()
//         expect(patrolBoat.isSunk()).toBe('Ship sunk')
//     })
// })

// Refactoring code so that hit() calls isSunk() to return hit or ship sunk
// add says what ship
describe(`Patrol boat public interface`, () => {
    it('should notify of a ship being hit', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)
        expect(patrolBoat.hit()).toBe('Hit')
    })
    it('should notify of a ship being sunk after hits = length', () => {
        const patrolBoat = new Ship('Patrol Boat', 2)

        // Calls hit() twice here
        patrolBoat.hit()
        expect(patrolBoat.hit()).toBe('Patrol Boat sunk')
    })
})