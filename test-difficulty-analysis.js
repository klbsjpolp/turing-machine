#!/usr/bin/env node

// Test script to analyze current difficulty system
import { generatePuzzleWithDifficulty, difficultyRanges, calculatePuzzleComplexity } from './src/lib/criteriaLogic.js';

console.log('=== Turing Machine Difficulty Analysis ===\n');

// Test each difficulty level
const difficulties = ['easy', 'medium', 'hard', 'expert'];
const testResults = {};

for (const difficulty of difficulties) {
    console.log(`\n--- Testing ${difficulty.toUpperCase()} difficulty ---`);
    const settings = difficultyRanges[difficulty];
    console.log(`Settings: ${settings.cardCount} cards, ${settings.maxTestsPerRound} tests/round, ${settings.maxRounds} rounds`);
    console.log(`Score range: ${settings.min}-${settings.max}`);
    
    const results = [];
    
    // Generate 10 puzzles for each difficulty
    for (let i = 0; i < 10; i++) {
        try {
            const puzzle = generatePuzzleWithDifficulty(difficulty);
            results.push({
                attempt: i + 1,
                score: puzzle.difficultyScore,
                cardCount: puzzle.cards.length,
                categories: [...new Set(puzzle.cards.map(c => c.category))],
                families: [...new Set(puzzle.cards.map(c => c.family))]
            });
        } catch (error) {
            console.log(`  Failed to generate puzzle ${i + 1}: ${error.message}`);
        }
    }
    
    if (results.length > 0) {
        const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
        const minScore = Math.min(...results.map(r => r.score));
        const maxScore = Math.max(...results.map(r => r.score));
        
        console.log(`  Generated ${results.length}/10 puzzles successfully`);
        console.log(`  Score range: ${minScore.toFixed(2)} - ${maxScore.toFixed(2)} (avg: ${avgScore.toFixed(2)})`);
        console.log(`  All puzzles use ${results[0].cardCount} cards`);
        console.log(`  Category diversity: ${results[0].categories.join(', ')}`);
        console.log(`  Family diversity: ${results[0].families.length} unique families`);
        
        testResults[difficulty] = {
            success: results.length,
            avgScore,
            minScore,
            maxScore,
            cardCount: results[0].cardCount,
            categories: results[0].categories,
            familyCount: results[0].families.length
        };
    } else {
        console.log(`  Failed to generate any puzzles for ${difficulty}`);
        testResults[difficulty] = { success: 0 };
    }
}

console.log('\n=== ANALYSIS SUMMARY ===');
console.log('Current system issues identified:');
console.log('1. All difficulties use identical game parameters (5 cards, 3 tests/round, 7 rounds)');
console.log('2. Only difference is score thresholds, not actual complexity');
console.log('3. Expert puzzles are not significantly more challenging');

console.log('\nScore distribution across difficulties:');
for (const [diff, result] of Object.entries(testResults)) {
    if (result.success > 0) {
        console.log(`  ${diff}: ${result.minScore.toFixed(1)}-${result.maxScore.toFixed(1)} (avg: ${result.avgScore.toFixed(1)})`);
    }
}

console.log('\nRecommendations for improvement:');
console.log('1. Vary card count by difficulty (easy: 4-5, medium: 5-6, hard: 6-7, expert: 7-8)');
console.log('2. Adjust tests per round (easy: 4, medium: 3, hard: 2, expert: 2)');
console.log('3. Introduce card complexity tiers (expert should use more composite/global cards)');
console.log('4. Add puzzle constraints (expert: require specific card combinations)');
console.log('5. Implement multi-step reasoning requirements for expert level');