# Course 1, week 2: Multiple regression and better features — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 1. Supervised ML playlist/week-2/week.md>)

## Question 1

**Answer:** 12.

**Why:** Compute 4×2−1×3+7.

## Question 2

**Answer:** 2; both statistics must come from the training data.

**Why:** (180−120)/30=2. Reusing training statistics avoids data leakage and inconsistent input scales.

## Question 3

**Answer:** Scale the features to comparable ranges.

**Why:** The scale imbalance can make cost contours elongated and optimization slow.

## Question 4

**Answer:** dw=(6,−3); db=3.

**Why:** For squared-error linear regression, dwⱼ=(f−y)xⱼ and db=f−y when m=1.

## Question 5

**Answer:** Add x²; the extra flexibility may overfit, especially with limited data.

**Why:** The prediction is linear in weights but quadratic in the original x.
