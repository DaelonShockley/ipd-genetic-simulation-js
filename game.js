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
        while (roundsPlayed < roundsPerGame) {
            let player1Decision = player1.getDecision(historyPlay1, historyPlay2);
            let player2Decision = player2.getDecision(historyPlay2, historyPlay1);
    
            // A decision of true means the player is defecting, similarly a "1" in the history represents a defection
            if (!player1Decision && !player2Decision) { // both players cooperate
                player1Score += scoreBothCoop;
                player2Score += scoreBothCoop;
                historyPlay1 += "0";
                historyPlay2 += "0";
            } else if (player1Decision && !player2Decision) { // player1 defects, player2 cooperates
                player1Score += scorePlayerDef;
                player2Score += scoreOppDef;
                historyPlay1 += "1";
                historyPlay2 += "0";
            } else if (!player1Decision && player2Decision) { // player1 cooperates, player2 defects
                player1Score += scoreOppDef;
                player2Score += scorePlayerDef;
                historyPlay1 += "0";
                historyPlay2 += "1";
            } else { // both players defect
                player1Score += scoreBothDef;
                player2Score += scoreBothDef;
                historyPlay1 += "1";
                historyPlay2 += "1";
            }
    
            roundsPlayed++;
        }
    
        player1.totalScore += player1Score;
        player2.totalScore += player2Score;
    
        if (player1Score > player2Score) {
            player1.wins += 1;
            player2.losses += 1;
        } else if (player1Score === player2Score) {
            player1.draws += 1;
            player2.draws += 1;
        } else {
            player2.wins += 1;
            player1.losses += 1;
        }
    }

    runSingleGameInteractive(player1, player2, rounds_per_game, score_both_coop, score_both_def, score_player_def, score_opp_def){
        let history_play_1 = ""
        let history_play_2 = ""
        player1_score = 0
        player2_score = 0

        let rounds_played = 0
        while (roundsPlayed < roundsPerGame) {
            let player1Decision = player1.getDecision(historyPlay1, historyPlay2);
            let player2Decision = player2.getDecision(historyPlay2, historyPlay1);
    
            // A decision of true means the player is defecting, similarly a "1" in the history represents a defection
            if (!player1Decision && !player2Decision) { // both players cooperate
                player1Score += scoreBothCoop;
                player2Score += scoreBothCoop;
                historyPlay1 += "0";
                historyPlay2 += "0";
            } else if (player1Decision && !player2Decision) { // player1 defects, player2 cooperates
                player1Score += scorePlayerDef;
                player2Score += scoreOppDef;
                historyPlay1 += "1";
                historyPlay2 += "0";
            } else if (!player1Decision && player2Decision) { // player1 cooperates, player2 defects
                player1Score += scoreOppDef;
                player2Score += scorePlayerDef;
                historyPlay1 += "0";
                historyPlay2 += "1";
            } else { // both players defect
                player1Score += scoreBothDef;
                player2Score += scoreBothDef;
                historyPlay1 += "1";
                historyPlay2 += "1";
            }
    
            roundsPlayed++;
        }
    
        player1.totalScore += player1Score;
        player2.totalScore += player2Score;
    
        if (player1Score > player2Score) {
            console.log("\nPlayer 1 wins!\n")
            player1.wins += 1;
            player2.losses += 1;
        } else if (player1Score === player2Score) {
            console.log("\nIt's a draw\n")
            player1.draws += 1;
            player2.draws += 1;
        } else {
            console.log("\nPlayer 2 wins!\n")
            player2.wins += 1;
            player1.losses += 1;
        }
    }
}