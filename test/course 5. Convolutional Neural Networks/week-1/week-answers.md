# Course 5, week 1: Convolution and pooling fundamentals — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 5. Convolutional Neural Networks/week-1/week.md>)

## Question 1

**Answer:** 14×14×16.

**Why:** floor((28+4−5)/2)+1=14 for both spatial axes; filter count gives channels.

## Question 2

**Answer:** 1,216.

**Why:** Each of 16 filters has 5×5×3=75 weights plus one bias: 16×76.

## Question 3

**Answer:** Each filter combines all input channels into one response map; multiple filters produce multiple response maps.

**Why:** The filter spans input depth and is repeated across spatial positions.

## Question 4

**Answer:** 7×7; local detail is discarded while spatial size and computation decrease.

**Why:** Each nonoverlapping 2×2 window contributes one maximum.

## Question 5

**Answer:** Add padding; it slows or prevents shrinkage and gives border pixels more opportunities to affect outputs.

**Why:** Without padding, each convolution discards positions near the edges.
