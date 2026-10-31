# Course 6, week 3: Sequence-to-sequence decoding and attention — Weekly test

Five original questions based on this week's lessons. Answers are in the separate answer file.

[Week guide](<../../../docs/course 6. Sequence Models/week-3/week.md>) · [Answer key](week-answers.md)

## Question 1 · Calculation

A beam keeps two partial translations. Candidate A has probability 0.4 then 0.5; candidate B has 0.3 then 0.9. Which two-token path has higher probability?

## Question 2 · Explanation

Why can increasing beam width fail to improve a translation if the model itself assigns poor probabilities?

## Question 3 · Scenario

A decoder translates a long source sentence and needs to focus on different source words at each output step. What mechanism supplies this changing context?

## Question 4 · Diagnosis

A translator returns unusually short sentences because it multiplies many probabilities below one. What beam-search refinement can reduce this bias?

## Question 5 · Explanation

A trigger-word system emits a label near the phrase's end, while a transcription system emits words. Why should their output layers and evaluation differ?
