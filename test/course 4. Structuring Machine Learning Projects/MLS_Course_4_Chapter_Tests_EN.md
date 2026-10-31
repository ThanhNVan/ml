# 📘 Deep Learning Specialization — Course 4
## Structuring Machine Learning Projects — Chapter Tests

> **40 questions** across 2 weeks · Based only on the lecture videos. Answers are in the separate answer key file.

| Week | Topic | Questions |
|---|---|---|
| [Week 1](#week-1) | ML strategy: metrics, dev/test sets, human-level performance | 1–20 |
| [Week 2](#week-2) | Error analysis, mismatched data, transfer and multi-task learning, end-to-end | 21–40 |

**Question types:** 🔘 Multiple choice · ✅ True / False · ✏️ Fill in · 🧮 Calculation · 💬 Short answer · ☑️ Select all · 🔗 Matching · 🎯 Scenario

---

## Week 1
*ML strategy: metrics, dev/test sets, human-level performance*

### Question 1 &nbsp; `🔘 Multiple choice`

Which idea does the course use to describe having one control per problem, like the knobs on an old TV?

- A. Regularization
- B. Orthogonalization
- C. Early stopping
- D. Data augmentation

---

### Question 2 &nbsp; `🔗 Matching`

Match each problem to the knob that targets it: (1) poor fit on the training set, (2) good training but poor dev performance, (3) good dev but poor test performance, (4) good test but poor real-world performance. Knobs: (a) bigger dev set, (b) bigger network or a better optimizer such as Adam, (c) change the dev set or the cost function, (d) regularization or a bigger training set.

---

### Question 3 &nbsp; `✅ True / False`

Early stopping is a perfectly orthogonal control.

---

### Question 4 &nbsp; `🧮 Calculation`

Classifier A has precision 95% and recall 90%. Compute its F1 score (one decimal place, in %).

---

### Question 5 &nbsp; `💬 Short answer`

Why is a single-number evaluation metric useful when you try many ideas?

---

### Question 6 &nbsp; `🔘 Multiple choice`

You care about accuracy and also need the classifier to run in at most 100 ms. How do you treat the two metrics?

- A. Both are optimizing metrics
- B. Accuracy is optimizing; running time ≤ 100 ms is satisficing
- C. Running time is optimizing; accuracy is satisficing
- D. Combine them into one by always averaging

---

### Question 7 &nbsp; `🎯 Scenario`

A wake-word detector must maximize accuracy while triggering falsely at most once per 24 hours. Which metric is optimizing and which is satisficing?

---

### Question 8 &nbsp; `🔘 Multiple choice`

A team puts images from 4 regions in the dev set and images from the other 4 regions in the test set. What is the problem?

- A. The dev set is too large
- B. Dev and test sets come from different distributions
- C. The test set must be bigger
- D. There is no problem

---

### Question 9 &nbsp; `✅ True / False`

The dev and test sets should reflect the data you expect to get in the future and consider important to do well on.

---

### Question 10 &nbsp; `🔘 Multiple choice`

You have 1,000,000 examples. Which split is the most reasonable in the deep learning era?

- A. 60% / 20% / 20%
- B. 98% / 1% / 1%
- C. 33% / 33% / 33%
- D. 50% / 25% / 25%

---

### Question 11 &nbsp; `🎯 Scenario`

A classifier has a lower error but sometimes shows offensive images to users, while another classifier has higher error and never does. Both pass the current dev/test metric. What should you do?

---

### Question 12 &nbsp; `🧮 Calculation`

Human-level error on a task is 1%, training error is 8% and dev error is 10%. What is the avoidable bias, in percentage points?

---

### Question 13 &nbsp; `🎯 Scenario`

Human-level error is 7.5%, training error is 8% and dev error is 10%. Should you focus on reducing bias or variance?

---

### Question 14 &nbsp; `🔘 Multiple choice`

In the radiology example, a typical human gets 3% error, a typical doctor 1%, an experienced doctor 0.7%, and a team of experienced doctors 0.5%. What should you use as the estimate of Bayes error?

- A. 3%
- B. 1%
- C. 0.7%
- D. 0.5% or lower

---

### Question 15 &nbsp; `☑️ Select all`

Which of these can help reduce avoidable bias (a gap between training error and human-level error)?

- A. Train a bigger network
- B. Train longer or use a better optimizer such as momentum, RMSprop or Adam
- C. Get more training data
- D. Search for a different neural network architecture or hyperparameters

---

### Question 16 &nbsp; `🧮 Calculation`

Three classifiers have these error rates (%) in four regions: A = 3, 4, 5, 8; B = 5, 6, 5, 4; C = 2, 3, 4, 6. Which has the lowest average error, and what is it?

---

### Question 17 &nbsp; `✅ True / False`

The test set should be as large as the training set so the final performance estimate is reliable.

---

### Question 18 &nbsp; `🧮 Calculation`

To penalize offensive images, the weighted error is (1 / Σw) · Σ w(i) · 1{ŷ(i) ≠ y(i)}, with w = 1 for normal images and w = 10 for offensive ones. A dev set has 100 images, 4 of them offensive, and the classifier gets 2 offensive images and 3 normal ones wrong. What is the weighted error (in %)?

---

### Question 19 &nbsp; `✅ True / False`

Bayes optimal error is the best possible error, and even a perfect system may not reach 0% (for example, very noisy audio).

---

### Question 20 &nbsp; `☑️ Select all`

Which of these problems are listed as ones where ML has surpassed single human performance?

- A. Online advertising
- B. Product recommendations
- C. Loan approval
- D. Reading a photo of a street to say what is in it

---

## Week 2
*Error analysis, mismatched data, transfer and multi-task learning, end-to-end*

### Question 21 &nbsp; `🎯 Scenario`

Your cat classifier has 10% dev error. You inspect 100 misclassified dev examples and find 5 are dogs. What is the most you could improve the error by fixing the dog problem?

---

### Question 22 &nbsp; `🎯 Scenario`

In the same setup, 50 of the 100 misclassified examples are blurry images. What is the ceiling on improvement from fixing blurry images?

---

### Question 23 &nbsp; `✅ True / False`

In error analysis you may count one example in several categories (e.g. both blurry and an Instagram filter).

---

### Question 24 &nbsp; `🔘 Multiple choice`

Deep learning algorithms are fairly robust to which kind of labeling error in the training set?

- A. Systematic errors, e.g. all white dogs labeled as cats
- B. Random errors from a labeler's slips
- C. Neither
- D. Both equally

---

### Question 25 &nbsp; `🧮 Calculation`

Dev error is 10%, of which 0.6 points come from incorrect labels. What share of dev error do the incorrect labels explain, and what is left from other causes?

---

### Question 26 &nbsp; `☑️ Select all`

If you decide to correct labels in the dev set, which practices does the course advise?

- A. Apply the same process to the dev and test sets so they keep the same distribution
- B. Consider also examining examples the algorithm got right
- C. Always relabel the training set too
- D. Accept that the training set may now come from a slightly different distribution

---

### Question 27 &nbsp; `💬 Short answer`

What three steps does the course recommend when starting a new ML project?

---

### Question 28 &nbsp; `🎯 Scenario`

You have 200,000 high-quality web images and 10,000 blurry mobile-app images, and the app is what matters. How should you set up the dev/test sets?

---

### Question 29 &nbsp; `🎯 Scenario`

Human error 0%, training error 1%, training-dev error 9%, dev error 10%. What is the main problem?

---

### Question 30 &nbsp; `🎯 Scenario`

Human error 0%, training error 1%, training-dev error 1.5%, dev error 10%. What is the main problem?

---

### Question 31 &nbsp; `✏️ Fill in`

The gap between training-dev error and dev error measures ____.

---

### Question 32 &nbsp; `💬 Short answer`

Name two things to try when you have a data-mismatch problem.

---

### Question 33 &nbsp; `🔘 Multiple choice`

What is a risk of artificial data synthesis?

- A. It always lowers training error
- B. The model may overfit to the small set of synthesized examples, e.g. one hour of car noise reused over 10,000 hours of audio
- C. It removes the need for a dev set
- D. It makes labels random

---

### Question 34 &nbsp; `🔘 Multiple choice`

You have a big dataset for task A (e.g. image recognition) and a small one for task B (e.g. radiology). With very little data for B, what is the standard transfer learning recipe?

- A. Train from scratch on B
- B. Swap the output layer, re-initialize its weights, and retrain only the last layer (or last few layers) on B
- C. Freeze the output layer and retrain all other layers
- D. Combine A and B labels into one vector

---

### Question 35 &nbsp; `☑️ Select all`

When does transfer learning from task A to task B make sense?

- A. A and B have the same input type (e.g. images)
- B. You have much more data for A than for B
- C. Low-level features from A could help B
- D. B has more data than A

---

### Question 36 &nbsp; `🎯 Scenario`

An autonomous driving system detects pedestrians, cars, stop signs and traffic lights, so y is a 4×1 vector. Some images are only labeled for some of the objects. Can multi-task learning still use them?

---

### Question 37 &nbsp; `☑️ Select all`

When does multi-task learning make sense?

- A. The tasks can benefit from shared lower-level features
- B. The amount of data for each task is roughly similar
- C. You can train a big enough network to do well on all tasks
- D. Each task needs a completely different input

---

### Question 38 &nbsp; `💬 Short answer`

What is end-to-end deep learning, and what is its main requirement?

---

### Question 39 &nbsp; `🔘 Multiple choice`

Why is the face-recognition door-badge system usually built as two steps (detect the face, then compare) instead of one end-to-end network?

- A. End-to-end learning cannot output a name
- B. Each sub-task has plenty of data, but there are few examples of images mapped directly to identity
- C. The camera is too slow
- D. It is not; end-to-end is always better

---

### Question 40 &nbsp; `☑️ Select all`

Pros and cons of end-to-end learning. Which of these are advantages?

- A. Lets the data speak instead of human preconceptions such as phonemes
- B. Less hand-designing of components is needed
- C. Needs large amounts of data
- D. Excludes potentially useful hand-designed components

---
