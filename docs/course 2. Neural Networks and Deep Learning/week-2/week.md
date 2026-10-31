# Course 2, week 2: Logistic regression and vectorized calculus

[Course overview](../course.md) · [Weekly test](<../../../test/course 2. Neural Networks and Deep Learning/week-2/week-test.md>) · [Weekly answers](<../../../test/course 2. Neural Networks and Deep Learning/week-2/week-answers.md>)

## Week at a glance

Logistic regression and vectorization. Binary classification provides the smallest useful model. Computation graphs, derivatives, gradient descent, NumPy vectorization, and broadcasting prepare the notation used later.

## Detailed notes

- For binary classification, a = σ(wᵀx+b). The per-example loss is −[y log a +(1−y)log(1−a)], and J averages this loss over m examples.

- A computation graph breaks a formula into operations so the chain rule can propagate derivatives backward. Gradient descent then updates w and b using those derivatives.

- For one example, dz = a−y, dw = x·dz, and db = dz. For m examples, average the contributions; a vectorized matrix formulation removes slow per-example Python loops.

- With examples in columns, X has shape (nₓ,m), w has (nₓ,1), and A = σ(wᵀX+b) has (1,m). Broadcasting adds scalar b to every column.

- NumPy one-dimensional arrays can hide row/column intent. Use explicit shapes and assertions when implementing the lecture equations.

## Practice and review

Implement one forward/backward pass for three examples and check the shapes of X, Z, A, dW, and db against the equations.

**Watch for:** Do not sum gradients without dividing by m when your cost is an average, and do not assume a NumPy shape (n,) behaves like (n,1).

## Video lessons

- 1. Binary Classification: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/1. Binary Classification/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/1. Binary Classification/index.vtt>)
- 2. Logistic Regression: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/2. Logistic Regression/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/2. Logistic Regression/index (1).vtt>)
- 3. Logistic Regression Cost Function: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/3. Logistic Regression Cost Function/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/3. Logistic Regression Cost Function/index.vtt>)
- 4. Gradient Descent: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/4. Gradient Descent/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/4. Gradient Descent/index (1).vtt>)
- 5. Derivatives: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/5. Derivatives/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/5. Derivatives/index.vtt>)
- 6. More Derivative Examples: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/6. More Derivative Examples/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/6. More Derivative Examples/index (1).vtt>)
- 7. Computation Graph: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/7. Computation Graph/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/7. Computation Graph/index.vtt>)
- 8. Derivatives with a Computation Graph: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/8. Derivatives with a Computation Graph/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/8. Derivatives with a Computation Graph/index (1).vtt>)
- 9. Logistic Regression Gradient Descent: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/9. Logistic Regression Gradient Descent/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/9. Logistic Regression Gradient Descent/index.vtt>)
- 10. Gradient Descent on m Examples: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/10. Gradient Descent on m Examples/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/10. Gradient Descent on m Examples/index (1).vtt>)
- 11. Vectorization: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/11. Vectorization/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/11. Vectorization/index.vtt>)
- 12. More Vectorization Examples: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/12. More Vectorization Examples/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/12. More Vectorization Examples/index (1).vtt>)
- 13. Vectorizing Logistic Regression: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/13. Vectorizing Logistic Regression/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/13. Vectorizing Logistic Regression/index.vtt>)
- 14. Vectorizing Logistic Regression_s Gradient Output: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/14. Vectorizing Logistic Regression_s Gradient Output/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/14. Vectorizing Logistic Regression_s Gradient Output/index (1).vtt>)
- 15. Broadcasting in Python: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/15. Broadcasting in Python/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/15. Broadcasting in Python/index.vtt>)
- 16. A Note on PythonNumpy Vectors: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/16. A Note on PythonNumpy Vectors/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/16. A Note on PythonNumpy Vectors/index (1).vtt>)
- 17. Quick tour of JupyteriPython Notebooks: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/17. Quick tour of JupyteriPython Notebooks/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/17. Quick tour of JupyteriPython Notebooks/index.vtt>)
- 18. Explanation of Logistic Regression Cost Function (Optional): [video](<../../../2. Neural Networks and Deep Learning/2. week 2/18. Explanation of Logistic Regression Cost Function (Optional)/index (1).mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/18. Explanation of Logistic Regression Cost Function (Optional)/index (1).vtt>)
- 19. Pieter Abbeel Interview: [video](<../../../2. Neural Networks and Deep Learning/2. week 2/19. Pieter Abbeel Interview/index.mp4>) · [English captions](<../../../2. Neural Networks and Deep Learning/2. week 2/19. Pieter Abbeel Interview/index.vtt>)
