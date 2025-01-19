export let axis = 'horizontal'

export const patrolBoatCells = []
export const destroyerCells = []
export const battleshipCells = []
export const carrierCells = []

export function createPlayer1Board() {
    const player1Gameboard = document.querySelector('.player1Board')

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div')
            cell.classList.add(`cell${i}${j}`)
            cell.classList.add('cell')
            player1Gameboard.appendChild(cell)
        }
    }
}

export function createPlayer1BoardState() {
    const player2GameboardState = document.querySelector('.player1BoardState')

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div')
            cell.classList.add(`cell${i}${j}`)
            cell.classList.add('cell')
            player2GameboardState.appendChild(cell)
        }
    }
}

export function createPlayer2Board() {
    const player2Gameboard = document.querySelector('.player2Board')

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div')
            cell.classList.add(`cell${i}${j}`)
            cell.classList.add('cell')
            player2Gameboard.appendChild(cell)
        }
    }
}

export function createPlayer2BoardState() {
    const player2GameboardState = document.querySelector('.player2BoardState')

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div')
            cell.classList.add(`cell${i}${j}`)
            cell.classList.add('cell')
            player2GameboardState.appendChild(cell)
        }
    }
}

export function appendShipToCell(cell, ship) {
    cell.appendChild(ship); 
    ship.style.position = 'static'; 
    ship.style.top = '0'; 
    ship.style.left = '0'; 
}

export function getCoordinate(number) {
    if (number < 10) {
        return [0, number]
    }
    else {
        return [Math.floor(number / 10), number % 10]
    }
} 

export function removeCellsFromStorage(lengthOfShip) {

    /// If condition where it only checks occupied cells of other ships & not own
    // so that it get dropped back 

    if (patrolBoatCells.length != 0 && lengthOfShip == 2) {
        // console.log('Clear patrol boat storage')
        patrolBoatCells.splice(0, 2)
    }
    else if (destroyerCells.length != 0 && lengthOfShip == 3) {
        // console.log('Clear destroyer storage')
        destroyerCells.splice(0, 3)
    }
    else if (battleshipCells.length != 0 && lengthOfShip == 4) {
        // console.log('Clear battleship storages')
        battleshipCells.splice(0, 4)
    }
    else if (carrierCells.length != 0 && lengthOfShip == 5) {
        // console.log('Clear carrier storage')
        carrierCells.splice(0, 5)
    }

}

export function clearAllStorage() {
    patrolBoatCells.splice(0, 2)
    destroyerCells.splice(0, 3)
    battleshipCells.splice(0, 4)
    carrierCells.splice(0, 5)
}

export function resetOrientation() {
    axis = 'horizontal'
    // console.log(axis)
    ships.forEach(ship => {
        if (ship.parentNode.classList[1] != 'cell') {
            ship.classList.remove('vertical')
            ship.classList.add('horizontal')
        }
    })
    const shipyard = document.querySelector('.player2Area .shipyard')
    shipyard.style.flexDirection = 'column'
}

const orientationButton = document.querySelector('.orientation')
const ships = document.querySelectorAll('.ship');
const cells = document.querySelectorAll('.cell');

orientationButton.addEventListener('click', toggleOrientation)

function toggleOrientation() {
    const shipyard1 = document.querySelector('.player1Area .shipyard')
    const shipyard2 = document.querySelector('.player2Area .shipyard')
    const message = document.querySelector('.message')
    if (axis == 'horizontal') {
        axis = 'vertical'
        // console.log(axis)
        ships.forEach(ship => {
            if (ship.parentNode.classList[1] != 'cell') {
                ship.classList.remove('horizontal')
                ship.classList.add('vertical')
            }
        })
        shipyard1.style.flexDirection = 'row'
        shipyard2.style.flexDirection = 'row'
        message.textContent = 'Ship Orientation: Vertical'
    }
    else if (axis == 'vertical') {
        axis = 'horizontal'
        // console.log(axis)
        ships.forEach(ship => {
            if (ship.parentNode.classList[1] != 'cell') {
                ship.classList.remove('vertical')
                ship.classList.add('horizontal')
            }
        })
        shipyard1.style.flexDirection = 'column'
        shipyard2.style.flexDirection = 'column'
        message.textContent = 'Ship Orientation: Horizontal'
    }
}

