import {Combination, CriteriaCard, Difficulty, Digit} from './gameTypes';

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
    case 'A_equality_saphir_2': ruleAResult = saphir === 2; break;
    case 'A_equality_topaze_2': ruleAResult = topaze === 2; break;
    case 'A_equality_amethyst_2': ruleAResult = amethyst === 2; break;
    case 'A_equality_saphir_3': ruleAResult = saphir === 3; break;
    case 'A_equality_topaze_3': ruleAResult = topaze === 3; break;
    case 'A_equality_amethyst_3': ruleAResult = amethyst === 3; break;
    case 'A_equality_saphir_4': ruleAResult = saphir === 4; break;
    case 'A_equality_topaze_4': ruleAResult = topaze === 4; break;
    case 'A_equality_amethyst_4': ruleAResult = amethyst === 4; break;
    case 'A_equality_saphir_5': ruleAResult = saphir === 5; break;
    case 'A_equality_topaze_5': ruleAResult = topaze === 5; break;
    case 'A_equality_amethyst_5': ruleAResult = amethyst === 5; break;

    // === CATEGORY B: COMPARISON CONDITIONS ===
    case 'B_compare_gt_saphir_topaze': ruleAResult = saphir > topaze; break;
    case 'B_compare_gt_topaze_amethyst': ruleAResult = topaze > amethyst; break;
    case 'B_compare_gt_saphir_amethyst': ruleAResult = saphir > amethyst; break;
    case 'B_compare_eq_saphir_topaze': ruleAResult = saphir === topaze; break;
    case 'B_compare_eq_topaze_amethyst': ruleAResult = topaze === amethyst; break;
    case 'B_compare_eq_saphir_amethyst': ruleAResult = saphir === amethyst; break;
    case 'B_compare_gt_topaze_saphir': ruleAResult = topaze > saphir; break;
    case 'B_compare_gt_amethyst_topaze': ruleAResult = amethyst > topaze; break;
    case 'B_compare_gt_amethyst_saphir': ruleAResult = amethyst > saphir; break;
    case 'B_compare_eq_topaze_saphir': ruleAResult = topaze === saphir; break;
    case 'B_compare_eq_amethyst_topaze': ruleAResult = amethyst === topaze; break;
    case 'B_compare_eq_amethyst_saphir': ruleAResult = amethyst === saphir; break;
    case 'B_smallest_is_saphir': ruleAResult = min === saphir; break;
    case 'B_smallest_is_topaze': ruleAResult = min === topaze; break;
    case 'B_smallest_is_amethyst': ruleAResult = min === amethyst; break;
    case 'B_largest_is_saphir': ruleAResult = max === saphir; break;
    case 'B_largest_is_topaze': ruleAResult = max === topaze; break;
    case 'B_largest_is_amethyst': ruleAResult = max === amethyst; break;

    // === CATEGORY C: GLOBAL CONDITIONS ===
    case 'C_sum_gt8': ruleAResult = sum > 8; break;
    case 'C_sum_gt6': ruleAResult = sum > 6; break;
    case 'C_sum_gt12': ruleAResult = sum > 12; break;
    case 'C_pairs_eq0': ruleAResult = pairCount === 0; break;
    case 'C_odds_eq0': ruleAResult = oddCount === 0; break;
    case 'C_pairs_eq1': ruleAResult = pairCount === 1; break;
    case 'C_odds_eq1': ruleAResult = oddCount === 1; break;
    case 'C_pairs_gt1': ruleAResult = pairCount > 1; break;
    case 'C_odds_gt1': ruleAResult = oddCount > 1; break;
    case 'C_all_unique': ruleAResult = uniqueValues.size === 3; break;
    case 'C_exactly_two_equal': ruleAResult = uniqueValues.size === 2; break;
    case 'C_all_lt4': ruleAResult = values.every(v => v < 4); break;
    case 'C_all_gt2': ruleAResult = values.every(v => v > 2); break;
    case 'C_strictly_increasing': ruleAResult = saphir < topaze && topaze < amethyst; break;
    case 'C_strictly_decreasing': ruleAResult = saphir > topaze && topaze > amethyst; break;
    case 'C_sum_is_even': ruleAResult = sum % 2 === 0; break;
    case 'C_product_gt20': ruleAResult = product > 20; break;
    case 'C_product_gt35': ruleAResult = product > 35; break;
    case 'C_product_gt15': ruleAResult = product > 15; break;

    // === CATEGORY D: COMPLEX CONDITIONS ===
    case 'D_or_pair_ST': ruleAResult = saphir % 2 === 0 || topaze % 2 === 0; break;
    case 'D_or_pair_TA': ruleAResult = topaze % 2 === 0 || amethyst % 2 === 0; break;
    case 'D_or_pair_SA': ruleAResult = saphir % 2 === 0 || amethyst % 2 === 0; break;
    case 'D_or_gt3_ST': ruleAResult = saphir > 3 || topaze > 3; break;
    case 'D_or_gt3_TA': ruleAResult = topaze > 3 || amethyst > 3; break;
    case 'D_or_gt3_SA': ruleAResult = saphir > 3 || amethyst > 3; break;
    case 'D_middle_is_even': ruleAResult = uniqueValues.size === 3 && middle % 2 === 0; break;
    case 'D_start_end_are_even': ruleAResult = min % 2 === 0 && max % 2 === 0; break;
    case 'D_sum_ST_gt_A': ruleAResult = (saphir + topaze) > amethyst; break;
    case 'D_sum_TA_gt_S': ruleAResult = (topaze + amethyst) > saphir; break;
    case 'D_sum_SA_gt_T': ruleAResult = (saphir + amethyst) > topaze; break;
    case 'D_range_gt2': ruleAResult = (max - min) > 2; break;
    case 'D_at_least_one_1': ruleAResult = values.includes(1); break;
    case 'D_at_least_one_2': ruleAResult = values.includes(2); break;
    case 'D_at_least_one_3': ruleAResult = values.includes(3); break;
    case 'D_at_least_one_4': ruleAResult = values.includes(4); break;
    case 'D_at_least_one_5': ruleAResult = values.includes(5); break;
    case 'D_count_gt3_eq_lt3': ruleAResult = values.filter(v => v > 3).length === values.filter(v => v < 3).length; break;

    default: throw new Error(`Unknown card ID: ${card.id}`);
  }

  // For most cards, Rule B is the logical opposite of Rule A.
  // The logic is structured so `ruleAResult` is calculated, and we return its opposite for Rule B.
  // Special cases where Rule B is not !RuleA are handled implicitly by the logic (e.g., smallest_is_x).
  return card.successRule === 'A' ? ruleAResult : !ruleAResult;
}

