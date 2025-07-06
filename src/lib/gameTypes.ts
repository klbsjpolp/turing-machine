export type Color = 'saphir' | 'topaze' | 'amethyst';
export type Digit = 1 | 2 | 3 | 4 | 5;
export type TestResult = 'success' | 'failure' | null;
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Combination {
  saphir: Digit;
  topaze: Digit;
  amethyst: Digit;
}

export interface CriteriaCard {
  id: string;
  name: string;
  ruleA: string;
  ruleB: string;
  category: 'single' | 'comparison' | 'global' | 'composite';
  family: string;
  successRule: 'A' | 'B'; // Which rule triggers success (hidden from player)
  testResult: TestResult;
}

export interface ImpossibleNumbers {
  saphir: Set<Digit>;
  topaze: Set<Digit>;
  amethyst: Set<Digit>;
}

export interface GameState {
  masterCombination: Combination;
  criteriaCards: CriteriaCard[];
  currentRound: number;
  testsThisRound: number;
  maxRounds: number;
  maxTestsPerRound: number;
  currentTest: Combination;
  combinationLocked: boolean; // Whether the current combination is locked (can't be changed)
  gameStatus: 'playing' | 'won' | 'lost' | 'abandoned';
  difficulty: Difficulty;
  difficultyScore: number; // Numerical difficulty score (0-100)
  testHistory: Array<{
    round: number;
    test: Combination;
    cardId: string;
    result: TestResult;
  }>;
  impossibleNumbers: ImpossibleNumbers;
}

export interface TestSchema {
  combination: Combination;
  cardId: string;
}
