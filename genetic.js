export default class Genetic{
    static crossover(players, record = false, fitterGeneProb = 0.5, mutationRate = 0.01, maxMutationMagnitude = 0.2) {
        const fittestSize = Math.floor(Math.sqrt(players.length));

        let sortedPlayers = [...players];
        if (record) {
            sortedPlayers.sort((a, b) => b.wins - a.wins || b.draws - a.draws || b.totalScore - a.totalScore);
        } else {
            sortedPlayers.sort((a, b) => b.totalScore - a.totalScore || b.wins - a.wins || b.draws - a.draws);
        }
        sortedPlayers = sortedPlayers.slice(0, fittestSize);

        let newPlayers = sortedPlayers.map(player => {
            let newPlayer = player.clone();
            return newPlayer;
        });

        for (let i = 0; i < sortedPlayers.length; i++) {
            for (let j = i + 1; j < sortedPlayers.length; j++) {
                for (let k = 0; k < 2; k++) {
                    let offspring = Genetic.singleCrossover(sortedPlayers[i], sortedPlayers[j], fitterGeneProb);
                    newPlayers.push(Genetic.introduceMutation(offspring, mutationRate, maxMutationMagnitude));
                }
            }
        }

        return newPlayers;
    }

    static singleCrossover(player1, player2, fitterGeneProb) {
        let weights = [fitterGeneProb, 1 - fitterGeneProb];
        let newPlayer = player1.clone();

        for (let i = 0; i < player1.oppHistoryWeight.length; i++) {
            newPlayer.oppHistoryWeight[i] = Math.random() < weights[0] ? player1.oppHistoryWeight[i] : player2.oppHistoryWeight[i];
            newPlayer.selfHistoryWeight[i] = Math.random() < weights[0] ? player1.selfHistoryWeight[i] : player2.selfHistoryWeight[i];
        }

        return newPlayer;
    }

    static introduceMutation(newPlayer, mutationRate, maxMutationMagnitude) {
        const mutateValue = (value) => {
            if (Math.random() < mutationRate) {
                let mutationFactor = 1 + (Math.random() * 2 - 1) * maxMutationMagnitude;
                return value * mutationFactor;
            }
            return value;
        };

        newPlayer.oppHistoryWeight = newPlayer.oppHistoryWeight.map(mutateValue);
        newPlayer.selfHistoryWeight = newPlayer.selfHistoryWeight.map(mutateValue);

        return newPlayer;
    }
}