import { calculatePuzzleComplexity, generateUniqueSolutionSet } from './criteriaLogic';

interface Distribution {
  [score: number]: number;
}

function createVerticalBarChart(data: Distribution, maxHeight: number = 20): string {
  const maxValue = Math.max(...Object.values(data));
  const scale = maxValue > maxHeight ? maxHeight / maxValue : 1;
  const sortedEntries = Object.entries(data).sort(([a], [b]) => Number(a) - Number(b));

  let chart = '';
  for (let row = maxHeight; row > 0; row--) {
    chart += sortedEntries.map(([_, count]) =>
        Math.round(count * scale) >= row ? '█' : ' '
    ).join(' ') + '\n';
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
  console.log('Nombre de puzzles générés :', iterations);
  console.log('Score de difficulté min :', min);
  console.log('Score de difficulté max :', max);
  console.log('Score de difficulté moyen :', mean.toFixed(2));
  console.log('Nombre moyen d\'essais pour générer un puzzle :', meanAttempts.toFixed(2));
  console.log('Nombre total d\'essais pour générer '  + iterations+' puzzles :', totalAttempts);
  console.log('Nombre d\'essais min :', minAttempts);
  console.log('Nombre d\'essais max :', maxAttempts);
  console.log('Distribution des scores :', Object.fromEntries(Object.entries(distribution).sort(([a], [b]) => Number(a) - Number(b))));
  console.log('Distribution Chart:');
  console.log(createVerticalBarChart(distribution));
}

// Wrapper pour compter les essais (nécessite modification de generatePuzzle)
function generatePuzzleWithAttempts() {
  const result = generateUniqueSolutionSet();
  return { difficultyScore: result.difficultyScore, attempts: result.attempts };
}

// Run the test when this file is executed directly
testDifficultyDistribution(1000).catch(console.error);
