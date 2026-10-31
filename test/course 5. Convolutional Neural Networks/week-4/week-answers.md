# Course 5, week 4: Face recognition and neural style transfer — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 5. Convolutional Neural Networks/week-4/week.md>)

## Question 1

**Answer:** 0.

**Why:** 0.4−0.9+0.3=−0.2, so the hinge loss is zero.

## Question 2

**Answer:** Compute an embedding for the new face and compare its distance with stored embeddings using a threshold.

**Why:** An embedding-based verifier can add identities without changing the network head.

## Question 3

**Answer:** The content image supplies subject/layout; the style image supplies texture/color statistics.

**Why:** The generated image is optimized to satisfy both objectives.

## Question 4

**Answer:** Increase the style-cost weight relative to the content-cost weight.

**Why:** The optimization is currently favoring content too strongly.

## Question 5

**Answer:** Correlations capture repeated texture patterns without forcing the same spatial layout.

**Why:** Style should be transferable across different content arrangements.
