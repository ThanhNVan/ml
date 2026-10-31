# Course 2, week 3: Shallow neural networks — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 2. Neural Networks and Deep Learning/week-3/week.md>)

## Question 1

**Answer:** W¹ (3,5), b¹ (3,1), A¹ (3,7), W² (2,3), A² (2,7).

**Why:** Each layer's weight rows equal its units, and example activations occupy columns.

## Question 2

**Answer:** No. The affine layers compose into one affine transformation.

**Why:** A nonlinear activation is required to make the representation nonlinear.

## Question 3

**Answer:** Activation 0; derivative 0.

**Why:** ReLU(z)=max(0,z) and its derivative is zero for negative z.

## Question 4

**Answer:** Symmetry makes identical units receive identical gradients; initialize small random weights.

**Why:** Random weights let units learn different features.

## Question 5

**Answer:** Downstream weights propagate the loss signal back; the activation derivative converts the signal into a derivative with respect to the hidden preactivation.

**Why:** Both factors appear in the chain rule.
