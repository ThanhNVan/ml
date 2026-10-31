# Course 3, week 1: Bias, variance, and reliable training

[Course overview](../course.md) · [Weekly test](<../../../test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-1/week-test.md>) · [Weekly answers](<../../../test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-1/week-answers.md>)

## Week at a glance

Practical setup. Bias/variance analysis guides regularization, dropout, input normalization, initialization, and gradient checking.

## Detailed notes

- Use train, dev, and test sets for fitting, model selection, and final evaluation. Keep the dev and test distributions representative of the task you care about.

- Compare training error with an achievable baseline to estimate avoidable bias; compare dev and training error to estimate variance. This diagnosis suggests whether to increase capacity, improve optimization, collect data, or regularize.

- L2 regularization penalizes large weights; dropout randomly removes activations during training and scales remaining activations appropriately. Both can reduce overfitting, but strong regularization can increase bias.

- Normalize inputs to improve conditioning. Suitable weight initialization helps prevent deep activations and gradients from exploding or vanishing.

- Gradient checking compares backpropagated gradients with finite-difference approximations. Use it for debugging on small cases, then disable it during ordinary training.

## Practice and review

Given train and dev errors, state the likely bias/variance problem and a first experiment. Numerically check one parameter gradient with a small ε.

**Watch for:** Do not use test results to repeatedly tune hyperparameters; doing so turns the test set into another dev set.

## Video lessons

- 1. Train  Dev  Test sets: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/1. Train  Dev  Test sets/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/1. Train  Dev  Test sets/index.vtt>)
- 2. Bias  Variance: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/2. Bias  Variance/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/2. Bias  Variance/index.vtt>)
- 3. Basic Recipe for Machine Learning: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/3. Basic Recipe for Machine Learning/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/3. Basic Recipe for Machine Learning/index.vtt>)
- 4. Regularization: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/4. Regularization/index (1).mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/4. Regularization/index (1).vtt>)
- 5. Why Regularization Reduces Overfitting: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/5. Why Regularization Reduces Overfitting/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/5. Why Regularization Reduces Overfitting/index.vtt>)
- 6. Dropout Regularization: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/6. Dropout Regularization/index (1).mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/6. Dropout Regularization/index (1).vtt>)
- 7. Understanding Dropout: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/7. Understanding Dropout/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/7. Understanding Dropout/index.vtt>)
- 8. Other Regularization Methods: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/8. Other Regularization Methods/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/8. Other Regularization Methods/index.vtt>)
- 9. Normalizing Inputs: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/9. Normalizing Inputs/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/9. Normalizing Inputs/index.vtt>)
- 10. Vanishing Exploding Gradients: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/10. Vanishing Exploding Gradients/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/10. Vanishing Exploding Gradients/index.vtt>)
- 11. Weight Initialization for Deep Networks: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/11. Weight Initialization for Deep Networks/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/11. Weight Initialization for Deep Networks/index.vtt>)
- 12. Numerical Approximation of Gradients: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/12. Numerical Approximation of Gradients/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/12. Numerical Approximation of Gradients/index.vtt>)
- 13. Gradient Checking: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/13. Gradient Checking/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/13. Gradient Checking/index.vtt>)
- 14. Gradient Checking Implementation Notes: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/14. Gradient Checking Implementation Notes/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/14. Gradient Checking Implementation Notes/index.vtt>)
- 15. Yoshua Bengio Interview: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/15. Yoshua Bengio Interview/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 1/15. Yoshua Bengio Interview/index.vtt>)
