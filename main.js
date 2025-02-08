import Player from './player.js'
import Game from './game.js'

let player1 = new Player(1, 20);
let player2 = new Player(1, 20);

Game.runSingleGameInteractive(player1, player2, 20, 3, 1, 5, 0);