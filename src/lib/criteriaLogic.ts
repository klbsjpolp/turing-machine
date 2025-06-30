import { Combination, CriteriaCard, Digit } from './gameTypes';

// --- Helpers --- //

const colors = [
  { name: 'Saphir', id: 'saphir', key: 'saphir' as const },
  { name: 'Topaze', id: 'topaze', key: 'topaze' as const },
  { name: 'Améthyste', id: 'amethyst', key: 'amethyst' as const },
];

const colorPairs = [
  { c1: colors[0], c2: colors[1] }, // S-T
  { c1: colors[1], c2: colors[2] }, // T-A
  { c1: colors[0], c2: colors[2] }, // S-A
];

// --- Validation Logic --- //

export function validateCriteria(combination: Combination, card: CriteriaCard): boolean {
  const { saphir, topaze, amethyst } = combination;
  const values = [saphir, topaze, amethyst];
  const sum = saphir + topaze + amethyst;
  const product = saphir * topaze * amethyst;
  const pairCount = values.filter(n => n % 2 === 0).length;
  const oddCount = 3 - pairCount;
  const uniqueValues = new Set(values);
  const sortedValues = [...values].sort((a, b) => a - b);
  const min = sortedValues[0];
  const max = sortedValues[2];
  const middle = sortedValues[1];

  let ruleAResult = false;

  switch (card.id) {
    // === CATEGORY A: VALUE CONDITIONS ===
    case 'A_parity_saphir': ruleAResult = saphir % 2 === 0; break;
    case 'A_parity_topaze': ruleAResult = topaze % 2 === 0; break;
    case 'A_parity_amethyst': ruleAResult = amethyst % 2 === 0; break;
    case 'A_threshold_saphir_lt3': ruleAResult = saphir < 3; break;
    case 'A_threshold_topaze_lt3': ruleAResult = topaze < 3; break;
    case 'A_threshold_amethyst_lt3': ruleAResult = amethyst < 3; break;
    case 'A_threshold_saphir_gt3': ruleAResult = saphir > 3; break;
    case 'A_threshold_topaze_gt3': ruleAResult = topaze > 3; break;
    case 'A_threshold_amethyst_gt3': ruleAResult = amethyst > 3; break;
    case 'A_equality_saphir_1': ruleAResult = saphir === 1; break;
    case 'A_equality_topaze_1': ruleAResult = topaze === 1; break;
    case 'A_equality_amethyst_1': ruleAResult = amethyst === 1; break;
    case 'A_equality_saphir_3': ruleAResult = saphir === 3; break;
    case 'A_equality_topaze_3': ruleAResult = topaze === 3; break;
    case 'A_equality_amethyst_3': ruleAResult = amethyst === 3; break;

    // === CATEGORY B: COMPARISON CONDITIONS ===
    case 'B_compare_gt_saphir_topaze': ruleAResult = saphir > topaze; break;
    case 'B_compare_gt_topaze_amethyst': ruleAResult = topaze > amethyst; break;
    case 'B_compare_gt_saphir_amethyst': ruleAResult = saphir > amethyst; break;
    case 'B_compare_eq_saphir_topaze': ruleAResult = saphir === topaze; break;
    case 'B_compare_eq_topaze_amethyst': ruleAResult = topaze === amethyst; break;
    case 'B_compare_eq_saphir_amethyst': ruleAResult = saphir === amethyst; break;
    case 'B_smallest_is_saphir': ruleAResult = min === saphir; break;
    case 'B_smallest_is_topaze': ruleAResult = min === topaze; break;
    case 'B_smallest_is_amethyst': ruleAResult = min === amethyst; break;
    case 'B_largest_is_saphir': ruleAResult = max === saphir; break;
    case 'B_largest_is_topaze': ruleAResult = max === topaze; break;
    case 'B_largest_is_amethyst': ruleAResult = max === amethyst; break;

    // === CATEGORY C: GLOBAL CONDITIONS ===
    case 'C_sum_gt8': ruleAResult = sum > 8; break;
    case 'C_pairs_eq1': ruleAResult = pairCount === 1; break;
    case 'C_odds_gt1': ruleAResult = oddCount > 1; break;
    case 'C_all_unique': ruleAResult = uniqueValues.size === 3; break;
    case 'C_exactly_two_equal': ruleAResult = uniqueValues.size === 2; break;
    case 'C_all_lt4': ruleAResult = values.every(v => v < 4); break;
    case 'C_strictly_increasing': ruleAResult = saphir < topaze && topaze < amethyst; break;
    case 'C_strictly_decreasing': ruleAResult = saphir > topaze && topaze > amethyst; break;
    case 'C_sum_is_even': ruleAResult = sum % 2 === 0; break;
    case 'C_product_gt20': ruleAResult = product > 20; break;

    // === CATEGORY D: COMPLEX CONDITIONS ===
    case 'D_or_pair_ST': ruleAResult = saphir % 2 === 0 || topaze % 2 === 0; break;
    case 'D_or_gt3_SA': ruleAResult = saphir > 3 || amethyst > 3; break;
    case 'D_middle_is_even': ruleAResult = uniqueValues.size === 3 && middle % 2 === 0; break;
    case 'D_sum_ST_gt_A': ruleAResult = (saphir + topaze) > amethyst; break;
    case 'D_range_gt2': ruleAResult = (max - min) > 2; break;
    case 'D_at_least_one_2': ruleAResult = values.includes(2); break;
    case 'D_at_least_one_4': ruleAResult = values.includes(4); break;
    case 'D_count_gt3_eq_lt3': ruleAResult = values.filter(v => v > 3).length === values.filter(v => v < 3).length; break;

    default: return false;
  }

  // For most cards, Rule B is the logical opposite of Rule A.
  // The logic is structured so `ruleAResult` is calculated, and we return its opposite for Rule B.
  // Special cases where Rule B is not !RuleA are handled implicitly by the logic (e.g., smallest_is_x).
  return card.successRule === 'A' ? ruleAResult : !ruleAResult;
}

