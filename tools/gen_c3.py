import os
from test_paths import course_test_dir

OUT = course_test_dir(3)
T = {"mc": "🔘 Multiple choice", "tf": "✅ True / False", "fill": "✏️ Fill in", "calc": "🧮 Calculation",
     "short": "💬 Short answer", "sel": "☑️ Select all", "match": "🔗 Matching"}

# (type, question, options or None, answer, explanation, source video)
W1 = [
 ("mc", "You have 1,000,000 labeled examples in total. Which train/dev/test split is most reasonable?",
  ["A. 60% / 20% / 20%", "B. 98% / 1% / 1%", "C. 50% / 25% / 25%", "D. 100% / 0% / 0%"],
  "B", "With big data, dev and test sets only need to be large enough to compare models (e.g. 10,000 examples each = 1%).", "Train/Dev/Test sets"),
 ("tf", "The dev set and the test set should come from the same distribution.", None,
  "True", "The dev set is what you tune against, so it should match what the test set measures. Training data may differ (e.g. web images vs. user uploads).", "Train/Dev/Test sets"),
 ("mc", "What is the main purpose of the test set?",
  ["A. To choose the best hyperparameters", "B. To give an unbiased estimate of the final model's performance", "C. To train the model faster", "D. To compute the regularization parameter"],
  "B", "The dev set is for choosing models; the test set is only for the final unbiased estimate.", "Train/Dev/Test sets"),
 ("tf", "If you only have a train set and a dev set, you still get an unbiased estimate of performance from the dev set.", None,
  "False", "You have fit your choices to the dev set, so it is no longer unbiased. That is fine only if you do not need an unbiased estimate.", "Train/Dev/Test sets"),
 ("match", "Match each (train error, dev error) pair to its diagnosis, assuming human error is about 0%: (1) 1% / 11%, (2) 15% / 16%, (3) 15% / 30%, (4) 0.5% / 1%. Options: high bias, high variance, high bias and high variance, low bias and low variance.", None,
  "(1) high variance, (2) high bias, (3) high bias and high variance, (4) low bias and low variance",
  "Train error shows bias; the jump from train to dev error shows variance.", "Bias / Variance"),
 ("fill", "The bias/variance diagnosis above assumes the optimal (Bayes) error is close to ____ %, and that train and dev sets come from the same distribution.", None,
  "0", "If Bayes error were 15%, a 15% train error would not mean high bias.", "Bias / Variance"),
 ("fill", "L2-regularized logistic regression adds the term ____ · ‖w‖² to the cost J.", None,
  "λ / 2m", "λ is the regularization parameter, and ‖w‖² = Σ wⱼ² = wᵀw.", "Regularization"),
 ("mc", "What is a typical effect of using L1 regularization?",
  ["A. w becomes sparse (many zeros)", "B. All weights become exactly equal", "C. b is forced to zero", "D. The model needs more memory"],
  "A", "L1 makes w sparse. In practice it is used less than L2.", "Regularization"),
 ("calc", "In gradient descent with L2 regularization, each step multiplies w by (1 − αλ/m) before subtracting the backprop gradient. Compute this factor for α = 0.1, λ = 10, m = 100.", None,
  "0.99", "1 − (0.1 × 10)/100 = 0.99, a number slightly below 1. This is why L2 is also called weight decay.", "Regularization"),
 ("short", "How do you choose the regularization parameter λ?", None,
  "Treat it as a hyperparameter: try several values and pick the one that works best on the dev set.", "It trades off fitting the training set well against keeping the weights small.", "Regularization"),
 ("short", "In inverted dropout with keep_prob = 0.8, why do you divide a³ by 0.8 after zeroing units?", None,
  "About 20% of the activations are zeroed, so dividing by keep_prob keeps the expected value of a³ (and so of z⁴) unchanged.", "This also means you need no extra scaling at test time.", "Dropout Regularization"),
 ("tf", "Dropout should be applied at test time, with units dropped at random, to make predictions more robust.", None,
  "False", "Random dropping at test time only adds noise to the predictions.", "Dropout Regularization"),
 ("mc", "Which layer should typically get a lower keep_prob?",
  ["A. The layer with the largest weight matrix (most prone to overfitting)", "B. The output layer, always", "C. Any layer, since keep_prob must be the same everywhere", "D. The layer with the fewest units"],
  "A", "A keep_prob of 1.0 means no dropout for that layer. The downside is more hyperparameters to tune.", "Understanding Dropout"),
 ("sel", "Which of these explain why dropout reduces overfitting?",
  ["A. Each iteration trains a smaller network", "B. A unit cannot rely on any single input, so it spreads its weights", "C. It makes the cost J easier to plot", "D. It shrinks the squared norm of the weights, like L2"],
  "A, B, D", "C is false: with dropout, J is not well defined at each iteration.", "Understanding Dropout"),
 ("short", "Why is it hard to debug gradient descent with dropout, and what is the usual workaround?", None,
  "J is no longer well defined on each iteration, so you cannot reliably plot it. Turn dropout off (keep_prob = 1), check that J decreases, then turn dropout back on.", "", "Understanding Dropout"),
 ("tf", "When normalizing inputs, the test set should be normalized with its own mean and variance, computed separately from the training set.", None,
  "False", "Use the same μ and σ² computed on the training set so both sets go through the same transformation.", "Normalizing Inputs"),
 ("mc", "Why does normalizing input features speed up training?",
  ["A. It removes the need for a learning rate", "B. It makes the cost function contours more symmetric, so gradient descent can take larger steps", "C. It reduces the number of parameters", "D. It guarantees zero training error"],
  "B", "With features on very different scales (1–1000 vs. 0–1) the contours are elongated and gradient descent oscillates.", "Normalizing Inputs"),
 ("calc", "One input feature has training values 2, 4 and 6. After the two normalization steps (subtract the mean, then divide by σ, where σ² = mean of squares), what is the normalized value of 6 (2 decimals)?", None,
  "1.22", "μ = 4, centered values are −2, 0, 2, σ² = 8/3 ≈ 2.67 and σ ≈ 1.63, so 2 / 1.63 ≈ 1.22. The result has mean 0 and variance 1.", "Normalizing Inputs"),
 ("fill", "Two-sided gradient check: dθ_approx[i] = (J(θ + ____) − J(θ − ____)) / (2 · ____).", None,
  "ε", "The result should approximately equal dθ[i] from backprop.", "Gradient Checking"),
 ("mc", "With ε = 10⁻⁷, which relative difference ‖dθ_approx − dθ‖ / (‖dθ_approx‖ + ‖dθ‖) should make you suspect a bug in backprop?",
  ["A. 10⁻⁷", "B. 10⁻⁹", "C. 10⁻³ or larger", "D. 0"],
  "C", "10⁻⁷ or smaller is great, around 10⁻⁵ deserves a closer look, and 10⁻³ or larger is a likely bug.", "Gradient Checking"),
]

