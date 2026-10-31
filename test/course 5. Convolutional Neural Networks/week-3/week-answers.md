# Course 5, week 3: Detection, localization, and segmentation — Answer key

Use this after attempting the weekly test.

[Weekly test](week-test.md) · [Week guide](<../../../docs/course 5. Convolutional Neural Networks/week-3/week.md>)

## Question 1

**Answer:** 2/9 ≈ 0.222.

**Why:** Union area is 12+10−4=18; IoU=4/18.

## Question 2

**Answer:** Non-max suppression keeps the higher-scoring box and suppresses the overlapping lower-scoring one above the IoU threshold.

**Why:** The step reduces duplicate detections.

## Question 3

**Answer:** Different anchors provide starting box shapes for objects with different sizes and aspect ratios.

**Why:** One fixed shape is a poor fit for all objects.

## Question 4

**Answer:** 256×256×4, before choosing a per-pixel class.

**Why:** Each spatial position needs four class scores.

## Question 5

**Answer:** Fine spatial detail and location cues from earlier high-resolution feature maps.

**Why:** The decoder combines those cues with deeper context during upsampling.
