
import { Combination, CriteriaCard, Digit } from './gameTypes';

export function validateCriteria(combination: Combination, card: CriteriaCard): boolean {
  const { saphir, topaze, amethyst } = combination;
  const successRule = card.successRule;
  
  let ruleAResult = false;
  let ruleBResult = false;

  switch (card.id) {
    case 'parity_saphir':
      ruleAResult = saphir % 2 === 0; // PAIR
      ruleBResult = saphir % 2 !== 0; // IMPAIR
      break;
      
    case 'parity_topaze':
      ruleAResult = topaze % 2 === 0;
      ruleBResult = topaze % 2 !== 0;
      break;
      
    case 'parity_amethyst':
      ruleAResult = amethyst % 2 === 0;
      ruleBResult = amethyst % 2 !== 0;
      break;
      
    case 'threshold_saphir_3':
      ruleAResult = saphir < 3;
      ruleBResult = saphir >= 3;
      break;
      
    case 'threshold_topaze_3':
      ruleAResult = topaze > 3;
      ruleBResult = topaze <= 3;
      break;
      
    case 'equality_saphir_3':
      ruleAResult = saphir === 3;
      ruleBResult = saphir !== 3;
      break;
      
    case 'comparison_saphir_topaze':
      ruleAResult = saphir > topaze;
      ruleBResult = saphir <= topaze;
      break;
      
    case 'equality_saphir_topaze':
      ruleAResult = saphir === topaze;
      ruleBResult = saphir !== topaze;
      break;
      
    case 'comparison_topaze_amethyst':
      ruleAResult = topaze > amethyst;
      ruleBResult = topaze <= amethyst;
      break;
      
    case 'global_pairs_count':
      const pairCount = [saphir, topaze, amethyst].filter(n => n % 2 === 0).length;
      ruleAResult = pairCount > 1;
      ruleBResult = pairCount <= 1;
      break;
      
    case 'global_sum':
      const sum = saphir + topaze + amethyst;
      ruleAResult = sum > 8;
      ruleBResult = sum <= 8;
      break;
      
    case 'global_uniqueness':
      const values = [saphir, topaze, amethyst];
      const uniqueValues = new Set(values);
      ruleAResult = uniqueValues.size === 3; // All unique
      ruleBResult = uniqueValues.size < 3; // At least two identical
      break;
      
    case 'composite_or_pairs':
      ruleAResult = saphir % 2 === 0 || topaze % 2 === 0;
      ruleBResult = saphir % 2 !== 0 && topaze % 2 !== 0;
      break;
      
    case 'composite_at_least_one_high':
      ruleAResult = saphir > 4 || topaze > 4 || amethyst > 4;
      ruleBResult = saphir <= 4 && topaze <= 4 && amethyst <= 4;
      break;
      
    case 'composite_exactly_two_equal':
      const vals = [saphir, topaze, amethyst];
      const counts = vals.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      const duplicateCount = Object.values(counts).filter(count => count > 1).length;
      ruleAResult = duplicateCount === 1 && Object.values(counts).some(count => count === 2);
      ruleBResult = !ruleAResult;
      break;
      
    default:
      return false;
  }
  
  return successRule === 'A' ? ruleAResult : ruleBResult;
}

export function generateCriteriaCards(): CriteriaCard[] {
  const allCards: Omit<CriteriaCard, 'successRule' | 'testResult'>[] = [
    {
      id: 'parity_saphir',
      name: 'Parité du Saphir',
      ruleA: 'Saphir est PAIR',
      ruleB: 'Saphir est IMPAIR',
      category: 'single'
    },
    {
      id: 'parity_topaze',
      name: 'Parité de la Topaze',
      ruleA: 'Topaze est PAIR',
      ruleB: 'Topaze est IMPAIR',
      category: 'single'
    },
    {
      id: 'parity_amethyst',
      name: 'Parité de l\'Améthyste',
      ruleA: 'Améthyste est PAIR',
      ruleB: 'Améthyste est IMPAIR',
      category: 'single'
    },
    {
      id: 'threshold_saphir_3',
      name: 'Seuil du Saphir',
      ruleA: 'Saphir < 3',
      ruleB: 'Saphir ≥ 3',
      category: 'single'
    },
    {
      id: 'threshold_topaze_3',
      name: 'Seuil de la Topaze',
      ruleA: 'Topaze > 3',
      ruleB: 'Topaze ≤ 3',
      category: 'single'
    },
    {
      id: 'equality_saphir_3',
      name: 'Égalité du Saphir',
      ruleA: 'Saphir = 3',
      ruleB: 'Saphir ≠ 3',
      category: 'single'
    },
    {
      id: 'comparison_saphir_topaze',
      name: 'Comparaison Saphir-Topaze',
      ruleA: 'Saphir > Topaze',
      ruleB: 'Saphir ≤ Topaze',
      category: 'comparison'
    },
    {
      id: 'equality_saphir_topaze',
      name: 'Égalité Saphir-Topaze',
      ruleA: 'Saphir = Topaze',
      ruleB: 'Saphir ≠ Topaze',
      category: 'comparison'
    },
    {
      id: 'comparison_topaze_amethyst',
      name: 'Comparaison Topaze-Améthyste',
      ruleA: 'Topaze > Améthyste',
      ruleB: 'Topaze ≤ Améthyste',
      category: 'comparison'
    },
    {
      id: 'global_pairs_count',
      name: 'Nombre de Pairs',
      ruleA: 'Plus d\'un chiffre pair',
      ruleB: 'Un seul chiffre pair ou moins',
      category: 'global'
    },
    {
      id: 'global_sum',
      name: 'Somme Totale',
      ruleA: 'Somme > 8',
      ruleB: 'Somme ≤ 8',
      category: 'global'
    },
    {
      id: 'global_uniqueness',
      name: 'Unicité',
      ruleA: 'Tous les chiffres uniques',
      ruleB: 'Au moins deux identiques',
      category: 'global'
    },
    {
      id: 'composite_or_pairs',
      name: 'Condition OU - Pairs',
      ruleA: 'Saphir PAIR OU Topaze PAIR',
      ruleB: 'Saphir IMPAIR ET Topaze IMPAIR',
      category: 'composite'
    },
    {
      id: 'composite_at_least_one_high',
      name: 'Au Moins Un Élevé',
      ruleA: 'Au moins un chiffre > 4',
      ruleB: 'Aucun chiffre > 4',
      category: 'composite'
    },
    {
      id: 'composite_exactly_two_equal',
      name: 'Exactement Deux Égaux',
      ruleA: 'Exactement deux chiffres égaux',
      ruleB: 'Tous uniques ou tous identiques',
      category: 'composite'
    }
  ];

  // Select 5 random cards
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  // Assign random success rules
  return selected.map(card => ({
    ...card,
    successRule: Math.random() > 0.5 ? 'A' : 'B',
    testResult: null
  })) as CriteriaCard[];
}
