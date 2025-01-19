import './style.css';

import { 
  patrolBoatCells,
  destroyerCells,
  battleshipCells,
  carrierCells,
  createPlayer1Board, 
  createPlayer1BoardState,
  createPlayer2Board,
  createPlayer2BoardState,
  toggleHorizontalVertical,
  highlightCells,
  unhighlightCells,
  dropShipOnBoard,
  clearAllStorage,
  resetOrientation,
  axis,
  getCoordinate
} from './gameboard-UI';

import { Ship } from './shipClass'
import { Player } from './player'
import { loadForm, togglePlayer2 } from './form';

let player1
let player2
let player1name
let player2name
let twoPlayerGame = false
let playerTurn = 'player1'

// Load form
function form() {
  loadForm()
  togglePlayer2()
  // submitNames()
  document.querySelector('.gameArea').style.display = 'None'
  document.querySelector('.textArea').style.display = 'none'
}
form()

const submitNamesButton = document.getElementById('submitNames')
submitNamesButton.addEventListener('click', (e) => {
  e.preventDefault()
  player1name = document.getElementById('player1Name').value
  player1 = new Player(player1name, 'Real')
  player2name = document.getElementById('player2Name').value
  document.querySelector('.player1Name').textContent = `${player1name}'s Board`

  console.log(player1)
  if (document.getElementById('player2ToPlay').checked != true) {
    player2 = new Player('Computer', 'Fake')
    document.querySelector('.player2Name').textContent = `Computer's Board`
    console.log(player2)
  }
  else {
    player2 = new Player(player2name, 'Real')
    console.log(player2)
    document.querySelector('.player2Name').textContent = `${player2name}'s Board`
    twoPlayerGame = true
  }
  document.querySelector('.form').style.display = 'None'
  document.querySelector('.formContainer').style.display = 'None'
  document.querySelector('.gameArea').style.display = ''
  document.querySelector('.player2Area').style.display = 'None'
  document.querySelector('.player1BoardState').style.display = 'none'
  document.querySelector('.textArea').style.display = ''
  document.querySelector('.nextPlayerTurn').style.display = 'none'
})

// Load board
createPlayer1Board()
activatePlayer1Board()

function activatePlayer1Board() {
  const player1Ships = document.querySelectorAll('.player1Area .ship');
  const player1Cells = document.querySelectorAll('.player1Area .cell');
  
  const submitPlayer1Ships = document.getElementById('submitPlayer1Ships')
  
  player1Ships.forEach(ship => {
    // Applies the dragging class to ship which alters its style
    ship.addEventListener('dragstart', e => {
        ship.classList.add('dragging')
    })
    ship.addEventListener('dragend', e => {
        ship.classList.remove('dragging');
        toggleHorizontalVertical(ship)
    });
  })
  
  player1Cells.forEach(cell => {
    cell.addEventListener('dragover', (e) => highlightCells(e, cell))
    cell.addEventListener('dragleave', (e) => unhighlightCells(e, cell))
    cell.addEventListener('drop', (e) => dropShipOnBoard(e, cell))
  })
  
  submitPlayer1Ships.style.display = 'none'
  submitPlayer1Ships.addEventListener('click', createPlayer1Ships)
}

function activatePlayer2Board() {
  const player2Ships = document.querySelectorAll('.player2Area .ship');
  const player2Cells = document.querySelectorAll('.player2Area .cell');
  
  const submitPlayer2Ships = document.getElementById('submitPlayer2Ships')
  
  player2Ships.forEach(ship => {
    // Applies the dragging class to ship which alters its style
    ship.addEventListener('dragstart', e => {
        ship.classList.add('dragging')
    })
    ship.addEventListener('dragend', e => {
        ship.classList.remove('dragging');
        toggleHorizontalVertical(ship)
    });
  })
  
  player2Cells.forEach(cell => {
    cell.addEventListener('dragover', (e) => highlightCells(e, cell))
    cell.addEventListener('dragleave', (e) => unhighlightCells(e, cell))
    cell.addEventListener('drop', (e) => dropShipOnBoard(e, cell))
  })
  
  submitPlayer2Ships.style.display = 'none'
  submitPlayer2Ships.addEventListener('click', createPlayer2Ships)
}

