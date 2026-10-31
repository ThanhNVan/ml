# Course 4, week 2: Error analysis and data strategy — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 4. Structuring Machine Learning Projects/week-2/week.md>)

## Question 1

**Answer:** 35 errors, or 35% of the inspected errors.

**Why:** The category's frequency bounds the gain from fixing only that category.

## Question 2

**Answer:** Data mismatch dominates over variance.

**Why:** The train-dev–train gap is 1 point, while the dev–train-dev gap is 10 points.

## Question 3

**Answer:** Freeze the encoder, train a new output head, then consider fine-tuning selected layers on the new task.

**Why:** Previously learned visual features can reduce the need for many new labeled examples.

## Question 4

**Answer:** The end-to-end mapping may need much more labeled input-to-output data than the available data provides.

**Why:** Intermediate supervision or modular components can help when complete labels are scarce.

## Question 5

**Answer:** Define error categories, inspect or relabel consistently across candidate systems, and keep corrected evaluation data separate from training choices.

**Why:** Selective correction for one model can bias comparison.