// --- Card Generation --- //

const AllCombinations: readonly Combination[] = Object.freeze((() => {
  const combinations: Combination[] = [];
  for (let s = 1; s <= 5; s++) {
    for (let t = 1; t <= 5; t++) {
      for (let a = 1; a <= 5; a++) {
        combinations.push({ saphir: s as Digit, topaze: t as Digit, amethyst: a as Digit });
      }
    }
  }
  return combinations;
})())

export const AllPossibleCards: readonly Omit<CriteriaCard, 'successRule' | 'testResult'>[] = Object.freeze((() => {
  const allCards: Omit<CriteriaCard, 'successRule' | 'testResult'>[] = [];

  // Category A: Value Conditions (24 cards)
  colors.forEach(c => {
    allCards.push({ id: `A_parity_${c.id}`, name: `Parité ${c.name}`, ruleA: `${c.name} est PAIR`, ruleB: `${c.name} est IMPAIR`, category: 'single', family: `A-parity` });
    allCards.push({ id: `A_threshold_${c.id}_lt3`, name: `${c.name} comparé à 3`, ruleA: `${c.name} < 3`, ruleB: `${c.name} ≥ 3`, category: 'single', family: `A-threshold-3` });
    allCards.push({ id: `A_threshold_${c.id}_gt3`, name: `${c.name} comparé à 3`, ruleA: `${c.name} > 3`, ruleB: `${c.name} ≤ 3`, category: 'single', family: `A-threshold-3` });
    allCards.push({ id: `A_equality_${c.id}_1`, name: `${c.name} est 1`, ruleA: `${c.name} = 1`, ruleB: `${c.name} ≠ 1`, category: 'single', family: `A-value` });
    allCards.push({ id: `A_equality_${c.id}_2`, name: `${c.name} est 2`, ruleA: `${c.name} = 2`, ruleB: `${c.name} ≠ 2`, category: 'single', family: `A-value` });
    allCards.push({ id: `A_equality_${c.id}_3`, name: `${c.name} est 3`, ruleA: `${c.name} = 3`, ruleB: `${c.name} ≠ 3`, category: 'single', family: `A-value` });
    allCards.push({ id: `A_equality_${c.id}_4`, name: `${c.name} est 4`, ruleA: `${c.name} = 4`, ruleB: `${c.name} ≠ 4`, category: 'single', family: `A-value` });
    allCards.push({ id: `A_equality_${c.id}_5`, name: `${c.name} est 5`, ruleA: `${c.name} = 5`, ruleB: `${c.name} ≠ 5`, category: 'single', family: `A-value` });
  });

  // Category B: Comparison Conditions (12 cards)
  colorPairs.forEach(p => {
    const compareFamily = `B-compare-${[p.c1.id, p.c2.id].sort().join('-')}`;
    allCards.push({ id: `B_compare_gt_${p.c1.id}_${p.c2.id}`, name: `Comparaison ${p.c1.name}/${p.c2.name}`, ruleA: `${p.c1.name} > ${p.c2.name}`, ruleB: `${p.c1.name} ≤ ${p.c2.name}`, category: 'comparison', family: compareFamily });
    allCards.push({ id: `B_compare_eq_${p.c1.id}_${p.c2.id}`, name: `Égalité ${p.c1.name}/${p.c2.name}`, ruleA: `${p.c1.name} = ${p.c2.name}`, ruleB: `${p.c1.name} ≠ ${p.c2.name}`, category: 'comparison', family: compareFamily });
    allCards.push({ id: `B_compare_gt_${p.c2.id}_${p.c1.id}`, name: `Comparaison ${p.c2.name}/${p.c1.name}`, ruleA: `${p.c2.name} > ${p.c1.name}`, ruleB: `${p.c2.name} ≤ ${p.c1.name}`, category: 'comparison', family: compareFamily });
    allCards.push({ id: `B_compare_eq_${p.c2.id}_${p.c1.id}`, name: `Égalité ${p.c2.name}/${p.c1.name}`, ruleA: `${p.c2.name} = ${p.c1.name}`, ruleB: `${p.c2.name} ≠ ${p.c1.name}`, category: 'comparison', family: compareFamily });
  });
  colors.forEach(c => {
    allCards.push({ id: `B_smallest_is_${c.id}`, name: `${c.name} est le plus petit`, ruleA: `Le plus petit chiffre est ${c.name}`, ruleB: `Le plus petit chiffre n'est pas ${c.name}`, category: 'comparison', family: `B-extremum-${c.id}` });
    allCards.push({ id: `B_largest_is_${c.id}`, name: `${c.name} est le plus grand`, ruleA: `Le plus grand chiffre est ${c.name}`, ruleB: `Le plus grand chiffre n'est pas ${c.name}`, category: 'comparison', family: `B-extremum-${c.id}` });
  });

  // Category C: Global Conditions (19 cards - adjusted from README for clarity)
  allCards.push({ id: 'C_sum_gt8', name: 'Somme comparée à 8', ruleA: 'Saphir + Topaze + Améthyste > 8', ruleB: 'Saphir + Topaze + Améthyste ≤ 8', category: 'global', family: 'C_sum_gt' });
  allCards.push({ id: 'C_sum_gt6', name: 'Somme comparée à 6', ruleA: 'Saphir + Topaze + Améthyste > 6', ruleB: 'Saphir + Topaze + Améthyste ≤ 6', category: 'global', family: 'C_sum_gt' });
  allCards.push({ id: 'C_sum_gt12', name: 'Somme comparée à 12', ruleA: 'Saphir + Topaze + Améthyste > 12', ruleB: 'Saphir + Topaze + Améthyste ≤ 12', category: 'global', family: 'C_sum_gt' });
  allCards.push({ id: 'C_pairs_eq0', name: 'Aucun pair', ruleA: 'Aucun chiffre n\'est PAIR', ruleB: 'Au moins un chiffre est PAIR', category: 'global', family: 'C_pairs_eq' });
  allCards.push({ id: 'C_odds_eq0', name: 'Aucun impair', ruleA: 'Aucun chiffre n\'est IMPAIR', ruleB: 'Au moins un chiffre est IMPAIR', category: 'global', family: 'C_pairs_eq' });
  allCards.push({ id: 'C_pairs_eq1', name: 'Un seul pair', ruleA: 'Un seul chiffre est PAIR', ruleB: 'Zéro ou plusieurs chiffre sont PAIRS', category: 'global', family: 'C_pairs_eq' });
  allCards.push({ id: 'C_odds_eq1', name: 'Un seul impair', ruleA: 'Un seul chiffre est IMPAIR', ruleB: 'Zéro ou plusieurs chiffre sont IMPAIRS', category: 'global', family: 'C_pairs_eq' });
  allCards.push({ id: 'C_pairs_gt1', name: 'Plusieurs pairs', ruleA: 'Plus d\'un chiffre sont PAIRS', ruleB: 'Zéro ou un chiffre est PAIR', category: 'global', family: 'C_pairs_eq' });
  allCards.push({ id: 'C_odds_gt1', name: 'Plusieurs impairs', ruleA: 'Plus d\'un chiffre sont IMPAIRS', ruleB: 'Zéro ou un chiffre est IMPAIR', category: 'global', family: 'C_pairs_eq' });
  allCards.push({ id: 'C_all_unique', name: 'Tous uniques', ruleA: 'Tous uniques', ruleB: 'Au moins deux identiques', category: 'global', family: 'C_all_unique' });
  allCards.push({ id: 'C_exactly_two_equal', name: 'Deux égaux', ruleA: 'Exactement deux chiffres égaux', ruleB: 'Tous uniques ou tous identiques', category: 'global', family: 'C_exactly_two_equal' });
  allCards.push({ id: 'C_all_lt4', name: 'Tous < 4', ruleA: 'Tous les chiffres < 4', ruleB: 'Au moins un chiffre ≥ 4', category: 'global', family: 'C_all_lt' });
  allCards.push({ id: 'C_all_gt2', name: 'Tous > 2', ruleA: 'Tous les chiffres > 2', ruleB: 'Au moins un chiffre ≤ 2', category: 'global', family: 'C_all_lt' });
  allCards.push({ id: 'C_strictly_increasing', name: 'Ordre croissant', ruleA: 'Saphir < Topaze < Améthyste', ruleB: 'Non croissant', category: 'global', family: 'C_strictly_increasing' });
  allCards.push({ id: 'C_strictly_decreasing', name: 'Ordre décroissant', ruleA: 'Saphir > Topaze > Améthyste', ruleB: 'Non décroissant', category: 'global', family: 'C_strictly_increasing' });
  allCards.push({ id: 'C_sum_is_even', name: 'Somme paire', ruleA: 'Saphir + Topaze + Améthyste est PAIRE', ruleB: 'Saphir + Topaze + Améthyste est IMPAIRE', category: 'global', family: 'C_sum_is_even' });
  allCards.push({ id: 'C_product_gt20', name: 'Produit comparé à 20', ruleA: 'Saphir X Topaze X Améthyste > 20', ruleB: 'Saphir X Topaze X Améthyste ≤ 20', category: 'global', family: 'C_product_gt' });
  allCards.push({ id: 'C_product_gt35', name: 'Produit comparé à 35', ruleA: 'Saphir X Topaze X Améthyste > 35', ruleB: 'Saphir X Topaze X Améthyste ≤ 35', category: 'global', family: 'C_product_gt' });
  allCards.push({ id: 'C_product_gt15', name: 'Produit comparé à 15', ruleA: 'Saphir X Topaze X Améthyste > 15', ruleB: 'Saphir X Topaze X Améthyste ≤ 15', category: 'global', family: 'C_product_gt' });

  // Category D: Complex Conditions (ajout de family = id)
  allCards.push({ id: 'D_or_pair_ST', name: 'Saphir ou Topaze pair', ruleA: 'Saphir est PAIR ou Topaze est PAIR', ruleB: 'Saphir et Topaze sont IMPAIRS', category: 'composite', family: 'D_or_pair' });
  allCards.push({ id: 'D_or_pair_TA', name: 'Topaze ou Améthyste pair', ruleA: 'Topaze est PAIR ou Améthyste est PAIR', ruleB: 'Topaze et Améthyste sont IMPAIRS', category: 'composite', family: 'D_or_pair' });
  allCards.push({ id: 'D_or_pair_SA', name: 'Saphir ou Améthyste pair', ruleA: 'Saphir est PAIR ou Améthyste est PAIR', ruleB: 'Saphir et Améthyste sont IMPAIRS', category: 'composite', family: 'D_or_pair' });
  allCards.push({ id: 'D_or_gt3_ST', name: 'Saphir/Topaze comparé à 3', ruleA: 'Saphir > 3 ou Topaze > 3', ruleB: 'Saphir ≤ 3 et Topaze ≤ 3', category: 'composite', family: 'D_or_gt3' });
  allCards.push({ id: 'D_or_gt3_TA', name: 'Topaze/Améthyste comparé à 3', ruleA: 'Topaze > 3 ou Améthyste > 3', ruleB: 'Topaze ≤ 3 et Améthyste ≤ 3', category: 'composite', family: 'D_or_gt3' });
  allCards.push({ id: 'D_or_gt3_SA', name: 'Saphir/Améthyste comparé à 3', ruleA: 'Saphir > 3 ou Améthyste > 3', ruleB: 'Saphir ≤ 3 et Améthyste ≤ 3', category: 'composite', family: 'D_or_gt3' });
  allCards.push({ id: 'D_middle_is_even', name: 'Chiffre du milieu pair', ruleA: 'Le chiffre du milieu est PAIR', ruleB: 'Le chiffre du milieu est IMPAIR ou pas de milieu', category: 'composite', family: 'D_middle_is_even' });
  allCards.push({ id: 'D_start_end_are_even', name: 'Minimum et maximum sont pairs', ruleA: 'Les minimum et maximum sont PAIRS', ruleB: 'Le minimum et maximum ne sont pas tous les deux PAIRS', category: 'composite', family: 'D_middle_is_even' });
  allCards.push({ id: 'D_sum_ST_gt_A', name: 'Saphir + Topaze comparé à Améthyste', ruleA: 'Saphir + Topaze > Améthyste', ruleB: 'Saphir + Topaze ≤ Améthyste', category: 'composite', family: 'D_sum_gt_' });
  allCards.push({ id: 'D_sum_TA_gt_S', name: 'Topaze + Améthyste comparé à Saphir', ruleA: 'Topaze + Améthyste > Saphir', ruleB: 'Topaze + Améthyste ≤ Saphir', category: 'composite', family: 'D_sum_gt_' });
  allCards.push({ id: 'D_sum_SA_gt_T', name: 'Saphir + Améthyste comparé à Topaze', ruleA: 'Saphir + Améthyste > Topaze', ruleB: 'Saphir + Améthyste ≤ Topaze', category: 'composite', family: 'D_sum_gt_' });
  allCards.push({ id: 'D_range_gt2', name: 'Max - min comparée à 2', ruleA: 'Plus grand - plus petit > 2', ruleB: 'Plus grand - plus petit ≤ 2', category: 'composite', family: 'D_range_gt2' });
  allCards.push({ id: 'D_at_least_one_1', name: 'Présence de 1', ruleA: 'Au moins un 1', ruleB: 'Aucun 1', category: 'composite', family: 'D_at_least_one' });
  allCards.push({ id: 'D_at_least_one_2', name: 'Présence de 2', ruleA: 'Au moins un 2', ruleB: 'Aucun 2', category: 'composite', family: 'D_at_least_one' });
  allCards.push({ id: 'D_at_least_one_3', name: 'Présence de 3', ruleA: 'Au moins un 3', ruleB: 'Aucun 3', category: 'composite', family: 'D_at_least_one' });
  allCards.push({ id: 'D_at_least_one_4', name: 'Présence de 4', ruleA: 'Au moins un 4', ruleB: 'Aucun 4', category: 'composite', family: 'D_at_least_one' });
  allCards.push({ id: 'D_at_least_one_5', name: 'Présence de 5', ruleA: 'Au moins un 5', ruleB: 'Aucun 5', category: 'composite', family: 'D_at_least_one' });
  allCards.push({ id: 'D_count_gt3_eq_lt3', name: 'Équilibre des nombres', ruleA: 'Nb de chiffres > 3 = Nb de chiffres < 3', ruleB: 'Nb de chiffres > 3 ≠ Nb de chiffres < 3', category: 'composite', family: 'D_count_gt3_eq_lt3' });

  return allCards;
})())