export function toggleHorizontalVertical(ship) {
    const shipHeight = ship.offsetHeight
    const shipWidth = ship.offsetWidth
    // console.log('Width: ', shipWidth, ', Height: ', shipHeight)

    if (axis == 'horizontal') {
        // IF SHIP GOES OUT OF BOUNDS DON'T CHANGE ORTIENTATION
        if (shipWidth > shipHeight) {
            ship.classList.remove('vertical')
            ship.classList.add('horizontal')
        }
        // rotating ship
        else {
            let lengthOfShip = Math.round(shipHeight / shipWidth)
            let appendedCell = parseInt(ship.parentNode.classList[0].match(/\d+/g))
            
            if (ship.parentNode.classList[0] != 'cell09' 
                && ship.parentNode.classList[0] != 'cell19' 
                && ship.parentNode.classList[0] != 'cell29' 
                && ship.parentNode.classList[0] != 'cell39' 
                && ship.parentNode.classList[0] != 'cell49' 
                && ship.parentNode.classList[0] != 'cell59' 
                && ship.parentNode.classList[0] != 'cell69' 
                && ship.parentNode.classList[0] != 'cell79' 
                && ship.parentNode.classList[0] != 'cell89' 
                && ship.parentNode.classList[0] != 'cell99')  {

                if (lengthOfShip == 2) {
                    let cellsFreeForRotation = checkStorage(appendedCell, lengthOfShip)
                    if (cellsFreeForRotation == true) {
                        ship.classList.remove('vertical')
                        ship.classList.add('horizontal')
                    }
                }
                else {
                    if (appendedCell + lengthOfShip -1 != 10 
                        && appendedCell + lengthOfShip -1 != 20 
                        && appendedCell + lengthOfShip -1 != 30 
                        && appendedCell + lengthOfShip -1 != 40
                        && appendedCell + lengthOfShip -1 != 50 
                        && appendedCell + lengthOfShip -1 != 60
                        && appendedCell + lengthOfShip -1 != 70 
                        && appendedCell + lengthOfShip -1 != 80
                        && appendedCell + lengthOfShip -1 != 90 
                        && appendedCell + lengthOfShip -1 < 100) {

                        if (lengthOfShip == 3) {
                            let cellsFreeForRotation = checkStorage(appendedCell, lengthOfShip)
                            if (cellsFreeForRotation == true) {
                                ship.classList.remove('vertical')
                                ship.classList.add('horizontal')
                            }
                        }

                        if (appendedCell + lengthOfShip -1 != 11 
                            && appendedCell + lengthOfShip -1 != 21 
                            && appendedCell + lengthOfShip -1 != 31 
                            && appendedCell + lengthOfShip -1 != 41
                            && appendedCell + lengthOfShip -1 != 51 
                            && appendedCell + lengthOfShip -1 != 61
                            && appendedCell + lengthOfShip -1 != 71 
                            && appendedCell + lengthOfShip -1 != 81
                            && appendedCell + lengthOfShip -1 != 91) {

                            if (lengthOfShip == 4) {
                                let cellsFreeForRotation = checkStorage(appendedCell, lengthOfShip)
                                if (cellsFreeForRotation == true) {
                                    ship.classList.remove('vertical')
                                    ship.classList.add('horizontal')
                                }
                            }

                            if (appendedCell + lengthOfShip -1 != 12 
                                && appendedCell + lengthOfShip -1 != 22 
                                && appendedCell + lengthOfShip -1 != 32 
                                && appendedCell + lengthOfShip -1 != 42
                                && appendedCell + lengthOfShip -1 != 52 
                                && appendedCell + lengthOfShip -1 != 62
                                && appendedCell + lengthOfShip -1 != 72 
                                && appendedCell + lengthOfShip -1 != 82
                                && appendedCell + lengthOfShip -1 != 92) {
    
                                if (lengthOfShip == 5) {
                                    let cellsFreeForRotation = checkStorage(appendedCell, lengthOfShip)
                                    if (cellsFreeForRotation == true) {
                                        ship.classList.remove('vertical')
                                        ship.classList.add('horizontal')
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
    }
    else if (axis == 'vertical') {
        // IF CONDITION TO CHECK IF CELL WILL GO OUT OF BOUNDS IN LAST ROW
        // First determine if ship is vertical or horizontal
        // if it's vertical just the below
        if (shipHeight > shipWidth) {
            ship.classList.remove('horizontal')
            ship.classList.add('vertical')
        }
        // else need to do the bug prevention for moving horizontal
        // Bug to prevent ship overflowing board when rotating ship
        else {
            let lengthOfShip = Math.round(shipWidth / shipHeight)
            let appendedCell = parseInt(ship.parentNode.classList[0].match(/\d+/g))
            if (appendedCell + (lengthOfShip - 1) * 10 < 100) {
                // checkoccupied
                let cellsFreeForRotation = checkStorage(appendedCell, lengthOfShip)
                if (cellsFreeForRotation == true) {
                    ship.classList.remove('horizontal')
                    ship.classList.add('vertical')
                }
            }
        }
    }
}

// ships.forEach(ship => {
//     // Applies the dragging class to ship which alters its style
//     ship.addEventListener('dragstart', e => {
//         ship.classList.add('dragging')
//     })
//     ship.addEventListener('dragend', e => {
//         ship.classList.remove('dragging');
//         toggleHorizontalVertical(ship)
//     });
// })

// // // This would be put into a function where the R key will toggle between cell eventlistners
// cells.forEach(cell => {
//     cell.addEventListener('dragover', (e) => highlightCells(e, cell))
//     cell.addEventListener('dragleave', (e) => unhighlightCells(e, cell))
//     cell.addEventListener('drop', (e) => dropShipOnBoard(e, cell))
// })

export function highlightAllowedPlacement(cell, lengthOfShip) {
    let player1AreaShowing = window.getComputedStyle(document.querySelector('.player1Area')).display
    let player2AreaShowing = window.getComputedStyle(document.querySelector('.player2Area')).display

    // console.log(player2AreaShowing)
    cell.classList.add('moveAllowed')
    if (axis == 'horizontal') {
        let nextCell = cell.nextSibling
        if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveAllowed')
        if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveAllowed')

        for (let i = 0; i < lengthOfShip - 2; i++) {
            nextCell = nextCell.nextSibling
            if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveAllowed')
            if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveAllowed')
        }
    }
    else if (axis == 'vertical') {
        let nextCell = cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
        if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveAllowed')
        if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveAllowed')
        for (let i = 0; i < lengthOfShip - 2; i++) {
            nextCell = nextCell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
            if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveAllowed')
            if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveAllowed')
        }
    }
}

export function highlightNotAllowedPlacement(cell, lengthOfShip) {
    let player1AreaShowing = window.getComputedStyle(document.querySelector('.player1Area')).display
    let player2AreaShowing = window.getComputedStyle(document.querySelector('.player2Area')).display

    cell.classList.add('moveNotAllowed')
    if (axis == 'horizontal') {
        let nextCell = cell.nextSibling
        if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
        if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
        for (let i = 0; i < lengthOfShip - 2; i++) {
            nextCell = nextCell.nextSibling
            if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
            if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
        }
    }
    else if (axis == 'vertical') {
        let nextCell = cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
        if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
        if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
        for (let i = 0; i < lengthOfShip - 2; i++) {
            nextCell = nextCell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
            if (player1AreaShowing != 'none') document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
            if (player2AreaShowing != 'none') document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.add('moveNotAllowed')
        }
    }
}

function removeHoveringClassFromCell(cell, lengthOfShip) {
    let player1AreaShowing = window.getComputedStyle(document.querySelector('.player1Area')).display
    let player2AreaShowing = window.getComputedStyle(document.querySelector('.player2Area')).display

    cell.classList.remove('moveAllowed')
    cell.classList.remove('moveNotAllowed')
    if (axis == 'horizontal') {
        if (cell.nextSibling != null) {
            let nextCell = cell.nextSibling
            if (player1AreaShowing != 'none') {
                document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
            }
            if (player2AreaShowing != 'none') {
                document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
            }
            for (let i = 0; i < lengthOfShip - 2; i++) {
                if (nextCell.nextSibling != null) {
                    nextCell = nextCell.nextSibling
                    if (player1AreaShowing != 'none') {
                        document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                        document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
                    }
                    if (player2AreaShowing != 'none') {
                        document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                        document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
                    }
                }
            }
        }
    }
    else if (axis = 'vertical') {
        let cellNumber = parseInt(cell.classList[0].match(/\d+/g))

        let nextCell = document.querySelector(`.cell${cellNumber + 10}`)

        if (nextCell != null) {
            if (player1AreaShowing != 'none') {
                document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
            }
            if (player2AreaShowing != 'none') {
                document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
            }
            for (let i = 0; i < (lengthOfShip - 1) * 10; i += 10) {

                nextCell = document.querySelector(`.cell${cellNumber + 10 + i}`)

                if (nextCell != null) {
                    if (player1AreaShowing != 'none') {
                        document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                        document.querySelector(`.player1Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
                    }
                    if (player2AreaShowing != 'none') {
                        document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveAllowed')
                        document.querySelector(`.player2Area .${nextCell.classList[0]}`).classList.remove('moveNotAllowed')
                    }
                }
            }
        }
    }
}

function checkPatrolBoatCoordinates(coordinate) {
    for (let j = 0; j < patrolBoatCells.length; j++) {
        let patrolBoatCoordinate = patrolBoatCells[j]
        if (coordinate[0] == patrolBoatCoordinate[0] && coordinate[1] == patrolBoatCoordinate[1]) return false
    }
}

function checkDestroyerCoordinates(coordinate) {
    for (let j = 0; j < destroyerCells.length; j++) {
        let destroyerCoordinate = destroyerCells[j]
        if (coordinate[0] == destroyerCoordinate[0] && coordinate[1] == destroyerCoordinate[1]) return false
    }
}

function checkBattleshipCoordinates(coordinate) {
    for (let j = 0; j < battleshipCells.length; j++) {
        let battleshipCoordinate = battleshipCells[j]
        if (coordinate[0] == battleshipCoordinate[0] && coordinate[1] == battleshipCoordinate[1]) return false
    }
}

function checkCarrierCoordinates(coordinate) {
    for (let j = 0; j < carrierCells.length; j++) {
        let carrierCoordinate = carrierCells[j]
        if (coordinate[0] == carrierCoordinate[0] && coordinate[1] == carrierCoordinate[1]) return false
    }
}

function checkStorage(firstCellNumber, lengthOfShip) {


    if (axis == 'horizontal') {
        for (let i = 0; i < lengthOfShip; i++) {
            let coordinate = getCoordinate(firstCellNumber + i)
            if (lengthOfShip == 2) {
                let destroyerInCells = checkDestroyerCoordinates(coordinate)
                let battleshipInCells = checkBattleshipCoordinates(coordinate)
                let carrierInCells = checkCarrierCoordinates(coordinate)
                if (destroyerInCells == false || battleshipInCells == false || carrierInCells == false) return false
            }
            else if (lengthOfShip == 3) {
                let patrolBoatInCells = checkPatrolBoatCoordinates(coordinate)
                let battleshipInCells = checkBattleshipCoordinates(coordinate)
                let carrierInCells = checkCarrierCoordinates(coordinate)
                if (patrolBoatInCells == false || battleshipInCells == false || carrierInCells == false) return false
            }
            else if (lengthOfShip == 4) {
                let patrolBoatInCells = checkPatrolBoatCoordinates(coordinate)
                let destroyerInCells = checkDestroyerCoordinates(coordinate)
                let carrierInCells = checkCarrierCoordinates(coordinate)
                if (patrolBoatInCells == false || destroyerInCells == false || carrierInCells == false) return false
            }
            else if (lengthOfShip == 5) {
                let patrolBoatInCells = checkPatrolBoatCoordinates(coordinate)
                let destroyerInCells = checkDestroyerCoordinates(coordinate)
                let battleshipInCells = checkBattleshipCoordinates(coordinate)
                if (patrolBoatInCells == false || destroyerInCells == false || battleshipInCells == false) return false
            }
        }
        return true
    }
    else if (axis == 'vertical') {
        for (let i = 0; i < lengthOfShip * 10; i += 10) {
            let coordinate = getCoordinate(firstCellNumber + i)
            if (lengthOfShip == 2) {
                let destroyerInCells = checkDestroyerCoordinates(coordinate)
                let battleshipInCells = checkBattleshipCoordinates(coordinate)
                let carrierInCells = checkCarrierCoordinates(coordinate)
                if (destroyerInCells == false || battleshipInCells == false || carrierInCells == false) return false
            }
            else if (lengthOfShip == 3) {
                let patrolBoatInCells = checkPatrolBoatCoordinates(coordinate)
                let battleshipInCells = checkBattleshipCoordinates(coordinate)
                let carrierInCells = checkCarrierCoordinates(coordinate)
                if (patrolBoatInCells == false || battleshipInCells == false || carrierInCells == false) return false
            }
            else if (lengthOfShip == 4) {
                let patrolBoatInCells = checkPatrolBoatCoordinates(coordinate)
                let destroyerInCells = checkDestroyerCoordinates(coordinate)
                let carrierInCells = checkCarrierCoordinates(coordinate)
                if (patrolBoatInCells == false || destroyerInCells == false || carrierInCells == false) return false
            }
            else if (lengthOfShip == 5) {
                let patrolBoatInCells = checkPatrolBoatCoordinates(coordinate)
                let destroyerInCells = checkDestroyerCoordinates(coordinate)
                let battleshipInCells = checkBattleshipCoordinates(coordinate)
                if (patrolBoatInCells == false || destroyerInCells == false || battleshipInCells == false) return false
            }
        }
        return true
    }

}

function storeOccupiedCells(startingCoordinate, endingCoordinate, lengthOfShip) {

    if (axis == 'horizontal') {
        if (lengthOfShip == 2) {
            patrolBoatCells.push(startingCoordinate)
            for (let i = startingCoordinate[1] + 1; i < endingCoordinate[1]; i++) {
                patrolBoatCells.push([startingCoordinate[0], i])
            }
            patrolBoatCells.push(endingCoordinate)
            // console.log('strored patrol boat: ',patrolBoatCells)
        }
        else if (lengthOfShip == 3) {
            destroyerCells.push(startingCoordinate)
            for (let i = startingCoordinate[1] + 1; i < endingCoordinate[1]; i++) {
                destroyerCells.push([startingCoordinate[0], i])
            }
            destroyerCells.push(endingCoordinate)
            // console.log('strored destroyer: ',destroyerCells)
        }
        else if (lengthOfShip == 4) {
            battleshipCells.push(startingCoordinate)
            for (let i = startingCoordinate[1] + 1; i < endingCoordinate[1]; i++) {
                battleshipCells.push([startingCoordinate[0], i])
            }
            battleshipCells.push(endingCoordinate)
            // console.log('strored battleship: ',battleshipCells)
        }
        else if (lengthOfShip == 5) {
            carrierCells.push(startingCoordinate)
            for (let i = startingCoordinate[1] + 1; i < endingCoordinate[1]; i++) {
                carrierCells.push([startingCoordinate[0], i])
            }
            carrierCells.push(endingCoordinate)
            // console.log('strored carrier: ',carrierCells)
        }
    }
    else if (axis == 'vertical') {
        if (lengthOfShip == 2) {
            patrolBoatCells.push(startingCoordinate)
            for (let i = startingCoordinate[0] + 1; i < endingCoordinate[0]; i++) {
                patrolBoatCells.push([i, startingCoordinate[1]])
            }
            patrolBoatCells.push(endingCoordinate)
            console.log('strored patrol boat: ',patrolBoatCells)
        }
        else if (lengthOfShip == 3) {
            destroyerCells.push(startingCoordinate)
            for (let i = startingCoordinate[0] + 1; i < endingCoordinate[0]; i++) {
                destroyerCells.push([i, startingCoordinate[1]])
            }
            destroyerCells.push(endingCoordinate)
            console.log('strored destroyer: ',destroyerCells)
        }
        else if (lengthOfShip == 4) {
            battleshipCells.push(startingCoordinate)
            for (let i = startingCoordinate[0] + 1; i < endingCoordinate[0]; i++) {
                battleshipCells.push([i, startingCoordinate[1]])
            }
            battleshipCells.push(endingCoordinate)
            console.log('strored battleship: ',battleshipCells)
        }
        else if (lengthOfShip == 5) {
            carrierCells.push(startingCoordinate)
            for (let i = startingCoordinate[0] + 1; i < endingCoordinate[0]; i++) {
                carrierCells.push([i, startingCoordinate[1]])
            }
            carrierCells.push(endingCoordinate)
            console.log('strored carrier: ',carrierCells)
        }
    }
}

export const highlightCells = (e, cell) => {
    e.preventDefault()
    const ship = document.querySelector('.dragging')
    const cellWidth = cell.offsetWidth;
    const shipWidth = ship.offsetWidth;
    const shipHeight = ship.offsetHeight;
    let firstCellNumber = parseInt(cell.classList[0].match(/\d+/g))


    if (axis == 'horizontal') {
        let lengthOfShip;
        if (ship.classList[1] == 'vertical') {
            lengthOfShip = Math.round(shipHeight / cellWidth)
            // console.log('vertical ship',lengthOfShip)
        }
        else if (ship.classList[1] == 'horizontal') {
            lengthOfShip = Math.round(shipWidth / cellWidth)
            // console.log('horizontal ship',lengthOfShip)
        }
        if (cell.classList[0] != 'cell09' 
            && cell.classList[0] != 'cell19' 
            && cell.classList[0] != 'cell29' 
            && cell.classList[0] != 'cell39' 
            && cell.classList[0] != 'cell49' 
            && cell.classList[0] != 'cell59' 
            && cell.classList[0] != 'cell69' 
            && cell.classList[0] != 'cell79' 
            && cell.classList[0] != 'cell89' 
            && cell.classList[0] != 'cell99') {

            let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
            let lastCellNumber = firstCellNumber + lengthOfShip - 1 

            if (lengthOfShip == 2) {
                if (unoccupiedCells == true) {
                    highlightAllowedPlacement(cell, lengthOfShip)
                }
                else {
                    highlightNotAllowedPlacement(cell, lengthOfShip)
                }
            }
            // For ships that are  longer than 2
            else {
                if (lastCellNumber != 10 && lastCellNumber != 20 
                    && lastCellNumber != 30 && lastCellNumber != 40
                    && lastCellNumber != 50 && lastCellNumber != 60
                    && lastCellNumber != 70 && lastCellNumber != 80
                    && lastCellNumber != 90 && lastCellNumber < 100) {
    
                    if (lengthOfShip == 3) {
                        if (unoccupiedCells == true) {
                            highlightAllowedPlacement(cell, lengthOfShip)
                        }
                        else {
                            highlightNotAllowedPlacement(cell, lengthOfShip)
                        }
                    }
    
                    if (lengthOfShip == 4
                        && lastCellNumber != 11 && lastCellNumber != 21 
                        && lastCellNumber != 31 && lastCellNumber != 41
                        && lastCellNumber != 51 && lastCellNumber != 61
                        && lastCellNumber != 71 && lastCellNumber != 81
                        && lastCellNumber != 91) {
                        
                        if (unoccupiedCells == true) {
                            highlightAllowedPlacement(cell, lengthOfShip)
                        }
                        else {
                            highlightNotAllowedPlacement(cell, lengthOfShip)
                        }             
                    }
    
                    if (lengthOfShip == 5
                        && lastCellNumber != 11 && lastCellNumber != 12 
                        && lastCellNumber != 21 && lastCellNumber != 22
                        && lastCellNumber != 31 && lastCellNumber != 32
                        && lastCellNumber != 41 && lastCellNumber != 42
                        && lastCellNumber != 51 && lastCellNumber != 52
                        && lastCellNumber != 61 && lastCellNumber != 62 
                        && lastCellNumber != 71 && lastCellNumber != 72
                        && lastCellNumber != 81 && lastCellNumber != 82
                        && lastCellNumber != 91 && lastCellNumber != 92) {
    
                        if (unoccupiedCells == true) {
                            highlightAllowedPlacement(cell, lengthOfShip)
                        }
                        else {
                            highlightNotAllowedPlacement(cell, lengthOfShip)
                        }
    
                    }
                }
            }
        }
    }
    else if (axis == 'vertical') {
        let lengthOfShip;
        if (ship.classList[1] == 'vertical') {
            lengthOfShip = Math.round(shipHeight / cellWidth)
        }
        else if (ship.classList[1] == 'horizontal') {
            lengthOfShip = Math.round(shipWidth / cellWidth)
        }
        if (cell.classList[0] != 'cell90' 
            && cell.classList[0] != 'cell91' 
            && cell.classList[0] != 'cell92' 
            && cell.classList[0] != 'cell93' 
            && cell.classList[0] != 'cell94' 
            && cell.classList[0] != 'cell95' 
            && cell.classList[0] != 'cell96' 
            && cell.classList[0] != 'cell97' 
            && cell.classList[0] != 'cell98' 
            && cell.classList[0] != 'cell99') {

            let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
            let lastCellNumber = firstCellNumber + (lengthOfShip - 1) * 10  

            if (lengthOfShip == 2) {
                if (unoccupiedCells == true) {
                    highlightAllowedPlacement(cell, lengthOfShip)
                }
                else {
                    highlightNotAllowedPlacement(cell, lengthOfShip)
                }
            }
            // For ships that are  longer than 2
            
            else {
                if (lastCellNumber < 100) {
                    if (unoccupiedCells == true) {
                        highlightAllowedPlacement(cell, lengthOfShip)
                    }
                    else {
                        highlightNotAllowedPlacement(cell, lengthOfShip)
                    }
                }
            }
        }
        
    }
}

export const unhighlightCells = (e, cell) => {
    e.preventDefault()
    const ship = document.querySelector('.dragging')
    const cellWidth = cell.offsetWidth; 
    const shipWidth = ship.offsetWidth;
    const shipHeight = ship.offsetHeight;
    if (axis == 'horizontal') {
        let lengthOfShip
        if (ship.classList[1] == 'vertical') {
            lengthOfShip = Math.round(shipHeight / cellWidth)
        }
        else if (ship.classList[1] == 'horizontal') {
            lengthOfShip = Math.round(shipWidth / cellWidth)
        }
        removeHoveringClassFromCell(cell, lengthOfShip)
    }
    else if (axis == 'vertical') {
        let lengthOfShip
        if (ship.classList[1] == 'vertical') {
            lengthOfShip = Math.round(shipHeight / cellWidth)
        }
        else if (ship.classList[1] == 'horizontal') {
            lengthOfShip = Math.round(shipWidth / cellWidth)
        }
        removeHoveringClassFromCell(cell, lengthOfShip)
    }
}

export const dropShipOnBoard = (e, cell) => {
    e.preventDefault()
    const ship = document.querySelector('.dragging');


    if(ship) {
        const cellWidth = cell.offsetWidth; 
        let firstCellNumber = parseInt(cell.classList[0].match(/\d+/g))
        const shipWidth = ship.offsetWidth;
        const shipHeight = ship.offsetHeight;

        if (axis == 'horizontal') {
            if (cell.classList[0] != 'cell09' 
                && cell.classList[0] != 'cell19' 
                && cell.classList[0] != 'cell29' 
                && cell.classList[0] != 'cell39' 
                && cell.classList[0] != 'cell49' 
                && cell.classList[0] != 'cell59' 
                && cell.classList[0] != 'cell69' 
                && cell.classList[0] != 'cell79' 
                && cell.classList[0] != 'cell89' 
                && cell.classList[0] != 'cell99') {
                
                let lengthOfShip
                if (ship.classList[1] == 'vertical') {
                    lengthOfShip = Math.round(shipHeight / cellWidth)
                }
                else if (ship.classList[1] == 'horizontal') {
                    lengthOfShip = Math.round(shipWidth / cellWidth)
                }
                let lastCellNumber = firstCellNumber + lengthOfShip - 1

                if (lengthOfShip == 2) {
                    removeHoveringClassFromCell(cell, lengthOfShip)  
                    let startingCoordinate = getCoordinate(firstCellNumber)
                    let endingCoordinate = getCoordinate(lastCellNumber)
                    let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
                    if (unoccupiedCells == true) {
                        appendShipToCell(cell, ship)
                        removeCellsFromStorage(lengthOfShip)
                        storeOccupiedCells(startingCoordinate, endingCoordinate, lengthOfShip)
                    }
                }
                else {
                    if (lastCellNumber != 10 && lastCellNumber != 20 
                        && lastCellNumber != 30 && lastCellNumber != 40
                        && lastCellNumber != 50 && lastCellNumber != 60
                        && lastCellNumber != 70 && lastCellNumber != 80
                        && lastCellNumber != 90 && lastCellNumber < 100) {
        
                        if (lengthOfShip == 3) {
                            removeHoveringClassFromCell(cell, lengthOfShip)
                            let startingCoordinate = getCoordinate(firstCellNumber)
                            let endingCoordinate = getCoordinate(lastCellNumber)
                            let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
                            if (unoccupiedCells == true) {
                                appendShipToCell(cell, ship)
                                removeCellsFromStorage(lengthOfShip)
                                storeOccupiedCells(startingCoordinate, endingCoordinate, lengthOfShip)
                            }
                        }
        
                        if (lengthOfShip == 4
                            && lastCellNumber != 11 && lastCellNumber != 21 
                            && lastCellNumber != 31 && lastCellNumber != 41
                            && lastCellNumber != 51 && lastCellNumber != 61
                            && lastCellNumber != 71 && lastCellNumber != 81
                            && lastCellNumber != 91) {
        
                            removeHoveringClassFromCell(cell, lengthOfShip)
                            let startingCoordinate = getCoordinate(firstCellNumber)
                            let endingCoordinate = getCoordinate(lastCellNumber)
                            let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
                            if (unoccupiedCells == true) {
                                appendShipToCell(cell, ship)
                                removeCellsFromStorage(lengthOfShip)
                                storeOccupiedCells(startingCoordinate, endingCoordinate, lengthOfShip)
                            }
                        }
        
                        if (lengthOfShip == 5
                            && lastCellNumber != 11 && lastCellNumber != 12 
                            && lastCellNumber != 21 && lastCellNumber != 22
                            && lastCellNumber != 31 && lastCellNumber != 32
                            && lastCellNumber != 41 && lastCellNumber != 42
                            && lastCellNumber != 51 && lastCellNumber != 52
                            && lastCellNumber != 61 && lastCellNumber != 62 
                            && lastCellNumber != 71 && lastCellNumber != 72
                            && lastCellNumber != 81 && lastCellNumber != 82
                            && lastCellNumber != 91 && lastCellNumber != 92) {
        
                            removeHoveringClassFromCell(cell, lengthOfShip)
                            let startingCoordinate = getCoordinate(firstCellNumber)
                            let endingCoordinate = getCoordinate(lastCellNumber)
                            let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
                            if (unoccupiedCells == true) {
                                appendShipToCell(cell, ship)
                                removeCellsFromStorage(lengthOfShip)
                                storeOccupiedCells(startingCoordinate, endingCoordinate, lengthOfShip)
                            }
                            
                        }
                    } 
                }
            }
        }
        else if (axis == 'vertical') {
            if (cell.classList[0] != 'cell90' 
                && cell.classList[0] != 'cell91' 
                && cell.classList[0] != 'cell92' 
                && cell.classList[0] != 'cell93' 
                && cell.classList[0] != 'cell94' 
                && cell.classList[0] != 'cell95' 
                && cell.classList[0] != 'cell96' 
                && cell.classList[0] != 'cell97' 
                && cell.classList[0] != 'cell98' 
                && cell.classList[0] != 'cell99') {

                let lengthOfShip
                if (ship.classList[1] == 'vertical') {
                    lengthOfShip = Math.round(shipHeight / cellWidth)
                }
                else if (ship.classList[1] == 'horizontal') {
                    lengthOfShip = Math.round(shipWidth / cellWidth)
                }
                let lastCellNumber = firstCellNumber + (lengthOfShip - 1) * 10

                if (lengthOfShip == 2) {
                    removeHoveringClassFromCell(cell, lengthOfShip)
                    let startingCoordinate = getCoordinate(firstCellNumber)
                    let endingCoordinate = getCoordinate(lastCellNumber)
                    let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
                    if (unoccupiedCells == true) {
                        appendShipToCell(cell, ship)
                        removeCellsFromStorage(lengthOfShip)
                        storeOccupiedCells(startingCoordinate, endingCoordinate, lengthOfShip)
                    }
                }
                else {
                    if (lastCellNumber < 100) {
                        removeHoveringClassFromCell(cell, lengthOfShip)
                        let startingCoordinate = getCoordinate(firstCellNumber)
                        let endingCoordinate = getCoordinate(lastCellNumber)
                        let unoccupiedCells = checkStorage(firstCellNumber, lengthOfShip)
                        if (unoccupiedCells == true) {
                            appendShipToCell(cell, ship)
                            removeCellsFromStorage(lengthOfShip)
                            storeOccupiedCells(startingCoordinate, endingCoordinate, lengthOfShip)
                        }
                    }
                }
            }
        }
        displayContinueButton()
        
    }
}

function displayContinueButton() {
    let player1AreaShowing = window.getComputedStyle(document.querySelector('.player1Area')).display
    let player2AreaShowing = window.getComputedStyle(document.querySelector('.player2Area')).display

    const shipyard1 = document.querySelector('.player1Area .shipyard')
    const shipyard2 = document.querySelector('.player2Area .shipyard')

    if (player1AreaShowing != 'none') {
        if (shipyard1.childElementCount == 1) {
            document.querySelector('#submitPlayer1Ships').style.display = ''
        }
    }
    console.log(shipyard2.childElementCount)
    if (player2AreaShowing != 'none') {
        if (shipyard2.childElementCount == 1) {
            document.querySelector('#submitPlayer2Ships').style.display = ''
        }
    }
}