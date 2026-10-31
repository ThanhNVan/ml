# 📘 Machine Learning Specialization — Course 1
## Supervised Machine Learning: Regression and Classification — Chapter Tests

> **68 questions** across 3 weeks · Based only on the lecture videos (playlist transcripts). Answers are in the separate answer key file.

| Week | Topic | Questions |
|---|---|---|
| [Week 1](#week-1) | Introduction to machine learning, linear regression and gradient descent | 1–24 |
| [Week 2](#week-2) | Multiple linear regression, scaling and feature engineering | 25–45 |
| [Week 3](#week-3) | Classification, logistic regression and regularization | 46–68 |

**Question types:** 🔘 Multiple choice · ✅ True / False · ✏️ Fill in · 🧮 Calculation · 💬 Short answer · ☑️ Select all · 🔗 Matching · 🎯 Scenario

---

## Week 1
*Introduction to machine learning, linear regression and gradient descent*

### Question 1 &nbsp; `🔘 Multiple choice`

Arthur Samuel defined machine learning as the field of study that gives computers the ability to ____.

- A. learn without being explicitly programmed
- B. store large amounts of data
- C. replace all human programmers
- D. run faster than any other software

---

### Question 2 &nbsp; `🔘 Multiple choice`

What are the two main types of machine learning algorithms covered in this course?

- A. Supervised and unsupervised learning
- B. Regression and clustering
- C. Linear and nonlinear learning
- D. Training and testing

---

### Question 3 &nbsp; `✅ True / False`

According to the lecture, supervised learning creates the vast majority of the economic value of machine learning today.

---

### Question 4 &nbsp; `🔘 Multiple choice`

Supervised learning algorithms learn from:

- A. Inputs x only
- B. Examples that include the right answer y for each input x
- C. Rewards only
- D. Random numbers

---

### Question 5 &nbsp; `🔘 Multiple choice`

Predicting the price of a house from its size is an example of:

- A. Classification
- B. Regression
- C. Clustering
- D. Anomaly detection

---

### Question 6 &nbsp; `🔘 Multiple choice`

In the breast-cancer detection example, the labels are:

- A. benign (0) and malignant (1)
- B. any real number
- C. tumor size in cm
- D. patient age

---

### Question 7 &nbsp; `💬 Short answer`

How do classification and regression differ in their possible outputs?

---

### Question 8 &nbsp; `☑️ Select all`

Which of the following are types of unsupervised learning mentioned in the lecture?

- A. Clustering
- B. Anomaly detection
- C. Dimensionality reduction
- D. Regression

---

### Question 9 &nbsp; `✅ True / False`

In unsupervised learning the data comes with both inputs x and output labels y.

---

### Question 10 &nbsp; `🔘 Multiple choice`

What is the most widely used tool by machine learning and data science practitioners for coding up experiments, according to the lecture?

- A. The Jupyter Notebook
- B. A spreadsheet
- C. A web browser
- D. A text-only terminal

---

### Question 11 &nbsp; `✏️ Fill in`

In the housing training set, m denotes the number of ____, and it is 47 for the dataset in the lecture.

---

### Question 12 &nbsp; `🔗 Matching`

Match each symbol to its meaning: (1) x, (2) y, (3) ŷ, (4) (x^(i), y^(i)). Meanings: (a) the model's prediction, (b) the i-th training example, (c) input feature, (d) output/target variable.

---

### Question 13 &nbsp; `🔘 Multiple choice`

In the lecture, what does the function f do after training?

- A. It takes a new input x and outputs a prediction ŷ
- B. It collects the training data
- C. It chooses the learning rate
- D. It labels the training set

---

### Question 14 &nbsp; `✏️ Fill in`

For linear regression with one feature, the model is f_{w,b}(x) = ____.

---

### Question 15 &nbsp; `🧮 Calculation`

A linear model has w = 2 and b = 1. What is its prediction for x = 3?

---

### Question 16 &nbsp; `🧮 Calculation`

Training set: (1, 2) and (2, 4). With w = 1 and b = 0, what is the cost J = (1/2m) Σ (ŷ − y)²?

---

### Question 17 &nbsp; `🔘 Multiple choice`

Why does the cost function divide the sum of squared errors by m?

- A. So the cost does not automatically increase as the training set gets larger
- B. To make it negative
- C. To make w smaller
- D. To remove b

---

### Question 18 &nbsp; `🔘 Multiple choice`

The goal of linear regression training is to choose w and b so that:

- A. J(w, b) is as small as possible
- B. J(w, b) is as large as possible
- C. w equals b
- D. m is as large as possible

---

### Question 19 &nbsp; `🔘 Multiple choice`

In a contour plot of the cost function J(w, b) for linear regression, the ovals represent:

- A. Points that have the same value of J
- B. The training examples
- C. The learning rate
- D. The test set

---

### Question 20 &nbsp; `✏️ Fill in`

The gradient descent update is w := w − ____ · ∂J/∂w, where the parameters w and b must be updated simultaneously.

---

### Question 21 &nbsp; `🧮 Calculation`

With w = 2, α = 0.1 and ∂J/∂w = 4, what is the new w after one gradient descent step?

---

### Question 22 &nbsp; `🔘 Multiple choice`

What can happen if the learning rate α is too large?

- A. Gradient descent may overshoot the minimum, fail to converge, or even diverge
- B. Gradient descent always converges faster
- C. The cost is always zero
- D. b is ignored

---

### Question 23 &nbsp; `✅ True / False`

With a fixed learning rate, gradient descent can reach a minimum because the steps naturally get smaller as the derivative gets smaller near the minimum.

---

### Question 24 &nbsp; `✅ True / False`

Batch gradient descent uses all of the training examples at each step.

---

## Week 2
*Multiple linear regression, scaling and feature engineering*

### Question 25 &nbsp; `✏️ Fill in`

With n features, a multiple linear regression model is f_{w,b}(x) = w·x + b, where w·x is the ____ product of the vectors w and x.

---

### Question 26 &nbsp; `🧮 Calculation`

For w = [2, −1], x = [3, 4] and b = 5, compute w·x + b.

---

### Question 27 &nbsp; `☑️ Select all`

What are the benefits of vectorization?

- A. The code is shorter
- B. The code runs much faster
- C. It uses parallel hardware, such as a GPU or the CPU's vector instructions
- D. It removes the need for training data

---

### Question 28 &nbsp; `💬 Short answer`

Why is np.dot(w, x) + b much faster than a Python for loop over the features?

---

### Question 29 &nbsp; `🧮 Calculation`

Multiple regression gradient step: w = [2, −1], learning rate α = 0.1, gradient = [4, −6]. What is the new w?

---

### Question 30 &nbsp; `🔘 Multiple choice`

Why does feature scaling help gradient descent?

- A. When features have very different ranges, the cost contours are tall and skinny and gradient descent bounces back and forth; rescaling makes it converge faster
- B. It changes the labels
- C. It increases the number of features
- D. It removes the learning rate

---

### Question 31 &nbsp; `🧮 Calculation`

Feature x1 (house size) ranges from 300 to 2000. If you scale it by dividing by the maximum, what is the scaled value for x1 = 1000?

---

### Question 32 &nbsp; `🧮 Calculation`

Mean normalization: x1 ranges from 300 to 2000 and its mean is μ1 = 600. Compute (x1 − μ1) / (max − min) for x1 = 1000 (3 decimals).

---

### Question 33 &nbsp; `🧮 Calculation`

Z-score normalization: a feature has mean μ = 600 and standard deviation σ = 200. What is the normalized value for x = 1000?

---

### Question 34 &nbsp; `🔘 Multiple choice`

Roughly which range of feature values is acceptable without rescaling?

- A. About −1 to +1 (a little bigger or smaller is fine)
- B. Exactly 0 to 1 only
- C. −1000 to +1000
- D. Any range works equally well

---

### Question 35 &nbsp; `🔘 Multiple choice`

You plot the cost J against the number of iterations of gradient descent. What should the curve do if everything works?

- A. Decrease on every iteration
- B. Increase slowly
- C. Oscillate
- D. Stay random

---

### Question 36 &nbsp; `✏️ Fill in`

In an automatic convergence test, you declare convergence if J decreases by less than ε, e.g. ε = ____, in one iteration.

---

### Question 37 &nbsp; `🔘 Multiple choice`

Which sequence of learning rates does the lecture suggest trying?

- A. 0.001, 0.003, 0.01, 0.03, 0.1 … (each about 3× larger)
- B. 5, 50, 500
- C. 1, 1, 1
- D. Only 0.5

---

### Question 38 &nbsp; `🎯 Scenario`

With α = 0.1 the cost J goes up and down erratically. What should you try first?

---

### Question 39 &nbsp; `🔘 Multiple choice`

What is feature engineering?

- A. Using intuition to design new features, by transforming or combining the original ones
- B. Removing all features
- C. Collecting more labels
- D. Choosing a learning rate

---

### Question 40 &nbsp; `🧮 Calculation`

A plot has frontage 30 m and depth 50 m. You create the new feature area = frontage × depth. What is the area?

---

### Question 41 &nbsp; `☑️ Select all`

Which of these are valid polynomial regression features for a single input x?

- A. x
- B. x²
- C. √x
- D. x³

---

### Question 42 &nbsp; `✅ True / False`

When you add x² and x³ as features, scaling becomes especially important because their ranges differ enormously from x.

---

### Question 43 &nbsp; `🔘 Multiple choice`

The multiple linear regression gradient descent update applies to:

- A. Each w_j (j = 1…n) and b, updated simultaneously
- B. Only w1
- C. Only b
- D. The features x

---

### Question 44 &nbsp; `💬 Short answer`

Why does vectorized gradient descent for multiple features need no explicit loop over the training examples' features?

---

### Question 45 &nbsp; `✅ True / False`

A normal equation is the main method used in this course to find w and b.

---

## Week 3
*Classification, logistic regression and regularization*

### Question 46 &nbsp; `🔘 Multiple choice`

In binary classification, the output variable y can take:

- A. Only two values, such as 0 and 1 (no/yes, false/true)
- B. Any real number
- C. Exactly three values
- D. Negative values only

---

### Question 47 &nbsp; `💬 Short answer`

Why is linear regression a poor choice for classification?

---

### Question 48 &nbsp; `✏️ Fill in`

The sigmoid (logistic) function is g(z) = 1 / (1 + e^(−____)).

---

### Question 49 &nbsp; `🧮 Calculation`

What is the sigmoid of z = 0?

---

### Question 50 &nbsp; `🔘 Multiple choice`

How is the output of logistic regression interpreted?

- A. As the probability that y = 1 given x
- B. As the predicted price
- C. As a cluster id
- D. As the learning rate

---

### Question 51 &nbsp; `🧮 Calculation`

A tumor classifier outputs 0.7 for a patient. What is the probability that y = 0?

---

### Question 52 &nbsp; `🔘 Multiple choice`

With a threshold of 0.5, logistic regression predicts ŷ = 1 exactly when:

- A. w·x + b ≥ 0
- B. w·x + b < 0
- C. x = 0
- D. J = 0

---

### Question 53 &nbsp; `✏️ Fill in`

The decision boundary of logistic regression is the set of points where z = w·x + b = ____.

---

### Question 54 &nbsp; `🧮 Calculation`

Logistic regression with w1 = 1, w2 = 1, b = −3. What does it predict for the point x1 = 2, x2 = 2?

---

### Question 55 &nbsp; `✅ True / False`

With polynomial features, logistic regression can learn non-linear decision boundaries such as a circle.

---

### Question 56 &nbsp; `🔘 Multiple choice`

Why is the squared error cost not used for logistic regression?

- A. With the sigmoid it gives a non-convex cost with many local minima
- B. It is too fast
- C. It requires labels to be negative
- D. It can't be computed

---

### Question 57 &nbsp; `✏️ Fill in`

The logistic loss is −log(f) if y = 1 and −log(____) if y = 0, where f is the model's output.

---

### Question 58 &nbsp; `🧮 Calculation`

For y = 1 and f = 0.8, what is the logistic loss −ln(f) (3 decimals)?

---

### Question 59 &nbsp; `🎯 Scenario`

For y = 1, what happens to the loss as the prediction f approaches 0?

---

### Question 60 &nbsp; `✏️ Fill in`

Simplified loss: L(f, y) = −y·log(f) − (1 − y)·log(____).

---

### Question 61 &nbsp; `🔘 Multiple choice`

How does gradient descent for logistic regression compare with linear regression?

- A. The update equations look the same, but f is now the sigmoid of w·x + b
- B. It uses no derivative
- C. It needs no learning rate
- D. It has no bias term

---

### Question 62 &nbsp; `🔗 Matching`

Match each term to the situation: (1) underfitting, (2) generalization, (3) overfitting. Situations: (a) fits the training set extremely well but fails on new examples (high variance), (b) does not fit the training set well (high bias), (c) fits the training data and also works well on new examples.

---

### Question 63 &nbsp; `☑️ Select all`

Which of these are ways to address overfitting?

- A. Collect more training data
- B. Use fewer features (feature selection)
- C. Use regularization
- D. Increase the learning rate to the maximum

---

### Question 64 &nbsp; `🧮 Calculation`

Regularization term: λ/(2m) · Σ w_j² with λ = 10, m = 5 and w = [1, 2]. What is its value?

---

### Question 65 &nbsp; `🎯 Scenario`

What happens if the regularization parameter λ is set to a very large number? And if it is set to 0?

---

### Question 66 &nbsp; `✅ True / False`

By convention, the parameter b is usually not regularized.

---

### Question 67 &nbsp; `🧮 Calculation`

In regularized linear regression each step first multiplies w_j by (1 − αλ/m). Compute that factor for α = 0.1, λ = 10 and m = 100.

---

### Question 68 &nbsp; `🔘 Multiple choice`

For regularized logistic regression, how does the gradient descent update change compared with the unregularized version?

- A. The derivative for each w_j gets an extra term (λ/m)·w_j
- B. b is regularized the same way
- C. The sigmoid is replaced
- D. The learning rate is removed

---
