# 🔑 Course 3 — Answer Key
## Improving Deep Neural Networks — Answers with explanations

> 60 answers with the video each question comes from.

## Week 1
*Practical aspects of deep learning*

| # | Answer | Why | Video |
|---|---|---|---|
| 1 | **B** | With big data, dev and test sets only need to be large enough to compare models (e.g. 10,000 examples each = 1%). | Train/Dev/Test sets |
| 2 | **True** | The dev set is what you tune against, so it should match what the test set measures. Training data may differ (e.g. web images vs. user uploads). | Train/Dev/Test sets |
| 3 | **B** | The dev set is for choosing models; the test set is only for the final unbiased estimate. | Train/Dev/Test sets |
| 4 | **False** | You have fit your choices to the dev set, so it is no longer unbiased. That is fine only if you do not need an unbiased estimate. | Train/Dev/Test sets |
| 5 | **(1) high variance, (2) high bias, (3) high bias and high variance, (4) low bias and low variance** | Train error shows bias; the jump from train to dev error shows variance. | Bias / Variance |
| 6 | **0** | If Bayes error were 15%, a 15% train error would not mean high bias. | Bias / Variance |
| 7 | **λ / 2m** | λ is the regularization parameter, and ‖w‖² = Σ wⱼ² = wᵀw. | Regularization |
| 8 | **A** | L1 makes w sparse. In practice it is used less than L2. | Regularization |
| 9 | **0.99** | 1 − (0.1 × 10)/100 = 0.99, a number slightly below 1. This is why L2 is also called weight decay. | Regularization |
| 10 | **Treat it as a hyperparameter: try several values and pick the one that works best on the dev set.** | It trades off fitting the training set well against keeping the weights small. | Regularization |
| 11 | **About 20% of the activations are zeroed, so dividing by keep_prob keeps the expected value of a³ (and so of z⁴) unchanged.** | This also means you need no extra scaling at test time. | Dropout Regularization |
| 12 | **False** | Random dropping at test time only adds noise to the predictions. | Dropout Regularization |
| 13 | **A** | A keep_prob of 1.0 means no dropout for that layer. The downside is more hyperparameters to tune. | Understanding Dropout |
| 14 | **A, B, D** | C is false: with dropout, J is not well defined at each iteration. | Understanding Dropout |
| 15 | **J is no longer well defined on each iteration, so you cannot reliably plot it. Turn dropout off (keep_prob = 1), check that J decreases, then turn dropout back on.** |  | Understanding Dropout |
| 16 | **False** | Use the same μ and σ² computed on the training set so both sets go through the same transformation. | Normalizing Inputs |
| 17 | **B** | With features on very different scales (1–1000 vs. 0–1) the contours are elongated and gradient descent oscillates. | Normalizing Inputs |
| 18 | **1.22** | μ = 4, centered values are −2, 0, 2, σ² = 8/3 ≈ 2.67 and σ ≈ 1.63, so 2 / 1.63 ≈ 1.22. The result has mean 0 and variance 1. | Normalizing Inputs |
| 19 | **ε** | The result should approximately equal dθ[i] from backprop. | Gradient Checking |
| 20 | **C** | 10⁻⁷ or smaller is great, around 10⁻⁵ deserves a closer look, and 10⁻³ or larger is a likely bug. | Gradient Checking |

## Week 2
*Optimization algorithms*

