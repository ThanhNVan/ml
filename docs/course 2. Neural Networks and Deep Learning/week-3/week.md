# Course 2, week 3: Shallow neural networks

[Course overview](../course.md) · [Weekly test](<../../../test/course 2. Neural Networks and Deep Learning/week-3/week-test.md>) · [Weekly answers](<../../../test/course 2. Neural Networks and Deep Learning/week-3/week-answers.md>)

## Week at a glance

A shallow network. A hidden layer adds nonlinear representation learning. The week covers activations, matrix forms for many examples, backpropagation, and random initialization.

## Detailed notes

- A two-layer network computes Z¹=W¹X+b¹, A¹=g¹(Z¹), Z²=W²A¹+b², and A²=g²(Z²). Hidden units learn an intermediate representation.

- Nonlinear hidden activations such as tanh or ReLU are essential: a stack of purely linear layers collapses into one linear map. The output activation should match the task.

- Vectorization places examples in columns. For layer sizes n₀, n₁, n₂, W¹ has (n₁,n₀), W² has (n₂,n₁), and each bias broadcasts over m examples.

- Backpropagation applies the chain rule layer by layer; for sigmoid binary output, dZ²=A²−Y. The hidden-layer derivative depends on W²ᵀdZ² and g¹′(Z¹).

- Small random weights break symmetry among hidden units. Setting every weight to zero would make units learn identical features.

## Practice and review

Write the dimensions and forward/backward equations for a 3-input, 4-hidden-unit, 1-output network with five examples.

**Watch for:** Do not use the same activation derivative for every layer; each derivative must match that layer's activation.

## Video lessons

- 1. Neural Networks Overview: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/1. Neural Networks Overview/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/1. Neural Networks Overview/index.vtt>)
- 2. Neural Network Representation: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/2. Neural Network Representation/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/2. Neural Network Representation/index (1).vtt>)
- 3. Computing a Neural Network_s Output: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/3. Computing a Neural Network_s Output/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/3. Computing a Neural Network_s Output/index.vtt>)
- 4. Vectorizing Across Multiple Examples: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/4. Vectorizing Across Multiple Examples/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/4. Vectorizing Across Multiple Examples/index (1).vtt>)
- 5. Explanation for Vectorized Implementation: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/5. Explanation for Vectorized Implementation/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/5. Explanation for Vectorized Implementation/index.vtt>)
- 6. Activation Functions: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/6. Activation Functions/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/6. Activation Functions/index (1).vtt>)
- 7. Why do you need Non-Linear Activation Functions: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/7. Why do you need Non-Linear Activation Functions/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/7. Why do you need Non-Linear Activation Functions/index.vtt>)
- 8. Derivatives of Activation Functions: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/8. Derivatives of Activation Functions/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/8. Derivatives of Activation Functions/index (1).vtt>)
- 9. Gradient Descent for Neural Networks: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/9. Gradient Descent for Neural Networks/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/9. Gradient Descent for Neural Networks/index.vtt>)
- 10. Backpropagation Intuition (Optional): [video](<../../../2. Neural Networks and Deep Learning/3. week 3/10. Backpropagation Intuition (Optional)/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/10. Backpropagation Intuition (Optional)/index (1).vtt>)
- 11. Random Initialization: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/11. Random Initialization/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/11. Random Initialization/index.vtt>)
- 12. Ian Goodfellow Interview: [video](<../../../2. Neural Networks and Deep Learning/3. week 3/12. Ian Goodfellow Interview/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/3. week 3/12. Ian Goodfellow Interview/index.vtt>)