/**
 * Generates a set of criteria cards that guarantees a single unique solution.
 * This is the main function to call to create a new puzzle.
 */
export function generateUniqueSolutionSet(): { cards: CriteriaCard[]; solution: Combination; difficultyScore: number, attempts: number } {
  const allCombinations = AllCombinations;
  let attempts = 0;

  while (attempts < 1000) {
    attempts++;
    const targetSolution = allCombinations[Math.floor(Math.random() * allCombinations.length)];
    const shuffledPossibleCards = [...AllPossibleCards].sort(() => Math.random() - 0.5);

    const currentCards: CriteriaCard[] = [];
    const usedCardFamilies = new Set<string>();
    let remainingCombinations = [...allCombinations];

    // Try to build a set of 5 cards
    for (const cardDef of shuffledPossibleCards) {
      if (currentCards.length >= 5) break;

      const family = cardDef.family;
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
        const difficultyScore = calculatePuzzleComplexity(currentCards);
        return { cards: currentCards, solution: targetSolution, difficultyScore, attempts };
      }
    }
  }

  console.error("Failed to generate a unique solution set with 5 cards. Falling back to a failsafe puzzle.");
  const failsafeCards = generateFailsafeSet();
  const failsafeSolution: Combination = { saphir: 1, topaze: 2, amethyst: 3 };
  const difficultyScore = calculatePuzzleComplexity(failsafeCards);
  return {
    cards: failsafeCards,
    solution: failsafeSolution,
    difficultyScore,
    attempts
  };
}

