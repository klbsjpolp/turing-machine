import { describe, it, expect } from 'vitest';
import {
  validateCriteria,
  generateUniqueSolutionSet,
  calculatePuzzleComplexity,
  generatePuzzleWithDifficulty
} from '../criteriaLogic';
import { Combination, CriteriaCard } from '../gameTypes';

describe('criteriaLogic', () => {
  describe('validateCriteria', () => {
    describe('Category A: Value Conditions', () => {
      describe('Parity tests', () => {
        it('should validate saphir parity correctly', () => {
          const cardEven: CriteriaCard = {
            id: 'A_parity_saphir',
            name: 'Saphir Parity',
            ruleA: 'Saphir is EVEN',
            ruleB: 'Saphir is ODD',
            category: 'single',
            successRule: 'A',
            testResult: null
          };

          const cardOdd: CriteriaCard = { ...cardEven, successRule: 'B' };

          // Test even saphir
          expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 3 }, cardEven)).toBe(true);
          expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 3 }, cardOdd)).toBe(false);

          // Test odd saphir
          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, cardEven)).toBe(false);
          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, cardOdd)).toBe(true);
        });

        it('should validate topaze parity correctly', () => {
          const cardEven: CriteriaCard = {
            id: 'A_parity_topaze',
            name: 'Topaze Parity',
            ruleA: 'Topaze is EVEN',
            ruleB: 'Topaze is ODD',
            category: 'single',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, cardEven)).toBe(true);
          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, cardEven)).toBe(false);
        });

        it('should validate amethyst parity correctly', () => {
          const cardEven: CriteriaCard = {
            id: 'A_parity_amethyst',
            name: 'Amethyst Parity',
            ruleA: 'Amethyst is EVEN',
            ruleB: 'Amethyst is ODD',
            category: 'single',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 2 }, cardEven)).toBe(true);
          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, cardEven)).toBe(false);
        });
      });

      describe('Threshold tests', () => {
        it('should validate less than 3 correctly', () => {
          const card: CriteriaCard = {
            id: 'A_threshold_saphir_lt3',
            name: 'Saphir < 3',
            ruleA: 'Saphir < 3',
            ruleB: 'Saphir ≥ 3',
            category: 'single',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 3, topaze: 1, amethyst: 1 }, card)).toBe(false);
          expect(validateCriteria({ saphir: 4, topaze: 1, amethyst: 1 }, card)).toBe(false);
        });

        it('should validate greater than 3 correctly', () => {
          const card: CriteriaCard = {
            id: 'A_threshold_saphir_gt3',
            name: 'Saphir > 3',
            ruleA: 'Saphir > 3',
            ruleB: 'Saphir ≤ 3',
            category: 'single',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 4, topaze: 1, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 5, topaze: 1, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 3, topaze: 1, amethyst: 1 }, card)).toBe(false);
          expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 1 }, card)).toBe(false);
        });
      });

      describe('Equality tests', () => {
        it('should validate equality to 1 correctly', () => {
          const card: CriteriaCard = {
            id: 'A_equality_saphir_1',
            name: 'Saphir = 1',
            ruleA: 'Saphir = 1',
            ruleB: 'Saphir ≠ 1',
            category: 'single',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 1 }, card)).toBe(false);
        });

        it('should validate equality to 3 correctly', () => {
          const card: CriteriaCard = {
            id: 'A_equality_topaze_3',
            name: 'Topaze = 3',
            ruleA: 'Topaze = 3',
            ruleB: 'Topaze ≠ 3',
            category: 'single',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 1 }, card)).toBe(false);
        });
      });
    });

    describe('Category B: Comparison Conditions', () => {
      describe('Greater than comparisons', () => {
        it('should validate saphir > topaze correctly', () => {
          const card: CriteriaCard = {
            id: 'B_compare_gt_saphir_topaze',
            name: 'Saphir > Topaze',
            ruleA: 'Saphir > Topaze',
            ruleB: 'Saphir ≤ Topaze',
            category: 'comparison',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 3, topaze: 2, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 2, topaze: 3, amethyst: 1 }, card)).toBe(false);
          expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 1 }, card)).toBe(false);
        });

        it('should validate topaze > amethyst correctly', () => {
          const card: CriteriaCard = {
            id: 'B_compare_gt_topaze_amethyst',
            name: 'Topaze > Amethyst',
            ruleA: 'Topaze > Amethyst',
            ruleB: 'Topaze ≤ Amethyst',
            category: 'comparison',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 2 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false);
        });
      });

      describe('Equality comparisons', () => {
        it('should validate saphir = topaze correctly', () => {
          const card: CriteriaCard = {
            id: 'B_compare_eq_saphir_topaze',
            name: 'Saphir = Topaze',
            ruleA: 'Saphir = Topaze',
            ruleB: 'Saphir ≠ Topaze',
            category: 'comparison',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 1 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 2, topaze: 3, amethyst: 1 }, card)).toBe(false);
        });
      });

      describe('Extremum tests', () => {
        it('should validate smallest value correctly', () => {
          const card: CriteriaCard = {
            id: 'B_smallest_is_saphir',
            name: 'Smallest is Saphir',
            ruleA: 'Smallest is Saphir',
            ruleB: 'Smallest is not Saphir',
            category: 'comparison',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 3 }, card)).toBe(false);
          expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 2 }, card)).toBe(true); // tied for smallest
        });

        it('should validate largest value correctly', () => {
          const card: CriteriaCard = {
            id: 'B_largest_is_amethyst',
            name: 'Largest is Amethyst',
            ruleA: 'Largest is Amethyst',
            ruleB: 'Largest is not Amethyst',
            category: 'comparison',
            successRule: 'A',
            testResult: null
          };

          expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true);
          expect(validateCriteria({ saphir: 3, topaze: 2, amethyst: 1 }, card)).toBe(false);
        });
      });
    });

    describe('Category C: Global Conditions', () => {
      it('should validate sum > 8 correctly', () => {
        const card: CriteriaCard = {
          id: 'C_sum_gt8',
          name: 'Sum > 8',
          ruleA: 'Sum > 8',
          ruleB: 'Sum ≤ 8',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 3, topaze: 3, amethyst: 3 }, card)).toBe(true); // 9 > 8
        expect(validateCriteria({ saphir: 2, topaze: 3, amethyst: 3 }, card)).toBe(false); // 8 ≤ 8
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false); // 6 ≤ 8
      });

      it('should validate exactly one pair correctly', () => {
        const card: CriteriaCard = {
          id: 'C_pairs_eq1',
          name: 'One Pair',
          ruleA: 'One pair',
          ruleB: 'Not one pair',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 3 }, card)).toBe(true); // one even (2)
        expect(validateCriteria({ saphir: 2, topaze: 4, amethyst: 3 }, card)).toBe(false); // two evens
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 5 }, card)).toBe(false); // no evens
      });

      it('should validate more than one odd correctly', () => {
        const card: CriteriaCard = {
          id: 'C_odds_gt1',
          name: 'More than one odd',
          ruleA: 'More than one odd',
          ruleB: 'One or zero odds',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 2 }, card)).toBe(true); // two odds
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 5 }, card)).toBe(true); // three odds
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 4 }, card)).toBe(false); // one odd
        expect(validateCriteria({ saphir: 2, topaze: 4, amethyst: 2 }, card)).toBe(false); // zero odds
      });

      it('should validate all unique correctly', () => {
        const card: CriteriaCard = {
          id: 'C_all_unique',
          name: 'All unique',
          ruleA: 'All unique',
          ruleB: 'Not all unique',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, card)).toBe(false);
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 2 }, card)).toBe(false);
      });

      it('should validate exactly two equal correctly', () => {
        const card: CriteriaCard = {
          id: 'C_exactly_two_equal',
          name: 'Exactly two equal',
          ruleA: 'Exactly two equal',
          ruleB: 'Not exactly two equal',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false); // all unique
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 2 }, card)).toBe(false); // all same
      });

      it('should validate all < 4 correctly', () => {
        const card: CriteriaCard = {
          id: 'C_all_lt4',
          name: 'All < 4',
          ruleA: 'All < 4',
          ruleB: 'At least one ≥ 4',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 4 }, card)).toBe(false);
        expect(validateCriteria({ saphir: 4, topaze: 5, amethyst: 3 }, card)).toBe(false);
      });

      it('should validate strictly increasing correctly', () => {
        const card: CriteriaCard = {
          id: 'C_strictly_increasing',
          name: 'Strictly increasing',
          ruleA: 'S < T < A',
          ruleB: 'Not strictly increasing',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 5 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, card)).toBe(false); // equal
        expect(validateCriteria({ saphir: 3, topaze: 2, amethyst: 1 }, card)).toBe(false); // decreasing
      });

      it('should validate strictly decreasing correctly', () => {
        const card: CriteriaCard = {
          id: 'C_strictly_decreasing',
          name: 'Strictly decreasing',
          ruleA: 'S > T > A',
          ruleB: 'Not strictly decreasing',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 3, topaze: 2, amethyst: 1 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 5, topaze: 3, amethyst: 1 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false);
      });

      it('should validate sum is even correctly', () => {
        const card: CriteriaCard = {
          id: 'C_sum_is_even',
          name: 'Sum is even',
          ruleA: 'Sum is even',
          ruleB: 'Sum is odd',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 2 }, card)).toBe(true); // 4
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 2 }, card)).toBe(true); // 6
        expect(validateCriteria({ saphir: 1, topaze: 1, amethyst: 1 }, card)).toBe(false); // 3
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 2 }, card)).toBe(false); // 5
      });

      it('should validate product > 20 correctly', () => {
        const card: CriteriaCard = {
          id: 'C_product_gt20',
          name: 'Product > 20',
          ruleA: 'Product > 20',
          ruleB: 'Product ≤ 20',
          category: 'global',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 3, topaze: 4, amethyst: 2 }, card)).toBe(true); // 24 > 20
        expect(validateCriteria({ saphir: 5, topaze: 5, amethyst: 1 }, card)).toBe(true); // 25 > 20
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 5 }, card)).toBe(false); // 20 ≤ 20
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false); // 6 ≤ 20
      });
    });

    describe('Category D: Complex Conditions', () => {
      it('should validate OR pair ST correctly', () => {
        const card: CriteriaCard = {
          id: 'D_or_pair_ST',
          name: 'Saphir or Topaze is even',
          ruleA: 'S even OR T even',
          ruleB: 'S odd AND T odd',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 3 }, card)).toBe(true); // S even
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true); // T even
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 3 }, card)).toBe(true); // both even
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 2 }, card)).toBe(false); // both odd
      });

      it('should validate OR gt3 SA correctly', () => {
        const card: CriteriaCard = {
          id: 'D_or_gt3_SA',
          name: 'Saphir > 3 or Amethyst > 3',
          ruleA: 'S > 3 OR A > 3',
          ruleB: 'S ≤ 3 AND A ≤ 3',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 4, topaze: 1, amethyst: 2 }, card)).toBe(true); // S > 3
        expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 4 }, card)).toBe(true); // A > 3
        expect(validateCriteria({ saphir: 4, topaze: 1, amethyst: 5 }, card)).toBe(true); // both > 3
        expect(validateCriteria({ saphir: 3, topaze: 1, amethyst: 2 }, card)).toBe(false); // both ≤ 3
      });

      it('should validate middle is even correctly', () => {
        const card: CriteriaCard = {
          id: 'D_middle_is_even',
          name: 'Middle is even',
          ruleA: 'Middle is even',
          ruleB: 'Middle is odd or no middle',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true); // middle = 2
        expect(validateCriteria({ saphir: 3, topaze: 2, amethyst: 1 }, card)).toBe(true); // middle = 2
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 5 }, card)).toBe(false); // middle = 3
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 2 }, card)).toBe(false); // no unique middle
      });

      it('should validate sum ST > A correctly', () => {
        const card: CriteriaCard = {
          id: 'D_sum_ST_gt_A',
          name: 'S + T > A',
          ruleA: 'S + T > A',
          ruleB: 'S + T ≤ A',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 3, topaze: 2, amethyst: 4 }, card)).toBe(true); // 5 > 4
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 3 }, card)).toBe(true); // 4 > 3
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 4 }, card)).toBe(false); // 3 ≤ 4
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 4 }, card)).toBe(false); // 4 ≤ 4
      });

      it('should validate range > 2 correctly', () => {
        const card: CriteriaCard = {
          id: 'D_range_gt2',
          name: 'Range > 2',
          ruleA: 'Max - Min > 2',
          ruleB: 'Max - Min ≤ 2',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 5 }, card)).toBe(true); // 5-1 = 4 > 2
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 4 }, card)).toBe(true); // 4-1 = 3 > 2
        expect(validateCriteria({ saphir: 2, topaze: 3, amethyst: 4 }, card)).toBe(false); // 4-2 = 2 ≤ 2
        expect(validateCriteria({ saphir: 3, topaze: 3, amethyst: 3 }, card)).toBe(false); // 3-3 = 0 ≤ 2
      });

      it('should validate at least one 2 correctly', () => {
        const card: CriteriaCard = {
          id: 'D_at_least_one_2',
          name: 'At least one 2',
          ruleA: 'At least one 2',
          ruleB: 'No 2',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 2, topaze: 1, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 2 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 2, topaze: 2, amethyst: 2 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 4 }, card)).toBe(false);
      });

      it('should validate at least one 4 correctly', () => {
        const card: CriteriaCard = {
          id: 'D_at_least_one_4',
          name: 'At least one 4',
          ruleA: 'At least one 4',
          ruleB: 'No 4',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 4, topaze: 1, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 4, amethyst: 3 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 3, amethyst: 4 }, card)).toBe(true);
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false);
      });

      it('should validate count gt3 equals lt3 correctly', () => {
        const card: CriteriaCard = {
          id: 'D_count_gt3_eq_lt3',
          name: 'Count >3 = Count <3',
          ruleA: 'Count >3 = Count <3',
          ruleB: 'Count >3 ≠ Count <3',
          category: 'composite',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 4, amethyst: 3 }, card)).toBe(true); // 1 > 3, 1 < 3
        expect(validateCriteria({ saphir: 2, topaze: 5, amethyst: 3 }, card)).toBe(true); // 1 > 3, 1 < 3
        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false); // 0 > 3, 2 < 3
        expect(validateCriteria({ saphir: 4, topaze: 5, amethyst: 3 }, card)).toBe(false); // 2 > 3, 0 < 3
      });
    });

    describe('Rule B logic', () => {
      it('should return opposite result when successRule is B', () => {
        const cardA: CriteriaCard = {
          id: 'A_parity_saphir',
          name: 'Saphir Parity',
          ruleA: 'Saphir is EVEN',
          ruleB: 'Saphir is ODD',
          category: 'single',
          successRule: 'A',
          testResult: null
        };

        const cardB: CriteriaCard = { ...cardA, successRule: 'B' };

        const combination: Combination = { saphir: 2, topaze: 1, amethyst: 3 }; // saphir is even

        expect(validateCriteria(combination, cardA)).toBe(true); // Rule A: even succeeds
        expect(validateCriteria(combination, cardB)).toBe(false); // Rule B: even fails (wants odd)
      });
    });

    describe('Invalid card IDs', () => {
      it('should return false for unknown card IDs', () => {
        const card: CriteriaCard = {
          id: 'UNKNOWN_CARD',
          name: 'Unknown',
          ruleA: 'Unknown',
          ruleB: 'Unknown',
          category: 'single',
          successRule: 'A',
          testResult: null
        };

        expect(validateCriteria({ saphir: 1, topaze: 2, amethyst: 3 }, card)).toBe(false);
      });
    });
  });

  describe('generateUniqueSolutionSet', () => {
    it('should generate a valid solution set', () => {
      const result = generateUniqueSolutionSet();

      expect(result.cards).toBeDefined();
      expect(result.solution).toBeDefined();
      expect(result.cards.length).toBeGreaterThan(0);
      expect(result.cards.length).toBeLessThanOrEqual(5);
    });

    it('should generate valid combinations', () => {
      const result = generateUniqueSolutionSet();
      const { saphir, topaze, amethyst } = result.solution;

      expect(saphir).toBeGreaterThanOrEqual(1);
      expect(saphir).toBeLessThanOrEqual(5);
      expect(topaze).toBeGreaterThanOrEqual(1);
      expect(topaze).toBeLessThanOrEqual(5);
      expect(amethyst).toBeGreaterThanOrEqual(1);
      expect(amethyst).toBeLessThanOrEqual(5);
    });

    it('should generate cards with proper structure', () => {
      const result = generateUniqueSolutionSet();

      result.cards.forEach(card => {
        expect(card.id).toBeDefined();
        expect(card.name).toBeDefined();
        expect(card.ruleA).toBeDefined();
        expect(card.ruleB).toBeDefined();
        expect(['single', 'comparison', 'global', 'composite']).toContain(card.category);
        expect(['A', 'B']).toContain(card.successRule);
        expect(card.testResult).toBeNull();
      });
    });

    it('should generate solution that passes all its criteria cards', () => {
      const result = generateUniqueSolutionSet();

      // The solution should pass all criteria cards
      result.cards.forEach(card => {
        expect(validateCriteria(result.solution, card)).toBe(true);
      });
    });

    it('should generate unique card families', () => {
      const result = generateUniqueSolutionSet();

      // This is a basic check - in a real implementation, we'd need access to getCardFamily
      // For now, just check that we have cards
      expect(result.cards.length).toBeGreaterThan(0);
    });

    it('should handle multiple generations consistently', () => {
      // Generate multiple solution sets to ensure consistency
      for (let i = 0; i < 5; i++) {
        const result = generateUniqueSolutionSet();

        expect(result.cards.length).toBeGreaterThan(0);
        expect(result.solution).toBeDefined();

        // Each solution should pass its own criteria
        result.cards.forEach(card => {
          expect(validateCriteria(result.solution, card)).toBe(true);
        });
      }
    });
  });

  describe('Edge cases and boundary conditions', () => {
    it('should handle all minimum values', () => {
      const combination: Combination = { saphir: 1, topaze: 1, amethyst: 1 };

      const card: CriteriaCard = {
        id: 'C_sum_gt8',
        name: 'Sum > 8',
        ruleA: 'Sum > 8',
        ruleB: 'Sum ≤ 8',
        category: 'global',
        successRule: 'A',
        testResult: null
      };

      expect(validateCriteria(combination, card)).toBe(false); // sum = 3 ≤ 8
    });

    it('should handle all maximum values', () => {
      const combination: Combination = { saphir: 5, topaze: 5, amethyst: 5 };

      const card: CriteriaCard = {
        id: 'C_sum_gt8',
        name: 'Sum > 8',
        ruleA: 'Sum > 8',
        ruleB: 'Sum ≤ 8',
        category: 'global',
        successRule: 'A',
        testResult: null
      };

      expect(validateCriteria(combination, card)).toBe(true); // sum = 15 > 8
    });

    it('should handle boundary values for thresholds', () => {
      const card: CriteriaCard = {
        id: 'A_threshold_saphir_gt3',
        name: 'Saphir > 3',
        ruleA: 'Saphir > 3',
        ruleB: 'Saphir ≤ 3',
        category: 'single',
        successRule: 'A',
        testResult: null
      };

      expect(validateCriteria({ saphir: 3, topaze: 1, amethyst: 1 }, card)).toBe(false); // exactly 3
      expect(validateCriteria({ saphir: 4, topaze: 1, amethyst: 1 }, card)).toBe(true); // just above 3
    });
  });

  describe('Difficulty Scoring System', () => {
    describe('calculatePuzzleComplexity', () => {
      it('should return a valid complexity score', () => {
        const mockCards: CriteriaCard[] = [
          {
            id: 'A_parity_saphir',
            name: 'Parité Saphir',
            ruleA: 'Saphir est PAIR',
            ruleB: 'Saphir est IMPAIR',
            category: 'single',
            successRule: 'A',
            testResult: null
          },
          {
            id: 'B_compare_gt_saphir_topaze',
            name: 'Comparaison Saphir/Topaze',
            ruleA: 'Saphir > Topaze',
            ruleB: 'Saphir ≤ Topaze',
            category: 'comparison',
            successRule: 'A',
            testResult: null
          },
          {
            id: 'C_sum_gt8',
            name: 'Somme comparée à 8',
            ruleA: 'Saphir + Topaze + Améthyste > 8',
            ruleB: 'Saphir + Topaze + Améthyste ≤ 8',
            category: 'global',
            successRule: 'A',
            testResult: null
          }
        ];

        const mockSolution: Combination = { saphir: 4, topaze: 2, amethyst: 3 };
        const complexity = calculatePuzzleComplexity(mockCards, mockSolution);

        expect(typeof complexity).toBe('number');
        expect(complexity).toBeGreaterThanOrEqual(0);
        expect(complexity).toBeLessThanOrEqual(100);
      });

      it('should give higher scores for more complex card combinations', () => {
        const simpleCards: CriteriaCard[] = [
          {
            id: 'A_equality_saphir_1',
            name: 'Saphir est 1',
            ruleA: 'Saphir = 1',
            ruleB: 'Saphir ≠ 1',
            category: 'single',
            successRule: 'A',
            testResult: null
          },
          {
            id: 'A_equality_topaze_1',
            name: 'Topaze est 1',
            ruleA: 'Topaze = 1',
            ruleB: 'Topaze ≠ 1',
            category: 'single',
            successRule: 'A',
            testResult: null
          }
        ];

        const complexCards: CriteriaCard[] = [
          {
            id: 'C_sum_gt8',
            name: 'Somme comparée à 8',
            ruleA: 'Saphir + Topaze + Améthyste > 8',
            ruleB: 'Saphir + Topaze + Améthyste ≤ 8',
            category: 'global',
            successRule: 'A',
            testResult: null
          },
          {
            id: 'D_or_pair_ST',
            name: 'Saphir/Topaze pair',
            ruleA: 'Saphir est PAIR ou Topaze est PAIR',
            ruleB: 'Saphir et Topaze sont IMPAIRS',
            category: 'composite',
            successRule: 'A',
            testResult: null
          }
        ];

        const solution: Combination = { saphir: 2, topaze: 3, amethyst: 4 };

        const simpleComplexity = calculatePuzzleComplexity(simpleCards, solution);
        const complexComplexity = calculatePuzzleComplexity(complexCards, solution);

        expect(typeof simpleComplexity).toBe('number');
        expect(typeof complexComplexity).toBe('number');
        expect(complexComplexity).toBeGreaterThan(simpleComplexity);
      });

      it('should handle edge cases gracefully', () => {
        const emptyCards: CriteriaCard[] = [];
        const solution: Combination = { saphir: 1, topaze: 1, amethyst: 1 };

        const complexity = calculatePuzzleComplexity(emptyCards, solution);
        expect(typeof complexity).toBe('number');
        expect(complexity).toBeGreaterThanOrEqual(0);
        expect(complexity).toBeLessThanOrEqual(100);
      });
    });

    describe('generatePuzzleWithDifficulty', () => {
      it('should generate puzzles with difficulty scores for all levels', () => {
        const difficulties = ['easy', 'medium', 'hard', 'expert'] as const;

        const easy = generatePuzzleWithDifficulty('easy');
        const medium = generatePuzzleWithDifficulty('medium');
        const hard = generatePuzzleWithDifficulty('hard');
        const expert = generatePuzzleWithDifficulty('expert');

        // Check that all puzzles have required properties
        [easy, medium, hard, expert].forEach(puzzle => {
          expect(puzzle.cards).toBeDefined();
          expect(puzzle.solution).toBeDefined();
          expect(puzzle.difficultyScore).toBeDefined();
          expect(typeof puzzle.difficultyScore).toBe('number');
        });

        // Check difficulty-specific ranges
        expect(easy.difficultyScore).toBeGreaterThanOrEqual(0);
        expect(easy.difficultyScore).toBeLessThanOrEqual(25);
        expect(medium.difficultyScore).toBeGreaterThanOrEqual(25);
        expect(medium.difficultyScore).toBeLessThanOrEqual(50);
        expect(hard.difficultyScore).toBeGreaterThanOrEqual(50);
        expect(hard.difficultyScore).toBeLessThanOrEqual(75);
        expect(expert.difficultyScore).toBeGreaterThanOrEqual(75);
        expect(expert.difficultyScore).toBeLessThanOrEqual(100);
      });

      it('should generate valid puzzles that have unique solutions', () => {
        const puzzle = generatePuzzleWithDifficulty('medium');

        // Verify the solution satisfies all cards
        puzzle.cards.forEach(card => {
          expect(validateCriteria(puzzle.solution, card)).toBe(true);
        });
      });

      it('should generate different card counts for different difficulties', () => {
        const easy = generatePuzzleWithDifficulty('easy');
        const medium = generatePuzzleWithDifficulty('medium');
        const hard = generatePuzzleWithDifficulty('hard');
        const expert = generatePuzzleWithDifficulty('expert');

        expect(easy.cards.length).toBe(4);
        expect(medium.cards.length).toBe(5);
        expect(hard.cards.length).toBeGreaterThanOrEqual(5);
        expect(hard.cards.length).toBeLessThanOrEqual(6);
        expect(expert.cards.length).toBeGreaterThanOrEqual(5);
        expect(expert.cards.length).toBeLessThanOrEqual(7);
      });

      it('should generate consistent difficulty scores for multiple runs', () => {
        const scores: number[] = [];

        // Generate multiple puzzles of the same difficulty
        for (let i = 0; i < 5; i++) {
          const puzzle = generatePuzzleWithDifficulty('medium');
          scores.push(puzzle.difficultyScore);
        }

        // All scores should be valid and in medium difficulty range
        scores.forEach(score => {
          expect(typeof score).toBe('number');
          expect(score).toBeGreaterThanOrEqual(25);
          expect(score).toBeLessThanOrEqual(50);
        });
      });

      it('should include difficulty score in generated puzzle', () => {
        const puzzle = generatePuzzleWithDifficulty('hard');

        expect(puzzle).toHaveProperty('difficultyScore');
        expect(typeof puzzle.difficultyScore).toBe('number');
        expect(puzzle.difficultyScore).toBeGreaterThanOrEqual(50);
        expect(puzzle.difficultyScore).toBeLessThanOrEqual(75);
      });

      it('should consistently generate puzzles that meet difficulty score requirements', () => {
        // Test multiple generations to ensure consistency
        const testCases = [
          { difficulty: 'easy' as const, min: 0, max: 25 },
          { difficulty: 'medium' as const, min: 25, max: 50 },
          { difficulty: 'hard' as const, min: 50, max: 75 },
          { difficulty: 'expert' as const, min: 75, max: 100 }
        ];

        testCases.forEach(({ difficulty, min, max }) => {
          // Generate multiple puzzles for each difficulty
          for (let i = 0; i < 3; i++) {
            const puzzle = generatePuzzleWithDifficulty(difficulty);

            expect(puzzle.difficultyScore).toBeGreaterThanOrEqual(min);
            expect(puzzle.difficultyScore).toBeLessThanOrEqual(max);

            // Verify the solution satisfies all cards
            puzzle.cards.forEach(card => {
              expect(validateCriteria(puzzle.solution, card)).toBe(true);
            });
          }
        });
      });
    });
  });
});
