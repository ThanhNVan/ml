# Course 1 Answer Key

> **Machine Learning Specialization — Supervised Machine Learning: Regression and Classification**
>
> **57 questions** · Use after completing the test

---

## How to use this key

- **MCQ:** Match the letter to your selected option.
- **True/False and fill-in:** Compare the complete answer, not only the keyword.
- **Calculations/scenarios:** Check both the numerical result and the reasoning.

---

## Chapter 1 — Course Foundations

### Quick answers

| Questions | Answers |
|---|---|
| 1–8 | **1 B** · **2 A** · **3 B** · **4 B** · **5 B** · **6 A** · **7 C** · **8 B** |
| 9–10 | **9 False** · **10 True** |

### Written answers

**11. Dataset interpretation**

- **x:** age and blood pressure
- **y:** disease/no-disease
- **Task:** binary classification

**12. E-commerce examples**

- **Regression:** predict an order's monetary value.
- **Unsupervised learning:** group customers by purchasing behavior.

---

## Chapter 2 — Linear Regression, Cost, and Gradient Descent

### Quick answers

| Questions | Answers |
|---|---|
| 1–8 | **1 A** · **2 B** · **3 A** · **4 B** · **5 B** · **6 B** · **7 B** · **8 A** |
| 9–10 | **9 alpha (α)** · **10 False** |

### Calculations and scenarios

**11. Prediction and error**

- Prediction: `ŷ = 2(3) + 1 = 7`
- Residual: `ŷ − y = 7 − 8 = −1`
- Squared error: `(-1)^2 = 1`

**12. Cost**

`J = (4 + 16) / (2 × 2) = 5`

**13. Gradient update**

`w_new = 2 − 0.1(4) = 1.6`

**14. Oscillating or growing cost**

The learning rate is likely too large, or the gradients are unstable. Reduce `α` and/or scale the features.

---

## Chapter 3 — Multiple Linear Regression and Feature Engineering

### Quick answers

| Questions | Answers |
|---|---|
| 1–8 | **1 A** · **2 B** · **3 A** · **4 B** · **5 A** · **6 A** · **7 A** · **8 B** |
| 9–10 | **9 True** · **10 False** |

### Calculations and scenarios

**11. Engineered feature**

`Area = frontage × depth`

This represents usable floor or lot area and can be more informative than frontage and depth separately.

**12. Dot product**

`wᵀx + b = 2(3) + (-1)(4) + 5 = 7`

**13. Unequal feature scales**

The large-scale feature can dominate gradient steps and slow or destabilize convergence. Apply feature scaling, such as z-score normalization.

**14. Vector update**

`w_new = [2, −1] − 0.1[4, −6] = [1.6, −0.4]`

---

## Chapter 4 — Logistic Regression and Regularization

### Quick answers

| Questions | Answers |
|---|---|
| 1–8 | **1 A** · **2 A** · **3 B** · **4 A** · **5 A** · **6 A** · **7 A** · **8 A** |
| 9–10 | **9 ŷ, ŷ** · **10 True** |
| 15 | **B — validation/development set** |

### Calculations and scenarios

**11. Training versus validation accuracy**

This indicates **overfitting/high variance**. Possible actions include collecting more data, simplifying the model, adding regularization, or selecting fewer features.

**12. Incorrect confident prediction**

- Predicted class: **0**, because `0.12 < 0.5`.
- Assessment: **Bad prediction**. With `y = 1`, cross-entropy loss is high because the model is confidently wrong.

**13. Logistic loss**

For `y = 1` and `ŷ = 0.8`:

`L = −log(0.8) ≈ 0.223`

**14. Regularized cost**

`J_reg = J + (λ / 2m) Σ w_j^2`

The bias `b` is usually excluded so regularization controls feature weights without penalizing the intercept.

**16. Imbalanced fraud detection**

**Recall** is informative because it measures the fraction of actual fraud cases detected. Precision, recall, and F1 may be more useful than accuracy.

**17. Scaling and data leakage**

This is **data leakage**. Test-set information influences preprocessing, making evaluation overly optimistic. Fit the scaler on the training set only, then apply it unchanged to validation and test data.

---

## Quick scoring checklist

- **47–57 correct:** Strong mastery; review only missed reasoning questions.
- **37–46 correct:** Good foundation; review gradient descent, scaling, and regularization.
- **27–36 correct:** Revisit formulas and work through the calculations again.
- **0–26 correct:** Review the chapter guide before retaking the test.

> **Note:** Question 15 is placed in the Chapter 4 quick-answer table because it is a multiple-choice model-selection question; questions 11–14, 16, and 17 are written-response items.