function generateFailsafeSet(): CriteriaCard[] {
  return [
    { id: 'A_equality_saphir_1', name: 'Saphir est 1', ruleA: 'Saphir = 1', ruleB: 'Saphir ≠ 1', category: 'single', successRule: 'A', testResult: null, family: 'A_equality_saphir_1' },
    { id: 'A_equality_topaze_3', name: 'Topaze est 3', ruleA: 'Topaze = 3', ruleB: 'Topaze ≠ 3', category: 'single', successRule: 'B', testResult: null, family: 'A_equality_topaze_3' },
    { id: 'D_at_least_one_2', name: 'Présence de 2', ruleA: 'Au moins un 2', ruleB: 'Aucun 2', category: 'composite', successRule: 'A', testResult: null, family: 'D_at_least_one_2' },
    { id: 'C_strictly_increasing', name: 'Ordre Croissant', ruleA: 'S < T < A', ruleB: 'Non croissant', category: 'global', successRule: 'A', testResult: null, family: 'C_strictly_increasing' },
    { id: 'C_all_lt4', name: 'Tous Petits', ruleA: 'Tous les chiffres < 4', ruleB: 'Au moins un chiffre ≥ 4', category: 'global', successRule: 'A', testResult: null, family: 'C_all_lt4' },
  ];
}

