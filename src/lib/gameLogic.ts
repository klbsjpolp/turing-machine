import { GameState, Combination, TestSchema, TestResult, Difficulty } from './gameTypes';
import {difficultyRanges, generatePuzzleWithDifficulty, validateCriteria} from './criteriaLogic';
import { serializePuzzle } from './utils';

export function initializeGame(difficulty: Difficulty): GameState {
  const { cards, solution, difficultyScore } = generatePuzzleWithDifficulty(difficulty);

  const params = difficultyRanges[difficulty];

  return {
    masterCombination: solution,
    criteriaCards: cards,
    currentRound: 1,
    testsThisRound: 0,
    maxRounds: params.maxRounds,
    maxTestsPerRound: params.maxTestsPerRound,
    currentTest: { saphir: 1, topaze: 1, amethyst: 1 },
    combinationLocked: false, // Start with the combination unlocked
    gameStatus: 'playing',
    difficulty,
    difficultyScore,
    testHistory: [],
    impossibleNumbers: {
      saphir: new Set(),
      topaze: new Set(),
      amethyst: new Set()
    },
    serialization: serializePuzzle(solution, cards)
  };
}

export function performTest(gameState: GameState, testSchema: TestSchema): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }

  if (gameState.testsThisRound >= gameState.maxTestsPerRound) {
    return gameState;
  }

  const card = gameState.criteriaCards.find(c => c.id === testSchema.cardId);
  if (!card) {
    return gameState;
  }

  const isSuccess = validateCriteria(testSchema.combination, card);
  const result: TestResult = isSuccess ? 'success' : 'failure';

  const updatedCards = gameState.criteriaCards.map(c => 
    c.id === testSchema.cardId ? { ...c, testResult: result } : c
  );

  const newHistory = [{
    round: gameState.currentRound,
    test: testSchema.combination,
    cardId: testSchema.cardId,
    result
  }, ...gameState.testHistory];

  return {
    ...gameState,
    criteriaCards: updatedCards,
    testsThisRound: gameState.testsThisRound + 1,
    combinationLocked: true, // Lock the combination after a test
    testHistory: newHistory
  };
}

export function checkSolution(gameState: GameState, solution: Combination): boolean {
  // A solution is valid if it passes all criteria cards.
  return gameState.criteriaCards.every(card => validateCriteria(solution, card));
}

export function submitSolution(gameState: GameState, solution: Combination): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }

  if (checkSolution(gameState, solution)) {
    return {
      ...gameState,
      gameStatus: 'won',
    };
  }

  // Add the failed solution to the history
  const newHistory = [
    {
      round: gameState.currentRound,
      test: solution,
      cardId: 'failed_solution', // Special ID to identify failed solutions
      result: 'failure' as TestResult
    },
    ...gameState.testHistory
  ];

  // Incorrect solution: penalize by advancing to the next round.
  return nextRound({
    ...gameState,
    testHistory: newHistory
  });
}

export function nextRound(gameState: GameState): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }

  const newRound = gameState.currentRound + 1;

  if (newRound > gameState.maxRounds) {
    return {
      ...gameState,
      gameStatus: 'lost'
    };
  }

  // Reset all card test results for the new round
  const resetCards = gameState.criteriaCards.map(card => ({
    ...card,
    testResult: null
  }));

  return {
    ...gameState,
    currentRound: newRound,
    testsThisRound: 0,
    combinationLocked: false, // Unlock the combination for the new round
    criteriaCards: resetCards, // Reset all card test results
  };
}

export function abandonGame(gameState: GameState): GameState {
  return {
    ...gameState,
    gameStatus: 'abandoned'
  };
}