createPlayer2Board()


function createPlayer1Ships() {
  console.log(patrolBoatCells)
  console.log(destroyerCells)
  console.log(battleshipCells)
  console.log(carrierCells)
  const patrolBoat1 = new Ship('Patrol Boat', 2)
  const destroyer1 = new Ship('Destroyer', 3)
  const battleship1 = new Ship('Battleship', 4)
  const carrier1 = new Ship('Carrier', 5)

  player1.gameboard.placeShip(patrolBoat1, patrolBoatCells[0][0], patrolBoatCells[0][1], patrolBoatCells[1][0], patrolBoatCells[1][1], 'player1')
  player1.gameboard.placeShip(destroyer1, destroyerCells[0][0], destroyerCells[0][1], destroyerCells[2][0], destroyerCells[2][1], 'player1')
  player1.gameboard.placeShip(battleship1, battleshipCells[0][0], battleshipCells[0][1], battleshipCells[3][0], battleshipCells[3][1], 'player1')
  player1.gameboard.placeShip(carrier1, carrierCells[0][0], carrierCells[0][1], carrierCells[4][0], carrierCells[4][1], 'player1')

  console.log(player1)
  if (twoPlayerGame == true) {
    console.log(axis)
    resetOrientation()
    console.log(axis)
    clearAllStorage()
    document.querySelector('.player1Area').style.display = 'None'
    document.querySelector('.player2Area').style.display = ''
    document.querySelector('.player2BoardState').style.display = 'None'
    document.querySelector('#submitPlayer1Ships').textContent = 'Continue'
    activatePlayer2Board()
  }
  else {
    // startgame
    startPlayer1VsComputerGame()
  }
}

function createPlayer2Ships() {
  console.log(patrolBoatCells)
  console.log(destroyerCells)
  console.log(battleshipCells)
  console.log(carrierCells)
  const patrolBoat2 = new Ship('Patrol Boat', 2)
  const destroyer2 = new Ship('Destroyer', 3)
  const battleship2 = new Ship('Battleship', 4)
  const carrier2 = new Ship('Carrier', 5)

  player2.gameboard.placeShip(patrolBoat2, patrolBoatCells[0][0], patrolBoatCells[0][1], patrolBoatCells[1][0], patrolBoatCells[1][1], 'player2')
  player2.gameboard.placeShip(destroyer2, destroyerCells[0][0], destroyerCells[0][1], destroyerCells[2][0], destroyerCells[2][1], 'player2')
  player2.gameboard.placeShip(battleship2, battleshipCells[0][0], battleshipCells[0][1], battleshipCells[3][0], battleshipCells[3][1], 'player2')
  player2.gameboard.placeShip(carrier2, carrierCells[0][0], carrierCells[0][1], carrierCells[4][0], carrierCells[4][1], 'player2')

  console.log(player2)

  //startgame
  startTwoPlayerGame()
}

function deactiveComputerCells() {
  document.querySelector('.player2BoardState').style.display = 'none'
  document.querySelector('.player2Board').style.display = ''

}

function deactivatePlayerCells() {
  document.querySelector('.player2BoardState').style.display = 'none'
  document.querySelector('.player2Board').style.display = ''
  document.querySelector('.player1BoardState').style.display = 'none'
  document.querySelector('.player1Board').style.display = ''
}

function player1ReceiveAttackEventListiners() {
  const player1Board = document.querySelector('.player1BoardState')
  const cells = player1Board.querySelectorAll('.cell')
  cells.forEach((cell) => {
    cell.addEventListener('click', () => attackPlayer1Ships(cell), { once: true })
  })
}

function player2ReceiveAttackEventListiners() {
  const player2ReceiveAttackCells = document.querySelectorAll('.player2BoardState .cell')
  player2ReceiveAttackCells.forEach( (cell) => {
    cell.addEventListener('click', () => attackPlayer2Ships(cell), { once: true })
  })
}

