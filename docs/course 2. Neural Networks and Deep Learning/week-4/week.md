# Course 2, week 4: Deep network building blocks

[Course overview](../course.md) · [Weekly test](<../../../test/course 2. Neural Networks and Deep Learning/week-4/week-test.md>) · [Weekly answers](<../../../test/course 2. Neural Networks and Deep Learning/week-4/week-answers.md>)

## Week at a glance

Deep networks. Stack layers while tracking tensor shapes, reuse forward and backward blocks, distinguish learned parameters from hyperparameters, and understand why depth can be useful.

## Detailed notes

- For layers l=1…L, compute Z[l]=W[l]A[l−1]+b[l], A[l]=g[l](Z[l]), with A[0]=X. Cache the values needed for the reverse pass.

- A layer with n[l] units has W[l] shape (n[l],n[l−1]), b[l] shape (n[l],1), and A[l] shape (n[l],m). Checking these dimensions catches most implementation mistakes.

- Backpropagation reverses the forward sequence: derive dZ[l], then dW[l]=(1/m)dZ[l]A[l−1]ᵀ and db[l]=(1/m)ΣdZ[l] across examples.

- Depth can build hierarchical features from simpler patterns. Parameters W and b are learned; hyperparameters such as layer count, hidden sizes, activation, and learning rate are chosen before training or tuned on dev data.

- The brain analogy is motivational, not a literal implementation specification. The useful engineering model is a differentiable computation graph.

## Practice and review

Trace a three-layer network forward and backward, annotating every matrix shape. See the existing detailed neural-network guide in docs for a longer derivation.

**Watch for:** Do not confuse the layer index with the example index, or tune hyperparameters on the final test set.

## Video lessons

- 1. Deep L-layer Neural Network: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/1. Deep L-layer Neural Network/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/1. Deep L-layer Neural Network/index (1).vtt>)
- 2. Forward Propagation in a Deep Network: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/2. Forward Propagation in a Deep Network/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/2. Forward Propagation in a Deep Network/index.vtt>)
- 3. Getting your Matrix Dimensions Right: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/3. Getting your Matrix Dimensions Right/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/3. Getting your Matrix Dimensions Right/index (1).vtt>)
- 4. Why Deep Representations: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/4. Why Deep Representations/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/4. Why Deep Representations/index.vtt>)
- 5. Building Blocks of Deep Neural Networks: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/5. Building Blocks of Deep Neural Networks/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/5. Building Blocks of Deep Neural Networks/index (1).vtt>)
- 6. Forward and Backward Propagation: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/6. Forward and Backward Propagation/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/6. Forward and Backward Propagation/index.vtt>)
- 7. Parameters vs Hyperparameters: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/7. Parameters vs Hyperparameters/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/7. Parameters vs Hyperparameters/index (1).vtt>)
- 8. What does this have to do with the brain: [video](<../../../2. Neural Networks and Deep Learning/4. week 4/8. What does this have to do with the brain/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/4. week 4/8. What does this have to do with the brain/index.vtt>)
