class Player{
    constructor(table_init_magnitude, rounds_per_game){
        this.opp_history_weight = this.generateRandomArray(rounds_per_game, -table_init_magnitude / 2, table_init_magnitude);
        this.self_history_weight = this.generateRandomArray(rounds_per_game, -table_init_magnitude / 2, table_init_magnitude);

        this.total_score = 0;
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;

        this.num_defections = 0;
        this.num_cooperations = 0;
    }

    generateRandomArray(rows, min, max) {
        return Array.from({ length: rows }, () => 
            Array.from({ length: 2 }, () => Math.random() * (max - min) + min)
        );
    }

    getDecision(self_history, opp_history){
        let probabilities = [];

        if(self_history === ""){
            probabilities.push(this.opp_history_weight[0][0]);
            probabilities.push(this.self_history_weight[0][0]);
            odds = mean(probabilities)
            if(Math.random() <= odds){
                this.num_cooperations++
                return false //cooperate
            }
            else{
                this.num_defections++
                return true //defect
            }
        }

        for (let i = 0; i <= opp_history.length; i++)
        {
            probabilities.push(this.opp_history_weight[i-1][Number(opp_history[-i])]);
            probabilities.push(this.self_history_weight[i-1][Number(self_history[-i])]);
        }

        const odds = sigmoid(mean(probabilities));

        if(Math.random() <= odds){
            this.num_cooperations++
            return false //cooperate
        }
        else{
            this.num_defections++
            return true //defect
        }
    }

    log(){
        return [
            this.total_score,
            this.wins,
            this.losses,
            this.draws,
            this.num_defections / (this.num_defections + this.num_cooperations)
        ];
        
    }

    mean(arr) {
        if (arr.length === 0) return NaN; 
        return arr.reduce((sum, value) => sum + value, 0) / arr.length;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
}