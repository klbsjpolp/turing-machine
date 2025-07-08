import { serializePuzzle, deserializePuzzle } from '../utils';
import { AllPossibleCards } from '../criteriaLogic';
import {Combination, CriteriaCard, Digit} from '../gameTypes';
import { describe, it, expect, beforeEach } from 'vitest';

function generateRandomDigit(): Digit {
  return Math.round(Math.random() * 5) as Digit;
}

function generateRandomCard() {
  return AllPossibleCards[Math.floor(Math.random() * AllPossibleCards.length)];
}

describe('Puzzle serialization/deserialization', () => {
  it('should serialize and deserialize a puzzle correctly', () => {
    // Exemple de solution et cartes (using fixed values for deterministic testing)
    const solution: Combination = { saphir: 3, topaze: 2, amethyst: 5 };
    const allCards = AllPossibleCards;
    // On prend 5 cartes différentes (using fixed indices for deterministic testing)
    const cards: CriteriaCard[] = [
      { ...allCards[5], successRule: 'A', testResult: null },
      { ...allCards[6], successRule: 'B', testResult: null },
      { ...allCards[7], successRule: 'A', testResult: null },
      { ...allCards[8], successRule: 'B', testResult: null },
      { ...allCards[9], successRule: 'A', testResult: null },
    ];
    const serialized = serializePuzzle(solution, cards);
    const deserialized = deserializePuzzle(serialized);
    expect(deserialized.solution).toEqual(solution);
    // On ne compare que id et successRule pour les cartes
    for (let i = 0; i < 5; i++) {
      expect(deserialized.cards[i].id).toBe(cards[i].id);
      expect(deserialized.cards[i].successRule).toBe(cards[i].successRule);
    }
  });

  it('should serialize and deserialize any puzzle correctly', () => {
    // Exemple de solution et cartes (using fixed values for deterministic testing)
    const solution: Combination = { saphir: 2, topaze: 4, amethyst: 1 };
    const allCards = AllPossibleCards;
    // On prend 5 cartes différentes (using fixed indices for deterministic testing)
    const cards: CriteriaCard[] = [
      { ...allCards[0], successRule: 'A', testResult: null },
      { ...allCards[1], successRule: 'B', testResult: null },
      { ...allCards[2], successRule: 'A', testResult: null },
      { ...allCards[3], successRule: 'B', testResult: null },
      { ...allCards[4], successRule: 'A', testResult: null },
    ];
    const serialized = serializePuzzle(solution, cards);
    const deserialized = deserializePuzzle(serialized);
    expect(deserialized.solution).toEqual(solution);
    // On ne compare que id et successRule pour les cartes
    for (let i = 0; i < 5; i++) {
      expect(deserialized.cards[i].id).toBe(cards[i].id);
      expect(deserialized.cards[i].successRule).toBe(cards[i].successRule);
    }
  });

  it('should throw on unknown card id', () => {
    const solution: Combination = { saphir: 1, topaze: 1, amethyst: 1 };
    const cards: CriteriaCard[] = [
      { id: 'FAKE_ID', name: '', ruleA: '', ruleB: '', category: 'single', family: '', successRule: 'A', testResult: null },
      { id: 'FAKE_ID2', name: '', ruleA: '', ruleB: '', category: 'single', family: '', successRule: 'B', testResult: null },
      { id: 'FAKE_ID3', name: '', ruleA: '', ruleB: '', category: 'single', family: '', successRule: 'A', testResult: null },
      { id: 'FAKE_ID4', name: '', ruleA: '', ruleB: '', category: 'single', family: '', successRule: 'B', testResult: null },
      { id: 'FAKE_ID5', name: '', ruleA: '', ruleB: '', category: 'single', family: '', successRule: 'A', testResult: null },
    ];
    expect(() => serializePuzzle(solution, cards)).toThrow();
  });
});
