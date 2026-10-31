# Course 3, week 2: Mini-batches and optimization algorithms

[Course overview](../course.md) · [Weekly test](<../../../test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-2/week-test.md>) · [Weekly answers](<../../../test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-2/week-answers.md>)

## Week at a glance

Optimization. Mini-batches and exponentially weighted averages lead to momentum, RMSprop, Adam, learning-rate decay, and a more realistic view of local optima.

## Detailed notes

- Mini-batch gradient descent updates parameters using a subset of examples. Its cost curve is noisier than full-batch training but updates can be faster on large data.

- Exponentially weighted averages vₜ=βvₜ₋₁+(1−β)gₜ smooth noisy gradients. Early estimates are biased toward zero; divide by 1−βᵗ for bias correction.

- Momentum accumulates a smoothed gradient direction. RMSprop smooths squared gradients to adapt each coordinate's step size.

- Adam combines first and second moments with bias correction: m̂ₜ=mₜ/(1−β₁ᵗ), v̂ₜ=vₜ/(1−β₂ᵗ), and θ←θ−αm̂ₜ/(√v̂ₜ+ε).

- Learning-rate decay reduces step size later in training. The lectures also explain why saddle points and plateaus may be more relevant than poor local minima in high-dimensional networks.

## Practice and review

Sketch one epoch of mini-batches, then calculate two steps of momentum and Adam for a scalar gradient sequence.

**Watch for:** Do not compare noisy mini-batch costs as though every update used the same examples; examine a smoothed trend or epoch-level metric.

## Video lessons

- 1. Mini-batch Gradient Descent: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/1. Mini-batch Gradient Descent/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/1. Mini-batch Gradient Descent/index.vtt>)
- 2. Understanding Mini-batch Gradient Descent: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/2. Understanding Mini-batch Gradient Descent/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/2. Understanding Mini-batch Gradient Descent/index.vtt>)
- 3. Exponentially Weighted Averages: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/3. Exponentially Weighted Averages/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/3. Exponentially Weighted Averages/index.vtt>)
- 4. Understanding Exponentially Weighted Averages: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/4. Understanding Exponentially Weighted Averages/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/4. Understanding Exponentially Weighted Averages/index.vtt>)
- 5. Bias Correction in Exponentially Weighted Averages: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/5. Bias Correction in Exponentially Weighted Averages/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/5. Bias Correction in Exponentially Weighted Averages/index.vtt>)
- 6. Gradient Descent with Momentum: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/6. Gradient Descent with Momentum/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/6. Gradient Descent with Momentum/index.vtt>)
- 7. RMSprop: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/7. RMSprop/index (1).mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/7. RMSprop/index (1).vtt>)
- 8. Adam Optimization Algorithm: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/8. Adam Optimization Algorithm/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/8. Adam Optimization Algorithm/index.vtt>)
- 9. Learning Rate Decay: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/9. Learning Rate Decay/index (1).mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/9. Learning Rate Decay/index (1).vtt>)
- 10. The Problem of Local Optima: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/10. The Problem of Local Optima/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/10. The Problem of Local Optima/index.vtt>)
- 11. Yuanqing Lin Interview: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/11. Yuanqing Lin Interview/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 2/11. Yuanqing Lin Interview/index.vtt>)
