# Course 1, week 3: Logistic regression, classification, and regularization

[Course overview](../course.md) · [Weekly test](<../../../test/course 1. Supervised ML playlist/week-3/week-test.md>) · [Weekly answers](<../../../test/course 1. Supervised ML playlist/week-3/week-answers.md>)

## Week at a glance

Classification and generalization. Logistic regression maps a linear score through the sigmoid. Decision boundaries, cross-entropy, gradient descent, overfitting, and regularization connect classification accuracy to generalization.

## Detailed notes

- Logistic regression computes z = w·x + b and p = σ(z) = 1/(1+e^(−z)). The sigmoid maps any score to (0,1); a threshold converts that probability into a class decision.

- The decision boundary at p = 0.5 is z = 0. Polynomial features can make a curved boundary even though z remains linear in the expanded feature vector.

- Binary cross-entropy is J = −(1/m)Σ[y log p + (1−y)log(1−p)]. Its gradient has the familiar error term p−y, enabling gradient descent.

- Overfitting appears when training performance is much better than performance on new examples. More data, fewer features, and regularization are possible remedies.

- L2 regularization adds λ/(2m)Σⱼwⱼ² to the cost. Bias b is conventionally excluded; the corresponding weight gradient gains (λ/m)wⱼ. Excessive λ can underfit.

## Practice and review

For a two-feature classifier, write the p = 0.5 boundary and compare one gradient update with and without L2 regularization.

**Watch for:** Do not apply linear-regression squared error as the default logistic objective, or penalize b as if it were an ordinary weight.

## Video lessons

- 1. Classification motivation: [video](<../../../1. Supervised ML playlist/week 3/1. Classification motivation/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/1. Classification motivation/index.vtt>)
- 2. Logistic regression: [video](<../../../1. Supervised ML playlist/week 3/2. Logistic regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/2. Logistic regression/index.vtt>)
- 3. Decision boundary: [video](<../../../1. Supervised ML playlist/week 3/3. Decision boundary/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/3. Decision boundary/index.vtt>)
- 4. Cost function for logistic regression: [video](<../../../1. Supervised ML playlist/week 3/4. Cost function for logistic regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/4. Cost function for logistic regression/index.vtt>)
- 5. Simplified cost function: [video](<../../../1. Supervised ML playlist/week 3/5. Simplified cost function/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/5. Simplified cost function/index.vtt>)
- 6. Gradient descent for logistic regression: [video](<../../../1. Supervised ML playlist/week 3/6. Gradient descent for logistic regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/6. Gradient descent for logistic regression/index.vtt>)
- 7. The problem of overfitting: [video](<../../../1. Supervised ML playlist/week 3/7. The problem of overfitting/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/7. The problem of overfitting/index.vtt>)
- 8. Addressing overfitting: [video](<../../../1. Supervised ML playlist/week 3/8. Addressing overfitting/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/8. Addressing overfitting/index.vtt>)
- 9. Cost function with regularization: [video](<../../../1. Supervised ML playlist/week 3/9. Cost function with regularization/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/9. Cost function with regularization/index.vtt>)
- 10. Regularized linear regression: [video](<../../../1. Supervised ML playlist/week 3/10. Regularized linear regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/10. Regularized linear regression/index.vtt>)
- 11. Regularized logistic regression: [video](<../../../1. Supervised ML playlist/week 3/11. Regularized logistic regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 3/11. Regularized logistic regression/index.vtt>)
