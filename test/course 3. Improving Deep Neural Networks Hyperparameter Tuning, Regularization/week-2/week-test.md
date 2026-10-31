# Course 3, week 2: Mini-batches and optimization algorithms — Weekly test

Five original questions based on this week's lessons. Answers are in the separate answer file.

[Week guide](<../../../docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-2/week.md>) · [Answer key](week-answers.md)

## Question 1 · Calculation

A data set has 1,050 examples and mini-batch size 128. How many parameter updates occur in one complete epoch if the final smaller batch is kept?

## Question 2 · Calculation

For v₀=0, β=0.8, and first gradient g₁=5, compute v₁ and bias-corrected v̂₁.

## Question 3 · Explanation

An optimizer has large updates in a direction with consistently large squared gradients. How does RMSprop adjust that coordinate?

## Question 4 · Scenario

Two mini-batches produce alternating gradient signs but a consistent small average direction. Which optimizer feature can smooth the zigzag, and what history does it retain?

## Question 5 · Diagnosis

Adam's first updates are much smaller than expected because the moment estimates start at zero. What correction should the implementation check?
