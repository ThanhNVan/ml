# 🔑 Course 6 — Answer Key
## Sequence Models

> 81 answers with the lesson each question comes from.

## Week 1
*Recurrent neural networks, GRU, LSTM*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 1 | **A, B, C** | Others include DNA sequence analysis, machine translation, video activity recognition and named entity recognition. | 1.1 Why Sequence Models |
| 2 | **B** | The sentence has nine words, and the target y marks which words are part of a person's name. | 1.2 Notation |
| 3 | **length (number of elements/time steps)** | Different examples can have different lengths. | 1.2 Notation |
| 4 | **As a one-hot vector over a vocabulary (e.g. 10,000 words). Unknown words get a special <UNK> token.** |  | 1.2 Notation |
| 5 | **A** | An RNN shares parameters across time steps, like a CNN shares filters across positions. | 1.3 Recurrent Neural Network Model |
| 6 | **zeros** | g is often tanh (or ReLU). | 1.3 Recurrent Neural Network Model |
| 7 | **(100, 10,100) → 1,010,000 weights (plus 100 for b_a)** | W_a stacks W_aa (100×100) and W_ax (100×10,000) side by side. | 1.3 Recurrent Neural Network Model |
| 8 | **True** | For example, it cannot use later words to decide if 'Teddy' in 'Teddy bears are on sale' is a name — that motivates bidirectional RNNs. | 1.3 Recurrent Neural Network Model |
| 9 | **Backpropagation along the unrolled network: the total loss is the sum over time steps L = Σ_t L<t> (cross-entropy per step), and gradients flow backward from the last time step to the first.** |  | 1.4 Backpropagation Through Time |
| 10 | **(1) b, (2) a, (3) c, (4) d** | Many-to-one outputs once at the end; one-to-many feeds its own output as the next input. | 1.5 Different Types of RNNs |
| 11 | **probability (P(y<1>, y<2>, …, y<T>))** | It's used e.g. by speech recognition to choose between 'pair' and 'pear' sentences that sound alike. | 1.6 Language Model and Sequence Generation |
| 12 | **0.02** | P(y1, y2, y3) = P(y1)·P(y2\|y1)·P(y3\|y1,y2) = 0.1 × 0.5 × 0.4 = 0.02. | 1.6 Language Model and Sequence Generation |
| 13 | **True** | After that, x<t> = y<t−1> (the correct previous word is fed in); at the end an <EOS> token marks the end of the sentence. | 1.6 Language Model and Sequence Generation |
| 14 | **Start with x<1> = 0 and a<0> = 0, sample the first word randomly from the softmax distribution ŷ<1>, feed it as the next input, and repeat until <EOS> is sampled or a fixed length is reached.** |  | 1.7 Sampling Novel Sequences |
| 15 | **B** | Its advantage is that it never needs an <UNK> token. | 1.7 Sampling Novel Sequences |
| 16 | **Vanishing gradients: errors from the later words struggle to influence weights at early time steps, so basic RNNs have many local influences and weak long-term dependencies.** |  | 1.8 Vanishing Gradients with RNNs |
| 17 | **A** | Exploding gradients show up as NaNs; vanishing gradients are harder to fix, which motivates GRU and LSTM. | 1.8 Vanishing Gradients with RNNs |
| 18 | **A, B, C** | D describes the LSTM, which has separate update, forget and output gates. | 1.9 Gated Recurrent Unit (GRU) |
| 19 | **c<t> ≈ c<t−1>: the memory cell keeps its old value, which lets the network remember information (e.g. 'cat' is singular) over a long span and helps with vanishing gradients.** |  | 1.9 Gated Recurrent Unit (GRU) |
| 20 | **A, B, C** | The GRU is a simpler model (fewer gates, scales to larger networks), while the LSTM is more powerful and flexible. | 1.10 Long Short Term Memory (LSTM) |
| 21 | **B** | ŷ<t> uses both the forward activation a→<t> and backward activation a←<t>. | 1.11 Bidirectional RNN |
| 22 | **True** | Because of the temporal dimension, deep RNNs are expensive to train. | 1.12 Deep RNNs |

