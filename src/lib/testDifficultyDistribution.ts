import {calculatePuzzleComplexity, difficultyRanges, generateUniqueSolutionSet} from './criteriaLogic';
import {Difficulty} from "@/lib/gameTypes.ts";

interface Distribution {
  [score: number]: number;
}

function createVerticalBarChart(data: Distribution, maxHeight: number = 20): string {
  const maxValue = Math.max(...Object.values(data));
  const scale = maxValue > maxHeight ? maxHeight / maxValue : 1;
  const rowHeight = Math.round(1 / scale);
  const sortedEntries = Object.entries(data).map(v => [Number(v[0]), v[1]] as [number, number]).sort(([a], [b]) => a - b);

  let chart = '';
  for (let row = maxHeight; row > 0; row--) {
    chart += sortedEntries.map(([_, count]) => {
        const height = count * scale;
        if (Math.round(height) >= row) return '█';
        if (height <= (row-1)) return ' ';
        const rest = count % rowHeight;
        if (rest === 0) return ' ';
        const fraction = rest / rowHeight;
        if (fraction >= 7 / 8) return '▇';
        if (fraction >= 6 / 8) return '▆';
        if (fraction >= 5 / 8) return '▅';
        if (fraction >= 4 / 8) return '▄';
        if (fraction >= 3 / 8) return '▃';
        if (fraction >= 2 / 8) return '▂';
        if (fraction >= 1 / 8) return '▁';
        return ' ';
    }
    ).join('  ') + '\n';
  }

  chart += sortedEntries.map(([score]) => score).join(' ') + '\n';
  return chart;
}

export async function testDifficultyDistribution(iterations: number) {
  const scores: number[] = [];
  const attemptsNeeded: number[] = [];
  const distribution: Distribution = {};
  let min = Infinity;
  let max = -Infinity;
  let minAttempts = Infinity;
  let maxAttempts = -Infinity;
  let totalAttempts = 0;

  for (let i = 0; i < iterations; i++) {
    const { difficultyScore, attempts } = generatePuzzleWithAttempts();
    scores.push(difficultyScore);
    attemptsNeeded.push(attempts);
    const difficultyScoreRounded = Math.round(difficultyScore);
    distribution[difficultyScoreRounded] = (distribution[difficultyScoreRounded] || 0) + 1;
    if (difficultyScore < min) min = difficultyScore;
    if (difficultyScore > max) max = difficultyScore;
    if (attempts < minAttempts) minAttempts = attempts;
    if (attempts > maxAttempts) maxAttempts = attempts;
    totalAttempts += attempts;
    if ((i + 1) % 100 === 0) {
      console.log(`Progress: ${i + 1}/${iterations}`);
    }
  }

  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const meanAttempts = attemptsNeeded.reduce((a, b) => a + b, 0) / attemptsNeeded.length;

  console.log('--- Résultats ---');
  console.log('Nombre de puzzles générés : %d', iterations);
  console.log('Score de difficulté min : %s', formatScore(min));
  console.log('Score de difficulté max : %s', formatScore(max));
  console.log('Score de difficulté moyen : %s', formatScore(mean));
  console.log('Nombre moyen d\'essais pour générer un puzzle : %f', meanAttempts.toFixed(2));
  console.log('Nombre total d\'essais pour générer %d puzzles : %d', iterations, totalAttempts);
  console.log('Nombre d\'essais min : %d', minAttempts);
  console.log('Nombre d\'essais max : %d', maxAttempts);
  for (const difficulty of ['easy', 'medium', "hard", "expert"] as Difficulty[]) {
    const count = Object.entries(distribution).reduce((acc, entry) => getScoreDifficulty(Number(entry[0])) === difficulty ? acc + Number(entry[1]) : acc, 0);
    console.log('Nombre de puzzle %s : %d (%d%%)', difficulty, count, Math.round(count / iterations * 100));
  }
  console.log('Distribution des scores : %o', Object.fromEntries(Object.entries(distribution).sort(([a], [b]) => Number(a) - Number(b)).map(([k, v]) => [formatScore(Number(k)), v + ' (' + Math.round(v / iterations * 100)+'%)'])));
  console.log('Distribution Chart:');
  console.log(createVerticalBarChart(distribution));
}

function formatScore(score: number): string {
  return Math.round(score * 100) / 100 + ' (' + getScoreDifficulty(score) + ')';
}

function getScoreDifficulty(score: number): Difficulty {
  if (difficultyRanges.easy.min <= score && score < difficultyRanges.easy.max) return 'easy';
  if (difficultyRanges.medium.min <= score && score < difficultyRanges.medium.max) return 'medium';
  if (difficultyRanges.hard.min <= score && score < difficultyRanges.hard.max) return 'hard';
  if (difficultyRanges.expert.min <= score && score <= difficultyRanges.expert.max) return 'expert';
  throw new Error('Difficulty not found for score: ' + score);
}

// Wrapper pour compter les essais (nécessite modification de generatePuzzle)
function generatePuzzleWithAttempts() {
  const result = generateUniqueSolutionSet();
  return { difficultyScore: result.difficultyScore, attempts: result.attempts };
}

// Run the test when this file is executed directly
testDifficultyDistribution(1000).catch(console.error);
