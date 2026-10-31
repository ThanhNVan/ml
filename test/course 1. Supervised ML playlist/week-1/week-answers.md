# Course 1, week 1: Machine learning foundations and linear regression — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 1. Supervised ML playlist/week-1/week.md>)

## Question 1

**Answer:** Supervised regression; x is advertising spend and y is next-day sales.

**Why:** The records include labeled outcomes, and the requested output is numeric.

## Question 2

**Answer:** Predictions: 4 and 13. J=2.5.

**Why:** Squared errors are 1 and 9; divide their sum by 2m=4.

## Question 3

**Answer:** w=1.0, b=1.4.

**Why:** Apply both updates to the original parameters: 0.8−0.05(−4) and 1.5−0.05(2).

## Question 4

**Answer:** The learning rate may be too high; retry with a smaller α and check the gradient implementation.

**Why:** For a correct convex linear-regression cost, a sufficiently small step should reduce J.

## Question 5

**Answer:** One example constrains only one model output; the pairs may predict the other examples differently.

**Why:** The cost aggregates errors across all training examples, not a single x value.