W2 = [
 ("fill", "RMSprop keeps S_dW = β·S_dW + (1 − β)·____ (element-wise).", None,
  "dW²", "It is an exponentially weighted average of the squared derivatives.", "RMSprop"),
 ("fill", "RMSprop updates W := W − α · dW / (____ + ε).", None,
  "√S_dW", "RMS stands for root mean square.", "RMSprop"),
 ("mc", "What does RMSprop aim to do?",
  ["A. Speed up learning in directions with large oscillations", "B. Damp oscillations in directions with large gradients and allow a larger learning rate", "C. Replace the loss function", "D. Increase the batch size automatically"],
  "B", "In the steep direction S is large, so the step is divided by a large number, which damps the oscillation.", "RMSprop"),
 ("tf", "In RMSprop, the direction with larger derivatives has a larger S, so its updates are divided by a larger number.", None,
  "True", "That slows the vertical oscillations, while the flatter direction is divided by a smaller number.", "RMSprop"),
 ("short", "Why is a tiny ε (about 10⁻⁸) added to the denominator?", None,
  "For numerical stability: it avoids dividing by a number very close to zero.", "The exact value is not important.", "RMSprop"),
 ("tf", "RMSprop was first published in a peer-reviewed academic paper.", None,
  "False", "It was first proposed in Geoff Hinton's Coursera course.", "RMSprop"),
 ("mc", "Why decay the learning rate over time when using mini-batch gradient descent?",
  ["A. To make the first steps smaller", "B. With a fixed α the mini-batch noise keeps it wandering around the minimum, while a smaller α later keeps it in a tighter region", "C. To avoid using epochs", "D. To remove the need for mini-batches"],
  "B", "Early on, a large α allows fast learning; later, smaller steps help it settle.", "Learning Rate Decay"),
 ("calc", "With α = α₀ / (1 + decay_rate · epoch_num), α₀ = 0.2 and decay_rate = 1, what is α in epoch 2 (3 decimals)?", None,
  "0.067", "0.2 / (1 + 1·2) = 0.2 / 3 ≈ 0.067. In epoch 1 it is 0.1.", "Learning Rate Decay"),
 ("match", "Match each schedule to its formula (α₀ is the initial rate): (1) exponential decay, (2) 1/(1 + decay_rate·epoch) decay, (3) discrete staircase, (4) k/√epoch decay. Formulas: (a) 0.95^epoch · α₀, (b) α₀ / (1 + decay_rate·epoch), (c) halve α after a fixed number of steps, (d) k/√epoch · α₀.", None,
  "(1) a, (2) b, (3) c, (4) d", "The decay rate and α₀ become extra hyperparameters to tune.", "Learning Rate Decay"),
 ("tf", "Manually adjusting the learning rate while a model trains only works when you are training a small number of models.", None,
  "True", "It is practical when one model takes hours or days to train.", "Learning Rate Decay"),
 ("mc", "In the RMSprop example, the vertical direction (parameter b) oscillates strongly. How do S_db and S_dW compare, and why does that help?",
  ["A. S_db is small and S_dW is large, so the vertical step grows", "B. S_db is relatively large and S_dW relatively small, so the vertical update is divided by a bigger number and damped", "C. They are always equal", "D. Both are zero at the start, so nothing is updated"],
  "B", "The function is steeper along b, so db is large; squaring and averaging makes S_db large, while the horizontal direction keeps a small S_dW.", "RMSprop"),
 ("calc", "RMSprop with β = 0.9, previous S_dW = 0 and current dW = 2. Compute S_dW, then the update size α · dW / √S_dW for α = 0.01 (ignore ε, 3 decimals).", None,
  "S_dW = 0.4; update ≈ 0.032", "S_dW = 0.9·0 + 0.1·2² = 0.4. √0.4 ≈ 0.632, so 0.01 · 2 / 0.632 ≈ 0.032.", "RMSprop"),
 ("sel", "Which are effects of RMSprop, as described in the video?",
  ["A. It reduces oscillations in the dimensions where they occur", "B. It lets you use a larger learning rate α", "C. It speeds up learning without diverging in the vertical direction", "D. It removes the need for derivatives"],
  "A, B, C", "It still uses dW and db; it only rescales them.", "RMSprop"),
 ("tf", "When RMSprop is later combined with momentum, its hyperparameter is named β₂ so it does not clash with the β used in momentum.", None,
  "True", "The next video combines the two methods.", "RMSprop"),
 ("short", "With mini-batches of 64 to 128 examples and a fixed α, why might gradient descent never converge exactly?", None,
  "The mini-batch steps are noisy, so with a fixed α the algorithm keeps wandering around the minimum without settling on it.", "Slowly reducing α lets it oscillate in a tighter region around the minimum.", "Learning Rate Decay"),
 ("calc", "With α = α₀ / (1 + decay_rate · epoch_num), α₀ = 0.5 and decay_rate = 2, what is α in epoch 3 (3 decimals)?", None,
  "0.071", "0.5 / (1 + 2·3) = 0.5 / 7 ≈ 0.071.", "Learning Rate Decay"),
 ("calc", "With exponential decay α = 0.95^epoch_num · α₀ and α₀ = 0.1, what is α in epoch 2 (4 decimals)?", None,
  "0.0903", "0.95² = 0.9025, so α = 0.09025 ≈ 0.0903.", "Learning Rate Decay"),
 ("mc", "In the learning rate decay video, what is one epoch?",
  ["A. One mini-batch update", "B. One pass through the whole training set", "C. One halving of α", "D. One hyperparameter search"],
  "B", "The first pass is epoch 1, the second pass epoch 2, and so on.", "Learning Rate Decay"),
 ("sel", "Which learning rate schedules are mentioned in the video?",
  ["A. α₀ / (1 + decay_rate · epoch)", "B. Exponential decay such as 0.95^epoch · α₀", "C. Discrete staircase that repeatedly halves α", "D. Increasing α every epoch"],
  "A, B, C", "Manual decay is also mentioned for models that train for days.", "Learning Rate Decay"),
 ("tf", "The instructor says learning rate decay is usually the first thing to try, before tuning a fixed α well.", None,
  "False", "Tuning a fixed α well has a big effect; learning rate decay is usually lower on the list of things to try.", "Learning Rate Decay"),
]

