# Course 4, week 2: Error analysis and data strategy

[Course overview](../course.md) · [Weekly test](<../../../test/course 4. Structuring Machine Learning Projects/week-2/week-test.md>) · [Weekly answers](<../../../test/course 4. Structuring Machine Learning Projects/week-2/week-answers.md>)

## Week at a glance

Iteration and transfer. Error analysis, label quality, distribution mismatch, transfer learning, multitask learning, and end-to-end learning guide project decisions.

## Detailed notes

- Inspect a sample of dev errors and tally categories. The maximum possible gain from fixing a category bounds whether an intervention is worth the effort.

- Consider label errors in the dev set when they materially affect evaluation, and apply a consistent correction policy. Start with a working system, then iterate using observed errors.

- When training and dev distributions differ, use a train-dev set drawn from the training distribution to separate variance from data mismatch.

- Transfer learning reuses learned features for a related task; multitask learning trains shared representations for several tasks. Their value depends on data and task relationships.

- End-to-end learning can replace hand-designed pipeline stages when sufficient labeled data covers the complete mapping; modular stages can remain useful with limited data or explicit constraints.

## Practice and review

Build an error-analysis table with category counts and estimated ceiling gains. Explain how train, train-dev, and dev errors diagnose mismatch.

**Watch for:** Do not assume that more training data from a mismatched distribution will necessarily solve dev-set errors.

## Video lessons

- 1. Carrying Out Error Analysis: [video](<../../../4. Structuring Machine Learning Projects/week 2/1. Carrying Out Error Analysis/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/1. Carrying Out Error Analysis/index.vtt>)
- 2. Cleaning Up Incorrectly Labeled Data: [video](<../../../4. Structuring Machine Learning Projects/week 2/2. Cleaning Up Incorrectly Labeled Data/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/2. Cleaning Up Incorrectly Labeled Data/index (1).vtt>)
- 3. Build your First System Quickly, then Iterate: [video](<../../../4. Structuring Machine Learning Projects/week 2/3. Build your First System Quickly, then Iterate/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/3. Build your First System Quickly, then Iterate/index.vtt>)
- 4. Training and Testing on Different Distributions: [video](<../../../4. Structuring Machine Learning Projects/week 2/4. Training and Testing on Different Distributions/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/4. Training and Testing on Different Distributions/index (1).vtt>)
- 5. Bias and Variance with Mismatched Data Distributions: [video](<../../../4. Structuring Machine Learning Projects/week 2/5. Bias and Variance with Mismatched Data Distributions/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/5. Bias and Variance with Mismatched Data Distributions/index.vtt>)
- 6. Addressing Data Mismatch: [video](<../../../4. Structuring Machine Learning Projects/week 2/6. Addressing Data Mismatch/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/6. Addressing Data Mismatch/index (1).vtt>)
- 7. Transfer Learning: [video](<../../../4. Structuring Machine Learning Projects/week 2/7. Transfer Learning/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/7. Transfer Learning/index.vtt>)
- 8. Multi-task Learning: [video](<../../../4. Structuring Machine Learning Projects/week 2/8. Multi-task Learning/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/8. Multi-task Learning/index (1).vtt>)
- 9. What is End-to-end Deep Learning: [video](<../../../4. Structuring Machine Learning Projects/week 2/9. What is End-to-end Deep Learning/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/9. What is End-to-end Deep Learning/index.vtt>)
- 10. Whether to use End-to-end Deep Learning: [video](<../../../4. Structuring Machine Learning Projects/week 2/10. Whether to use End-to-end Deep Learning/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/10. Whether to use End-to-end Deep Learning/index (1).vtt>)
- 11. Ruslan Salakhutdinov Interview: [video](<../../../4. Structuring Machine Learning Projects/week 2/11. Ruslan Salakhutdinov Interview/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 2/11. Ruslan Salakhutdinov Interview/index.vtt>)
