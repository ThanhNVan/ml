# Course 3, week 3: Hyperparameter tuning, batch normalization, and softmax — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-3/week.md>)

## Question 1

**Answer:** Sample approximately uniformly in log space.

**Why:** This gives comparable coverage of each order of magnitude.

## Question 2

**Answer:** Training uses each mini-batch's mean and variance; inference uses running estimates so a prediction does not depend on arbitrary test-batch composition.

**Why:** The prediction should be stable for an individual input.

## Question 3

**Answer:** (0.25,0.25,0.5).

**Why:** Exponentials are (1,1,2), whose sum is 4.

## Question 4

**Answer:** Subtract the maximum logit before exponentiating.

**Why:** Softmax is unchanged by subtracting the same constant from all logits.

## Question 5

**Answer:** Check batch-normalization inference mode and stored population statistics.

**Why:** Using batch statistics at test time can make outputs batch-dependent.
