# Machine Learning Specialization — Course 2
## Advanced Learning Algorithms — Answer Key

1. B  
2. False  
3. `w · x + b`  
4. A  
5. `9`  
6. A  
7. True  
8. Hidden layers transform raw inputs into progressively useful features or representations.  
9. A  
10. The model estimates a 92% probability of the positive class; using a 0.5 threshold, predict positive.

11. A  
12. True  
13. `α`, `∂J/∂w`  
14. `4.8`  
15. A  
16. A  
17. A  
18. Tune the learning rate α (a hyperparameter), check the gradient/implementation, and check the loss and labels.

## Week 1

19. A  
20. False  
21. (1) Standard NN, (2) CNN, (3) RNN, (4) custom/hybrid  
22. A, B, C  
23. Sigmoid has near-zero slope for large |z|, so gradients vanish and learning is slow; ReLU has slope 1 for positive z, so gradient descent is much faster.  
24. False  
25. large  
26. B  
27. Faster computation shortens the idea → code → experiment cycle, so you can try more ideas.  
28. A

## Week 2

29. `0.5`  
30. B  
31. True  
32. `-ln(0.8) ≈ 0.223`  
33. `a - y`  
34. `2a = 6`  
35. `J = 3(5 + 6) = 33`, `dJ/da = 3`  
36. B  
37. B  
38. True

## Week 3

39. B  
40. `(4, 100)`  
41. True  
42. A  
43. `0.8 × 0.2 = 0.16`  
44. `a[2] = W[2](W[1]x + b[1]) + b[2] = (W[2]W[1])x + (W[2]b[1] + b[2]) = W'x + b'`, which is a single linear layer.  
45. B  
46. `0.01`  
47. A  
48. `A[2] - Y`

## Week 4

49. B  
50. `(3, 5)`  
51. True  
52. A  
53. `W[l]ᵀ`  
54. A shallow network needs exponentially many units (about `2^(n-1)`) for functions like XOR of `n` inputs, while a deep tree of depth `O(log n)` needs only `O(n)` units.  
55. A, B, C  
56. True  
57. A  
58. Neurons are far more complex than a logistic unit, and neuroscience does not know how the brain learns or whether it does anything like backpropagation.
