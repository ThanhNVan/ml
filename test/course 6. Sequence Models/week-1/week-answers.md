# Course 6, week 1: Recurrent sequence models — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 6. Sequence Models/week-1/week.md>)

## Question 1

**Answer:** Six recurrent steps; the label is emitted after processing the sequence (or from a final representation).

**Why:** Many-to-one models aggregate the sequence before producing one target.

## Question 2

**Answer:** Gradients pass through many recurrent steps and may repeatedly shrink or grow.

**Why:** Long gradient paths create vanishing or exploding-gradient problems.

## Question 3

**Answer:** A bidirectional RNN; it needs future input context, so it cannot make the same full-context prediction before those words arrive.

**Why:** Backward recurrence reads the sequence from the other direction.

## Question 4

**Answer:** Feed the sampled token into the next step; stop at an end-of-sequence token or a length limit.

**Why:** Generation feeds back the model's own outputs.

## Question 5

**Answer:** Use a GRU or LSTM; gates can retain relevant state across many time steps.

**Why:** Gating provides a path for longer-term information.
