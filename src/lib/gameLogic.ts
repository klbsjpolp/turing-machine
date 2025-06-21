
import { GameState, Combination, CriteriaCard, Digit, TestSchema, TestResult } from './gameTypes';
import { generateCriteriaCards, validateCriteria } from './criteriaLogic';

export function initializeGame(): GameState {
  const masterCombination: Combination = {
    saphir: (Math.floor(Math.random() * 5) + 1) as Digit,
    topaze: (Math.floor(Math.random() * 5) + 1) as Digit,
    amethyst: (Math.floor(Math.random() * 5) + 1) as Digit
  };

  const criteriaCards = generateCriteriaCards();

  return {
    masterCombination,
    criteriaCards,
    currentRound: 1,
    testsThisRound: 0,
    maxRounds: 7,
    maxTestsPerRound: 3,
    currentTest: { saphir: 1, topaze: 1, amethyst: 1 },
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

  const newHistory = [...gameState.testHistory, {
    round: gameState.currentRound,
    test: testSchema.combination,
    cardId: testSchema.cardId,
    result
  }];

  return {
    ...gameState,
    criteriaCards: updatedCards,
    testsThisRound: gameState.testsThisRound + 1,
    testHistory: newHistory
  };
}

export function submitSolution(gameState: GameState, solution: Combination): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }

  const isCorrect = 
    solution.saphir === gameState.masterCombination.saphir &&
    solution.topaze === gameState.masterCombination.topaze &&
    solution.amethyst === gameState.masterCombination.amethyst;

  return {
    ...gameState,
    gameStatus: isCorrect ? 'won' : (gameState.currentRound >= gameState.maxRounds ? 'lost' : 'playing')
  };
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

  // Reset test results for the new round
  const resetCards = gameState.criteriaCards.map(card => ({
    ...card,
    testResult: null as TestResult
  }));

  return {
    ...gameState,
    currentRound: newRound,
    testsThisRound: 0,
    criteriaCards: resetCards
  };
}

export function abandonGame(gameState: GameState): GameState {
  return {
    ...gameState,
    gameStatus: 'abandoned'
  };
}
