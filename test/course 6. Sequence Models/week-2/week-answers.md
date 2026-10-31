# Course 6, week 2: Word vectors and embeddings — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 6. Sequence Models/week-2/week.md>)

## Question 1

**Answer:** 10,000,000 numbers; one vector has 200 components.

**Why:** 50,000×200=10 million; the lookup selects one row or column by convention.

## Question 2

**Answer:** It loses order and negation structure; a sequence model or attention-based encoder can use context.

**Why:** The mean of vectors is insensitive to word order.

## Question 3

**Answer:** The smaller set of binary decisions reduces computation per update.

**Why:** Only the positive and sampled negatives need scores for that step.

## Question 4

**Answer:** Audit embedding bias and downstream behavior across groups; consider debiasing or better data.

**Why:** Geometric analogies do not establish fairness.

## Question 5

**Answer:** Word2Vec learns from local context prediction; GloVe uses global word co-occurrence statistics.

**Why:** Both can yield dense vectors, but their supervision signals differ.
