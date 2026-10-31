# Course 6, week 3: Sequence-to-sequence decoding and attention

[Course overview](../course.md) · [Weekly test](<../../../test/course 6. Sequence Models/week-3/week-test.md>) · [Weekly answers](<../../../test/course 6. Sequence Models/week-3/week-answers.md>)

## Week at a glance

Sequence-to-sequence tasks. Beam search, BLEU, attention, speech recognition, and trigger-word detection introduce structured sequence outputs.

## Detailed notes

- Encoder-decoder models transform an input sequence into an output sequence. Greedy decoding picks the next best token locally, which need not yield the best whole sentence.

- Beam search keeps several partial hypotheses. Beam width trades computation for search quality; length normalization can reduce a preference for short outputs.

- Error analysis separates model problems from search problems by comparing the reference output's score with the decoder's chosen output. BLEU provides an n-gram based translation metric, with limits.

- Attention lets a decoder weight different encoder states at each output step, rather than relying on one fixed summary. This is especially useful for long inputs.

- Speech recognition maps audio features to text, while trigger-word detection identifies a target phrase in an audio stream; their output formats differ.

## Practice and review

Run a small beam-search example with width two and calculate two candidate sequence scores; sketch attention weights for one translated word.

**Watch for:** Do not assume a higher beam width always fixes a model with poor conditional probabilities, or treat BLEU as a complete quality judgment.

## Video lessons

- 1. Basic Models: [video](<../../../6. Sequence Models/week 3/1. Basic Models/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 3/1. Basic Models/index (1).vtt>)
- 2. Picking the Most Likely Sentence: [video](<../../../6. Sequence Models/week 3/2. Picking the Most Likely Sentence/index.mp4>) · [English captions](<../../../6. Sequence Models/week 3/2. Picking the Most Likely Sentence/index.vtt>)
- 3. Beam Search: [video](<../../../6. Sequence Models/week 3/3. Beam Search/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 3/3. Beam Search/index (1).vtt>)
- 4. Refinements to Beam Search: [video](<../../../6. Sequence Models/week 3/4. Refinements to Beam Search/index.mp4>) · [English captions](<../../../6. Sequence Models/week 3/4. Refinements to Beam Search/index.vtt>)
- 5. Error Analysis in Beam Search: [video](<../../../6. Sequence Models/week 3/5. Error Analysis in Beam Search/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 3/5. Error Analysis in Beam Search/index (1).vtt>)
- 6. Bleu Score (Optional): [video](<../../../6. Sequence Models/week 3/6. Bleu Score (Optional)/index.mp4>) · [English captions](<../../../6. Sequence Models/week 3/6. Bleu Score (Optional)/index.vtt>)
- 7. Attention Model Intuition: [video](<../../../6. Sequence Models/week 3/7. Attention Model Intuition/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 3/7. Attention Model Intuition/index (1).vtt>)
- 8. Attention Model: [video](<../../../6. Sequence Models/week 3/8. Attention Model/index.mp4>) · [English captions](<../../../6. Sequence Models/week 3/8. Attention Model/index.vtt>)
- 9. Speech Recognition: [video](<../../../6. Sequence Models/week 3/9. Speech Recognition/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 3/9. Speech Recognition/index (1).vtt>)
- 10. Trigger Word Detection: [video](<../../../6. Sequence Models/week 3/10. Trigger Word Detection/index.mp4>) · [English captions](<../../../6. Sequence Models/week 3/10. Trigger Word Detection/index.vtt>)
