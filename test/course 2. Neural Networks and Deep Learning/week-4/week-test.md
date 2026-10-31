# Course 2, week 4: Deep network building blocks — Weekly test

Five original questions based on this week's lessons. Answers are in the separate answer file.

[Week guide](<../../../docs/course 2. Neural Networks and Deep Learning/week-4/week.md>) · [Answer key](week-answers.md)

## Question 1 · Dimensions

A network has layer widths 4→6→3→1 and m=10 examples. Give the dimensions of W³, b³, and A².

## Question 2 · Explanation

Why must the forward pass retain selected activations or preactivations until the backward pass?

## Question 3 · Calculation

For dZ² of shape (3,10) and A¹ of shape (6,10), what is the shape of dW²=(1/m)dZ²(A¹)ᵀ?

## Question 4 · Scenario

A developer trains weights successfully but wants to compare two hidden-layer widths. Which quantities are parameters and which are hyperparameters?

## Question 5 · Diagnosis

Training loss is flat from the first iteration in a deep ReLU network and most hidden activations are zero. Name one possible failure and a check.
