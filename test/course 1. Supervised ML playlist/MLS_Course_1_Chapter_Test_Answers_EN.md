# 🔑 Course 1 — Answer Key
## Supervised Machine Learning: Regression and Classification

> 68 answers with the lesson each question comes from.

## Week 1
*Introduction to machine learning, linear regression and gradient descent*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 1 | **A** | Samuel's checkers program learned by playing tens of thousands of games against itself, although he was not a good player himself. | 1.3 What is machine learning |
| 2 | **A** | Supervised learning is the type used most in real-world applications and has seen the most rapid advancement. | 1.3 What is machine learning |
| 3 | **True** | The instructor estimates about 99% of the economic value comes from supervised learning. | 1.4 Supervised learning (part 1) |
| 4 | **B** | You give the algorithm examples with the right answers (labels), and it learns to map x to y. | 1.4 Supervised learning (part 1) |
| 5 | **B** | Regression predicts a number from infinitely many possible outputs. | 1.5 Supervised learning (part 2) |
| 6 | **A** | Classification predicts a small number of categories; here the two classes are benign (0) and malignant (1). | 1.5 Supervised learning (part 2) |
| 7 | **Regression predicts a number out of infinitely many possible values (e.g. a house price); classification predicts a small, finite set of categories (e.g. benign or malignant).** |  | 1.5 Supervised learning (part 2) |
| 8 | **A, B, C** | Unsupervised learning finds structure in data that comes only with inputs x and no output labels y. | 1.7 Unsupervised learning |
| 9 | **False** | In unsupervised learning the data has only inputs x; the algorithm must find structure or patterns on its own. | 1.7 Unsupervised learning |
| 10 | **A** | The optional labs in the course run in Jupyter notebooks. | 1.8 Jupyter Notebooks |
| 11 | **training examples** | Each row of the table is one training example. | 1.9 Linear regression model (part 1) |
| 12 | **(1) c, (2) d, (3) a, (4) b** | ŷ ('y hat') is the estimate or prediction for y. | 1.10 Linear regression model (part 2) |
| 13 | **A** | f used to be called a hypothesis; it is the model produced by the learning algorithm. | 1.10 Linear regression model (part 2) |
| 14 | **w·x + b** | w and b are the parameters (weights); choosing them defines which straight line you fit to the data. | 1.10 Linear regression model (part 2) |
| 15 | **7** | ŷ = wx + b = 2·3 + 1 = 7. | 1.10 Linear regression model (part 2) |
| 16 | **1.25** | Errors: 1 − 2 = −1 and 2 − 4 = −2; squares 1 + 4 = 5; J = 5 / (2·2) = 1.25. | 1.11 Cost function formula |
| 17 | **A** | The mean squared error is comparable across training sets of different sizes; the extra 2 in 1/(2m) just makes the later derivative neater. | 1.11 Cost function formula |
| 18 | **A** | A small cost means the line fits the training data well. | 1.12 Cost function intuition |
| 19 | **A** | The center of the ovals is the minimum of J. | 1.13 Visualizing the cost function |
| 20 | **α (the learning rate)** | Compute both new values first, then assign them. | 1.16 Implementing gradient descent |
| 21 | **1.6** | w := 2 − 0.1·4 = 1.6. | 1.16 Implementing gradient descent |
| 22 | **A** | If α is too small, gradient descent works but is very slow. | 1.18 Learning rate |
| 23 | **True** | Near a local minimum the derivative becomes smaller, so the update steps become smaller even though α is fixed. | 1.18 Learning rate |
| 24 | **True** | 'Batch' means each step considers all training examples rather than a subset. | 1.20 Running gradient descent |

