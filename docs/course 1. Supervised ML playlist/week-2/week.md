# Course 1, week 2: Multiple regression and better features

[Course overview](../course.md) · [Weekly test](<../../../test/course 1. Supervised ML playlist/week-2/week-test.md>) · [Weekly answers](<../../../test/course 1. Supervised ML playlist/week-2/week-answers.md>)

## Week at a glance

Multiple features and model improvement. Vectorization makes multivariate regression efficient. Feature scaling, convergence checks, learning-rate choices, feature engineering, and polynomial terms improve the training process and model fit.

## Detailed notes

- With n features, f(x) = w·x + b = Σⱼwⱼxⱼ + b. Vectorized dot products replace a manual loop over features and make dimension errors easier to detect.

- For m examples, gradient descent averages each feature's error contribution: ∂J/∂wⱼ = (1/m)Σᵢ(f(x⁽ⁱ⁾)−y⁽ⁱ⁾)xⱼ⁽ⁱ⁾, and ∂J/∂b = (1/m)Σᵢ(f−y).

- Feature scaling brings very different ranges closer together, so gradient descent can move efficiently. Mean normalization and standard-score scaling are common choices; apply training-derived statistics consistently to later data.

- Inspect the cost curve to assess convergence and choose α. A cost that rises or oscillates often calls for a smaller learning rate.

- Feature engineering and polynomial terms let a linear model fit nonlinear relationships in the original input. Adding terms also increases model flexibility and potential overfitting.

## Practice and review

Take a two-feature data set, standardize each feature, compute one vectorized prediction and gradient, then compare cost curves for two learning rates.

**Watch for:** Do not scale validation or test data with statistics computed from those sets; preserve the transform learned from training data.

## Video lessons

- 1. Multiple features: [video](<../../../1. Supervised ML playlist/week 2/1. Multiple features/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/1. Multiple features/index.vtt>)
- 2. Vectorization (part 1): [video](<../../../1. Supervised ML playlist/week 2/2. Vectorization (part 1)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/2. Vectorization (part 1)/index.vtt>)
- 3. Vectorization (part 2): [video](<../../../1. Supervised ML playlist/week 2/3. Vectorization (part 2)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/3. Vectorization (part 2)/index.vtt>)
- 4. Gradient descent for multiple regression: [video](<../../../1. Supervised ML playlist/week 2/4. Gradient descent for multiple regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/4. Gradient descent for multiple regression/index.vtt>)
- 5. Feature scaling (part 1): [video](<../../../1. Supervised ML playlist/week 2/5. Feature scaling (part 1)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/5. Feature scaling (part 1)/index.vtt>)
- 6. Feature scaling (part 2): [video](<../../../1. Supervised ML playlist/week 2/6. Feature scaling (part 2)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/6. Feature scaling (part 2)/index.vtt>)
- 7. Checking convergence: [video](<../../../1. Supervised ML playlist/week 2/7. Checking convergence/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/7. Checking convergence/index.vtt>)
- 8. Choosing the learning rate: [video](<../../../1. Supervised ML playlist/week 2/8. Choosing the learning rate/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/8. Choosing the learning rate/index.vtt>)
- 9. Feature engineering: [video](<../../../1. Supervised ML playlist/week 2/9. Feature engineering/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/9. Feature engineering/index.vtt>)
- 10. Polynomial regression: [video](<../../../1. Supervised ML playlist/week 2/10. Polynomial regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 2/10. Polynomial regression/index.vtt>)
