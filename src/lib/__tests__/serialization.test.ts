import { serializePuzzle, deserializePuzzle } from '../utils';
import { AllPossibleCards } from '../criteriaLogic';
import {Combination, CriteriaCard, Digit} from '../gameTypes';
import { describe, it, expect } from 'vitest';

function generateRandomDigit(): Digit {
  return Math.round(Math.random() * 5) as Digit;
}

function generateRandomCard() {
  return AllPossibleCards[Math.floor(Math.random() * AllPossibleCards.length)];
}

describe('Puzzle serialization/deserialization', () => {
  it('should serialize and deserialize a random puzzle correctly', () => {
    // Exemple de solution et cartes (using random values)
    const solution: Combination = { saphir: generateRandomDigit(), topaze: generateRandomDigit(), amethyst: generateRandomDigit() };
// On prend 5 cartes différentes (using random cards)
    const cards: CriteriaCard[] = [
      { ...generateRandomCard(), successRule: 'A', testResult: null },
      { ...generateRandomCard(), successRule: 'B', testResult: null },
      { ...generateRandomCard(), successRule: 'A', testResult: null },
      { ...generateRandomCard(), successRule: 'B', testResult: null },
      { ...generateRandomCard(), successRule: 'A', testResult: null },
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
