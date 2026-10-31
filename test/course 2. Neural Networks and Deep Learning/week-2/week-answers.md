# Course 2, week 2: Logistic regression and vectorized calculus — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 2. Neural Networks and Deep Learning/week-2/week.md>)

## Question 1

**Answer:** z=0, a=0.5, dz=−0.5.

**Why:** The dot product is 1−1=0, and σ(0)=0.5.

## Question 2

**Answer:** dw=(−1,0.5), db=−0.5.

**Why:** For one example, dw=x·dz and db=dz.

## Question 3

**Answer:** X: (12,100); w: (12,1); wᵀX: (1,100); b: scalar or (1,1).

**Why:** A row of 100 logits is produced from the 100 columns.

## Question 4

**Answer:** v=7.

**Why:** By the chain rule, dJ/du=(dJ/d(uv+c))·v=1·v.

## Question 5

**Answer:** Inspect the bias shape and NumPy broadcasting axes; use an explicit scalar or (1,1) bias.

**Why:** A row/column mismatch can broadcast two dimensions into a matrix.
