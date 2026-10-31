# Chapter Tests — Machine Learning Specialization, Course 1

57 questions; no answers included. Use the separate answer key only after finishing.

## Chapter 1 — Course Foundations

1. Supervised learning: A. finds unlabeled clusters; B. learns x → y; C. increases features; D. removes noise.
2. Forecasting tomorrow's electricity usage is: A. regression; B. classification; C. clustering; D. ranking.
3. Spam/not-spam detection is: A. regression; B. binary classification; C. clustering; D. PCA.
4. Unsupervised learning differs because it: A. has no input; B. has no label y; C. has no features; D. has no algorithm.
5. In (x,y), x is: A. loss; B. feature/input; C. prediction; D. learning rate.
6. A monetary price target is: A. continuous; B. discrete; C. unlabeled; D. necessarily Boolean.
7. Finding customer groups from unlabeled behavior is: A. regression; B. supervised learning; C. clustering; D. test splitting.
8. Prediction on unseen data primarily measures: A. coding speed; B. generalization; C. number of charts; D. training score alone.
9. True/False: Low training error guarantees low test error.
10. True/False: Classification may have more than two classes.
11. A heart-disease dataset has age, blood pressure, and a disease/no-disease label. Identify x, y, and the task type.
12. Give one e-commerce use case for regression and one for unsupervised learning.

## Chapter 2 — Linear Regression, Cost, and Gradient Descent

1. One-feature linear regression is: A. wx+b; B. 1/(1+e^-z); C. x²; D. λw².
2. In ŷ=wx+b, w is: A. intercept; B. slope/effect of x; C. sample count; D. learning rate.
3. b is: A. bias/intercept; B. batch size; C. boundary; D. Boolean.
4. MSE penalizes most strongly: A. small errors; B. large errors; C. x=0; D. discrete labels.
5. In J=(1/(2m))Σ(ŷ-y)², m is: A. feature count; B. training-example count; C. iteration count; D. class count.
6. Gradient descent aims to: A. increase J; B. reduce J; C. remove b; D. cluster data.
7. A learning rate that is too large can: A. guarantee convergence; B. oscillate/diverge; C. scale features automatically; D. reduce samples.
8. A learning rate that is too small usually makes: A. training slow; B. immediate overfitting; C. outputs outside [0,1]; D. labels disappear.
9. Fill in: w := w - ______ × ∂J/∂w.
10. True/False: Updating b using the newly updated w is standard batch gradient descent.
11. For w=2,b=1,x=3,y=8, calculate ŷ, the residual, and squared error.
12. Two samples have squared errors 4 and 16. Calculate J=(1/(2m))Σ error².
13. Given w=2, α=0.1, and ∂J/∂w=4, calculate the updated w.
14. If a cost-versus-iteration plot oscillates and grows, identify the likely cause and one remedy.

## Chapter 3 — Multiple Linear Regression and Feature Engineering

1. A multiple-feature model is: A. wᵀx+b; B. w/x; C. xᵀx; D. sigmoid(x).
2. If X has shape (m,n), m is: A. number of features; B. number of examples; C. number of classes; D. learning rate.
3. Vectorization favors: A. NumPy matrix/vector operations; B. nested Python loops; C. manual predictions; D. deleting matrices.
4. Scaling is needed because: A. it changes labels; B. differently scaled features can slow gradient descent; C. it increases m; D. it avoids NumPy.
5. Z-score normalization is: A. (x-μ)/σ; B. x²; C. x/λ; D. e^x.
6. Feature engineering means: A. creating/selecting useful inputs; B. deleting target values; C. only drawing plots; D. replacing models with labels.
7. Adding x²,x³ creates: A. polynomial features; B. a data split; C. binary encoding; D. clustering.
8. A scaler should be fit on: A. all data; B. the training set; C. the test set; D. each test sample.
9. True/False: Polynomial regression is still linear in its parameters w.
10. True/False: Features ranging 0–1 and 0–1,000,000 generally do not need scaling for gradient descent.
11. A house has frontage and depth. Propose one engineered feature and explain why it helps.
12. For w=[2,-1],x=[3,4],b=5, calculate wᵀx+b.
13. If one feature ranges 0–1 and another 0–1,000,000, explain the effect on gradient descent and state one remedy.
14. Given w=[2,-1], α=0.1, and gradient=[4,-6], calculate the updated weight vector.

## Chapter 4 — Logistic Regression and Regularization

1. Logistic regression models: A. probability of class 1; B. unbounded real values only; C. clusters; D. PCA.
2. The sigmoid is: A. 1/(1+e^-z); B. z²; C. wᵀx+b; D. λz.
3. With threshold 0.5 and ŷ=0.72, predict: A. 0; B. 1; C. 0.72; D. undefined.
4. The basic decision boundary is: A. wᵀx+b=0; B. J=0; C. λ=0; D. x=0.
5. Cross-entropy penalizes most strongly when: A. a prediction is confidently wrong; B. it is correct; C. w=0; D. there is one feature.
6. Overfitting commonly has: A. low train error/high test error; B. high train/high test error; C. both zero; D. no training data.
7. L2 regularization mainly penalizes: A. w_j²; B. sample count; C. labels; D. split ratio.
8. Excessively large λ may cause: A. underfitting; B. guaranteed improvement; C. no effect; D. more data.
9. Fill in: L(ŷ,y)=-[y log(____)+(1-y)log(1-____)].
10. True/False: In the standard Course 1 formulation, the bias term b is excluded from the regularization penalty.
11. A model has 99% training accuracy and 66% validation accuracy. Diagnose it and give two actions.
12. ŷ=0.12, threshold 0.5, true label 1: what class is predicted, and is it good or bad under cross-entropy?
13. If y=1 and ŷ=0.8, calculate the logistic loss -log(ŷ), approximately.
14. Complete the regularized cost: J_reg=J + ______ Σ w_j². Why is b usually omitted?
15. Which dataset should be used to select λ or model complexity? A. training; B. validation/development; C. test; D. unlabeled.
16. A fraud detector has 99% accuracy but misses most fraud cases. Name a more informative metric and explain why.
17. A feature scaler was fitted using training and test data together. What problem is this, and why is it harmful?