function attackPlayer1Ships(cell) {
  let cellNumber = parseInt(cell.classList[0].match(/\d+/g))
  console.log(cellNumber)
  let receiveAttackCoordinate = getCoordinate(cellNumber)
  console.log(receiveAttackCoordinate)
  let hitOrMiss = player1.gameboard.receiveAttack(receiveAttackCoordinate[0], receiveAttackCoordinate[1])
  markAttackOnBoard('player1',hitOrMiss, receiveAttackCoordinate[0], receiveAttackCoordinate[1])
  console.log(hitOrMiss)
  if (player2.gameboard.allShipsSunk() == 'All ships sunk') {
    console.log('Player 2 Won')
    document.querySelector('.message').textContent = `${player2name} Won`
    deactivatePlayerCells()
  }
  else {
    document.querySelector('.message').textContent = `${player1name} turn`
    document.querySelector('.nextPlayerTurn').style.display = ''
    document.querySelector('.nextPlayerTurn').textContent = `Ready ${player1name}`
    const player2Ships = document.querySelectorAll('.player2Board .ship')
    player2Ships.forEach(ship => {
      ship.style.display = 'none'
    })
    document.querySelector('.player1BoardState').style.display = 'none'
    document.querySelector('.player1Board').style.display = ''
    const player1Ships = document.querySelectorAll('.player1Board .ship')
    player1Ships.forEach(ship => {
      ship.style.display = 'none'
    })
  }
}

function attackPlayer2Ships(cell) {
  let cellNumber = parseInt(cell.classList[0].match(/\d+/g))
  console.log(cellNumber)
  let receiveAttackCoordinate = getCoordinate(cellNumber)
  console.log(receiveAttackCoordinate)
  let hitOrMiss = player2.gameboard.receiveAttack(receiveAttackCoordinate[0], receiveAttackCoordinate[1])
  markAttackOnBoard('player2',hitOrMiss, receiveAttackCoordinate[0], receiveAttackCoordinate[1])
  console.log(hitOrMiss)
  if (player2.gameboard.allShipsSunk() == 'All ships sunk') {
    console.log('Player 1 Won')
    document.querySelector('.message').textContent = `${player1name} Won`
    deactivatePlayerCells()
  }
  else {
    document.querySelector('.message').textContent = `${player2name} turn`
    document.querySelector('.nextPlayerTurn').style.display = ''
    document.querySelector('.nextPlayerTurn').textContent = `Ready ${player2name}`
    const player1Ships = document.querySelectorAll('.player1Board .ship')
    player1Ships.forEach(ship => {
      ship.style.display = 'none'
    })
    document.querySelector('.player2BoardState').style.display = 'none'
    document.querySelector('.player2Board').style.display = ''
    const player2Ships = document.querySelectorAll('.player2Board .ship')
    player2Ships.forEach(ship => {
      ship.style.display = 'none'
    })
  }
}

const nextPlayerButton = document.querySelector('.nextPlayerTurn')
nextPlayerButton.addEventListener('click', nextPlayerTurn)

function nextPlayerTurn() {

  if (playerTurn == 'player1') {
    document.querySelector('.player1Board').style.display = 'None'
    const player1Ships = document.querySelectorAll('.player1Board .ship')
    player1Ships.forEach(ship => {
      ship.style.display = 'none'
    })
    document.querySelector('.player2BoardState').style.display = 'None'
    document.querySelector('.player2Board').style.display = ''
    document.querySelector('.player1BoardState').style.display = ''
    document.querySelector('.nextPlayerTurn').style.display = 'none'
    const player2Ships = document.querySelectorAll('.player2Board .ship')
    player2Ships.forEach(ship => {
      ship.style.display = ''
    })
    playerTurn = 'player2'
  }
  else if (playerTurn == 'player2') {
    document.querySelector('.player2Board').style.display = 'None'
    const player2Ships = document.querySelectorAll('.player2Board .ship')
    player2Ships.forEach(ship => {
      ship.style.display = 'none'
    })
    document.querySelector('.player1BoardState').style.display = 'None'
    document.querySelector('.player1Board').style.display = ''
    document.querySelector('.player2BoardState').style.display = ''
    document.querySelector('.nextPlayerTurn').style.display = 'none'
    const player1Ships = document.querySelectorAll('.player1Board .ship')
    player1Ships.forEach(ship => {
      ship.style.display = ''
    })
    playerTurn = 'player1'
  }
}

