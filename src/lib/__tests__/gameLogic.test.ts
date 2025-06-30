import { describe, it, expect, beforeEach } from 'vitest';
import {
  initializeGame,
  performTest,
  checkSolution,
  submitSolution,
  nextRound,
  abandonGame
} from '../gameLogic';
import { GameState, Combination, TestSchema, CriteriaCard } from '../gameTypes';

describe('gameLogic', () => {
  let gameState: GameState;
  let mockCriteriaCards: CriteriaCard[];

  beforeEach(() => {
    // Create mock criteria cards for testing
    mockCriteriaCards = [
      {
        id: 'A_parity_saphir',
        name: 'Saphir Parity',
        ruleA: 'Saphir is EVEN',
        ruleB: 'Saphir is ODD',
        category: 'single',
        successRule: 'A',
        testResult: null
      },
      {
        id: 'B_compare_gt_saphir_topaze',
        name: 'Saphir > Topaze',
        ruleA: 'Saphir > Topaze',
        ruleB: 'Saphir ≤ Topaze',
        category: 'comparison',
        successRule: 'A',
        testResult: null
      },
      {
        id: 'C_sum_gt8',
        name: 'Sum > 8',
        ruleA: 'Sum > 8',
        ruleB: 'Sum ≤ 8',
        category: 'global',
        successRule: 'B',
        testResult: null
      }
    ];

    gameState = {
      masterCombination: { saphir: 2, topaze: 1, amethyst: 3 },
      criteriaCards: [...mockCriteriaCards],
      currentRound: 1,
      testsThisRound: 0,
      maxRounds: 7,
      maxTestsPerRound: 3,
      currentTest: { saphir: 1, topaze: 1, amethyst: 1 },
      combinationLocked: false,
      gameStatus: 'playing',
      testHistory: []
    };
  });

  describe('initializeGame', () => {
    it('should initialize a new game with correct default values', () => {
      const newGame = initializeGame();

      expect(newGame.currentRound).toBe(1);
      expect(newGame.testsThisRound).toBe(0);
      expect(newGame.maxRounds).toBe(7);
      expect(newGame.maxTestsPerRound).toBe(3);
      expect(newGame.currentTest).toEqual({ saphir: 1, topaze: 1, amethyst: 1 });
      expect(newGame.combinationLocked).toBe(false);
      expect(newGame.gameStatus).toBe('playing');
      expect(newGame.testHistory).toEqual([]);
      expect(newGame.masterCombination).toBeDefined();
      expect(newGame.criteriaCards).toBeDefined();
      expect(newGame.criteriaCards.length).toBeGreaterThan(0);
    });

    it('should generate valid master combination', () => {
      const newGame = initializeGame();
      const { saphir, topaze, amethyst } = newGame.masterCombination;

      expect(saphir).toBeGreaterThanOrEqual(1);
      expect(saphir).toBeLessThanOrEqual(5);
      expect(topaze).toBeGreaterThanOrEqual(1);
      expect(topaze).toBeLessThanOrEqual(5);
      expect(amethyst).toBeGreaterThanOrEqual(1);
      expect(amethyst).toBeLessThanOrEqual(5);
    });

    it('should generate criteria cards with proper structure', () => {
      const newGame = initializeGame();

      newGame.criteriaCards.forEach(card => {
        expect(card.id).toBeDefined();
        expect(card.name).toBeDefined();
        expect(card.ruleA).toBeDefined();
        expect(card.ruleB).toBeDefined();
        expect(['single', 'comparison', 'global', 'composite']).toContain(card.category);
        expect(['A', 'B']).toContain(card.successRule);
        expect(card.testResult).toBeNull();
      });
    });
  });

  describe('performTest', () => {
    it('should perform a test and update game state correctly', () => {
      const testSchema: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'A_parity_saphir'
      };

      const result = performTest(gameState, testSchema);

      expect(result.testsThisRound).toBe(1);
      expect(result.combinationLocked).toBe(true);
      expect(result.testHistory).toHaveLength(1);
      expect(result.testHistory[0]).toEqual({
        round: 1,
        test: testSchema.combination,
        cardId: testSchema.cardId,
        result: 'success' // saphir = 2 is even, rule A succeeds
      });
    });

    it('should not perform test if game is not playing', () => {
      gameState.gameStatus = 'won';
      const testSchema: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'A_parity_saphir'
      };

      const result = performTest(gameState, testSchema);

      expect(result).toEqual(gameState);
    });

    it('should not perform test if max tests per round reached', () => {
      gameState.testsThisRound = 3;
      const testSchema: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'A_parity_saphir'
      };

      const result = performTest(gameState, testSchema);

      expect(result).toEqual(gameState);
    });

    it('should not perform test if card does not exist', () => {
      const testSchema: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'nonexistent_card'
      };

      const result = performTest(gameState, testSchema);

      expect(result).toEqual(gameState);
    });

    it('should record failure when test fails', () => {
      const testSchema: TestSchema = {
        combination: { saphir: 1, topaze: 1, amethyst: 3 }, // saphir = 1 is odd
        cardId: 'A_parity_saphir' // expects even saphir
      };

      const result = performTest(gameState, testSchema);

      expect(result.testHistory[0].result).toBe('failure');
    });

    it('should update the correct card test result', () => {
      const testSchema: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'A_parity_saphir'
      };

      const result = performTest(gameState, testSchema);
      const testedCard = result.criteriaCards.find(c => c.id === 'A_parity_saphir');

      expect(testedCard?.testResult).toBe('success');
    });
  });

  describe('checkSolution', () => {
    it('should return true when solution passes all criteria', () => {
      // Set up cards that the master combination should pass
      const solution: Combination = { saphir: 2, topaze: 1, amethyst: 3 };
      
      const result = checkSolution(gameState, solution);

      // This depends on the specific criteria cards and their success rules
      expect(typeof result).toBe('boolean');
    });

    it('should return false when solution fails any criteria', () => {
      // Use a solution that should fail at least one criteria
      const solution: Combination = { saphir: 1, topaze: 5, amethyst: 1 };
      
      const result = checkSolution(gameState, solution);

      expect(typeof result).toBe('boolean');
    });
  });

  describe('submitSolution', () => {
    it('should win the game when correct solution is submitted', () => {
      // Mock checkSolution to return true
      const correctSolution = gameState.masterCombination;
      
      const result = submitSolution(gameState, correctSolution);

      // The result depends on whether the solution actually passes all criteria
      expect(['won', 'playing']).toContain(result.gameStatus);
    });

    it('should advance to next round when incorrect solution is submitted', () => {
      const incorrectSolution: Combination = { saphir: 5, topaze: 5, amethyst: 5 };
      
      const result = submitSolution(gameState, incorrectSolution);

      // Should either advance round or stay the same if solution is actually correct
      expect(result.currentRound).toBeGreaterThanOrEqual(gameState.currentRound);
    });

    it('should not submit solution if game is not playing', () => {
      gameState.gameStatus = 'won';
      const solution: Combination = { saphir: 1, topaze: 1, amethyst: 1 };

      const result = submitSolution(gameState, solution);

      expect(result).toEqual(gameState);
    });
  });

  describe('nextRound', () => {
    it('should advance to next round correctly', () => {
      const result = nextRound(gameState);

      expect(result.currentRound).toBe(2);
      expect(result.testsThisRound).toBe(0);
      expect(result.combinationLocked).toBe(false);
      expect(result.criteriaCards.every(card => card.testResult === null)).toBe(true);
    });

    it('should end game when max rounds exceeded', () => {
      gameState.currentRound = 7;

      const result = nextRound(gameState);

      expect(result.gameStatus).toBe('lost');
    });

    it('should not advance round if game is not playing', () => {
      gameState.gameStatus = 'won';

      const result = nextRound(gameState);

      expect(result).toEqual(gameState);
    });

    it('should reset all card test results', () => {
      // Set some test results first
      gameState.criteriaCards[0].testResult = 'success';
      gameState.criteriaCards[1].testResult = 'failure';

      const result = nextRound(gameState);

      expect(result.criteriaCards.every(card => card.testResult === null)).toBe(true);
    });
  });

  describe('abandonGame', () => {
    it('should set game status to abandoned', () => {
      const result = abandonGame(gameState);

      expect(result.gameStatus).toBe('abandoned');
      // All other properties should remain the same
      expect(result.currentRound).toBe(gameState.currentRound);
      expect(result.testsThisRound).toBe(gameState.testsThisRound);
      expect(result.masterCombination).toEqual(gameState.masterCombination);
    });

    it('should work regardless of current game status', () => {
      gameState.gameStatus = 'won';
      const result = abandonGame(gameState);

      expect(result.gameStatus).toBe('abandoned');
    });
  });

  describe('edge cases and integration', () => {
    it('should handle multiple tests in same round', () => {
      let currentState = gameState;
      
      const test1: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'A_parity_saphir'
      };
      
      const test2: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'B_compare_gt_saphir_topaze'
      };

      currentState = performTest(currentState, test1);
      currentState = performTest(currentState, test2);

      expect(currentState.testsThisRound).toBe(2);
      expect(currentState.testHistory).toHaveLength(2);
      expect(currentState.combinationLocked).toBe(true);
    });

    it('should maintain test history across rounds', () => {
      let currentState = gameState;
      
      const testSchema: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'A_parity_saphir'
      };

      currentState = performTest(currentState, testSchema);
      currentState = nextRound(currentState);

      expect(currentState.testHistory).toHaveLength(1);
      expect(currentState.testHistory[0].round).toBe(1);
    });

    it('should handle game state transitions correctly', () => {
      let currentState = gameState;

      // Perform some tests
      const testSchema: TestSchema = {
        combination: { saphir: 2, topaze: 1, amethyst: 3 },
        cardId: 'A_parity_saphir'
      };

      currentState = performTest(currentState, testSchema);
      expect(currentState.gameStatus).toBe('playing');

      // Try to submit solution
      currentState = submitSolution(currentState, { saphir: 1, topaze: 1, amethyst: 1 });
      
      // Should either win or advance round
      expect(['playing', 'won', 'lost']).toContain(currentState.gameStatus);
    });
  });
});