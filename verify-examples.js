import { serializePuzzle } from './src/lib/utils.js';

// Example 1: Puzzle simple
const example1Solution = { saphir: 2, topaze: 4, amethyst: 1 };
const example1Cards = [
  { id: 'A_parity_saphir', successRule: 'A' },
  { id: 'A_parity_topaze', successRule: 'B' },
  { id: 'A_parity_amethyst', successRule: 'A' },
  { id: 'B_compare_gt_saphir_topaze', successRule: 'B' },
  { id: 'C_sum_gt8', successRule: 'A' }
];

// Example 2: Puzzle expert
const example2Solution = { saphir: 5, topaze: 3, amethyst: 1 };
const example2Cards = [
  { id: 'C_all_unique', successRule: 'A' },
  { id: 'D_or_gt3_ST', successRule: 'A' },
  { id: 'B_largest_is_saphir', successRule: 'A' },
  { id: 'C_product_gt15', successRule: 'B' },
  { id: 'D_at_least_one_1', successRule: 'A' }
];

console.log('Example 1 serialized:', serializePuzzle(example1Solution, example1Cards));
console.log('Example 2 serialized:', serializePuzzle(example2Solution, example2Cards));