function startTwoPlayerGame() {
  createPlayer1BoardState()
  createPlayer2BoardState()
  player1ReceiveAttackEventListiners()
  player2ReceiveAttackEventListiners()
  document.querySelector('.player1Area .shipyard').style.display = 'none'
  document.querySelector('.player2Area .shipyard').style.display = 'none'
  document.querySelector('.orientation').style.display = 'none'
  document.querySelector('.message').textContent = `${player1name} turn`

  document.querySelector('.player1Area').style.display = ''
  document.querySelector('.player2BoardState').style = ''
  const hideplayer2Board = document.querySelector('.player2Board')

  const hideplayer1BoardState = document.querySelector('.player1BoardState')
  const hideplayer2BoardState = document.querySelector('.player2BoardState')


  hideplayer2Board.style.display = 'None'    // hide
  // hideplayer2Board.style.display = ''        // display

  hideplayer1BoardState.style.display = 'None'
}

function startPlayer1VsComputerGame() {
  const patrolBoat2 = new Ship('Patrol Boat', 2)
  const destroyer2 = new Ship('Destroyer', 3)
  const battleship2 = new Ship('Battleship', 4)
  const carrier2 = new Ship('Carrier', 5)

  computerPlaceShips(patrolBoat2)
  computerPlaceShips(destroyer2)
  computerPlaceShips(battleship2)
  computerPlaceShips(carrier2)
  
  createPlayer1BoardState()
  createPlayer2BoardState()
  document.querySelector('.player1BoardState').style.display = 'none'
  document.querySelector('.orientation').style.display = 'none'
  document.querySelector('.message').textContent = ''
  const player1Shipyard = document.querySelector('.player1Area .shipyard')
  player1Shipyard.style.display = 'none'
  const player2Area = document.querySelector('.player2Area')
  const player2Shipyard = player2Area.querySelector('.shipyard')
  const player2Board = player2Area.querySelector('.player2Board')
  const player2BoardState = player2Area.querySelector('.player2BoardState')


  player2Area.style.display = ''
  player2Shipyard.style.display = 'none'
  player2Board.style.display = 'none'

  const player2ReceiveAttackCells = document.querySelectorAll('.player2BoardState .cell')
  player2ReceiveAttackCells.forEach( (cell) => {
    cell.addEventListener('click', () => {
      let cellNumber = parseInt(cell.classList[0].match(/\d+/g))
      console.log(cellNumber)
      let receiveAttackCoordinate = getCoordinate(cellNumber)
      console.log(receiveAttackCoordinate)
      let hitOrMiss = player2.gameboard.receiveAttack(receiveAttackCoordinate[0], receiveAttackCoordinate[1])
      markAttackOnBoard('player2',hitOrMiss, receiveAttackCoordinate[0], receiveAttackCoordinate[1])
      console.log(hitOrMiss)
      if (player2.gameboard.allShipsSunk() == 'All ships sunk') {
        console.log('Player 1 Won')
        document.querySelector('.message').textContent = `${player1name} Won`
        deactiveComputerCells()
      }
      else {
        computerTurn()
      }
    }, {once: true})
  })
}

