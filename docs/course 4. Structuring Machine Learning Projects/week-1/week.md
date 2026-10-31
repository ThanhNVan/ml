# Course 4, week 1: Metrics, data splits, and avoidable bias

[Course overview](../course.md) · [Weekly test](<../../../test/course 4. Structuring Machine Learning Projects/week-1/week-test.md>) · [Weekly answers](<../../../test/course 4. Structuring Machine Learning Projects/week-1/week-answers.md>)

## Week at a glance

Metrics and diagnosis. Orthogonalization, single-number and satisficing metrics, dev/test design, human-level performance, and avoidable bias shape the next experiment.

## Detailed notes

- Orthogonalization means selecting controls that target distinct problems: training fit, dev generalization, test behavior, and real-world performance.

- A single-number evaluation metric makes experiments comparable. A satisficing metric sets a minimum acceptable constraint while an optimizing metric ranks feasible models.

- Dev and test data should reflect the intended application distribution. Change a metric or dev set when it no longer rewards the behavior you actually want.

- Human-level performance can provide a practical baseline. The gap from training error to a baseline indicates avoidable bias; the dev−train gap points to variance.

- When performance is poor, pick the next intervention from the measured bottleneck instead of changing many knobs at once.

## Practice and review

For a hypothetical classifier, define one ranking metric, one constraint, a dev/test distribution, and the next experiment given train and dev errors.

**Watch for:** Do not optimize accuracy on a dev set whose examples differ materially from the real task; a precise metric on the wrong distribution misleads.

## Video lessons

- 1. Why ML Strategy: [video](<../../../4. Structuring Machine Learning Projects/week 1/1. Why ML Strategy/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/1. Why ML Strategy/index.vtt>)
- 2. Orthogonalization: [video](<../../../4. Structuring Machine Learning Projects/week 1/2. Orthogonalization/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/2. Orthogonalization/index (1).vtt>)
- 3. Single Number Evaluation Metric: [video](<../../../4. Structuring Machine Learning Projects/week 1/3. Single Number Evaluation Metric/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/3. Single Number Evaluation Metric/index.vtt>)
- 4. Satisficing and Optimizing Metric: [video](<../../../4. Structuring Machine Learning Projects/week 1/4. Satisficing and Optimizing Metric/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/4. Satisficing and Optimizing Metric/index (1).vtt>)
- 5. TrainDevTest Distributions: [video](<../../../4. Structuring Machine Learning Projects/week 1/5. TrainDevTest Distributions/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/5. TrainDevTest Distributions/index.vtt>)
- 6. Size of the Dev and Test Sets: [video](<../../../4. Structuring Machine Learning Projects/week 1/6. Size of the Dev and Test Sets/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/6. Size of the Dev and Test Sets/index (1).vtt>)
- 7. When to Change DevTest Sets and Metrics: [video](<../../../4. Structuring Machine Learning Projects/week 1/7. When to Change DevTest Sets and Metrics/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/7. When to Change DevTest Sets and Metrics/index.vtt>)
- 8. Why Human-level Performance: [video](<../../../4. Structuring Machine Learning Projects/week 1/8. Why Human-level Performance/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/8. Why Human-level Performance/index (1).vtt>)
- 9. Avoidable Bias: [video](<../../../4. Structuring Machine Learning Projects/week 1/9. Avoidable Bias/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/9. Avoidable Bias/index.vtt>)
- 10. Understanding Human-level Performance: [video](<../../../4. Structuring Machine Learning Projects/week 1/10. Understanding Human-level Performance/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/10. Understanding Human-level Performance/index (1).vtt>)
- 11. Surpassing Human-level Performance: [video](<../../../4. Structuring Machine Learning Projects/week 1/11. Surpassing Human-level Performance/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/11. Surpassing Human-level Performance/index.vtt>)
- 12. Improving your Model Performance: [video](<../../../4. Structuring Machine Learning Projects/week 1/12. Improving your Model Performance/index (1).mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/12. Improving your Model Performance/index (1).vtt>)
- 13. Andrej Karpathy Interview: [video](<../../../4. Structuring Machine Learning Projects/week 1/13. Andrej Karpathy Interview/index.mp4>) · [English captions](<../../../4. Structuring Machine Learning Projects/week 1/13. Andrej Karpathy Interview/index.vtt>)
