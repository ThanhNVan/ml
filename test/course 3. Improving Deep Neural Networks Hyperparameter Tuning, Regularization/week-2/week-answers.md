# Course 3, week 2: Mini-batches and optimization algorithms — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-2/week.md>)

## Question 1

**Answer:** 9 updates.

**Why:** Eight full batches cover 1,024 examples and one final batch covers 26.

## Question 2

**Answer:** v₁=1 and v̂₁=5.

**Why:** v₁=(1−0.8)5; divide by 1−0.8¹.

## Question 3

**Answer:** It divides by the square root of a running average of squared gradients, reducing that coordinate's effective step.

**Why:** RMSprop rescales coordinates according to gradient magnitude.

## Question 4

**Answer:** Momentum; it retains an exponentially weighted average of past gradients.

**Why:** The running direction damps alternating components.

## Question 5

**Answer:** Bias correction for both first and second moment estimates.

**Why:** Divide the estimates by 1−β₁ᵗ and 1−β₂ᵗ before the parameter step.
