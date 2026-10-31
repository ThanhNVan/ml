# Course 6, week 4: Self-attention and transformers — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 6. Sequence Models/week-4/week.md>)

## Question 1

**Answer:** 4×4.

**Why:** Each of four query positions scores each of four key positions.

## Question 2

**Answer:** (0.25, 0.75).

**Why:** Softmax of (0,ln 3) normalizes exponentials (1,3).

## Question 3

**Answer:** Self-attention alone does not encode the order of tokens, so positions must be supplied separately.

**Why:** Word identity and word position carry different information.

## Question 4

**Answer:** It may attend to positions 1–3 and must mask positions 4 onward.

**Why:** Future tokens would leak the answer or later context into next-token prediction.

## Question 5

**Answer:** Different learned projections can attend to different relationships or representation subspaces in parallel.

**Why:** The heads' outputs are combined for the next block.
