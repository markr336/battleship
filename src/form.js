import { Player } from "./player"

export function loadForm() {
    const player2NameInput = document.getElementById('player2Name')
    player2NameInput.style.display = 'None'
    const player2Box = document.getElementById('player2ToPlay')
    player2Box.addEventListener('click', togglePlayer2)
    
    // const submitNamesButton = document.querySelector('#submitNames')
    // submitNamesButton.addEventListener('click', (e) => {
    //   // Prevent page from reloading & not calling function
    //   e.preventDefault()
    //   submitNames()
    // })
    
}

export function togglePlayer2() {
    const player2Checkbox = document.getElementById('player2ToPlay')
    if (player2Checkbox.checked == true) {
      document.getElementById('player2Name').style.display = ''
    }
    else {
      document.getElementById('player2Name').style.display = 'None'
    }
}

// export function submitNames() {
//   let player1name = document.getElementById('player1Name').value
//   const player1 = new Player(player1name, 'Real')
//   let player2name = document.getElementById('player2Name').value

//   console.log(player1)
//   if (player2name == '') {
//     const player2 = new Player('Computer', 'Fake')
//     console.log(player2)
//   }
//   else {
//     const player2 = new Player(player2name, 'Real')
//     console.log(player2)
//   }
//   document.querySelector('.form').style.display = 'None'
// }