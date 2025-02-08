export default class Game{
    runRound(players, rounds_per_game, games_per_match, score_both_coop, score_both_def, score_player_def, score_opp_def){
        for (let i = 0; i < players.length; i++) {
            for (let j = i + 1; j < players.length; j++) {  // Iterate through all unique pairs
                for (let k = 0; k < gamesPerMatch; k++) {
                    Game.runSingleGame(players[i], players[j], roundsPerGame, scoreBothCoop, scoreBothDef, scorePlayerDef, scoreOppDef);
                }
            }
        }
    }

    runSingleGame(player1, player2, rounds_per_game, score_both_coop, score_both_def, score_player_def, score_opp_def){
        let history_play_1 = ""
        let history_play_2 = ""
        player1_score = 0
        player2_score = 0

        let rounds_played = 0

    }
}