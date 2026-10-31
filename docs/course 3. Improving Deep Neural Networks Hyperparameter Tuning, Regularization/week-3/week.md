# Course 3, week 3: Hyperparameter tuning, batch normalization, and softmax

[Course overview](../course.md) · [Weekly test](<../../../test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-3/week-test.md>) · [Weekly answers](<../../../test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-3/week-answers.md>)

## Week at a glance

Tuning and deployment behavior. Hyperparameter search, batch normalization, softmax classification, and framework implementation complete the training workflow.

## Detailed notes

- Tune learning rate first, then consider momentum coefficients, hidden sizes, and other hyperparameters. Random search is often more informative than a rigid grid when only a few parameters matter strongly.

- Sample positive scale parameters, such as learning rate, approximately on a log scale: equal intervals in log space cover orders of magnitude evenly.

- Batch normalization normalizes intermediate activations within a mini-batch and learns scale γ and shift β. Training uses batch statistics; inference uses accumulated population estimates.

- For K mutually exclusive classes, softmax produces pₖ=e^zₖ/Σⱼe^zⱼ. Cross-entropy penalizes low probability on the true class; subtract max(z) before exponentiation for numerical stability.

- Deep-learning frameworks automate differentiation and graph execution, but correct tensor dimensions, losses, and train/inference behavior still need inspection.

## Practice and review

Design a log-scale learning-rate search and state how batch-normalization statistics differ between training and inference.

**Watch for:** Do not reuse a current mini-batch's mean and variance for one-example inference, or treat softmax outputs as independent binary probabilities.

## Video lessons

- 1. Tuning Process: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/1. Tuning Process/index (1).mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/1. Tuning Process/index (1).vtt>)
- 2. Using an Appropriate Scale to pick Hyperparameters: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/2. Using an Appropriate Scale to pick Hyperparameters/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/2. Using an Appropriate Scale to pick Hyperparameters/index.vtt>)
- 3. Hyperparameters Tuning in Practice Pandas vs. Caviar: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/3. Hyperparameters Tuning in Practice Pandas vs. Caviar/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/3. Hyperparameters Tuning in Practice Pandas vs. Caviar/index.vtt>)
- 4. Normalizing Activations in a Network: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/4. Normalizing Activations in a Network/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/4. Normalizing Activations in a Network/index.vtt>)
- 5. Fitting Batch Norm into a Neural Network: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/5. Fitting Batch Norm into a Neural Network/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/5. Fitting Batch Norm into a Neural Network/index.vtt>)
- 6. Why does Batch Norm work: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/6. Why does Batch Norm work/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/6. Why does Batch Norm work/index.vtt>)
- 7. Batch Norm at Test Time: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/7. Batch Norm at Test Time/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/7. Batch Norm at Test Time/index.vtt>)
- 8. Softmax Regression: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/8. Softmax Regression/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/8. Softmax Regression/index.vtt>)
- 9. Training a Softmax Classifier: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/9. Training a Softmax Classifier/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/9. Training a Softmax Classifier/index.vtt>)
- 10. Deep Learning Frameworks: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/10. Deep Learning Frameworks/index.mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/10. Deep Learning Frameworks/index.vtt>)
- 11. TensorFlow: [video](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/11. TensorFlow/index (1).mp4>) · [English captions](<../../../3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week 3/11. TensorFlow/index (1).vtt>)