## Week 2
*Natural language processing and word embeddings*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 23 | **A** | A featurized representation (e.g. 300 dimensions) puts similar words close together. | 2.1 Word Representation |
| 24 | **A dense learned vector (e.g. 300 dimensions) that represents a word by features so that similar words have similar vectors; it can be visualized in 2D with t-SNE.** |  | 2.1 Word Representation |
| 25 | **Embeddings learned from a huge unlabeled corpus (e.g. 1–100B words) know that durian and orange are both fruits and farmer ≈ cultivator, so the model generalizes from few labeled examples (transfer learning).** |  | 2.2 Using Word Embeddings |
| 26 | **A, B, C** | Embeddings also reduce the input dimension from 10,000 one-hot to e.g. 300. | 2.2 Using Word Embeddings |
| 27 | **queen** | The embedding difference captures gender; to find the word, maximize sim(e_w, e_king − e_man + e_woman). | 2.3 Properties of Word Embeddings |
| 28 | **[3, 1], matching queen** | 3 − 1 + 1 = 3 and 0 − 0 + 1 = 1. | 2.3 Properties of Word Embeddings |
| 29 | **0.8** | u·v = 4; ‖u‖ = ‖v‖ = √5, so cos = 4/5 = 0.8. | 2.3 Properties of Word Embeddings |
| 30 | **False** | t-SNE is a non-linear mapping to 2D, so the analogy geometry is distorted; the analogies hold in the original high-dimensional space. | 2.3 Properties of Word Embeddings |
| 31 | **300 × 1 (the embedding e_j); 3,000,000 parameters** | E · o_j just selects column j, so in practice you use an embedding lookup instead of a matrix multiplication. | 2.4 Embedding Matrix |
| 32 | **The embedding vectors of the last few words (e.g. 4 words × 300 = 1,200 numbers) are concatenated and fed to a hidden layer, followed by a softmax over the 10,000 vocabulary words that predicts the next word.** |  | 2.5 Learning Word Embeddings |
| 33 | **A, B, C, D** | A simpler context can still learn good embeddings. | 2.5 Learning Word Embeddings |
| 34 | **A** | p(t\|c) = e^{θ_t·e_c} / Σ_j e^{θ_j·e_c}. | 2.6 Word2Vec |
| 35 | **The denominator sums over the whole vocabulary (e.g. 10,000+ words), which is slow for every example. A hierarchical softmax (a tree of binary classifiers) or negative sampling reduces the cost.** |  | 2.6 Word2Vec |
| 36 | **0** | 'orange juice' → 1; 'orange king' → 0 (negative). | 2.7 Negative Sampling |
| 37 | **A** | Each update trains k + 1 binary classifiers instead of a 10,000-way softmax. | 2.7 Negative Sampling |
| 38 | **A** | The model minimizes Σ f(X_ij)(θ_i·e_j + b_i + b'_j − log X_ij)², with f(0) = 0 so that log 0 is never needed. | 2.8 GloVe Word Vectors |
| 39 | **True** | Individual embedding dimensions are not guaranteed to be human-interpretable axes. | 2.8 GloVe Word Vectors |
| 40 | **Averaging the embeddings of the words ignores order and the word 'lacking'; many 'good's push the prediction positive. An RNN (many-to-one) on the embeddings handles word order.** |  | 2.9 Sentiment Classification |
| 41 | **5 × 300 → 1,500 weights** | The averaging step makes the input size independent of review length. | 2.9 Sentiment Classification |
| 42 | **A, B, C** | Word embeddings can reflect biases, such as 'Man : Computer programmer as Woman : Homemaker'. | 2.10 Debiasing Word Embeddings |

## Week 3
*Sequence models and attention mechanism*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 43 | **A** | The same encoder-decoder idea works for image captioning: a ConvNet encodes the image and an RNN generates the caption. | 3.1 Basic Models |
| 44 | **It models P(y \| x), the probability of an output sentence given an input (e.g. French) sentence, so the decoder's initial state comes from the encoder instead of a zero vector.** |  | 3.2 Picking the Most Likely Sentence |
| 45 | **False** | You want the sentence that maximizes P(y\|x) (argmax), not a random sample. | 3.2 Picking the Most Likely Sentence |
| 46 | **Picking the single most likely first word, then the most likely second word and so on may miss a better full sentence (e.g. 'going' beats 'visiting' as the next word but gives a worse overall sentence); and exhaustive search over all sentences is too expensive.** |  | 3.2 Picking the Most Likely Sentence |
| 47 | **30,000** | B × \|V\| = 3 × 10,000: for each of the 3 first-word candidates, all 10,000 second words are evaluated, then the top 3 pairs are kept. | 3.3 Beam Search |
| 48 | **True** | With B = 1 only the single best candidate is kept at every step. | 3.3 Beam Search |
| 49 | **A** | Log is monotonic, so the argmax is the same. | 3.4 Refinements to Beam Search |
| 50 | **About −0.93** | 8^0.7 ≈ 4.29, so −4.0 / 4.29 ≈ −0.93. Without normalization, beam search prefers short sentences. | 3.4 Refinements to Beam Search |
| 51 | **A** | Typical production values are around 10; 100 or 1000+ are used in research. Beam search is approximate — it does not guarantee the exact argmax. | 3.4 Refinements to Beam Search |
| 52 | **The beam search: it failed to find y*, although the RNN gives y* a higher probability. (If P(y*\|x) ≤ P(ŷ\|x), the RNN model would be at fault.)** |  | 3.5 Error Analysis in Beam Search |
| 53 | **reference** | It gives a single-number metric and is a substitute for human evaluation. | 3.6 Bleu Score (Optional) |
| 54 | **2/7 ≈ 0.29** | The count of 'the' is clipped to the max count in any reference (2), so 2 correct out of 7; the plain precision would be 7/7. | 3.6 Bleu Score (Optional) |
| 55 | **It penalizes very short outputs, which would otherwise get a high precision by outputting only a few safe words.** |  | 3.6 Bleu Score (Optional) |
| 56 | **A** | A human translator also translates a part at a time, looking at the relevant words. | 3.7 Attention Model Intuition |
| 57 | **1** | α<t,t'> is the amount of attention y<t> should pay to the activation a<t'>. | 3.8 Attention Model |
| 58 | **0.1** | The weights come from a softmax, so they sum to 1. | 3.8 Attention Model |
| 59 | **A small neural network takes the previous decoder state s<t−1> and the encoder activation a<t'> to produce an energy e<t,t'>, and a softmax over t' gives α<t,t'> = exp(e<t,t'>) / Σ exp(e<t,t'>).** | Its cost is quadratic in T_x · T_y. | 3.8 Attention Model |
| 60 | **The output can have many more characters than words; repeated characters not separated by a blank are collapsed, and blanks are removed. E.g. 'ttt_h_eee___ ___qqq__' becomes 'the q'.** |  | 3.9 Speech Recognition |
| 61 | **Set the labels to 1 for several time steps after the trigger word instead of only one, making the 1s less rare.** |  | 3.10 Trigger Word Detection |

## Week 4
*Transformers*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 62 | **They process a sentence one word at a time (sequentially), which prevents parallelization and makes long sequences slow; the Transformer processes the entire sentence in parallel using attention.** |  | 4.1 Transformer Network Intuition |
| 63 | **A, B** | Self-attention computes context-aware representations; multi-head attention runs several attention computations in parallel. | 4.1 Transformer Network Intuition |
| 64 | **It computes a context-dependent representation: a weighted combination of all word values, where the weights come from comparing the query for 'Afrique' with the keys of all words, so 'Afrique' can be represented as e.g. a destination of a visit.** |  | 4.2 Self-Attention |
| 65 | **V** | q = W^Q x, k = W^K x, v = W^V x. | 4.2 Self-Attention |
| 66 | **v (the value vectors)** | It is a softmax-weighted sum of values. | 4.2 Self-Attention |
| 67 | **A** | The output A3 is the softmax-weighted sum of the value vectors v1, …, v5. | 4.2 Self-Attention |
| 68 | **6** | The output of the encoder is then fed to the decoder block, which is also repeated N times. | 4.4 Transformer Network |
| 69 | **True** | The same word can get different representations in different sentences. | 4.2 Self-Attention |
| 70 | **A** | Each head can be seen as asking a different question about the sentence (e.g. who, what, when). | 4.3 Multi-Head Attention |
| 71 | **O (output projection)** | head_i = Attention(W_i^Q Q, W_i^K K, W_i^V V). | 4.3 Multi-Head Attention |
| 72 | **False** | They are independent, so they can be computed in parallel — a key reason the Transformer is fast. | 4.3 Multi-Head Attention |
| 73 | **A, B, C** | The encoder block is repeated N times (N = 6 in the original paper). | 4.4 Transformer Network |
| 74 | **Self-attention itself ignores word order, so a position-dependent vector (sine and cosine of different frequencies) is added to each word embedding to give the model information about the position in the sentence.** |  | 4.4 Transformer Network |
| 75 | **sin** | Different dimensions i have different frequencies, giving each position a unique pattern. | 4.4 Transformer Network |
| 76 | **A** | Without masking the decoder could copy the answer from the target words it is supposed to predict. | 4.4 Transformer Network |
| 77 | **The queries Q come from the decoder (the output of the masked attention block), while the keys K and values V come from the encoder output.** |  | 4.4 Transformer Network |
| 78 | **A, B, C** | Transformers have no recurrence at all. | 4.4 Transformer Network |
| 79 | **The RNN reads words sequentially and compresses history into a hidden state; the Transformer reads all words at once, in parallel, and lets each word attend directly to every other word, with position information added through positional encoding.** |  | 4.4 Transformer Network |
| 80 | **(1) a, (2) b, (3) c, (4) d** | Attention scores are the query-key dot products, and the output is the weighted values. | 4.2 Self-Attention |
| 81 | **True** | The conclusion video summarizes the whole specialization: neural networks, improving them, structuring projects, CNNs and sequence models. | 4.5 Conclusion and Thank You! |