| # | Answer | Why | Video |
|---|---|---|---|
| 21 | **dW²** | It is an exponentially weighted average of the squared derivatives. | RMSprop |
| 22 | **√S_dW** | RMS stands for root mean square. | RMSprop |
| 23 | **B** | In the steep direction S is large, so the step is divided by a large number, which damps the oscillation. | RMSprop |
| 24 | **True** | That slows the vertical oscillations, while the flatter direction is divided by a smaller number. | RMSprop |
| 25 | **For numerical stability: it avoids dividing by a number very close to zero.** | The exact value is not important. | RMSprop |
| 26 | **False** | It was first proposed in Geoff Hinton's Coursera course. | RMSprop |
| 27 | **B** | Early on, a large α allows fast learning; later, smaller steps help it settle. | Learning Rate Decay |
| 28 | **0.067** | 0.2 / (1 + 1·2) = 0.2 / 3 ≈ 0.067. In epoch 1 it is 0.1. | Learning Rate Decay |
| 29 | **(1) a, (2) b, (3) c, (4) d** | The decay rate and α₀ become extra hyperparameters to tune. | Learning Rate Decay |
| 30 | **True** | It is practical when one model takes hours or days to train. | Learning Rate Decay |
| 31 | **B** | The function is steeper along b, so db is large; squaring and averaging makes S_db large, while the horizontal direction keeps a small S_dW. | RMSprop |
| 32 | **S_dW = 0.4; update ≈ 0.032** | S_dW = 0.9·0 + 0.1·2² = 0.4. √0.4 ≈ 0.632, so 0.01 · 2 / 0.632 ≈ 0.032. | RMSprop |
| 33 | **A, B, C** | It still uses dW and db; it only rescales them. | RMSprop |
| 34 | **True** | The next video combines the two methods. | RMSprop |
| 35 | **The mini-batch steps are noisy, so with a fixed α the algorithm keeps wandering around the minimum without settling on it.** | Slowly reducing α lets it oscillate in a tighter region around the minimum. | Learning Rate Decay |
| 36 | **0.071** | 0.5 / (1 + 2·3) = 0.5 / 7 ≈ 0.071. | Learning Rate Decay |
| 37 | **0.0903** | 0.95² = 0.9025, so α = 0.09025 ≈ 0.0903. | Learning Rate Decay |
| 38 | **B** | The first pass is epoch 1, the second pass epoch 2, and so on. | Learning Rate Decay |
| 39 | **A, B, C** | Manual decay is also mentioned for models that train for days. | Learning Rate Decay |
| 40 | **False** | Tuning a fixed α well has a big effect; learning rate decay is usually lower on the list of things to try. | Learning Rate Decay |

## Week 3
*Hyperparameter tuning, batch norm and frameworks*

| # | Answer | Why | Video |
|---|---|---|---|
| 41 | **A** | Next come momentum β, the mini-batch size and the hidden units; the layers and learning rate decay come third. | Tuning Process |
| 42 | **0.9, 0.999, 10⁻⁸** | They are rarely tuned. | Tuning Process |
| 43 | **True** | You rarely know in advance which hyperparameters matter most. | Tuning Process |
| 44 | **A grid tries only 5 distinct values of each hyperparameter, while random sampling tries 25 distinct values of the important one (e.g. α).** |  | Tuning Process |
| 45 | **B** | Spend more resources where the good values are found. | Tuning Process |
| 46 | **B** | Any reasonable estimate works; frameworks have defaults. | Batch Norm at Test Time |
| 47 | **False** | A mean and variance of one example make no sense. | Batch Norm at Test Time |
| 48 | **γ, β** | z_norm = (z − μ) / √(σ² + ε). | Batch Norm at Test Time |
| 49 | **B** | ŷ has C = 4 probabilities that sum to 1. | Softmax Regression |
| 50 | **0.842** | t = eᶻ ≈ [148.4, 7.4, 0.37, 20.1], sum ≈ 176.3, and 148.4 / 176.3 ≈ 0.842. The full output is about [0.842, 0.042, 0.002, 0.114]. | Softmax Regression |
| 51 | **True** | Sigmoid or ReLU take one real number and return one real number. | Softmax Regression |
| 52 | **A** | GradientTape records the forward operations and replays them backward. For J(w) = w² − 10w + 25, w converges to 5. | TensorFlow |
| 53 | **Grid: 5; random: 125** | A grid repeats the same 5 values of each hyperparameter, while random sampling gives a new value on every trial. | Tuning Process |
| 54 | **A, B, C** | The number of layers and learning rate decay come next; Adam's β₁, β₂ and ε are almost never tuned. | Tuning Process |
| 55 | **False** | He just uses 0.9, 0.999 and 10⁻⁸. | Tuning Process |
| 56 | **C − 1** | With cat, dog, baby chick and 'none of the above' (class 0), C = 4 and the output layer has 4 units. | Softmax Regression |
| 57 | **0.25** | All four values of t = e^z are equal, so each is 1/4. The outputs always sum to 1. | Softmax Regression |
| 58 | **True** | It generalizes logistic regression to more than two classes; a deeper network can learn non-linear boundaries. | Softmax Regression |
| 59 | **forward** | tf.GradientTape records the operations, and the computation graph gives all the backward steps. | TensorFlow |
| 60 | **4** | 1·9 − 10·3 + 25 = 4. It is (w − 5)², and it equals 0 at w = 5. | TensorFlow |
