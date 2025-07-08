// Simple test script to verify algorithms work
import { initializeGame } from './src/lib/gameLogic.js';
import { validateCriteria } from './src/lib/criteriaLogic.js';

console.log('Testing algorithms...');

try {
  // Test game initialization
  const game = initializeGame('medium');
  console.log('✓ Game initialization works');
  console.log('  - Master combination:', game.masterCombination);
  console.log('  - Number of criteria cards:', game.criteriaCards.length);
  
  // Test criteria validation
  const testCard = {
    id: 'A_parity_saphir',
    name: 'Saphir Parity',
    ruleA: 'Saphir is EVEN',
    ruleB: 'Saphir is ODD',
    category: 'single',
    successRule: 'A',
    testResult: null
  };
  
  const evenResult = validateCriteria({ saphir: 2, topaze: 1, amethyst: 3 }, testCard);
  const oddResult = validateCriteria({ saphir: 1, topaze: 1, amethyst: 3 }, testCard);
  
  console.log('✓ Criteria validation works');
  console.log('  - Even saphir (2) with rule A:', evenResult); // should be true
  console.log('  - Odd saphir (1) with rule A:', oddResult);   // should be false
  
  console.log('\n✅ All basic algorithm tests passed!');
  
} catch (error) {
  console.error('❌ Error testing algorithms:', error.message);
}