# 📘 Deep Learning Specialization — Course 3
## Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization — Chapter Tests

> **60 questions** across 3 weeks, based only on the lecture videos. Answers are in the separate answer key file.

| Week | Topic | Questions |
|---|---|---|
| [Week 1](#week-1) | Practical aspects of deep learning | 1–20 |
| [Week 2](#week-2) | Optimization algorithms | 21–40 |
| [Week 3](#week-3) | Hyperparameter tuning, batch norm and frameworks | 41–60 |

**Question types:** 🔘 Multiple choice · ✅ True / False · ✏️ Fill in · 🧮 Calculation · 💬 Short answer · ☑️ Select all · 🔗 Matching

---

## Week 1
*Practical aspects of deep learning*

### Question 1 &nbsp; `🔘 Multiple choice`

You have 1,000,000 labeled examples in total. Which train/dev/test split is most reasonable?

- A. 60% / 20% / 20%
- B. 98% / 1% / 1%
- C. 50% / 25% / 25%
- D. 100% / 0% / 0%

---

### Question 2 &nbsp; `✅ True / False`

The dev set and the test set should come from the same distribution.

---

### Question 3 &nbsp; `🔘 Multiple choice`

What is the main purpose of the test set?

- A. To choose the best hyperparameters
- B. To give an unbiased estimate of the final model's performance
- C. To train the model faster
- D. To compute the regularization parameter

---

### Question 4 &nbsp; `✅ True / False`

If you only have a train set and a dev set, you still get an unbiased estimate of performance from the dev set.

---

### Question 5 &nbsp; `🔗 Matching`

Match each (train error, dev error) pair to its diagnosis, assuming human error is about 0%: (1) 1% / 11%, (2) 15% / 16%, (3) 15% / 30%, (4) 0.5% / 1%. Options: high bias, high variance, high bias and high variance, low bias and low variance.

---

### Question 6 &nbsp; `✏️ Fill in`

The bias/variance diagnosis above assumes the optimal (Bayes) error is close to ____ %, and that train and dev sets come from the same distribution.

---

### Question 7 &nbsp; `✏️ Fill in`

L2-regularized logistic regression adds the term ____ · ‖w‖² to the cost J.

---

### Question 8 &nbsp; `🔘 Multiple choice`

What is a typical effect of using L1 regularization?

- A. w becomes sparse (many zeros)
- B. All weights become exactly equal
- C. b is forced to zero
- D. The model needs more memory

---

### Question 9 &nbsp; `🧮 Calculation`

In gradient descent with L2 regularization, each step multiplies w by (1 − αλ/m) before subtracting the backprop gradient. Compute this factor for α = 0.1, λ = 10, m = 100.

---

### Question 10 &nbsp; `💬 Short answer`

How do you choose the regularization parameter λ?

---

### Question 11 &nbsp; `💬 Short answer`

In inverted dropout with keep_prob = 0.8, why do you divide a³ by 0.8 after zeroing units?

---

### Question 12 &nbsp; `✅ True / False`

Dropout should be applied at test time, with units dropped at random, to make predictions more robust.

---

### Question 13 &nbsp; `🔘 Multiple choice`

Which layer should typically get a lower keep_prob?

- A. The layer with the largest weight matrix (most prone to overfitting)
- B. The output layer, always
- C. Any layer, since keep_prob must be the same everywhere
- D. The layer with the fewest units

---

### Question 14 &nbsp; `☑️ Select all`

Which of these explain why dropout reduces overfitting?

- A. Each iteration trains a smaller network
- B. A unit cannot rely on any single input, so it spreads its weights
- C. It makes the cost J easier to plot
- D. It shrinks the squared norm of the weights, like L2

---

### Question 15 &nbsp; `💬 Short answer`

Why is it hard to debug gradient descent with dropout, and what is the usual workaround?

---

### Question 16 &nbsp; `✅ True / False`

When normalizing inputs, the test set should be normalized with its own mean and variance, computed separately from the training set.

---

### Question 17 &nbsp; `🔘 Multiple choice`

Why does normalizing input features speed up training?

- A. It removes the need for a learning rate
- B. It makes the cost function contours more symmetric, so gradient descent can take larger steps
- C. It reduces the number of parameters
- D. It guarantees zero training error

---

### Question 18 &nbsp; `🧮 Calculation`

One input feature has training values 2, 4 and 6. After the two normalization steps (subtract the mean, then divide by σ, where σ² = mean of squares), what is the normalized value of 6 (2 decimals)?

---

### Question 19 &nbsp; `✏️ Fill in`

Two-sided gradient check: dθ_approx[i] = (J(θ + ____) − J(θ − ____)) / (2 · ____).

---

### Question 20 &nbsp; `🔘 Multiple choice`

With ε = 10⁻⁷, which relative difference ‖dθ_approx − dθ‖ / (‖dθ_approx‖ + ‖dθ‖) should make you suspect a bug in backprop?

- A. 10⁻⁷
- B. 10⁻⁹
- C. 10⁻³ or larger
- D. 0

---

## Week 2
*Optimization algorithms*

### Question 21 &nbsp; `✏️ Fill in`

RMSprop keeps S_dW = β·S_dW + (1 − β)·____ (element-wise).

---

### Question 22 &nbsp; `✏️ Fill in`

RMSprop updates W := W − α · dW / (____ + ε).

---

### Question 23 &nbsp; `🔘 Multiple choice`

What does RMSprop aim to do?

- A. Speed up learning in directions with large oscillations
- B. Damp oscillations in directions with large gradients and allow a larger learning rate
- C. Replace the loss function
- D. Increase the batch size automatically

---

### Question 24 &nbsp; `✅ True / False`

In RMSprop, the direction with larger derivatives has a larger S, so its updates are divided by a larger number.

---

### Question 25 &nbsp; `💬 Short answer`

Why is a tiny ε (about 10⁻⁸) added to the denominator?

---

### Question 26 &nbsp; `✅ True / False`

RMSprop was first published in a peer-reviewed academic paper.

---

### Question 27 &nbsp; `🔘 Multiple choice`

Why decay the learning rate over time when using mini-batch gradient descent?

- A. To make the first steps smaller
- B. With a fixed α the mini-batch noise keeps it wandering around the minimum, while a smaller α later keeps it in a tighter region
- C. To avoid using epochs
- D. To remove the need for mini-batches

---

### Question 28 &nbsp; `🧮 Calculation`

With α = α₀ / (1 + decay_rate · epoch_num), α₀ = 0.2 and decay_rate = 1, what is α in epoch 2 (3 decimals)?

---

### Question 29 &nbsp; `🔗 Matching`

Match each schedule to its formula (α₀ is the initial rate): (1) exponential decay, (2) 1/(1 + decay_rate·epoch) decay, (3) discrete staircase, (4) k/√epoch decay. Formulas: (a) 0.95^epoch · α₀, (b) α₀ / (1 + decay_rate·epoch), (c) halve α after a fixed number of steps, (d) k/√epoch · α₀.

---

### Question 30 &nbsp; `✅ True / False`

Manually adjusting the learning rate while a model trains only works when you are training a small number of models.

---

### Question 31 &nbsp; `🔘 Multiple choice`

In the RMSprop example, the vertical direction (parameter b) oscillates strongly. How do S_db and S_dW compare, and why does that help?

- A. S_db is small and S_dW is large, so the vertical step grows
- B. S_db is relatively large and S_dW relatively small, so the vertical update is divided by a bigger number and damped
- C. They are always equal
- D. Both are zero at the start, so nothing is updated

---

### Question 32 &nbsp; `🧮 Calculation`

RMSprop with β = 0.9, previous S_dW = 0 and current dW = 2. Compute S_dW, then the update size α · dW / √S_dW for α = 0.01 (ignore ε, 3 decimals).

---

### Question 33 &nbsp; `☑️ Select all`

Which are effects of RMSprop, as described in the video?

- A. It reduces oscillations in the dimensions where they occur
- B. It lets you use a larger learning rate α
- C. It speeds up learning without diverging in the vertical direction
- D. It removes the need for derivatives

---

### Question 34 &nbsp; `✅ True / False`

When RMSprop is later combined with momentum, its hyperparameter is named β₂ so it does not clash with the β used in momentum.

---

### Question 35 &nbsp; `💬 Short answer`

With mini-batches of 64 to 128 examples and a fixed α, why might gradient descent never converge exactly?

---

### Question 36 &nbsp; `🧮 Calculation`

With α = α₀ / (1 + decay_rate · epoch_num), α₀ = 0.5 and decay_rate = 2, what is α in epoch 3 (3 decimals)?

---

### Question 37 &nbsp; `🧮 Calculation`

With exponential decay α = 0.95^epoch_num · α₀ and α₀ = 0.1, what is α in epoch 2 (4 decimals)?

---

### Question 38 &nbsp; `🔘 Multiple choice`

In the learning rate decay video, what is one epoch?

- A. One mini-batch update
- B. One pass through the whole training set
- C. One halving of α
- D. One hyperparameter search

---

### Question 39 &nbsp; `☑️ Select all`

Which learning rate schedules are mentioned in the video?

- A. α₀ / (1 + decay_rate · epoch)
- B. Exponential decay such as 0.95^epoch · α₀
- C. Discrete staircase that repeatedly halves α
- D. Increasing α every epoch

---

### Question 40 &nbsp; `✅ True / False`

The instructor says learning rate decay is usually the first thing to try, before tuning a fixed α well.

---

## Week 3
*Hyperparameter tuning, batch norm and frameworks*

### Question 41 &nbsp; `🔘 Multiple choice`

Which hyperparameter is usually the most important to tune?

- A. The learning rate α
- B. Adam's ε
- C. Adam's β₂
- D. The number of layers, always

---

### Question 42 &nbsp; `✏️ Fill in`

Default Adam hyperparameters used in the video: β₁ = ____, β₂ = ____, ε = ____.

---

### Question 43 &nbsp; `✅ True / False`

In deep learning it is recommended to sample hyperparameter values at random rather than on a grid.

---

### Question 44 &nbsp; `💬 Short answer`

With 2 hyperparameters and 25 trials, why is random sampling better than a 5×5 grid?

---

### Question 45 &nbsp; `🔘 Multiple choice`

What is coarse-to-fine hyperparameter search?

- A. Using the largest learning rate first
- B. Sampling the whole range roughly, then zooming into the best region and sampling more densely there
- C. Searching only on a grid
- D. Tuning one hyperparameter at a time

---

### Question 46 &nbsp; `🔘 Multiple choice`

At test time, how are μ and σ² for batch norm usually obtained?

- A. From the single test example
- B. As an exponentially weighted average of the μ and σ² seen on the mini-batches during training
- C. Set to 0 and 1
- D. Recomputed on the whole test set

---

### Question 47 &nbsp; `✅ True / False`

At test time with a single example, batch norm should use the mean and variance of that one example.

---

### Question 48 &nbsp; `✏️ Fill in`

Batch norm computes z̃ = ____ · z_norm + ____, where both are learned parameters.

---

### Question 49 &nbsp; `🔘 Multiple choice`

A network classifies 4 classes with a softmax output layer. What is the shape of ŷ for one example?

- A. (1, 1)
- B. (4, 1)
- C. (1, 4) with values not summing to 1
- D. (3, 1)

---

### Question 50 &nbsp; `🧮 Calculation`

For z[L] = [5, 2, −1, 3], compute the softmax probability of the first class (3 decimals).

---

### Question 51 &nbsp; `✅ True / False`

Softmax is unusual among activations because it takes a vector as input and outputs a vector (probabilities summing to 1).

---

### Question 52 &nbsp; `🔘 Multiple choice`

In TensorFlow, which part of a training program must you implement yourself?

- A. Forward propagation (the cost computation); gradients are computed from the recorded operations with tf.GradientTape
- B. Backpropagation by hand
- C. The derivative of every layer
- D. Nothing; the cost is automatic

---

### Question 53 &nbsp; `🧮 Calculation`

You tune 3 hyperparameters with 125 trials. How many distinct values of the most important one do you try with a 5×5×5 grid versus with random sampling?

---

### Question 54 &nbsp; `☑️ Select all`

Which hyperparameters does the instructor tune next after the learning rate α?

- A. The momentum term β (0.9 is a good default)
- B. The mini-batch size
- C. The number of hidden units
- D. Adam's ε

---

### Question 55 &nbsp; `✅ True / False`

The instructor says he frequently tunes Adam's β₁, β₂ and ε.

---

### Question 56 &nbsp; `✏️ Fill in`

With C classes, the class indices in the softmax example run from 0 to ____.

---

### Question 57 &nbsp; `🧮 Calculation`

A softmax layer gets z[L] = [2, 2, 2, 2]. What probability does each class get?

---

### Question 58 &nbsp; `✅ True / False`

A softmax layer with no hidden layer can only separate classes with linear decision boundaries.

---

### Question 59 &nbsp; `✏️ Fill in`

In TensorFlow you only need to implement ____ propagation; the gradients are figured out from the recorded operations.

---

### Question 60 &nbsp; `🧮 Calculation`

In the TensorFlow video, x = [1, −10, 25] sets the coefficients of cost = x[0]·w² + x[1]·w + x[2]. What is the cost at w = 3?

---