// --- Card Generation --- //

function getAllCombinations(): Combination[] {
  const combinations: Combination[] = [];
  for (let s = 1; s <= 5; s++) {
    for (let t = 1; t <= 5; t++) {
      for (let a = 1; a <= 5; a++) {
        combinations.push({ saphir: s as Digit, topaze: t as Digit, amethyst: a as Digit });
      }
    }
  }
  return combinations;
}

function getAllPossibleCards(): Omit<CriteriaCard, 'successRule' | 'testResult'>[] {
  const allCards: Omit<CriteriaCard, 'successRule' | 'testResult'>[] = [];

  // Category A: Value Conditions (15 cards)
  colors.forEach(c => {
    allCards.push({ id: `A_parity_${c.id}`, name: `Parité ${c.name}`, ruleA: `${c.name} est PAIR`, ruleB: `${c.name} est IMPAIR`, category: 'single' });
    allCards.push({ id: `A_threshold_${c.id}_lt3`, name: `${c.name} comparé à 3`, ruleA: `${c.name} < 3`, ruleB: `${c.name} ≥ 3`, category: 'single' });
    allCards.push({ id: `A_threshold_${c.id}_gt3`, name: `${c.name} comparé à 3`, ruleA: `${c.name} > 3`, ruleB: `${c.name} ≤ 3`, category: 'single' });
    allCards.push({ id: `A_equality_${c.id}_1`, name: `${c.name} est 1`, ruleA: `${c.name} = 1`, ruleB: `${c.name} ≠ 1`, category: 'single' });
    allCards.push({ id: `A_equality_${c.id}_3`, name: `${c.name} est 3`, ruleA: `${c.name} = 3`, ruleB: `${c.name} ≠ 3`, category: 'single' });
  });

  // Category B: Comparison Conditions (12 cards)
  colorPairs.forEach(p => {
    allCards.push({ id: `B_compare_gt_${p.c1.id}_${p.c2.id}`, name: `Comparaison ${p.c1.name}/${p.c2.name}`, ruleA: `${p.c1.name} > ${p.c2.name}`, ruleB: `${p.c1.name} ≤ ${p.c2.name}`, category: 'comparison' });
    allCards.push({ id: `B_compare_eq_${p.c1.id}_${p.c2.id}`, name: `Égalité ${p.c1.name}/${p.c2.name}`, ruleA: `${p.c1.name} = ${p.c2.name}`, ruleB: `${p.c1.name} ≠ ${p.c2.name}`, category: 'comparison' });
  });
  colors.forEach(c => {
    allCards.push({ id: `B_smallest_is_${c.id}`, name: `${c.name} est le plus petit`, ruleA: `Le plus petit chiffre est ${c.name}`, ruleB: `Le plus petit chiffre n'est pas ${c.name}`, category: 'comparison' });
    allCards.push({ id: `B_largest_is_${c.id}`, name: `${c.name} est le plus grand`, ruleA: `Le plus grand chiffre est ${c.name}`, ruleB: `Le plus grand chiffre n'est pas ${c.name}`, category: 'comparison' });
  });

  // Category C: Global Conditions (10 cards - adjusted from README for clarity)
  allCards.push({ id: 'C_sum_gt8', name: 'Somme comparée à 8', ruleA: 'Saphir + Topaze + Améthyste > 8', ruleB: 'Saphir + Topaze + Améthyste ≤ 8', category: 'global' });
  allCards.push({ id: 'C_pairs_eq1', name: 'Un seul pair', ruleA: 'Un seul chiffre est PAIR', ruleB: 'Zéro ou plusieurs chiffre sont PAIRS', category: 'global' });
  allCards.push({ id: 'C_odds_gt1', name: 'Nombre d\'impair', ruleA: 'Plus d\'un chiffre est IMPAIR', ruleB: 'Zéro ou un chiffre est IMPAIR', category: 'global' });
  allCards.push({ id: 'C_all_unique', name: 'Tous uniques', ruleA: 'Tous uniques', ruleB: 'Au moins deux identiques', category: 'global' });
  allCards.push({ id: 'C_exactly_two_equal', name: 'Deux égaux', ruleA: 'Exactement deux chiffres égaux', ruleB: 'Tous uniques ou tous identiques', category: 'global' });
  allCards.push({ id: 'C_all_lt4', name: 'Tous < 4', ruleA: 'Tous les chiffres < 4', ruleB: 'Au moins un chiffre ≥ 4', category: 'global' });
  allCards.push({ id: 'C_strictly_increasing', name: 'Ordre croissant', ruleA: 'Saphir < Topaze < Améthyste', ruleB: 'Non croissant', category: 'global' });
  allCards.push({ id: 'C_strictly_decreasing', name: 'Ordre décroissant', ruleA: 'Saphir > Topaze > Améthyste', ruleB: 'Non décroissant', category: 'global' });
  allCards.push({ id: 'C_sum_is_even', name: 'Somme paire', ruleA: 'Saphir + Topaze + Améthyste est PAIRE', ruleB: 'Saphir + Topaze + Améthyste est IMPAIRE', category: 'global' });
  allCards.push({ id: 'C_product_gt20', name: 'Produit comparé à 20', ruleA: 'Saphir X Topaze X Améthyste > 20', ruleB: 'Saphir X Topaze X Améthyste ≤ 20', category: 'global' });

  // Category D: Complex Conditions (8 cards - adjusted)
  allCards.push({ id: 'D_or_pair_ST', name: 'Saphir/Topaze pair', ruleA: 'Saphir est PAIR ou Topaze est PAIR', ruleB: 'Saphir et Topaze sont IMPAIRS', category: 'composite' });
  allCards.push({ id: 'D_or_gt3_SA', name: 'Saphir/Améthyste comparé à 3', ruleA: 'Saphir > 3 ou Améthyste > 3', ruleB: 'Saphir ≤ 3 et Améthyste ≤ 3', category: 'composite' });
  allCards.push({ id: 'D_middle_is_even', name: 'Chiffre du milieu pair', ruleA: 'Le chiffre du milieu est PAIR', ruleB: 'Le chiffre du milieu est IMPAIR ou pas de milieu', category: 'composite' });
  allCards.push({ id: 'D_sum_ST_gt_A', name: 'Saphir + Topaze comparé à Améthyste', ruleA: 'Saphir + Topaze > Améthyste', ruleB: 'Saphir + Topaze ≤ Améthyste', category: 'composite' });
  allCards.push({ id: 'D_range_gt2', name: 'Max - min comparée à 2', ruleA: 'Plus grand - plus petit > 2', ruleB: 'Plus grand - plus petit ≤ 2', category: 'composite' });
  allCards.push({ id: 'D_at_least_one_2', name: 'Présence de 2', ruleA: 'Au moins un 2', ruleB: 'Aucun 2', category: 'composite' });
  allCards.push({ id: 'D_at_least_one_4', name: 'Présence de 4', ruleA: 'Au moins un 4', ruleB: 'Aucun 4', category: 'composite' });
  allCards.push({ id: 'D_count_gt3_eq_lt3', name: 'Équilibre des nombres', ruleA: 'Nb de chiffres > 3 = Nb de chiffres < 3', ruleB: 'Nb de chiffres > 3 ≠ Nb de chiffres < 3', category: 'composite' });

  return allCards;
}

