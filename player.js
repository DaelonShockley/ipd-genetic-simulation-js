export default class Player {
    constructor(tableInitMagnitude, roundsPerGame) {
        this.oppHistoryWeight = this.generateRandomArray(roundsPerGame, -tableInitMagnitude / 2, tableInitMagnitude);
        this.selfHistoryWeight = this.generateRandomArray(roundsPerGame, -tableInitMagnitude / 2, tableInitMagnitude);

        this.totalScore = 0;
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;

        this.numDefections = 0;
        this.numCooperations = 0;
    }

    generateRandomArray(rows, min, max) {
        return Array.from({ length: rows }, () => 
            Array.from({ length: 2 }, () => Math.random() * (max - min) + min)
        );
    }

    getDecision(selfHistory, oppHistory) {
        let probabilities = [];

        if (selfHistory === "") {
            probabilities.push(this.oppHistoryWeight[0][0]);
            probabilities.push(this.selfHistoryWeight[0][0]);
            let odds = this.mean(probabilities);
            if (Math.random() <= odds) {
                this.numCooperations++;
                return false; // cooperate
            } else {
                this.numDefections++;
                return true; // defect
            }
        }

        for (let i = 1; i <= oppHistory.length; i++) {
            probabilities.push(this.oppHistoryWeight[i - 1][Number(oppHistory[oppHistory.length - i])]);
            probabilities.push(this.selfHistoryWeight[i - 1][Number(selfHistory[selfHistory.length - i])]);
        }

        let odds = this.sigmoid(this.mean(probabilities));

        if (Math.random() <= odds) {
            this.numCooperations++;
            return false; // cooperate
        } else {
            this.numDefections++;
            return true; // defect
        }
    }

    log() {
        return [
            this.totalScore,
            this.wins,
            this.losses,
            this.draws,
            this.numDefections / (this.numDefections + this.numCooperations)
        ];
    }

    mean(arr) {
        if (arr.length === 0) return NaN; 
        return arr.reduce((sum, value) => sum + value, 0) / arr.length;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    clone() {
        let newPlayer = new Player(1, 1);
        newPlayer.oppHistoryWeight = this.oppHistoryWeight;
        newPlayer.selfHistoryWeight = this.selfHistoryWeight;

        newPlayer.totalScore = 0;
        newPlayer.wins = 0;
        newPlayer.losses = 0;
        newPlayer.draws = 0;

        newPlayer.numDefections = 0;
        newPlayer.numCooperations = 0;

        return newPlayer;
    }
}