W3 = [
 ("mc", "Which hyperparameter is usually the most important to tune?",
  ["A. The learning rate α", "B. Adam's ε", "C. Adam's β₂", "D. The number of layers, always"],
  "A", "Next come momentum β, the mini-batch size and the hidden units; the layers and learning rate decay come third.", "Tuning Process"),
 ("fill", "Default Adam hyperparameters used in the video: β₁ = ____, β₂ = ____, ε = ____.", None,
  "0.9, 0.999, 10⁻⁸", "They are rarely tuned.", "Tuning Process"),
 ("tf", "In deep learning it is recommended to sample hyperparameter values at random rather than on a grid.", None,
  "True", "You rarely know in advance which hyperparameters matter most.", "Tuning Process"),
 ("short", "With 2 hyperparameters and 25 trials, why is random sampling better than a 5×5 grid?", None,
  "A grid tries only 5 distinct values of each hyperparameter, while random sampling tries 25 distinct values of the important one (e.g. α).", "", "Tuning Process"),
 ("mc", "What is coarse-to-fine hyperparameter search?",
  ["A. Using the largest learning rate first", "B. Sampling the whole range roughly, then zooming into the best region and sampling more densely there", "C. Searching only on a grid", "D. Tuning one hyperparameter at a time"],
  "B", "Spend more resources where the good values are found.", "Tuning Process"),
 ("mc", "At test time, how are μ and σ² for batch norm usually obtained?",
  ["A. From the single test example", "B. As an exponentially weighted average of the μ and σ² seen on the mini-batches during training", "C. Set to 0 and 1", "D. Recomputed on the whole test set"],
  "B", "Any reasonable estimate works; frameworks have defaults.", "Batch Norm at Test Time"),
 ("tf", "At test time with a single example, batch norm should use the mean and variance of that one example.", None,
  "False", "A mean and variance of one example make no sense.", "Batch Norm at Test Time"),
 ("fill", "Batch norm computes z̃ = ____ · z_norm + ____, where both are learned parameters.", None,
  "γ, β", "z_norm = (z − μ) / √(σ² + ε).", "Batch Norm at Test Time"),
 ("mc", "A network classifies 4 classes with a softmax output layer. What is the shape of ŷ for one example?",
  ["A. (1, 1)", "B. (4, 1)", "C. (1, 4) with values not summing to 1", "D. (3, 1)"],
  "B", "ŷ has C = 4 probabilities that sum to 1.", "Softmax Regression"),
 ("calc", "For z[L] = [5, 2, −1, 3], compute the softmax probability of the first class (3 decimals).", None,
  "0.842", "t = eᶻ ≈ [148.4, 7.4, 0.37, 20.1], sum ≈ 176.3, and 148.4 / 176.3 ≈ 0.842. The full output is about [0.842, 0.042, 0.002, 0.114].", "Softmax Regression"),
 ("tf", "Softmax is unusual among activations because it takes a vector as input and outputs a vector (probabilities summing to 1).", None,
  "True", "Sigmoid or ReLU take one real number and return one real number.", "Softmax Regression"),
 ("mc", "In TensorFlow, which part of a training program must you implement yourself?",
  ["A. Forward propagation (the cost computation); gradients are computed from the recorded operations with tf.GradientTape", "B. Backpropagation by hand", "C. The derivative of every layer", "D. Nothing; the cost is automatic"],
  "A", "GradientTape records the forward operations and replays them backward. For J(w) = w² − 10w + 25, w converges to 5.", "TensorFlow"),
 ("calc", "You tune 3 hyperparameters with 125 trials. How many distinct values of the most important one do you try with a 5×5×5 grid versus with random sampling?", None,
  "Grid: 5; random: 125", "A grid repeats the same 5 values of each hyperparameter, while random sampling gives a new value on every trial.", "Tuning Process"),
 ("sel", "Which hyperparameters does the instructor tune next after the learning rate α?",
  ["A. The momentum term β (0.9 is a good default)", "B. The mini-batch size", "C. The number of hidden units", "D. Adam's ε"],
  "A, B, C", "The number of layers and learning rate decay come next; Adam's β₁, β₂ and ε are almost never tuned.", "Tuning Process"),
 ("tf", "The instructor says he frequently tunes Adam's β₁, β₂ and ε.", None,
  "False", "He just uses 0.9, 0.999 and 10⁻⁸.", "Tuning Process"),
 ("fill", "With C classes, the class indices in the softmax example run from 0 to ____.", None,
  "C − 1", "With cat, dog, baby chick and 'none of the above' (class 0), C = 4 and the output layer has 4 units.", "Softmax Regression"),
 ("calc", "A softmax layer gets z[L] = [2, 2, 2, 2]. What probability does each class get?", None,
  "0.25", "All four values of t = e^z are equal, so each is 1/4. The outputs always sum to 1.", "Softmax Regression"),
 ("tf", "A softmax layer with no hidden layer can only separate classes with linear decision boundaries.", None,
  "True", "It generalizes logistic regression to more than two classes; a deeper network can learn non-linear boundaries.", "Softmax Regression"),
 ("fill", "In TensorFlow you only need to implement ____ propagation; the gradients are figured out from the recorded operations.", None,
  "forward", "tf.GradientTape records the operations, and the computation graph gives all the backward steps.", "TensorFlow"),
 ("calc", "In the TensorFlow video, x = [1, −10, 25] sets the coefficients of cost = x[0]·w² + x[1]·w + x[2]. What is the cost at w = 3?", None,
  "4", "1·9 − 10·3 + 25 = 4. It is (w − 5)², and it equals 0 at w = 5.", "TensorFlow"),
]

