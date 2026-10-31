# Course 6, week 1: Recurrent sequence models — Weekly test

Five original questions based on this week's lessons. Answers are in the separate answer file.

[Week guide](<../../../docs/course 6. Sequence Models/week-1/week.md>) · [Answer key](week-answers.md)

## Question 1 · Dimensions

A many-to-one sentiment RNN reads a six-token review and predicts one label. At how many input time steps is the shared recurrent cell used, and when is the label emitted?

## Question 2 · Explanation

Why does backpropagation through time struggle to assign credit to a word 100 tokens before a prediction?

## Question 3 · Scenario

A model labels a word using both preceding and following words in a complete sentence. Which recurrent arrangement is suitable, and what deployment limitation does it have?

## Question 4 · Explanation

During language-model sampling, what becomes the next input after a token is sampled, and what can stop generation?

## Question 5 · Diagnosis

A basic RNN forgets a subject's grammatical number across a long clause. Name a gated alternative and the memory behavior it offers.
