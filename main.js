import Player from './player.js'
import Game from './game.js'
import Genetic from './genetic.js'
import fs from "fs";
import { performance } from "perf_hooks";

const startTime = performance.now();

const tableInitMagnitude = 1;
const roundsPerGame = 20;
const gamesPerMatch = 2;

const scoreBothCoop = 4;
const scoreBothDef = 1;
const scorePlayerDef = 6;
const scoreOppDef = 0;

const populationSize = 100;
const numberOfRounds = 100;

const record = false;

function printFittest(players) {
  const fittestSize = Math.floor(Math.sqrt(players.length));

  const sortedPlayers = [...players].sort((a, b) =>
    record
      ? b.wins - a.wins || b.draws - a.draws || b.totalScore - a.totalScore
      : b.totalScore - a.totalScore || b.wins - a.wins || b.draws - a.draws
  ).slice(0, fittestSize);

  console.log(`TOP ${fittestSize} ALGORITHMS AFTER ${numberOfRounds} ROUNDS OF SIMULATION`);
  
  for (let i = 0; i < 3; i++) {
    console.log("Opponent History Weight:", sortedPlayers[i].oppHistoryWeight);
    console.log("Self History Weight:", sortedPlayers[i].selfHistoryWeight);
    console.log(`Total score after facing ${populationSize - 1} opponents ${gamesPerMatch} times:`, sortedPlayers[i].totalScore);
    console.log("Player defection rate:", sortedPlayers[i].numDefections / (sortedPlayers[i].numDefections + sortedPlayers[i].numCooperations));
    console.log(`Player record: ${sortedPlayers[i].wins} - ${sortedPlayers[i].losses} - ${sortedPlayers[i].draws}\n`);
  }
}

function runGameTopTwoPlayers(players, games) {
  const fittestSize = Math.floor(Math.sqrt(players.length));

  const sortedPlayers = [...players].sort((a, b) =>
    record
      ? b.wins - a.wins || b.draws - a.draws || b.totalScore - a.totalScore
      : b.totalScore - a.totalScore || b.wins - a.wins || b.draws - a.draws
  ).slice(0, fittestSize);

  for (let i = 0; i < games; i++) {
    Game.runSingleGameInteractive(
      sortedPlayers[0], 
      sortedPlayers[1], 
      roundsPerGame, 
      scoreBothCoop, 
      scoreBothDef, 
      scorePlayerDef, 
      scoreOppDef
    );
  }
}

function logGeneration(players, roundsRun) {
  let totalDefectionRate = 0;
  let highestDefection = 0;
  let lowestDefection = 1;
  let totalWins = 0;
  let totalLosses = 0;
  let totalDraws = 0;
  let totalScore = 0;
  let highestScore = 0;
  let lowestScore = 5000000;

  for (const player of players) {
    const stats = player.log();

    totalScore += stats[0];
    totalWins += stats[1];
    totalLosses += stats[2];
    totalDraws += stats[3];
    totalDefectionRate += stats[4];

    highestDefection = Math.max(highestDefection, stats[4]);
    lowestDefection = Math.min(lowestDefection, stats[4]);

    highestScore = Math.max(highestScore, stats[0]);
    lowestScore = Math.min(lowestScore, stats[0]);
  }

  const csvData = [
    roundsRun, highestScore, totalScore / 100, lowestScore, 
    totalWins, totalLosses, totalDraws, highestDefection, 
    totalDefectionRate / 100, lowestDefection
  ].join(",") + "\n";

  fs.appendFileSync("final_results.csv", csvData);
}

// MAIN EXECUTION BEGINS HERE

if (fs.existsSync("final_results.csv")) {
  fs.unlinkSync("final_results.csv");
}

fs.appendFileSync("final_results.csv", 
  "generation,highest_score,average_score,lowest_score,total_wins,total_losses,total_draws,highest_defection_rate,average_defection_rate,lowest_defection_rate\n"
);

let players = Array.from({ length: populationSize }, () => new Player(tableInitMagnitude, roundsPerGame));

let roundsRun = 0;

(async () => {
  while (roundsRun < numberOfRounds) {
    const genStart = performance.now();

    Game.runRound(players, roundsPerGame, gamesPerMatch, scoreBothCoop, scoreBothDef, scorePlayerDef, scoreOppDef);
    
    logGeneration(players, roundsRun);

    players = Genetic.crossover(players, record);

    roundsRun++;
    console.log(`Generation ${roundsRun}/${numberOfRounds} completed in ${(performance.now() - genStart).toFixed(6)} seconds`);
  }

  // One more round since we ended on a crossover phase
  Game.runRound(players, roundsPerGame, gamesPerMatch, scoreBothCoop, scoreBothDef, scorePlayerDef, scoreOppDef);
  logGeneration(players, roundsRun);

  printFittest(players);

  runGameTopTwoPlayers(players, 5);

  console.log(`Execution time: ${(performance.now() - startTime).toFixed(6)} seconds`);
})();