/**
 * Calculates the information value of a card based on how many solutions it eliminates
 */
function calculateCardInformationValue(card: CriteriaCard, remainingCombinations: Combination[]): number {
  const satisfying = remainingCombinations.filter(combo => validateCriteria(combo, card));
  const notSatisfying = remainingCombinations.length - satisfying.length;

  // Information value is higher when the card splits the solution space more evenly
  // This is based on information theory - maximum information when split is 50/50
  return Math.min(satisfying.length, notSatisfying) / remainingCombinations.length;
}

/**
 * Checks if a difficulty score is within the expected range for a given difficulty level
 */
export const difficultyRanges = {
  easy: { 
    maxRounds: 6, 
    maxTestsPerRound: 4, 
    cardCount: { min: 4, max: 5 }, 
    maxAttempts: 5000, 
    allowedCategories: ['single'], 
    requiredCategories: [], 
    minCompositeCards: 0,
    allowSimilarFamilies: true,
    preferHighInfo: true,
    allowLowInfo: false
  },
  medium: { 
    maxRounds: 7, 
    maxTestsPerRound: 3, 
    cardCount: { min: 5, max: 6 }, 
    maxAttempts: 5000, 
    allowedCategories: ['single', 'comparison'], 
    requiredCategories: [], 
    minCompositeCards: 0,
    allowSimilarFamilies: false,
    preferHighInfo: false,
    allowLowInfo: false
  },
  hard: { 
    maxRounds: 7, 
    maxTestsPerRound: 2, 
    cardCount: { min: 6, max: 7 }, 
    maxAttempts: 5000, 
    allowedCategories: ['single', 'comparison', 'global', 'composite'], 
    requiredCategories: ['single', 'comparison'], 
    minCompositeCards: 0,
    allowSimilarFamilies: false,
    preferHighInfo: false,
    allowLowInfo: true
  },
  expert: { 
    maxRounds: 6, 
    maxTestsPerRound: 2, 
    cardCount: { min: 7, max: 8 }, 
    maxAttempts: 5000, 
    allowedCategories: ['single', 'comparison', 'global', 'composite'], 
    requiredCategories: ['single', 'comparison', 'global'], 
    minCompositeCards: 2,
    allowSimilarFamilies: false,
    preferHighInfo: false,
    allowLowInfo: true
  }
};

