1. Create ship class
2. Create gameboard class
3. Create player class
4. UI
   Set up a new game by creating Players. For now just populate each player’s Gameboard with predetermined coordinates. You are going to implement a system for allowing players to place their ships later.

SHOW THE LINKS BETWEEN THE MODULES FOR EXAMPLE

INDEX.JS
|--------------> FILE1.JS
|----------------->FILE2.JS

Things modified:
class Gameborad

- Added player as an arguements so appopriate DOM board is selected
- placeShipOnSquare is added

UI stages:

1. Placing ships on DOM grid
2. event listners to receive attack
3. switch between board with ships & board state
