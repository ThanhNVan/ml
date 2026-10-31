# Course 3, week 3: Hyperparameter tuning, batch normalization, and softmax — Weekly test

Five original questions based on this week's lessons. Answers are in the separate answer file.

[Week guide](<../../../docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-3/week.md>) · [Answer key](week-answers.md)

## Question 1 · Scenario

You can afford 20 training runs and need to search learning rates between 10⁻⁵ and 10⁻¹. Describe a sensible sampling scale and why.

## Question 2 · Explanation

Why does batch normalization need different statistics at training and at inference for a single input?

## Question 3 · Calculation

A three-class softmax receives logits (0,0,ln 2). What probabilities does it produce?

## Question 4 · Diagnosis

A softmax implementation overflows when logits are around 1,000. What algebraically equivalent preprocessing fixes the exponentiation?

## Question 5 · Scenario

A framework's automatic gradients run, but validation behavior changes with test-batch size. What layer-specific mode or statistics would you inspect?
