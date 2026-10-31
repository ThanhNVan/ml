# Course 6, week 3: Sequence-to-sequence decoding and attention — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 6. Sequence Models/week-3/week.md>)

## Question 1

**Answer:** B, with 0.27 versus A's 0.20.

**Why:** Multiply the conditional token probabilities along each path.

## Question 2

**Answer:** Beam search only explores the model's scoring function; it cannot repair a bad conditional model.

**Why:** Search quality and model quality are separate sources of error.

## Question 3

**Answer:** Attention over encoder states.

**Why:** The decoder computes output-specific weights instead of using one fixed source summary.

## Question 4

**Answer:** Use length normalization or another length-aware sequence score.

**Why:** Raw products tend to decrease as more tokens are added.

## Question 5

**Answer:** One is event detection over time and the other is sequence transcription; they have different targets and error measures.

**Why:** Output design follows the desired task representation.
