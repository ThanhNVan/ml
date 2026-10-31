# Machine Learning Specialization — Course 2
## Advanced Learning Algorithms — Chapter Tests

**Instructions:** Answer all 58 questions. Unless stated otherwise, choose one answer.

## Chapter 1 — Neural Networks
1. **Multiple choice:** What is the main purpose of an activation function in a neural network?
   - A. To normalize the training set
   - B. To introduce nonlinearity
   - C. To calculate the learning rate
   - D. To split data into training and test sets

2. **True/False:** A neural network made entirely of linear activation functions can represent nonlinear decision boundaries.

3. **Fill in the formula:** For a neuron, the pre-activation is `z = ____`.

4. **Multiple choice:** Which activation function is commonly used in hidden layers because it is computationally simple and often trains effectively?
   - A. ReLU
   - B. Step function
   - C. Identity only
   - D. Random noise

5. **Calculation:** If `w = [2, -1]`, `b = 3`, and `x = [4, 2]`, calculate `z = w · x + b`.

6. **Multiple choice:** In a binary classification network, the output layer most commonly uses:
   - A. A sigmoid activation
   - B. A linear activation only
   - C. A random activation
   - D. A sorting operation

7. **True/False:** Forward propagation computes predictions from the input toward the output layer.

8. **Short answer:** Why can a hidden layer learn useful intermediate representations?

9. **Multiple choice:** What does `m` usually denote in supervised learning notation?
   - A. Number of training examples
   - B. Number of layers
   - C. Number of classes only
   - D. Number of optimizers

10. **Scenario:** A model predicts whether an image contains a cat. Which output interpretation is most appropriate if the final sigmoid output is `0.92`?

## Chapter 2 — Neural Network Training

11. **Multiple choice:** What is the purpose of a loss function?
   - A. To measure how poorly predictions match targets
   - B. To increase the number of features
   - C. To shuffle labels permanently
   - D. To remove all outliers automatically

12. **True/False:** Gradient descent updates parameters in the direction opposite to the gradient.

13. **Fill in the formula:** A basic gradient descent update is `w := w - ____ * ____`.

14. **Calculation:** If `w = 5`, learning rate `α = 0.1`, and `∂J/∂w = 2`, calculate the updated `w`.

15. **Multiple choice:** What is backpropagation primarily used to compute?
   - A. Gradients of the loss with respect to parameters
   - B. The number of test examples
   - C. The final deployment cost
   - D. A new label vocabulary

16. **Multiple choice:** Which loss is commonly used for binary classification with a sigmoid output?
   - A. Binary cross-entropy
   - B. Euclidean distance only
   - C. Hinge loss exclusively
   - D. Sorting loss

17. **Multiple choice:** Vectorization is useful because it:
   - A. Speeds up numerical computation using matrix operations
   - B. Guarantees zero training error
   - C. Eliminates the need for labels
   - D. Prevents all overfitting

18. **Scenario:** Training loss decreases very slowly and remains high. Name two reasonable adjustments or checks.

## Week 1 — Introduction to Deep Learning

19. **Multiple choice:** In the housing-price example, the single neuron that maps size to price uses which function?
   - A. ReLU, i.e. `max(0, wx + b)`
   - B. Softmax
   - C. A step function
   - D. Sorting

20. **True/False:** When building a neural network, you must manually specify what each hidden unit computes.

21. **Matching:** Match each application to the architecture usually used: (1) predicting ad clicks from user and ad features, (2) photo tagging, (3) speech recognition, (4) autonomous driving. Options: Standard NN, CNN, RNN, custom/hybrid.

22. **Select all that apply:** Which factors explain why deep learning has taken off recently?
   - A. Much more labeled data
   - B. Faster computation (GPUs, specialized hardware)
   - C. Algorithmic innovations such as switching from sigmoid to ReLU
   - D. Datasets getting smaller

23. **Short answer:** Why did switching from sigmoid to ReLU speed up gradient descent?

24. **True/False:** With small training sets, large neural networks always outperform traditional learning algorithms.

25. **Fill in the blank:** Large neural networks outperform other algorithms most clearly when the amount of labeled data is ____.

26. **Multiple choice:** Which of the following is unstructured data?
   - A. A table of house sizes and prices
   - B. An audio clip
   - C. A database of user ages
   - D. A spreadsheet of sales totals

27. **Short answer:** Why does faster computation speed up progress on deep learning projects?

28. **Multiple choice:** Which input/output pair is matched correctly?
   - A. Online advertising: ad and user info → click (0/1)
   - B. Photo tagging: audio clip → text transcript
   - C. Real estate: image → click (0/1)
   - D. Machine translation: house size → price

## Week 2 — Neural Network Basics (Logistic Regression)

29. **Calculation:** Compute `sigmoid(0)`.

30. **Multiple choice:** With `n_x` input features and `m` training examples, the matrix `X` has shape:
   - A. `(m, n_x)`
   - B. `(n_x, m)`
   - C. `(n_x, 1)`
   - D. `(1, m)`

