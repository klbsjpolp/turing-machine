
export type Color = 'saphir' | 'topaze' | 'amethyst';
export type Digit = 1 | 2 | 3 | 4 | 5;
export type TestResult = 'success' | 'failure' | null;

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
  successRule: 'A' | 'B'; // Which rule triggers success (hidden from player)
  testResult: TestResult;
}

export interface GameState {
  masterCombination: Combination;
  criteriaCards: CriteriaCard[];
  currentRound: number;
  testsThisRound: number;
  maxRounds: number;
  maxTestsPerRound: number;
  currentTest: Combination;
  gameStatus: 'playing' | 'won' | 'lost' | 'abandoned';
  testHistory: Array<{
    round: number;
    test: Combination;
    cardId: string;
    result: TestResult;
  }>;
}

export interface TestSchema {
  combination: Combination;
  cardId: string;
}
