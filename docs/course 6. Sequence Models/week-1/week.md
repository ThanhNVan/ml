# Course 6, week 1: Recurrent sequence models

[Course overview](../course.md) · [Weekly test](<../../../test/course 6. Sequence Models/week-1/week-test.md>) · [Weekly answers](<../../../test/course 6. Sequence Models/week-1/week-answers.md>)

## Week at a glance

Recurrent models. RNNs, backpropagation through time, language modeling, gradient problems, GRUs, LSTMs, bidirectionality, and depth establish sequence modeling.

## Detailed notes

- Sequence tasks have variable-length inputs and outputs. An RNN shares parameters across time and updates hidden state from the current input and previous state.

- Backpropagation through time unfolds the recurrent computation. Long paths can cause vanishing or exploding gradients, making distant dependencies difficult to learn.

- Language models predict a next token from context; sampling repeatedly draws a token and feeds it back to generate a sequence. Training and generation follow different data flows.

- GRUs and LSTMs use gates to control information retention and updates. Bidirectional RNNs use past and future context when the full input is available; deep RNNs stack recurrent layers.

- Different input/output patterns cover classification, many-to-many labeling, and generation. Pick a pattern from the task's target structure.

## Practice and review

Unroll a three-token RNN, label the shared parameters and hidden states, and explain why a bidirectional model cannot stream with full future context.

**Watch for:** Do not assign new weights at every time step; temporal weight sharing is central to the basic RNN.

## Video lessons

- 1. Why Sequence Models: [video](<../../../6. Sequence Models/week 1/1. Why Sequence Models/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 1/1. Why Sequence Models/index (1).vtt>)
- 2. Notation: [video](<../../../6. Sequence Models/week 1/2. Notation/index.mp4>) · [English captions](<../../../6. Sequence Models/week 1/2. Notation/index.vtt>)
- 3. Recurrent Neural Network Model: [video](<../../../6. Sequence Models/week 1/3. Recurrent Neural Network Model/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 1/3. Recurrent Neural Network Model/index (1).vtt>)
- 4. Backpropagation Through Time: [video](<../../../6. Sequence Models/week 1/4. Backpropagation Through Time/index.mp4>) · [English captions](<../../../6. Sequence Models/week 1/4. Backpropagation Through Time/index.vtt>)
- 5. Different Types of RNNs: [video](<../../../6. Sequence Models/week 1/5. Different Types of RNNs/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 1/5. Different Types of RNNs/index (1).vtt>)
- 6. Language Model and Sequence Generation: [video](<../../../6. Sequence Models/week 1/6. Language Model and Sequence Generation/index.mp4>) · [English captions](<../../../6. Sequence Models/week 1/6. Language Model and Sequence Generation/index.vtt>)
- 7. Sampling Novel Sequences: [video](<../../../6. Sequence Models/week 1/7. Sampling Novel Sequences/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 1/7. Sampling Novel Sequences/index (1).vtt>)
- 8. Vanishing Gradients with RNNs: [video](<../../../6. Sequence Models/week 1/8. Vanishing Gradients with RNNs/index.mp4>) · [English captions](<../../../6. Sequence Models/week 1/8. Vanishing Gradients with RNNs/index.vtt>)
- 9. Gated Recurrent Unit (GRU): [video](<../../../6. Sequence Models/week 1/9. Gated Recurrent Unit (GRU)/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 1/9. Gated Recurrent Unit (GRU)/index (1).vtt>)
- 10. Long Short Term Memory (LSTM): [video](<../../../6. Sequence Models/week 1/10. Long Short Term Memory (LSTM)/index.mp4>) · [English captions](<../../../6. Sequence Models/week 1/10. Long Short Term Memory (LSTM)/index.vtt>)
- 11. Bidirectional RNN: [video](<../../../6. Sequence Models/week 1/11. Bidirectional RNN/index (1).mp4>) · [English captions](<../../../6. Sequence Models/week 1/11. Bidirectional RNN/index (1).vtt>)
- 12. Deep RNNs: [video](<../../../6. Sequence Models/week 1/12. Deep RNNs/index.mp4>) · [English captions](<../../../6. Sequence Models/week 1/12. Deep RNNs/index.vtt>)