31. **True/False:** The loss function `L(ŷ, y)` is defined on a single training example, while the cost function `J` is the average of the losses over the training set.

32. **Calculation:** For `y = 1` and `ŷ = 0.8`, compute the logistic loss `-[y log ŷ + (1-y) log(1-ŷ)]` (natural log, 3 decimals).

33. **Fill in the formula:** For logistic regression with `a = σ(z)`, the gradient `dz = ____`.

34. **Calculation:** For `f(a) = a²`, what is the derivative (slope) at `a = 3`?

35. **Computation graph:** Let `J = 3(a + bc)` with `a = 5`, `b = 3`, `c = 2`. Compute `J` and `dJ/da`.

36. **Multiple choice:** What is the shape of `np.array([[1,2,3]]) + np.array([[10],[20]])` after broadcasting?
   - A. `(3, 2)`
   - B. `(2, 3)`
   - C. `(3,)`
   - D. It raises an error

37. **Multiple choice:** Which is the recommended way to avoid bugs with rank-1 arrays such as `a = np.random.randn(5)`?
   - A. Use `a` as is, since shape `(5,)` behaves like a column vector
   - B. Use `a.reshape((5, 1))` or create it as `randn(5, 1)`, and check shapes with `assert`
   - C. Convert it to a Python list
   - D. Transpose it, since `a.T` fixes it

38. **True/False:** The logistic regression cost function `J(w, b)` is convex, so gradient descent does not get stuck in local optima.

## Week 3 — Shallow Neural Networks

39. **Multiple choice:** A network has 3 input features and a hidden layer with 4 units. What is the shape of `W[1]`?
   - A. `(3, 4)`
   - B. `(4, 3)`
   - C. `(4, 1)`
   - D. `(3, 1)`

40. **Calculation:** With `m = 100` examples and 4 hidden units, what is the shape of `Z[1]`?

41. **True/False:** A "2-layer neural network" has one hidden layer and one output layer; the input layer is not counted.

42. **Multiple choice:** Which activation is usually better than sigmoid for hidden layers because its output is centered around zero?
   - A. tanh
   - B. Step function
   - C. Softmax
   - D. Sigmoid with a larger slope

43. **Calculation:** If `a = σ(z) = 0.8`, compute the derivative `σ'(z) = a(1 - a)`.

44. **Short answer:** If both layers use a linear activation `g(z) = z`, show why a two-layer network is no more expressive than a single linear layer.

45. **Multiple choice:** What goes wrong if you initialize all weights `W` to zero?
   - A. Nothing; biases will fix it
   - B. All hidden units in a layer compute the same function and get the same updates (symmetry)
   - C. The output becomes infinite
   - D. The network trains twice as fast

46. **Fill in the blank:** For random initialization, `W[1] = np.random.randn(n1, n0) * ____`, where the multiplier is a small number such as `0.01`.

47. **Multiple choice:** For a regression network that predicts a house price, which layer can reasonably use a linear activation?
   - A. The output layer
   - B. Every hidden layer
   - C. Only the input layer
   - D. None of them

48. **Fill in the formula:** In a 2-layer binary classifier, backpropagation starts with `dZ[2] = ____`.

## Week 4 — Deep Neural Networks

49. **Multiple choice:** In an `L`-layer network, `n[l]` is the number of units in layer `l`. What is the shape of `W[l]`?
   - A. `(n[l-1], n[l])`
   - B. `(n[l], n[l-1])`
   - C. `(n[l], 1)`
   - D. `(n[l], m)`

50. **Calculation:** A network has 4 inputs, then layers with 5, 3 and 1 units. What is the shape of `W[2]`?

51. **True/False:** Forward propagation through the layers of a deep network requires an explicit for loop over `l = 1, ..., L`.

52. **Multiple choice:** Which value is cached during forward propagation to be reused in backward propagation?
   - A. `Z[l]` (together with `W[l]`, `b[l]`)
   - B. The test set
   - C. The learning rate only
   - D. Nothing is cached

53. **Fill in the formula:** In backward propagation, `dA[l-1] = ____ · dZ[l]`.

54. **Short answer:** Why can a deep network represent some functions with far fewer units than a shallow one? (Hint: circuit theory, XOR of `n` inputs.)

55. **Select all that apply:** Which of these are hyperparameters?
   - A. Learning rate `α`
   - B. Number of iterations
   - C. Number of hidden layers and hidden units
   - D. Weights `W[l]` and biases `b[l]`

56. **True/False:** Good hyperparameter values are usually found empirically by trying values and checking the cost `J`.

57. **Multiple choice:** For `m` examples, what is the shape of `Z[l]`?
   - A. `(n[l], m)`
   - B. `(m, n[l])`
   - C. `(n[l-1], m)`
   - D. `(n[l], n[l-1])`

58. **Short answer:** Why is the analogy between neural networks and the brain considered loose?
