# 🔑 Course 4 — Answer Key
## Structuring Machine Learning Projects

> 40 answers with the lesson each question comes from.

## Week 1
*ML strategy: metrics, dev/test sets, human-level performance*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 1 | **B** | Each control should affect only one thing so you can tune one problem at a time. | 1.2 Orthogonalization |
| 2 | **(1) b, (2) d, (3) a, (4) c** | The chain is: fit train set, then dev set, then test set, then real world. | 1.2 Orthogonalization |
| 3 | **False** | It affects both how well you fit the training set and how well you do on the dev set at the same time, so it is harder to reason about. | 1.2 Orthogonalization |
| 4 | **92.4** | F1 = 2 / (1/P + 1/R) = 2·0.95·0.90 / (0.95 + 0.90) ≈ 0.924, the harmonic mean of P and R. | 1.3 Single Number Evaluation Metric |
| 5 | **It lets you rank classifiers immediately, so you can iterate faster than if you had to weigh several numbers (e.g. precision and recall) each time.** | Dev set plus one metric speeds up the idea → code → experiment loop. | 1.3 Single Number Evaluation Metric |
| 6 | **B** | With N metrics, pick 1 to optimize and treat N−1 as satisficing: they only need to meet a threshold. | 1.4 Satisficing and Optimizing Metric |
| 7 | **Accuracy (true positive rate) is optimizing; false positives ≤ 1 per 24 hours is satisficing.** | Maximize one, constrain the rest. | 1.4 Satisficing and Optimizing Metric |
| 8 | **B** | You would be aiming at one target (dev) and be judged on another (test). Shuffle and split randomly so both come from the same distribution. | 1.5 TrainDevTest Distributions |
| 9 | **True** | The dev set plus the metric define the target you aim at. | 1.5 TrainDevTest Distributions |
| 10 | **B** | Dev and test only need to be big enough for their purpose; 1% of 1,000,000 is still 10,000 examples. | 1.6 Size of the Dev and Test Sets |
| 11 | **Change the metric (e.g. weight offensive images more heavily in the error) or the dev/test set, because the current one does not rank classifiers the way you or your users do.** | Orthogonalization: first define the target, then worry separately about how to hit it. | 1.7 When to Change DevTest Sets and Metrics |
| 12 | **7** | Avoidable bias = training error − human-level (Bayes proxy) = 8 − 1 = 7. The variance gap is 10 − 8 = 2, so focus on bias. | 1.9 Avoidable Bias |
| 13 | **Variance: avoidable bias is only 0.5 points but the train→dev gap is 2 points.** | The same training and dev errors lead to opposite advice depending on the human-level baseline. | 1.9 Avoidable Bias |
| 14 | **D** | Define human-level as the best performance humans or teams can reach; Bayes error is at most that. | 1.10 Understanding Human-level Performance |
| 15 | **A, B, D** | More data and regularization are variance tactics. | 1.12 Improving your Model Performance |
| 16 | **C, with an average of 3.75%** | A averages 5.0 and B averages 5.0. Averaging across regions gives one number for ranking. | 1.3 Single Number Evaluation Metric |
| 17 | **False** | The test set only has to be big enough to give you high confidence in the final system; 10,000 examples can be enough for 1,000,000. | 1.6 Size of the Dev and Test Sets |
| 18 | **About 16.9%** | Σw = 96·1 + 4·10 = 136. Weighted mistakes = 3·1 + 2·10 = 23. 23 / 136 ≈ 0.169. | 1.7 When to Change DevTest Sets and Metrics |
| 19 | **True** | Perfect accuracy may not be 100% because some inputs are ambiguous; progress slows once you pass human-level and approach Bayes error. | 1.8 Why Human-level Performance |
| 20 | **A, B, C** | These learn from structured data; humans are very good at natural perception such as vision and speech, which is harder to beat. | 1.11 Surpassing Human-level Performance |

## Week 2
*Error analysis, mismatched data, transfer and multi-task learning, end-to-end*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 21 | **From 10% to 9.5% — a ceiling of 0.5 points, so probably not worth a long project.** | Error analysis gives a ceiling on how much a fix can help. | 2.1 Carrying Out Error Analysis |
| 22 | **10% would drop to 5%. That makes blurry images a promising direction.** | Compare ceilings across categories, tallied in a spreadsheet, to prioritize. | 2.1 Carrying Out Error Analysis |
| 23 | **True** | Columns in the spreadsheet can overlap; you just add up the percentage for each category. | 2.1 Carrying Out Error Analysis |
| 24 | **B** | Systematic errors do real damage because the model learns the wrong pattern. | 2.2 Cleaning Up Incorrectly Labeled Data |
| 25 | **0.6 points from labels (6% of the dev error); 9.4 points from other causes.** | Fix labels only if the labeling errors are a large fraction of the dev error. | 2.2 Cleaning Up Incorrectly Labeled Data |
| 26 | **A, B, D** | Training data need not be corrected as carefully; deep learning tolerates a slightly different train distribution. | 2.2 Cleaning Up Incorrectly Labeled Data |
| 27 | **Set up the dev/test set and metric, build the initial system quickly, then use bias/variance and error analysis to prioritize next steps.** | Do not over-think the first system; iterate. | 2.3 Build your First System Quickly, then Iterate |
| 28 | **Put app images in the dev and test sets (e.g. 2,500 each) and the rest of the app images plus all web images in training.** | Aim at the target you really care about, even if training data come from a different distribution. | 2.4 Training and Testing on Different Distributions |
| 29 | **Variance: the model does well on the training data but not on training-dev data from the same distribution.** | The training-dev set is carved out of training data and not used for training. | 2.5 Bias and Variance with Mismatched Data Distributions |
| 30 | **Data mismatch: the model generalizes to unseen data from the training distribution but not to dev-set data from a different distribution.** | Bias is low and variance is low; the dev distribution is different. | 2.5 Bias and Variance with Mismatched Data Distributions |
| 31 | **data mismatch** | The gap between human-level and training error is avoidable bias; training to training-dev is variance. | 2.5 Bias and Variance with Mismatched Data Distributions |
| 32 | **Do manual error analysis to understand how dev and training differ, then make the training data more similar to dev (e.g. artificial data synthesis such as adding car noise to clean audio) or collect more data like the dev set.** |  | 2.6 Addressing Data Mismatch |
| 33 | **B** | To a human the synthesized data look fine, but they may cover only a tiny subset of the space of real variation. | 2.6 Addressing Data Mismatch |
| 34 | **B** | With more B data you can retrain all layers; the first phase is pre-training and the second is fine-tuning. | 2.7 Transfer Learning |
| 35 | **A, B, C** | Transfer from a data-rich task to a data-poor one. | 2.7 Transfer Learning |
| 36 | **Yes. Sum the loss only over the labels that are present (skip the '?' entries).** | Multi-task learning does not require every example to be fully labeled. | 2.8 Multi-task Learning |
| 37 | **A, B, C** | A big enough network is needed, otherwise multi-task can hurt performance. | 2.8 Multi-task Learning |
| 38 | **A single neural network maps the input (e.g. audio) directly to the output (e.g. a transcript), replacing a pipeline of hand-designed stages; it needs a lot of data (e.g. 3,000 vs. 100,000+ hours).** |  | 2.9 What is End-to-end Deep Learning |
| 39 | **B** | Splitting the problem lets each stage use abundant data. | 2.9 What is End-to-end Deep Learning |
| 40 | **A, B** | C and D are the cons. | 2.10 Whether to use End-to-end Deep Learning |
