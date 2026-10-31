# Course 2, week 4: Deep network building blocks — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 2. Neural Networks and Deep Learning/week-4/week.md>)

## Question 1

**Answer:** W³ (1,3), b³ (1,1), A² (3,10).

**Why:** Layer 3 maps three activations to one output for each of ten examples.

## Question 2

**Answer:** Backpropagation needs them to calculate weight gradients and activation derivatives.

**Why:** The reverse computation uses intermediate values from the forward computation.

## Question 3

**Answer:** (3,6).

**Why:** The multiplication is (3,10)×(10,6), matching W².

## Question 4

**Answer:** Learned W and b are parameters; hidden-layer width is a hyperparameter.

**Why:** Width defines the model architecture before parameter training.

## Question 5

**Answer:** Units may be inactive due to initialization or preactivation scale; inspect activation distributions and initial weights.

**Why:** Zero ReLU outputs can block gradients through those units.
