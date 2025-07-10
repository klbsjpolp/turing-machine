import { GameState } from './gameTypes';
import { deserializePuzzle } from './utils';
import {
  AllPossibleCards,
  calculatePuzzleComplexity,
  difficultyRanges,
  getDifficultyForScore
} from './criteriaLogic';

/**
 * Initialize a game from a serialization string
 * @param serialization The serialization string
 * @returns A new game state initialized from the serialization string
 */
export function initializeGameFromSerialization(serialization: string): GameState {
  // Deserialize the puzzle to get the solution and cards
  const { solution, cards } = deserializePuzzle(serialization);
  
  // Use the expert difficulty parameters as default
  const params = difficultyRanges.expert;

  const difficultyScore = calculatePuzzleComplexity(cards);
  const difficulty = getDifficultyForScore(difficultyScore)

  // Create a new game state with the deserialized puzzle
  return {
    masterCombination: solution,
    criteriaCards: cards.map(card => {
      // Find the card in AllPossibleCards to get the full card data
      const fullCard = AllPossibleCards.find((c) => c.id === card.id);
      return {
        ...fullCard,
        successRule: card.successRule,
        testResult: null
      };
    }),
    currentRound: 1,
    testsThisRound: 0,
    maxRounds: params.maxRounds,
    maxTestsPerRound: params.maxTestsPerRound,
    currentTest: { saphir: 1, topaze: 1, amethyst: 1 },
    combinationLocked: false,
    gameStatus: 'playing',
    difficulty: difficulty,
    difficultyScore: difficultyScore,
    testHistory: [],
    impossibleNumbers: {
      saphir: new Set(),
      topaze: new Set(),
      amethyst: new Set()
    },
    serialization: serialization
  };
}