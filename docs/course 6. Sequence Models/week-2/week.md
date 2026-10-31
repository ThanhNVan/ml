# Course 6, week 2: Word vectors and embeddings

[Course overview](../course.md) · [Weekly test](<../../../test/course 6. Sequence Models/week-2/week-test.md>) · [Weekly answers](<../../../test/course 6. Sequence Models/week-2/week-answers.md>)

## Week at a glance

Word embeddings. Distributed word representations, Word2Vec, negative sampling, GloVe, sentiment classification, and debiasing cover semantic features.

## Detailed notes

- One-hot words are sparse and do not encode similarity. A learned embedding maps each vocabulary item to a dense vector; columns of an embedding matrix can be retrieved by token index.

- Embeddings can capture useful semantic relationships and support transfer to tasks such as sentiment classification. Similarity in embedding space is learned from the training objective, not guaranteed by word spelling.

- Word2Vec learns from context; negative sampling replaces a costly full-vocabulary prediction with positive and sampled negative pairs. GloVe uses global co-occurrence statistics.

- An embedding can inherit social bias from data. The debiasing lecture examines identifying a direction and reducing unwanted associations while preserving useful information.

- Out-of-vocabulary handling, context, and word sense affect downstream performance; a single static vector cannot represent every meaning of a word.

## Practice and review

Draw the embedding lookup for a four-token sentence and explain what a negative sample represents in Word2Vec.

**Watch for:** Do not interpret a word-vector analogy as proof of unbiased or universally correct semantics.

## Video lessons

- 1. Word Representation: [video](<../../../6. Sequence Models/week 2/1. Word Representation/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 2/1. Word Representation/index (1).vtt>)
- 2. Using Word Embeddings: [video](<../../../6. Sequence Models/week 2/2. Using Word Embeddings/index.mp4>) · [English captions](<../../../6. Sequence Models/week 2/2. Using Word Embeddings/index.vtt>)
- 3. Properties of Word Embeddings: [video](<../../../6. Sequence Models/week 2/3. Properties of Word Embeddings/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 2/3. Properties of Word Embeddings/index (1).vtt>)
- 4. Embedding Matrix: [video](<../../../6. Sequence Models/week 2/4. Embedding Matrix/index.mp4>) · [English captions](<../../../6. Sequence Models/week 2/4. Embedding Matrix/index.vtt>)
- 5. Learning Word Embeddings: [video](<../../../6. Sequence Models/week 2/5. Learning Word Embeddings/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 2/5. Learning Word Embeddings/index (1).vtt>)
- 6. Word2Vec: [video](<../../../6. Sequence Models/week 2/6. Word2Vec/index.mp4>) · [English captions](<../../../6. Sequence Models/week 2/6. Word2Vec/index.vtt>)
- 7. Negative Sampling: [video](<../../../6. Sequence Models/week 2/7. Negative Sampling/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 2/7. Negative Sampling/index (1).vtt>)
- 8. GloVe Word Vectors: [video](<../../../6. Sequence Models/week 2/8. GloVe Word Vectors/index.mp4>) · [English captions](<../../../6. Sequence Models/week 2/8. GloVe Word Vectors/index.vtt>)
- 9. Sentiment Classification: [video](<../../../6. Sequence Models/week 2/9. Sentiment Classification/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 2/9. Sentiment Classification/index (1).vtt>)
- 10. Debiasing Word Embeddings: [video](<../../../6. Sequence Models/week 2/10. Debiasing Word Embeddings/index.mp4>) · [English captions](<../../../6. Sequence Models/week 2/10. Debiasing Word Embeddings/index.vtt>)
