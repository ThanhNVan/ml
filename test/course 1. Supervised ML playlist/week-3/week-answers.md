# Course 1, week 3: Logistic regression, classification, and regularization — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 1. Supervised ML playlist/week-3/week.md>)

## Question 1

**Answer:** 0.25; class 0.

**Why:** σ(−ln 3)=1/(1+3)=0.25.

## Question 2

**Answer:** Boundary: 2x₁−x₂−4=0; the example is class 1.

**Why:** Its score is 6−1−4=1, so p exceeds 0.5.

## Question 3

**Answer:** About 0.164.

**Why:** [−ln(0.9)−ln(0.8)]/2 ≈ 0.164.

## Question 4

**Answer:** High variance/overfitting; try L2 regularization or more representative training data.

**Why:** The large train-to-validation gap indicates poor generalization.

## Question 5

**Answer:** Weights are pushed toward zero; the model may underfit.

**Why:** A strong penalty can prevent the classifier from using informative features.