WEEKS = [("Week 1", "Practical aspects of deep learning", W1),
         ("Week 2", "Optimization algorithms", W2),
         ("Week 3", "Hyperparameter tuning, batch norm and frameworks", W3)]

tests = ["# 📘 Deep Learning Specialization — Course 3",
         "## Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization — Chapter Tests", ""]
total = sum(len(w[2]) for w in WEEKS)
tests += [f"> **{total} questions** across 3 weeks, based only on the lecture videos. Answers are in the separate answer key file.", ""]
tests += ["| Week | Topic | Questions |", "|---|---|---|"]
n = 0
for wk, topic, qs in WEEKS:
    tests.append(f"| [{wk}](#{wk.lower().replace(' ', '-')}) | {topic} | {n + 1}–{n + len(qs)} |")
    n += len(qs)
tests += ["", "**Question types:** " + " · ".join(T.values()), "", "---", ""]

answers = ["# 🔑 Course 3 — Answer Key",
           "## Improving Deep Neural Networks — Answers with explanations", "",
           f"> {total} answers with the video each question comes from.", ""]
n = 0
for wk, topic, qs in WEEKS:
    tests += [f"## {wk}", f"*{topic}*", ""]
    answers += [f"## {wk}", f"*{topic}*", "", "| # | Answer | Why | Video |", "|---|---|---|---|"]
    for t, q, opts, a, why, src in qs:
        n += 1
        tests += [f"### Question {n} &nbsp; `{T[t]}`", "", q, ""]
        if opts:
            tests += [f"- {o}" for o in opts] + [""]
        tests += ["---", ""]
        answers.append(f"| {n} | **{a.replace('|', '/')}** | {why.replace('|', '/')} | {src} |")
    answers.append("")

open(os.path.join(OUT, "MLS_Course_3_Chapter_Tests_EN.md"), "w", encoding="utf-8").write("\n".join(tests).rstrip() + "\n")
open(os.path.join(OUT, "MLS_Course_3_Chapter_Test_Answers_EN.md"), "w", encoding="utf-8").write("\n".join(answers).rstrip() + "\n")
print(total)
