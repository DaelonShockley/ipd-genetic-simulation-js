import Player from './player.js'

let player = new Player(1, 20)

console.log(player.opp_history_weight)
console.log(player.self_history_weight)

console.log(player.getDecision("", ""))