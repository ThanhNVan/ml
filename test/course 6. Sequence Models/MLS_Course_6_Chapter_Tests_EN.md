# 📘 Deep Learning Specialization — Course 6
## Sequence Models — Chapter Tests

> **81 questions** across 4 weeks · Based only on the lecture videos. Answers are in the separate answer key file.

| Week | Topic | Questions |
|---|---|---|
| [Week 1](#week-1) | Recurrent neural networks, GRU, LSTM | 1–22 |
| [Week 2](#week-2) | Natural language processing and word embeddings | 23–42 |
| [Week 3](#week-3) | Sequence models and attention mechanism | 43–61 |
| [Week 4](#week-4) | Transformers | 62–81 |

**Question types:** 🔘 Multiple choice · ✅ True / False · ✏️ Fill in · 🧮 Calculation · 💬 Short answer · ☑️ Select all · 🔗 Matching · 🎯 Scenario

---

## Week 1
*Recurrent neural networks, GRU, LSTM*

### Question 1 &nbsp; `☑️ Select all`

Which of these tasks are examples of sequence-model problems named in the lecture?

- A. Speech recognition
- B. Music generation
- C. Sentiment classification
- D. Edge detection in a single image

---

### Question 2 &nbsp; `🔘 Multiple choice`

In the named-entity example 'Harry Potter and Hermione Granger invented a new spell', how many words are there in the input sequence (T_x)?

- A. 7
- B. 9
- C. 11
- D. 5

---

### Question 3 &nbsp; `✏️ Fill in`

The notation x^(i)<t> means the t-th element of the i-th training example, and T_x^(i) is the ____ of that example.

---

### Question 4 &nbsp; `💬 Short answer`

How is a word represented as input in the lecture, and what do you do with a word that is not in the vocabulary?

---

### Question 5 &nbsp; `🔘 Multiple choice`

Why not feed a sentence to a standard (non-recurrent) neural network?

- A. Inputs and outputs can have different lengths in different examples, and features learned at one position are not shared across positions
- B. Standard networks cannot use softmax
- C. Words cannot be vectors
- D. It needs more GPUs

---

### Question 6 &nbsp; `✏️ Fill in`

In an RNN, the activation is a<t> = g(W_aa·a<t−1> + W_ax·x<t> + b_a), and the starting hidden state a<0> is usually a vector of ____.

---

### Question 7 &nbsp; `🧮 Calculation`

An RNN has n_a = 100 hidden units and one-hot inputs with n_x = 10,000. Using the compact form a<t> = g(W_a [a<t−1>, x<t>] + b_a), what is the shape of W_a, and how many weights does it have?

---

### Question 8 &nbsp; `✅ True / False`

A unidirectional RNN prediction at time t uses only information from the inputs before and including time t.

---

### Question 9 &nbsp; `💬 Short answer`

What is 'backpropagation through time'?

---

### Question 10 &nbsp; `🔗 Matching`

Match each task to its RNN architecture: (1) sentiment classification, (2) music generation from a genre, (3) named entity recognition, (4) machine translation. Options: (a) one-to-many, (b) many-to-one, (c) many-to-many with T_x = T_y, (d) many-to-many with T_x ≠ T_y (encoder-decoder).

---

### Question 11 &nbsp; `✏️ Fill in`

A language model estimates ____ of a sequence of words, i.e. how likely a sentence is.

---

### Question 12 &nbsp; `🧮 Calculation`

A language model gives P(y1) = 0.1, P(y2 | y1) = 0.5 and P(y3 | y1, y2) = 0.4. What is the probability of the 3-word sentence?

---

### Question 13 &nbsp; `✅ True / False`

When training a language model, the input x<1> at the first time step is the zero vector.

---

### Question 14 &nbsp; `💬 Short answer`

How do you sample a novel sentence from a trained RNN language model?

---

### Question 15 &nbsp; `🔘 Multiple choice`

What is one disadvantage of a character-level language model compared to a word-level one?

- A. It cannot handle unknown words
- B. It produces much longer sequences and is worse at capturing long-range dependencies and more expensive to train
- C. It needs a vocabulary of a million words
- D. It cannot be sampled

---

### Question 16 &nbsp; `🎯 Scenario`

In 'The cat, which already ate …, was full' versus 'The cats, which already ate …, were full', the verb depends on a word far earlier. Which RNN problem makes this hard to learn?

---

### Question 17 &nbsp; `🔘 Multiple choice`

What is the usual fix for exploding gradients in RNNs?

- A. Gradient clipping: rescale gradient vectors that exceed a threshold
- B. Add more layers
- C. Use one-hot vectors
- D. Lower the vocabulary size

---

### Question 18 &nbsp; `☑️ Select all`

Which equations belong to the GRU?

- A. c<t> = Γ_u · c̃<t> + (1 − Γ_u) · c<t−1>
- B. Γ_u = σ(W_u[c<t−1>, x<t>] + b_u)
- C. c̃<t> = tanh(W_c[Γ_r · c<t−1>, x<t>] + b_c)
- D. a<t> = Γ_o · tanh(c<t>) with separate forget and update gates

---

### Question 19 &nbsp; `💬 Short answer`

In a GRU, what does the update gate Γ_u do when it is (nearly) 0 for many time steps?

---

### Question 20 &nbsp; `☑️ Select all`

How does an LSTM differ from a GRU?

- A. It has three gates: update, forget and output
- B. c<t> = Γ_u · c̃<t> + Γ_f · c<t−1>
- C. a<t> = Γ_o · tanh(c<t>), so a<t> ≠ c<t>
- D. It has fewer parameters than a GRU

---

### Question 21 &nbsp; `🔘 Multiple choice`

What is the main limitation of a bidirectional RNN (BRNN)?

- A. It cannot be combined with LSTM units
- B. It needs the entire sequence before making predictions, e.g. the full utterance in real-time speech recognition
- C. It has no parameters
- D. It only works for images

---

### Question 22 &nbsp; `✅ True / False`

For RNNs, stacking 3 recurrent layers is already considered quite deep, and deep RNNs are often followed by a few non-recurrent layers.

---

## Week 2
*Natural language processing and word embeddings*

### Question 23 &nbsp; `🔘 Multiple choice`

Why is one-hot representation a weak way to represent words?

- A. The inner product of any two different one-hot vectors is 0, so it does not capture that 'orange' and 'apple' are more similar than 'orange' and 'king'
- B. It is too short
- C. It can't be fed to an RNN
- D. It uses too little memory

---

### Question 24 &nbsp; `💬 Short answer`

What is a word embedding?

---

### Question 25 &nbsp; `🎯 Scenario`

'Sally Johnson is an orange farmer' is labeled for name recognition and your labeled set is small. 'Robert Lin is a durian cultivator' is unseen. How do word embeddings help?

---

### Question 26 &nbsp; `☑️ Select all`

How can you use pre-trained embeddings for a new task?

- A. Take embeddings pre-trained on a large unlabeled text corpus
- B. Transfer them to the new task with a smaller labeled training set
- C. Optionally fine-tune the embeddings if your labeled set is large
- D. Never use them with a small dataset

---

### Question 27 &nbsp; `✏️ Fill in`

Analogy property: e_man − e_woman ≈ e_king − e_____.

---

### Question 28 &nbsp; `🧮 Calculation`

Using 2-D embeddings man = [1, 0], woman = [1, 1], king = [3, 0] and queen = [3, 1], what is e_king − e_man + e_woman, and which word does it match?

---

### Question 29 &nbsp; `🧮 Calculation`

Compute the cosine similarity of u = [2, 1] and v = [1, 2].

---

### Question 30 &nbsp; `✅ True / False`

After a t-SNE visualization, the parallelogram relationship between analogy words can be relied on.

---

### Question 31 &nbsp; `🧮 Calculation`

An embedding matrix E has 300 rows and a vocabulary of 10,000 columns. What is the shape of E · o_j (o_j is a one-hot vector), and how many parameters does E have?

---

### Question 32 &nbsp; `💬 Short answer`

In the neural language model for learning embeddings, what is fed into the hidden layer, and what is the output?

---

### Question 33 &nbsp; `☑️ Select all`

Which choices of 'context' can be used to learn word embeddings?

- A. The last 4 words
- B. 4 words on the left and right of the target
- C. The last 1 word
- D. A nearby single word (skip-gram)

---

### Question 34 &nbsp; `🔘 Multiple choice`

In the skip-gram model of Word2Vec:

- A. A context word c is chosen and the target t is a word sampled within a window around it
- B. The target is always the next word
- C. There is no softmax
- D. The embeddings are fixed

---

### Question 35 &nbsp; `💬 Short answer`

What is the computational problem of the skip-gram softmax, and a way to address it?

---

### Question 36 &nbsp; `✏️ Fill in`

Negative sampling turns the problem into binary classification: given a (context, word) pair, the label is 1 for a true pair and ____ for k randomly chosen words.

---

### Question 37 &nbsp; `🔘 Multiple choice`

How many negative examples k per positive example does the lecture recommend for a small dataset versus a large one?

- A. 5–20 for small, 2–5 for large
- B. 1 for small, 100 for large
- C. 100 for small, 1 for large
- D. Always 0

---

### Question 38 &nbsp; `🔘 Multiple choice`

In GloVe, X_ij counts:

- A. How many times word j appears in the context of word i
- B. The length of word i
- C. The embedding of j
- D. The learning rate

---

### Question 39 &nbsp; `✅ True / False`

In GloVe, θ and e play symmetric roles, so the final embedding can be taken as the average (e + θ) / 2.

---

### Question 40 &nbsp; `💬 Short answer`

Why does an averaging sentiment classifier fail on 'Completely lacking in good taste, good service and good ambience'?

---

### Question 41 &nbsp; `🧮 Calculation`

A sentiment model averages 300-d embeddings and feeds the average to a softmax with 5 outputs (1–5 stars). What is the shape of the softmax weight matrix, and how many weights?

---

### Question 42 &nbsp; `☑️ Select all`

Which are steps of the debiasing procedure described in the lecture?

- A. Identify the bias direction (e.g. gender) with the differences of word pairs
- B. Neutralize: project non-definitional words (e.g. doctor) onto the orthogonal space
- C. Equalize pairs such as grandmother/grandfather to be equidistant from neutral words
- D. Delete half of the vocabulary

---

## Week 3
*Sequence models and attention mechanism*

### Question 43 &nbsp; `🔘 Multiple choice`

What does an encoder-decoder sequence-to-sequence model for translation do?

- A. An encoder RNN reads the source sentence into a vector, and a decoder RNN generates the translation from that vector
- B. One RNN only
- C. It translates word by word without context
- D. It doesn't use RNNs

---

### Question 44 &nbsp; `💬 Short answer`

How does a conditional language model differ from a language model, and how is it used in machine translation?

---

### Question 45 &nbsp; `✅ True / False`

For machine translation you should sample a translation at random from P(y | x) since this gives the best results.

---

### Question 46 &nbsp; `💬 Short answer`

Why is greedy search not a good way to find the best translation?

---

### Question 47 &nbsp; `🧮 Calculation`

Beam search with beam width B = 3 and a vocabulary of 10,000 words. At step 2, how many candidate (word 1, word 2) pairs are scored?

---

### Question 48 &nbsp; `✅ True / False`

Beam search with B = 1 is equal to greedy search.

---

### Question 49 &nbsp; `🔘 Multiple choice`

Why do implementations of beam search maximize Σ log P(y<t> | x, y<1…t−1>) instead of the product of probabilities?

- A. The product of many numbers below 1 can underflow numerically, but a sum of logs is stable
- B. Logs are slower
- C. The product is not defined
- D. It lowers B

---

### Question 50 &nbsp; `🧮 Calculation`

Length normalization with α = 0.7: a hypothesis has Σ log P = −4.0 and T_y = 8 words. What is its normalized score (1/T_y^α) · Σ log P?

---

### Question 51 &nbsp; `🔘 Multiple choice`

Which statement about the beam width B is correct?

- A. Larger B gives better results but is slower and uses more memory
- B. B must be 1
- C. Larger B is always faster
- D. B has no effect

---

### Question 52 &nbsp; `🎯 Scenario`

Error analysis: for a development example the human translation y* has P(y*|x) = 2×10⁻¹⁰ while the model's output ŷ has P(ŷ|x) = 1×10⁻¹⁰. Which component is at fault?

---

### Question 53 &nbsp; `✏️ Fill in`

BLEU score evaluates machine translation by comparing the output with one or more human ____ translations and computing modified n-gram precision.

---

### Question 54 &nbsp; `🧮 Calculation`

Reference: 'The cat is on the mat' and 'There is a cat on the mat'. The MT output is 'the the the the the the the' (7 words). The word 'the' appears at most 2 times in a single reference. What is the modified (clipped) unigram precision?

---

### Question 55 &nbsp; `💬 Short answer`

What is the role of the brevity penalty (BP) in BLEU?

---

### Question 56 &nbsp; `🔘 Multiple choice`

What problem does the attention model address?

- A. The encoder-decoder's single fixed vector struggles to memorize long sentences, so BLEU drops with sentence length
- B. Overfitting
- C. Slow GPUs
- D. Tokenization

---

### Question 57 &nbsp; `✏️ Fill in`

In the attention model, the context c<t> = Σ_{t'} α<t,t'> · a<t'>, and the attention weights satisfy Σ_{t'} α<t,t'> = ____.

---

### Question 58 &nbsp; `🧮 Calculation`

A decoder step has attention weights 0.7 and 0.2 on two of three input positions. What is the weight on the third?

---

### Question 59 &nbsp; `💬 Short answer`

How are the attention weights α<t,t'> computed?

---

### Question 60 &nbsp; `💬 Short answer`

What is the CTC cost's collapsing rule for speech recognition?

---

### Question 61 &nbsp; `🎯 Scenario`

For trigger word detection, the training labels are 0 for most time steps and 1 right after the trigger word, so the data are very imbalanced. What trick does the lecture suggest?

---

## Week 4
*Transformers*

### Question 62 &nbsp; `💬 Short answer`

What drawback of RNN, GRU and LSTM models motivates the Transformer?

---

### Question 63 &nbsp; `☑️ Select all`

Which two ideas are the key building blocks of the Transformer?

- A. Self-attention
- B. Multi-head attention
- C. Pooling layers
- D. Gradient clipping

---

### Question 64 &nbsp; `🎯 Scenario`

In 'Jane visite l'Afrique en septembre', what does self-attention do for the word 'Afrique'?

---

### Question 65 &nbsp; `✏️ Fill in`

Each word gets three vectors: a query q, a key k and a value v, computed by multiplying its embedding by the learned matrices W^Q, W^K and W^____.

---

### Question 66 &nbsp; `✏️ Fill in`

The attention output for query q is A(q, K, V) = Σ_i [exp(q · k<i>) / Σ_j exp(q · k<j>)] · ____<i>.

---

### Question 67 &nbsp; `🔘 Multiple choice`

For the word l'Afrique (position 3), how are the attention weights over the five words computed?

- A. A softmax over the dot products q3·k1, …, q3·k5
- B. A random choice
- C. By averaging the values with equal weights
- D. By sorting the words alphabetically

---

### Question 68 &nbsp; `✏️ Fill in`

In the Transformer paper, the encoder block is repeated N times, where a typical value of N is ____.

---

### Question 69 &nbsp; `✅ True / False`

In self-attention, the representation of a word depends on the surrounding words, unlike a fixed Word2Vec/GloVe embedding.

---

### Question 70 &nbsp; `🔘 Multiple choice`

What is multi-head attention?

- A. Computing self-attention several times in parallel with different learned projections W_i^Q, W_i^K, W_i^V, then concatenating the heads
- B. Using several GPUs
- C. A single attention head with a longer vector
- D. Attention over images only

---

### Question 71 &nbsp; `✏️ Fill in`

The output of multi-head attention is MultiHead(Q,K,V) = concat(head_1, …, head_h) · W^____.

---

### Question 72 &nbsp; `✅ True / False`

The heads in multi-head attention must be computed one after another, since each head needs the previous head's output.

---

### Question 73 &nbsp; `☑️ Select all`

Which parts are in a Transformer encoder block?

- A. Multi-head self-attention
- B. Add & Norm (residual connection plus layer normalization)
- C. A feed-forward network
- D. A beam search layer

---

### Question 74 &nbsp; `💬 Short answer`

Why does the Transformer need positional encoding?

---

### Question 75 &nbsp; `✏️ Fill in`

Positional encoding uses PE(pos, 2i) = ____(pos / 10000^(2i/d)) and the cosine for odd dimensions.

---

### Question 76 &nbsp; `🔘 Multiple choice`

What is the purpose of the masked multi-head attention in the decoder?

- A. During training, it hides the following words so each output position attends only to earlier output words (mimicking generation)
- B. To hide the encoder
- C. To drop the weights
- D. To pad sequences

---

### Question 77 &nbsp; `🎯 Scenario`

In the decoder's second multi-head attention block, where do the queries, keys and values come from?

---

### Question 78 &nbsp; `☑️ Select all`

Which statements about the Transformer architecture are correct?

- A. Residual connections and layer norm are used around sublayers
- B. A final linear layer and softmax predict the next word
- C. The decoder blocks are also repeated N times
- D. The Transformer contains recurrent units

---

### Question 79 &nbsp; `💬 Short answer`

Name two differences between how an RNN encoder-decoder and a Transformer compute a representation for the whole input sentence.

---

### Question 80 &nbsp; `🔗 Matching`

Match each term to its role: (1) query, (2) key, (3) value, (4) positional encoding. Roles: (a) what a word is looking for, (b) what a word offers to be matched against, (c) the information that gets mixed into the output, (d) adds word-order information.

---

### Question 81 &nbsp; `✅ True / False`

The course notes that the sequence-model material covered (RNN, GRU, LSTM, attention) gives you the basis for modern sequence applications and the Transformer.

---
