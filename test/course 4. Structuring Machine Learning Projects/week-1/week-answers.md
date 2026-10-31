# Course 4, week 1: Metrics, data splits, and avoidable bias — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 4. Structuring Machine Learning Projects/week-1/week.md>)

## Question 1

**Answer:** Latency ≤250 ms is the satisficing metric; word-error rate is the optimizing metric.

**Why:** The constraint filters candidates, then error ranks the feasible ones.

## Question 2

**Answer:** Variance/generalization; investigate regularization, more data, or a better-matched dev distribution.

**Why:** The avoidable-bias gap is small relative to the dev–train gap.

## Question 3

**Answer:** Build a dev set that reflects the target phone-photo distribution.

**Why:** A metric on the wrong distribution can reward improvements that do not help users.

## Question 4

**Answer:** It gives an unambiguous ordering and makes the next experiment easier to select.

**Why:** Multiple conflicting metrics without a decision rule slow iteration.

## Question 5

**Answer:** Review whether the metric captures false-positive costs and whether dev examples represent deployment data.

**Why:** A single score can optimize the wrong behavior if its definition is misaligned.
