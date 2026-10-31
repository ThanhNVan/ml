# Course 6, week 4: Self-attention and transformers

[Course overview](../course.md) · [Weekly test](<../../../test/course 6. Sequence Models/week-4/week-test.md>) · [Weekly answers](<../../../test/course 6. Sequence Models/week-4/week-answers.md>)

## Week at a glance

Transformers. Self-attention, multiple attention heads, and the transformer stack replace recurrence with context-sensitive interactions.

## Detailed notes

- Self-attention lets each token gather information from other positions in the same sequence. Queries, keys, and values are learned projections of token representations.

- Scaled dot-product attention computes softmax(QKᵀ/√dₖ)V. The softmax weights indicate which value vectors each query combines.

- Multi-head attention runs several projections in parallel so different heads can learn different relationships, then concatenates and projects their results.

- A transformer block combines attention with feed-forward layers, residual connections, and normalization. Position information is required because attention alone has no inherent order.

- Encoder and decoder roles depend on the task; causal masking prevents a generation model from attending to future tokens during next-token prediction.

## Practice and review

For three tokens, make a 3×3 attention-weight diagram and identify which entries a causal mask would hide.

**Watch for:** Do not interpret attention weights as a guaranteed explanation of the model's entire decision, or omit positional information when order matters.

## Video lessons

- 1. Transformer Network Intuition: [video](<../../../6. Sequence Models/week 4/1. Transformer Network Intuition/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 4/1. Transformer Network Intuition/index (1).vtt>)
- 2. Self-Attention: [video](<../../../6. Sequence Models/week 4/2. Self-Attention/index.mp4>) · [English captions](<../../../6. Sequence Models/week 4/2. Self-Attention/index.vtt>)
- 3. Multi-Head Attention: [video](<../../../6. Sequence Models/week 4/3. Multi-Head Attention/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 4/3. Multi-Head Attention/index (1).vtt>)
- 4. Transformer Network: [video](<../../../6. Sequence Models/week 4/4. Transformer Network/index.mp4>) · [English captions](<../../../6. Sequence Models/week 4/4. Transformer Network/index.vtt>)
- 5. Conclusion and Thank You!: [video](<../../../6. Sequence Models/week 4/5. Conclusion and Thank You!/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 4/5. Conclusion and Thank You!/index (1).vtt>)
