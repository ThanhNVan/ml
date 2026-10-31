# Course 2, week 1: Neural network orientation — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 2. Neural Networks and Deep Learning/week-1/week.md>)

## Question 1

**Answer:** Input: audio signal; target: a word sequence. It is not scalar regression.

**Why:** The output is structured text rather than one continuous value.

## Question 2

**Answer:** A larger network can use extra examples to learn more complex features while reducing overfitting risk.

**Why:** Capacity and data scale interact; additional data cannot overcome a severe capacity limit.

## Question 3

**Answer:** A 64×64×3 array of pixel values; y=1 if the chosen object is present, otherwise 0.

**Why:** The network needs numeric input values and labeled examples for supervised classification.

## Question 4

**Answer:** Hidden-layer parameters adapt features from examples as part of optimizing the task loss.

**Why:** Feature extraction and prediction can be learned jointly.

## Question 5

**Answer:** The gap suggests generalization trouble; more layers may add capacity and worsen it without other changes.

**Why:** Model depth is only one part of the data, optimization, and evaluation setup.
