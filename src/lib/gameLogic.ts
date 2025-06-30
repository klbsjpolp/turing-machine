import { GameState, Combination, TestSchema, TestResult } from './gameTypes';
import { generateUniqueSolutionSet, validateCriteria } from './criteriaLogic';

export function initializeGame(): GameState {
  const { cards, solution } = generateUniqueSolutionSet();

  return {
    masterCombination: solution,
    criteriaCards: cards,
    currentRound: 1,
    testsThisRound: 0,
    maxRounds: 7,
    maxTestsPerRound: 3,
    currentTest: { saphir: 1, topaze: 1, amethyst: 1 },
    combinationLocked: false, // Start with the combination unlocked
    gameStatus: 'playing',
    testHistory: []
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

  // Incorrect solution: penalize by advancing to the next round.
  return nextRound(gameState);
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