function getCardFamily(cardId: string): string {
  const parts = cardId.split('_');
  const category = parts[0];
  const type = parts[1];

  if (category === 'A') {
    const color = parts[2];
    if (type === 'parity') {
      return `A-parity-${color}`;
    }
    if (type === 'threshold' || type === 'equality') {
      const value = parts[3].match(/\d+/)?.[0] || '';
      return `A-value-${color}-${value}`;
    }
  }

  if (category === 'B') {
    if (type === 'compare') {
      const c1 = parts[3];
      const c2 = parts[4];
      const sortedColors = [c1, c2].sort();
      return `B-compare-${sortedColors[0]}-${sortedColors[1]}`;
    }
    if (type === 'smallest' || type === 'largest') {
      return `B-extremum-${parts[3]}`;
    }
  }

  // For C and D, the whole ID is unique enough to be its own family.
  return cardId;
}

/**
 * Generates a set of criteria cards that guarantees a single unique solution.
 * This is the main function to call to create a new puzzle.
 */
export function generateUniqueSolutionSet(): { cards: CriteriaCard[]; solution: Combination } {
  const allCombinations = getAllCombinations();
  const allPossibleCards = getAllPossibleCards();
  let attempts = 0;

  while (attempts < 1000) {
    attempts++;
    const targetSolution = allCombinations[Math.floor(Math.random() * allCombinations.length)];
    const shuffledPossibleCards = [...allPossibleCards].sort(() => Math.random() - 0.5);

    const currentCards: CriteriaCard[] = [];
    const usedCardFamilies = new Set<string>();
    let remainingCombinations = [...allCombinations];

    // Try to build a set of 5 cards
    for (const cardDef of shuffledPossibleCards) {
      if (currentCards.length >= 5) break;

      const family = getCardFamily(cardDef.id);
      if (usedCardFamilies.has(family)) {
        continue;
      }

      const rule = Math.random() > 0.5 ? 'A' : 'B';
      const potentialCard: CriteriaCard = { ...cardDef, successRule: rule, testResult: null };

      if (!validateCriteria(targetSolution, potentialCard)) {
        potentialCard.successRule = rule === 'A' ? 'B' : 'A';
        if (!validateCriteria(targetSolution, potentialCard)) {
          continue; // This card is not valid for the solution
        }
      }

      // Check if adding the card is useful (doesn't eliminate all solutions)
      const nextRemaining = remainingCombinations.filter(combo => validateCriteria(combo, potentialCard));
      if (nextRemaining.length === 0) {
        continue;
      }

      currentCards.push(potentialCard);
      usedCardFamilies.add(family);
      remainingCombinations = nextRemaining;
    }

    // After gathering 5 cards (or as many as possible), check for unique solution
    if (currentCards.length === 5 && remainingCombinations.length === 1) {
      if (
        remainingCombinations[0].saphir === targetSolution.saphir &&
        remainingCombinations[0].topaze === targetSolution.topaze &&
        remainingCombinations[0].amethyst === targetSolution.amethyst
      ) {
        console.log(`Generated a unique solution in ${attempts} attempts with 5 cards.`);
        return { cards: currentCards, solution: targetSolution };
      }
    }
  }

  console.error("Failed to generate a unique solution set with 5 cards. Falling back to a failsafe puzzle.");
  return {
    cards: generateFailsafeSet(),
    solution: { saphir: 1, topaze: 2, amethyst: 3 },
  };
}

function generateFailsafeSet(): CriteriaCard[] {
  return [
    { id: 'A_equality_saphir_1', name: 'Saphir est 1', ruleA: 'Saphir = 1', ruleB: 'Saphir ≠ 1', category: 'single', successRule: 'A', testResult: null },
    { id: 'A_equality_topaze_3', name: 'Topaze est 3', ruleA: 'Topaze = 3', ruleB: 'Topaze ≠ 3', category: 'single', successRule: 'B', testResult: null }, // Rule B means Topaze != 3
    { id: 'D_at_least_one_2', name: 'Présence de 2', ruleA: 'Au moins un 2', ruleB: 'Aucun 2', category: 'composite', successRule: 'A', testResult: null },
    { id: 'C_strictly_increasing', name: 'Ordre Croissant', ruleA: 'S < T < A', ruleB: 'Non croissant', category: 'global', successRule: 'A', testResult: null },
    { id: 'C_all_lt4', name: 'Tous Petits', ruleA: 'Tous les chiffres < 4', ruleB: 'Au moins un chiffre ≥ 4', category: 'global', successRule: 'A', testResult: null },
  ];
}