## Week 2
*Multiple linear regression, scaling and feature engineering*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 25 | **dot** | w·x = w1x1 + w2x2 + … + wnxn. | 2.21 Multiple features |
| 26 | **7** | 2·3 + (−1)·4 + 5 = 6 − 4 + 5 = 7. | 2.21 Multiple features |
| 27 | **A, B, C** | NumPy's np.dot is vectorized and can use parallel hardware, unlike a for loop. | 2.22 Vectorization (part 1) |
| 28 | **The vectorized implementation uses specialized parallel hardware: the multiplications are carried out at the same time rather than one after another, which matters for large n or large training sets.** |  | 2.23 Vectorization (part 2) |
| 29 | **[1.6, −0.4]** | w1 = 2 − 0.1·4 = 1.6; w2 = −1 − 0.1·(−6) = −0.4. | 2.24 Gradient descent for multiple regression |
| 30 | **A** | Rescaling makes the contours more circular so that gradient descent can take a more direct path to the minimum. | 2.25 Feature scaling (part 1) |
| 31 | **0.5** | 1000 / 2000 = 0.5. (300 would scale to 0.15.) | 2.26 Feature scaling (part 2) |
| 32 | **0.235** | (1000 − 600) / (2000 − 300) = 400 / 1700 ≈ 0.235. | 2.26 Feature scaling (part 2) |
| 33 | **2** | (x − μ) / σ = (1000 − 600) / 200 = 2. | 2.26 Feature scaling (part 2) |
| 34 | **A** | Features like −100 to 100 or −0.001 to 0.001 are too large or too small and should be rescaled. | 2.26 Feature scaling (part 2) |
| 35 | **A** | If J ever increases, α is too large or there is a bug in the code. | 2.27 Checking convergence |
| 36 | **0.001 (10⁻³)** | Choosing the right threshold is hard, so the lecture prefers looking at the learning curve. | 2.27 Checking convergence |
| 37 | **A** | Run for a few iterations each, plot J, and pick the largest α that still decreases J rapidly and consistently. | 2.28 Choosing the learning rate |
| 38 | **Use a smaller α (and check the code for bugs). With a small enough α, J should decrease on every iteration.** |  | 2.28 Choosing the learning rate |
| 39 | **A** | Example: replace house frontage and depth by their product, the area. | 2.29 Feature engineering |
| 40 | **1,500 m²** | 30 × 50 = 1500. A feature like area may predict price better than frontage and depth separately. | 2.29 Feature engineering |
| 41 | **A, B, C, D** | Polynomial regression can use squares, cubes, roots, etc.; with such features, feature scaling becomes very important. | 2.30 Polynomial regression |
| 42 | **True** | If x ranges from 1 to 1000, x² goes up to 10⁶ and x³ up to 10⁹. | 2.30 Polynomial regression |
| 43 | **A** | Each w_j is updated with its own partial derivative. | 2.24 Gradient descent for multiple regression |
| 44 | **NumPy vector operations compute all w_j updates at once (w = w − α·gradient vector), which is shorter and faster than updating each w_j in a loop.** |  | 2.24 Gradient descent for multiple regression |
| 45 | **False** | The course uses gradient descent; the normal equation is only a limited alternative for linear regression and does not generalize to other algorithms. | 2.24 Gradient descent for multiple regression |

## Week 3
*Classification, logistic regression and regularization*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 46 | **A** | 0 is often called the negative class and 1 the positive class (not 'bad' or 'good'). | 3.31 Classification motivation |
| 47 | **A new training example far from the others can shift the fitted line and its 0.5 threshold, giving a worse decision boundary; its outputs can also be below 0 or above 1.** | Logistic regression solves this. | 3.31 Classification motivation |
| 48 | **z** | It outputs values between 0 and 1. | 3.32 Logistic regression |
| 49 | **0.5** | g(0) = 1 / (1 + e⁰) = 1 / 2. | 3.32 Logistic regression |
| 50 | **A** | If the output is 0.7, there is a 70% chance that y is 1, and 30% that y is 0. | 3.32 Logistic regression |
| 51 | **0.3** | P(y=0) = 1 − P(y=1) = 1 − 0.7. | 3.32 Logistic regression |
| 52 | **A** | f ≥ 0.5 is equivalent to z = w·x + b ≥ 0. | 3.33 Decision boundary |
| 53 | **0** | That is where the model is neutral between predicting 0 and 1. | 3.33 Decision boundary |
| 54 | **1** | z = 2 + 2 − 3 = 1 ≥ 0, so ŷ = 1. The boundary is the line x1 + x2 = 3. | 3.33 Decision boundary |
| 55 | **True** | For example, features x1² and x2² give a boundary like x1² + x2² = 1. | 3.33 Decision boundary |
| 56 | **A** | A different loss function makes the cost convex, so gradient descent can reach the global minimum. | 3.34 Cost function for logistic regression |
| 57 | **1 − f** | Each loss is large when the prediction is confidently wrong. | 3.34 Cost function for logistic regression |
| 58 | **0.223** | −ln(0.8) ≈ 0.223. | 3.34 Cost function for logistic regression |
| 59 | **The loss −log(f) goes to infinity, so a confident wrong prediction is penalized very heavily.** | When f is close to 1 the loss is near 0. | 3.34 Cost function for logistic regression |
| 60 | **1 − f** | For y = 1 only the first term remains; for y = 0 only the second. | 3.35 Simplified cost function |
| 61 | **A** | Same-looking update rule, different definition of f. | 3.36 Gradient descent for logistic regression |
| 62 | **(1) b, (2) c, (3) a** | 'Just right' is generalization. | 3.37 The problem of overfitting |
| 63 | **A, B, C** | More data is the first tool; regularization reduces the size of the parameters. | 3.38 Addressing overfitting |
| 64 | **5** | λ/(2m) = 10/10 = 1, and Σ w_j² = 1 + 4 = 5, so the term is 5. | 3.39 Cost function with regularization |
| 65 | **Very large λ: all w_j are driven near 0, so the model is nearly flat (f ≈ b) and underfits. λ = 0: no regularization, so the model may overfit.** |  | 3.39 Cost function with regularization |
| 66 | **True** | Regularizing b makes very little difference in practice. | 3.39 Cost function with regularization |
| 67 | **0.99** | 1 − (0.1·10)/100 = 0.99: w_j shrinks slightly on every iteration before the usual gradient step. | 3.40 Regularized linear regression |
| 68 | **A** | The extra term is added only to the w_j derivatives, not b. | 3.41 Regularized logistic regression |
