# 🔑 Machine Learning Specialization — Course 2 — Answer Key
## Advanced Learning Algorithms

> 58 answers · open after you finish the test.

## Chapter 1 — Neural Networks

| # | Answer | Explanation |
|---|---|---|
| 1 | B — To introduce nonlinearity |  |
| 2 | False |  |
| 3 | `w · x + b` |  |
| 4 | A — ReLU |  |
| 5 | `9` |  |
| 6 | A — A sigmoid activation |  |
| 7 | True |  |
| 8 | Hidden layers transform raw inputs into progressively useful features or representations. |  |
| 9 | A — Number of training examples |  |
| 10 | The model estimates a 92% probability of the positive class; using a 0.5 threshold, predict positive. |  |

## Chapter 2 — Neural Network Training

| # | Answer | Explanation |
|---|---|---|
| 11 | A — To measure how poorly predictions match targets |  |
| 12 | True |  |
| 13 | `α`, `∂J/∂w` |  |
| 14 | `4.8` |  |
| 15 | A — Gradients of the loss with respect to parameters |  |
| 16 | A — Binary cross-entropy |  |
| 17 | A — Speeds up numerical computation using matrix operations |  |
| 18 | Tune the learning rate α (a hyperparameter), check the gradient/implementation, and check the loss and labels. |  |

## Week 1 — Introduction to Deep Learning

| # | Answer | Explanation |
|---|---|---|
| 19 | A — ReLU, i.e. `max(0, wx + b)` |  |
| 20 | False |  |
| 21 | (1) Standard NN, (2) CNN, (3) RNN, (4) custom/hybrid |  |
| 22 | A, B, C |  |
| 23 | Sigmoid has near-zero slope for large \|z\|, so gradients vanish and learning is slow; ReLU has slope 1 for positive z, so gradient descent is much faster. |  |
| 24 | False |  |
| 25 | large |  |
| 26 | B — An audio clip |  |
| 27 | Faster computation shortens the idea → code → experiment cycle, so you can try more ideas. |  |
| 28 | A — Online advertising: ad and user info → click (0/1) |  |

## Week 2 — Neural Network Basics (Logistic Regression)

| # | Answer | Explanation |
|---|---|---|
| 29 | `0.5` |  |
| 30 | B — `(n_x, m)` |  |
| 31 | True |  |
| 32 | `-ln(0.8) ≈ 0.223` |  |
| 33 | `a - y` |  |
| 34 | `2a = 6` |  |
| 35 | `J = 3(5 + 6) = 33`, `dJ/da = 3` |  |
| 36 | B — `(2, 3)` |  |
| 37 | B — Use `a.reshape((5, 1))` or create it as `randn(5, 1)`, and check shapes with `assert` |  |
| 38 | True |  |

## Week 3 — Shallow Neural Networks

| # | Answer | Explanation |
|---|---|---|
| 39 | B — `(4, 3)` |  |
| 40 | `(4, 100)` |  |
| 41 | True |  |
| 42 | A — tanh |  |
| 43 | `0.8 × 0.2 = 0.16` |  |
| 44 | `a[2] = W[2](W[1]x + b[1]) + b[2] = (W[2]W[1])x + (W[2]b[1] + b[2]) = W'x + b'`, which is a single linear layer. |  |
| 45 | B — All hidden units in a layer compute the same function and get the same updates (symmetry) |  |
| 46 | `0.01` |  |
| 47 | A — The output layer |  |
| 48 | `A[2] - Y` |  |

## Week 4 — Deep Neural Networks

| # | Answer | Explanation |
|---|---|---|
| 49 | B — `(n[l], n[l-1])` |  |
| 50 | `(3, 5)` |  |
| 51 | True |  |
| 52 | A — `Z[l]` (together with `W[l]`, `b[l]`) |  |
| 53 | `W[l]ᵀ` |  |
| 54 | A shallow network needs exponentially many units (about `2^(n-1)`) for functions like XOR of `n` inputs, while a deep tree of depth `O(log n)` needs only `O(n)` units. |  |
| 55 | A, B, C |  |
| 56 | True |  |
| 57 | A — `(n[l], m)` |  |
| 58 | Neurons are far more complex than a logistic unit, and neuroscience does not know how the brain learns or whether it does anything like backpropagation. |  |