function computerTurn() {
  // keeping track of board state so it doesn't reuse co-ordinates
  const emptyCells = []

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (player1.gameboard.boardState[i][j] == null) {
        emptyCells.push([i, j])
      }
    }
  }

  console.log(emptyCells)

  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  let attackCoordinates = emptyCells[randomIndex]
  console.log(attackCoordinates)
  let [vertical, horizontal] = attackCoordinates
  console.log(vertical, horizontal)

  let hitOrMiss = player1.gameboard.receiveAttack(vertical, horizontal)
  console.log(player1.gameboard.boardState)
  // document.querySelector('.player2Board').style.display = 'None'
  document.querySelector('.player1BoardState').style.display = 'None'
  document.querySelector('.player1Board').style.display = ''
  // document.querySelector('.player2BoardState').style.display = ''
  markAttackOnBoard('player1', hitOrMiss, vertical, horizontal)
  // stop playing after 'all ships sunk returned'
  // player1.gameboard.allShipsSunk()
  if (player1.gameboard.allShipsSunk() == 'All ships sunk') {
      console.log('Player 2 Won')
      document.querySelector('.message').textContent = `Computer Won`
    deactiveComputerCells()
  }

  // let vertical = Math.floor(Math.random() * 10)
  // let horizontal = Math.floor(Math.random() * 10)

}

function computerPlaceShips(ship) {

  let shipPlaced = false

  while(!shipPlaced) {
      // generate 1 or 2
      let randomPlacement = Math.floor(Math.random() * (2 - 1 + 1)) + 1

      // generate numbers between 0 & 9 inclusive
      let verticalStart = Math.floor(Math.random() * (9 - 0 + 1)) + 0

      let horizontalStart = Math.floor(Math.random() * (9 - 0 + 1)) + 0
      // Vertical placement = 1
      if (randomPlacement == 1) {
          // if statement to check if there's enough space on the board
          let verticalEnd = verticalStart + ship.length - 1
          let horizontalEnd = horizontalStart
          let placement = player2.gameboard.placeShip(ship, verticalStart, horizontalStart, verticalEnd, horizontalEnd, 'player2')
          if (placement == `${ship.name} placed`) {
              shipPlaced = true
          }
      }
      // Horizontal placement = 2
      else if (randomPlacement == 2) {
          let horizontalEnd = horizontalStart + ship.length - 1
          let verticalEnd = verticalStart
          let placement = player2.gameboard.placeShip(ship, verticalStart, horizontalStart, verticalEnd, horizontalEnd, 'player2')
          if (placement == `${ship.name} placed`) {
              shipPlaced = true
          }
      }

  }
}


