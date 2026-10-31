# Course 5, week 2: CNN architectures and transfer learning — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 5. Convolutional Neural Networks/week-2/week.md>)

## Question 1

**Answer:** The block can approximate the identity mapping by adding its input to a near-zero residual.

**Why:** The shortcut creates a direct information and gradient path.

## Question 2

**Answer:** Standard: 18,432; depthwise plus pointwise: 2,336.

**Why:** Standard is 3×3×32×64; separable is 3×3×32 + 32×64.

## Question 3

**Answer:** Replace the classification head for the new labels and initially freeze the feature extractor.

**Why:** This tests whether pretrained features transfer before expensive fine-tuning.

## Question 4

**Answer:** The transformation changed the label or task meaning, so it was not label-preserving.

**Why:** Augmentation must respect the prediction target.

## Question 5

**Answer:** It mixes channel values at that location and can reduce channel count, lowering the later 3×3 branch's cost.

**Why:** The operation is spatially local but acts across channels.
