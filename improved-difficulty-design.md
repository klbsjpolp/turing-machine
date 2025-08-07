# Improved Difficulty System Design

## Current Issues Identified
1. All difficulties use identical game parameters (5 cards, 3 tests/round, 7 rounds)
2. Only difference is score thresholds, not actual complexity
3. Expert puzzles are not significantly more challenging
4. Scoring system is poorly calibrated (requires hundreds of attempts)
5. More verificators sometimes make puzzles easier (as mentioned in issue)

## New Difficulty System Design

### Core Principles
1. **Vary actual game mechanics**, not just scoring thresholds
2. **Control card complexity tiers** for each difficulty
3. **Implement strategic constraints** that require deeper reasoning
4. **Balance information availability** to prevent easy guessing
5. **Create multi-step reasoning requirements** for higher difficulties

### Difficulty Parameters

#### Easy (Beginner-friendly)
- **Cards**: 4-5 cards (fewer cards = clearer path to solution)
- **Tests per round**: 4 (more tests allowed = more forgiving)
- **Rounds**: 6 (fewer rounds = less pressure)
- **Card types**: Primarily 'single' category (simple, direct rules)
- **Constraints**: None
- **Information strategy**: High information value cards preferred

#### Medium (Balanced challenge)
- **Cards**: 5-6 cards (standard complexity)
- **Tests per round**: 3 (balanced testing)
- **Rounds**: 7 (standard pressure)
- **Card types**: Mix of 'single' and 'comparison' (moderate complexity)
- **Constraints**: No duplicate families
- **Information strategy**: Balanced information distribution

#### Hard (Strategic thinking required)
- **Cards**: 6-7 cards (more cards = more complex interactions)
- **Tests per round**: 2 (fewer tests = more strategic choices)
- **Rounds**: 7 (maintain pressure)
- **Card types**: Include 'global' and 'composite' (complex reasoning)
- **Constraints**: Must include at least 2 different categories
- **Information strategy**: Some low-information cards allowed (requires deduction)

#### Expert (Master-level challenge)
- **Cards**: 7-8 cards (maximum complexity)
- **Tests per round**: 2 (very limited testing)
- **Rounds**: 6 (high pressure, fewer chances)
- **Card types**: Emphasis on 'composite' and 'global' (multi-step reasoning)
- **Constraints**: 
  - Must include at least 3 different categories
  - Must include at least 2 'composite' cards
  - Require specific card combinations that create interdependencies
- **Information strategy**: Include deliberately low-information cards that require multi-step deduction

### New Complexity Evaluation

Instead of relying solely on mathematical scoring, evaluate:

1. **Reasoning Depth**: How many logical steps required to solve
2. **Information Scarcity**: How much can be deduced from limited tests
3. **Interdependency Complexity**: How cards interact with each other
4. **Deduction Requirements**: Whether solution requires eliminating possibilities vs. direct confirmation

### Implementation Strategy

1. **Card Tier System**: Classify cards by reasoning complexity
   - Tier 1: Direct single-value checks (easy)
   - Tier 2: Simple comparisons (medium)
   - Tier 3: Global conditions (hard)
   - Tier 4: Multi-condition composite rules (expert)

2. **Constraint-Based Generation**: Instead of score-based filtering
   - Generate puzzles that meet structural requirements
   - Validate that solution requires intended reasoning depth
   - Ensure no "lucky guess" shortcuts exist

3. **Dynamic Difficulty Adjustment**: 
   - Track actual solving patterns
   - Adjust parameters based on real player performance
   - Prevent degenerate cases where more cards make puzzles easier

### Addressing the "More Verificators = Easier" Problem

The issue mentions that sometimes more verificators make puzzles easier because you can guess outcomes. The new system addresses this by:

1. **Strategic Card Selection**: Choose cards that create interdependencies, not just more constraints
2. **Information Balance**: Ensure additional cards don't provide "free" information
3. **Reasoning Requirements**: Higher difficulties require logical deduction, not trial-and-error
4. **Constraint Validation**: Verify that each card contributes meaningfully to the puzzle

This design creates genuinely different challenge levels where expert puzzles require sophisticated reasoning, not just higher scores.