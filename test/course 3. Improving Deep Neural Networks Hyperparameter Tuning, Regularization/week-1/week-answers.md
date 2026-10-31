# Course 3, week 1: Bias, variance, and reliable training — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-1/week.md>)

## Question 1

**Answer:** Avoidable bias dominates; improve model capacity or optimization before focusing on variance.

**Why:** Training error is far from the baseline while the dev–train gap is small.

## Question 2

**Answer:** Fit on train, choose architectures and tuning settings on dev, and reserve test for final evaluation.

**Why:** Repeated test inspection leaks selection information into the final estimate.

## Question 3

**Answer:** 2.0.

**Why:** [1.024−0.984]/(2×0.01)=2.

## Question 4

**Answer:** It tests backprop against a numerical approximation, but requires extra forward passes and randomness such as dropout must be controlled.

**Why:** It is a debugging method, not the training optimizer.

## Question 5

**Answer:** Inspect input normalization and weight initialization scale.

**Why:** Poor scaling or initialization can amplify activations and gradients across depth.
