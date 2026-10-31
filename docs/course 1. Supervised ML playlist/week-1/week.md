# Course 1, week 1: Machine learning foundations and linear regression

[Course overview](../course.md) · [Weekly test](<../../../test/course 1. Supervised ML playlist/week-1/week-test.md>) · [Weekly answers](<../../../test/course 1. Supervised ML playlist/week-1/week-answers.md>)

## Week at a glance

Foundations and univariate regression. The first week distinguishes supervised from unsupervised learning, introduces Jupyter notebooks, and constructs one-variable linear regression. The progression from predictions to squared-error cost to gradient descent explains what training actually minimizes.

## Detailed notes

- Supervised learning uses labeled input/output pairs; unsupervised learning looks for structure without target labels. Regression predicts a number, while classification predicts a category.

- For one-feature linear regression, f(x) = wx + b. The mean squared-error objective is J(w,b) = (1/2m) Σ(f(xᵢ) − yᵢ)²; the factor 1/2 simplifies derivatives.

- Gradient descent repeatedly applies w ← w − α∂J/∂w and b ← b − α∂J/∂b. Compute both derivatives from the same parameter values before updating either parameter.

- The contour and surface visualizations make cost minimization concrete. A learning rate that is too small is slow; one that is too large can overshoot or diverge.

- The final lectures combine prediction, cost, gradients, and repeated updates into one training loop. Jupyter is the hands-on environment for inspecting those steps.

## Practice and review

Work a tiny two-point regression example by hand: calculate predictions, J, both gradients, and one simultaneous update. Plot or tabulate J over several iterations.

**Watch for:** Do not confuse the model output f(x) with the cost J. Gradient descent minimizes J over parameters; it does not update the training labels.

## Video lessons

- 1. Welcome: [video](<../../../1. Supervised ML playlist/week 1/1. Welcome/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/1. Welcome/index.vtt>)
- 2. Course overview: [video](<../../../1. Supervised ML playlist/week 1/2. Course overview/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/2. Course overview/index.vtt>)
- 3. What is machine learning: [video](<../../../1. Supervised ML playlist/week 1/3. What is machine learning/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/3. What is machine learning/index.vtt>)
- 4. Supervised learning (part 1): [video](<../../../1. Supervised ML playlist/week 1/4. Supervised learning (part 1)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/4. Supervised learning (part 1)/index.vtt>)
- 5. Supervised learning (part 2): [video](<../../../1. Supervised ML playlist/week 1/5. Supervised learning (part 2)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/5. Supervised learning (part 2)/index.vtt>)
- 6. Unsupervised learning (part 1): [video](<../../../1. Supervised ML playlist/week 1/6. Unsupervised learning (part 1)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/6. Unsupervised learning (part 1)/index.vtt>)
- 7. Unsupervised learning (part 2): [video](<../../../1. Supervised ML playlist/week 1/7. Unsupervised learning (part 2)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/7. Unsupervised learning (part 2)/index.vtt>)
- 8. Jupyter Notebooks: [video](<../../../1. Supervised ML playlist/week 1/8. Jupyter Notebooks/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/8. Jupyter Notebooks/index.vtt>)
- 9. Linear regression model (part 1): [video](<../../../1. Supervised ML playlist/week 1/9. Linear regression model (part 1)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/9. Linear regression model (part 1)/index.vtt>)
- 10. Linear regression model (part 2): [video](<../../../1. Supervised ML playlist/week 1/10. Linear regression model (part 2)/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/10. Linear regression model (part 2)/index.vtt>)
- 11. Cost function formula: [video](<../../../1. Supervised ML playlist/week 1/11. Cost function formula/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/11. Cost function formula/index.vtt>)
- 12. Cost function intuition: [video](<../../../1. Supervised ML playlist/week 1/12. Cost function intuition/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/12. Cost function intuition/index.vtt>)
- 13. Visualizing the cost function: [video](<../../../1. Supervised ML playlist/week 1/13. Visualizing the cost function/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/13. Visualizing the cost function/index.vtt>)
- 14. Visualization examples: [video](<../../../1. Supervised ML playlist/week 1/14. Visualization examples/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/14. Visualization examples/index.vtt>)
- 15. Gradient descent: [video](<../../../1. Supervised ML playlist/week 1/15. Gradient descent/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/15. Gradient descent/index.vtt>)
- 16. Implementing gradient descent: [video](<../../../1. Supervised ML playlist/week 1/16. Implementing gradient descent/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/16. Implementing gradient descent/index.vtt>)
- 17. Gradient descent intuition: [video](<../../../1. Supervised ML playlist/week 1/17. Gradient descent intuition/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/17. Gradient descent intuition/index.vtt>)
- 18. Learning rate: [video](<../../../1. Supervised ML playlist/week 1/18. Learning rate/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/18. Learning rate/index.vtt>)
- 19. Gradient descent for linear regression: [video](<../../../1. Supervised ML playlist/week 1/19. Gradient descent for linear regression/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/19. Gradient descent for linear regression/index.vtt>)
- 20. Running gradient descent: [video](<../../../1. Supervised ML playlist/week 1/20. Running gradient descent/index.mp4>) · [English captions](<../../../1. Supervised ML playlist/week 1/20. Running gradient descent/index.vtt>)