// Note: Difficulty is now determined by constraint-based generation, not scoring
// This function is kept for backward compatibility but should not be used in new system
export function getDifficultyForScore(score: number): Difficulty {
  // Legacy function - new system uses constraint-based difficulty
  if (score < 50) return 'easy';
  if (score < 65) return 'medium';
  if (score < 80) return 'hard';
  return 'expert';
}

/**
 * Calculates the overall complexity score of a puzzle with difficulty-specific ranges
 */
export function calculatePuzzleComplexity(cards: CriteriaCard[]): number {
  // Handle edge case of no cards
  if (cards.length === 0) {
    return 0;
  }

  const allCombinations = AllCombinations;
  let baseComplexityScore = 0;

  // 1. Balanced category weights - different types of criteria have different base complexity
  const categoryWeights = {
    'single': 4,      // Increased from 2 to allow higher scores
    'comparison': 6,  // Increased from 3
    'global': 8,      // Increased from 4
    'composite': 10   // Increased from 5
  };

  // 2. Information distribution analysis with moderate bonuses
  let totalInfoValue = 0;
  let remainingCombinations = [...allCombinations];
  let informationReductionScore = 0;

  cards.forEach((card) => {
    const infoValue = calculateCardInformationValue(card, remainingCombinations);
    totalInfoValue += infoValue;

    // Base score from category and information value
    const cardScore = categoryWeights[card.category] * (0.4 + infoValue);
    baseComplexityScore += cardScore;

    // Track solution space reduction for additional scoring
    const prevCount = remainingCombinations.length;
    remainingCombinations = remainingCombinations.filter(combo => validateCriteria(combo, card));
    const reductionRatio = prevCount > 0 ? (prevCount - remainingCombinations.length) / prevCount : 0;
    informationReductionScore += reductionRatio * 4; // Moderate bonus for effective filtering
  });

  // 3. Moderate balance bonus - rewards consistent information distribution
  const avgInfoValue = totalInfoValue / cards.length;
  const infoVariance = cards.reduce((variance, card) => {
    const infoValue = calculateCardInformationValue(card, [...allCombinations]);
    return variance + Math.pow(infoValue - avgInfoValue, 2);
  }, 0) / cards.length;
  const balanceBonus = 1 + (0.3 - Math.min(infoVariance, 0.3)) * 0.8; // 1.0 to 1.24 range

  // 4. Family diversity bonus - moderate impact
  const families = new Set(cards.map(card => card.family));
  const diversityBonus = 1 + (families.size / cards.length) * 0.5; // 1.0 to 1.5 range

  // 5. Card interaction complexity - moderate bonus
  let interactionBonus = 1;
  const categoryDistribution = cards.reduce((dist, card) => {
    dist[card.category] = (dist[card.category] || 0) + 1;
    return dist;
  }, {} as Record<string, number>);

  const categoryCount = Object.keys(categoryDistribution).length;
  if (categoryCount >= 3) {
    interactionBonus += 0.2; // Moderate bonus
  }
  if (categoryCount === 4) {
    interactionBonus += 0.15; // Additional bonus for all categories
  }

  // Final score calculation with balanced scaling
  let finalScore = baseComplexityScore + informationReductionScore;
  finalScore *= balanceBonus * diversityBonus * interactionBonus;

  // Apply balanced scaling to distribute across 0-100 range
  const maxExpectedScore = 90; // Reduced from 120 to increase scores
  let scaledScore = (finalScore / maxExpectedScore) * 100;

  // Apply gentle compression for very high scores to reduce perfect 100s
  if (scaledScore > 95) {
    // Apply mild compression for very high scores
    const excess = scaledScore - 95;
    scaledScore = 95 + (excess * 0.8); // Mild compression of top 5 points
  }

  finalScore = Math.min(scaledScore, 100);

  return Math.round(finalScore * 100) / 100; // Round to 2 decimal places
}