function markAttackOnBoard(player, hitOrMiss,vertical, horizontal) {
  // Computer
    if (player == 'player1') {
      const board = document.querySelector('.player1Board')
      const boardState = document.querySelector('.player1BoardState')
      console.log(board.childElementCount)
      console.log(board.querySelector(`.cell${vertical}${horizontal} > div`))
      if (board.querySelector(`.cell${vertical}${horizontal} > div`) != null) {
        const cellWithAppendedShip = board.querySelector(`.cell${vertical}${horizontal} > div`) 
        const textCell = document.createElement('div')
        textCell.textContent = '•'
        cellWithAppendedShip.appendChild(textCell)
      }
      else {
        board.querySelector(`.cell${vertical}${horizontal}`).textContent += '•'
      }
      boardState.querySelector(`.cell${vertical}${horizontal}`).textContent += '•'
      if (hitOrMiss == 'Hit') {
        let cell = board.querySelector(`.cell${vertical}${horizontal}`)
        let cellState = boardState.querySelector(`.cell${vertical}${horizontal}`)
        cell.classList.add('hit')
        cellState.classList.add('hit')
      }
      else if (hitOrMiss == 'Miss') {
        let cell = board.querySelector(`.cell${vertical}${horizontal}`)
        let cellState = boardState.querySelector(`.cell${vertical}${horizontal}`)
        cell.classList.add('miss')
        cellState.classList.add('miss')
      }
      else {
        // Show ship that was sunk on board
        // retrieve ship name
        hitOrMiss = hitOrMiss.replace(' sunk', '')
        console.log(hitOrMiss)
        let ships = player1.gameboard.ships
        let length
        console.log(ships)
        for (const ship of ships) {
          if (ship.name == hitOrMiss) {
            length = ship.length
          }
        }
        console.log(length)

        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (player1.gameboard.board[i][j] != null) {
              // console.log(player1.gameboard.board[i][j].name)
              if (player1.gameboard.board[i][j].name == hitOrMiss) {
                console.log(player1.gameboard.board[i][j].name)
                console.log(`${i}${j}`)
                // const player1BoardState = document.querySelector('.player1Board')
                const cell = board.querySelector(`.cell${i}${j}`)
                const cellState = boardState.querySelector(`.cell${i}${j}`)
                const explodeIcon = document.createElement('i')
                explodeIcon.classList.add('fa-solid')
                explodeIcon.classList.add('fa-explosion')
                const explodeIcon2 = explodeIcon.cloneNode(true)
                cell.classList.add('hit')
                cellState.classList.add('hit')
                cell.classList.add('destroyed')
                cellState.classList.add('destroyed')
                // console.log(cell)
                cell.textContent = ''
                cellState.textContent = ''
                console.log(cell)
                console.log(explodeIcon)
                cell.appendChild(explodeIcon)
                cellState.appendChild(explodeIcon2)
                }
              }
            }
          }
 
      }
    }
    else if (player == 'player2') {
      const board = document.querySelector('.player2Board')
      const boardState = document.querySelector('.player2BoardState')
      if (board.querySelector(`.cell${vertical}${horizontal} > div`) != null) {
        const cellWithAppendedShip = board.querySelector(`.cell${vertical}${horizontal} > div`) 
        const textCell = document.createElement('div')
        textCell.textContent = '•'
        cellWithAppendedShip.appendChild(textCell)
      }
      else {
        board.querySelector(`.cell${vertical}${horizontal}`).textContent += '•'
      }
      boardState.querySelector(`.cell${vertical}${horizontal}`).textContent += '•'
      if (hitOrMiss == 'Hit') {
        let cell = board.querySelector(`.cell${vertical}${horizontal}`)
        let cellState = boardState.querySelector(`.cell${vertical}${horizontal}`)
        cell.classList.add('hit')
        cellState.classList.add('hit')
      }
      else if (hitOrMiss == 'Miss') {
        let cell = board.querySelector(`.cell${vertical}${horizontal}`)
        let cellState = boardState.querySelector(`.cell${vertical}${horizontal}`)
        cell.classList.add('miss')
        cellState.classList.add('miss')
      }
      else {
        // Show ship that was sunk on board
        // retrieve ship name

        hitOrMiss = hitOrMiss.replace(' sunk', '')
        console.log(hitOrMiss)
        let ships = player2.gameboard.ships
        let length
        console.log(ships)
        for (const ship of ships) {
          if (ship.name == hitOrMiss) {
            length = ship.length
          }
        }
        console.log(length)

        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (player2.gameboard.board[i][j] != null) {
              // console.log(player2.gameboard.board[i][j].name)
              if (player2.gameboard.board[i][j].name == hitOrMiss) {
                console.log(player2.gameboard.board[i][j].name)
                console.log(`${i}${j}`)
                // const player1BoardState = document.querySelector('.player1Board')
                const cell = board.querySelector(`.cell${i}${j}`)
                const cellState = boardState.querySelector(`.cell${i}${j}`)
                // could create icon here
                const explodeIcon = document.createElement('i')
                explodeIcon.classList.add('fa-solid')
                explodeIcon.classList.add('fa-explosion')
                const explodeIcon2 = explodeIcon.cloneNode(true)
                cell.classList.add('hit')
                cellState.classList.add('hit')
                cell.classList.add('destroyed')
                cellState.classList.add('destroyed')
                cell.textContent = ''
                cellState.textContent = ''
                console.log(cell)
                console.log(explodeIcon)
                cell.appendChild(explodeIcon)
                cellState.appendChild(explodeIcon2)
                }
              }
            }
          }
 
      }
  }
}