/**
 * Generates a puzzle with specified difficulty level using constraint-based approach
 */
export function generatePuzzleWithDifficulty(difficulty: Difficulty): { cards: CriteriaCard[]; solution: Combination; difficultyScore: number } {
  const allCombinations = AllCombinations;
  const settings = difficultyRanges[difficulty];
  let attempts = 0;

  while (attempts < settings.maxAttempts) {
    attempts++;
    const targetSolution = allCombinations[Math.floor(Math.random() * allCombinations.length)];

    // Determine target card count within the range
    const targetCardCount = Math.floor(Math.random() * (settings.cardCount.max - settings.cardCount.min + 1)) + settings.cardCount.min;

    const currentCards: CriteriaCard[] = [];
    const usedCardFamilies = new Set<string>();
    const categoryCounts = new Map<string, number>();
    let remainingCombinations = [...allCombinations];

    // Filter cards by allowed categories
    const allowedCards = AllPossibleCards.filter(card => settings.allowedCategories.includes(card.category));
    const shuffledPossibleCards = [...allowedCards].sort(() => Math.random() - 0.5);

    // First, ensure we meet required category constraints
    const requiredCategoryCards: CriteriaCard[] = [];
    for (const requiredCategory of settings.requiredCategories) {
      const categoryCards = shuffledPossibleCards.filter(card => 
        card.category === requiredCategory && 
        (!usedCardFamilies.has(card.family) || settings.allowSimilarFamilies)
      );
      
      if (categoryCards.length > 0) {
        const selectedCard = categoryCards[Math.floor(Math.random() * categoryCards.length)];
        const rule = Math.random() > 0.5 ? 'A' : 'B';
        const potentialCard: CriteriaCard = { ...selectedCard, successRule: rule, testResult: null };

        // Ensure the card is valid for the target solution
        if (!validateCriteria(targetSolution, potentialCard)) {
          potentialCard.successRule = rule === 'A' ? 'B' : 'A';
          if (validateCriteria(targetSolution, potentialCard)) {
            requiredCategoryCards.push(potentialCard);
            if (!settings.allowSimilarFamilies) {
              usedCardFamilies.add(selectedCard.family);
            }
            categoryCounts.set(requiredCategory, (categoryCounts.get(requiredCategory) || 0) + 1);
          }
        } else {
          requiredCategoryCards.push(potentialCard);
          if (!settings.allowSimilarFamilies) {
            usedCardFamilies.add(selectedCard.family);
          }
          categoryCounts.set(requiredCategory, (categoryCounts.get(requiredCategory) || 0) + 1);
        }
      }
    }

    // Add required category cards to current cards
    currentCards.push(...requiredCategoryCards);
    
    // Update remaining combinations based on required cards
    for (const card of requiredCategoryCards) {
      remainingCombinations = remainingCombinations.filter(combo => validateCriteria(combo, card));
    }

    // Fill remaining slots with appropriate cards
    for (const cardDef of shuffledPossibleCards) {
      if (currentCards.length >= targetCardCount) break;

      // Skip if we already used this card
      if (requiredCategoryCards.some(rc => rc.id === cardDef.id)) continue;

      const family = cardDef.family;
      if (!settings.allowSimilarFamilies && usedCardFamilies.has(family)) {
        continue;
      }

      const rule = Math.random() > 0.5 ? 'A' : 'B';
      const potentialCard: CriteriaCard = { ...cardDef, successRule: rule, testResult: null };

      // Ensure the card is valid for the target solution
      if (!validateCriteria(targetSolution, potentialCard)) {
        potentialCard.successRule = rule === 'A' ? 'B' : 'A';
        if (!validateCriteria(targetSolution, potentialCard)) {
          continue;
        }
      }

      // Check if adding the card is useful
      const nextRemaining = remainingCombinations.filter(combo => validateCriteria(combo, potentialCard));
      if (nextRemaining.length === 0) {
        continue;
      }

      // Apply information value constraints based on difficulty
      const infoValue = calculateCardInformationValue(potentialCard, remainingCombinations);
      if (settings.preferHighInfo && infoValue < 0.1) {
        continue; // Skip low-info cards for easy difficulty
      }
      if (!settings.allowLowInfo && infoValue < 0.05) {
        continue; // Skip very low-info cards for medium difficulty
      }

      currentCards.push(potentialCard);
      if (!settings.allowSimilarFamilies) {
        usedCardFamilies.add(family);
      }
      categoryCounts.set(cardDef.category, (categoryCounts.get(cardDef.category) || 0) + 1);
      remainingCombinations = nextRemaining;
    }

    // Validate constraints are met
    const compositeCount = categoryCounts.get('composite') || 0;
    const hasRequiredCategories = settings.requiredCategories.every(cat => categoryCounts.has(cat));
    const hasMinCompositeCards = compositeCount >= settings.minCompositeCards;

    // Check for unique solution and constraint satisfaction
    if (currentCards.length >= settings.cardCount.min && 
        currentCards.length <= settings.cardCount.max &&
        remainingCombinations.length === 1 &&
        hasRequiredCategories &&
        hasMinCompositeCards) {
      
      if (remainingCombinations[0].saphir === targetSolution.saphir &&
          remainingCombinations[0].topaze === targetSolution.topaze &&
          remainingCombinations[0].amethyst === targetSolution.amethyst) {
        
        const difficultyScore = calculatePuzzleComplexity(currentCards);
        console.log(`Generated ${difficulty} puzzle in ${attempts} attempts with ${currentCards.length} cards. Categories: ${Array.from(categoryCounts.keys()).join(', ')}`);
        return { cards: currentCards, solution: targetSolution, difficultyScore };
      }
    }
  }

  console.warn(`Failed to generate ${difficulty} puzzle. Fallback to medium.`);

  // Final fallback to medium difficulty
  if (difficulty !== 'medium') {
    return generatePuzzleWithDifficulty('medium');
  }

  // Ultimate fallback
  const ultimateFailsafeCards = generateFailsafeSet();
  const ultimateFailsafeSolution: Combination = { saphir: 1, topaze: 2, amethyst: 3 };
  const difficultyScore = calculatePuzzleComplexity(ultimateFailsafeCards);
  return {
    cards: ultimateFailsafeCards,
    solution: ultimateFailsafeSolution,
    difficultyScore,
  };
}
