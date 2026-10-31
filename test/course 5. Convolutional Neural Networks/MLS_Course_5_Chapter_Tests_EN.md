# 📘 Deep Learning Specialization — Course 5
## Convolutional Neural Networks — Chapter Tests

> **80 questions** across 4 weeks · Based only on the lecture videos. Answers are in the separate answer key file.

| Week | Topic | Questions |
|---|---|---|
| [Week 1](#week-1) | Foundations of convolutional neural networks | 1–20 |
| [Week 2](#week-2) | Deep convolutional models: case studies | 21–40 |
| [Week 3](#week-3) | Object detection | 41–60 |
| [Week 4](#week-4) | Face recognition and neural style transfer | 61–80 |

**Question types:** 🔘 Multiple choice · ✅ True / False · ✏️ Fill in · 🧮 Calculation · 💬 Short answer · ☑️ Select all · 🔗 Matching · 🎯 Scenario

---

## Week 1
*Foundations of convolutional neural networks*

### Question 1 &nbsp; `🧮 Calculation`

You convolve a 6×6 image with a 3×3 filter, with no padding and stride 1. What is the output size?

---

### Question 2 &nbsp; `🧮 Calculation`

A 6×6 image has 10s in its three left columns and 0s in its three right columns. You apply the vertical edge filter [1 0 −1; 1 0 −1; 1 0 −1] at a position covering columns 2–4 (values 10, 10, 0). What value do you get?

---

### Question 3 &nbsp; `🔘 Multiple choice`

What is the main idea behind learning the filter weights of a CNN instead of hand-picking an edge detector?

- A. The nine filter values are treated as parameters w1…w9 learned by backpropagation
- B. The filter must always be the Sobel filter
- C. Filters are fixed to detect only vertical edges
- D. Filters are applied only at test time

---

### Question 4 &nbsp; `✏️ Fill in`

The two classic hand-designed edge filters mentioned in the lecture are the ____ filter and the ____ filter.

---

### Question 5 &nbsp; `🔘 Multiple choice`

Why do we pad images before convolution?

- A. To make the image smaller each layer
- B. So the image does not shrink each layer, and so pixels at the corners and edges are used more
- C. To make the filter larger
- D. To remove the need for a bias

---

### Question 6 &nbsp; `🧮 Calculation`

You have a 32×32 input, a 5×5 filter and stride 1. How much padding p keeps the output 32×32 ('same' convolution)?

---

### Question 7 &nbsp; `✅ True / False`

In computer vision, filter size f is usually odd (1, 3, 5, 7).

---

### Question 8 &nbsp; `🧮 Calculation`

A 7×7 input, a 3×3 filter, padding 0 and stride 2. What is the output size?

---

### Question 9 &nbsp; `💬 Short answer`

What does a 6×6×3 volume convolved with a 3×3×3 filter produce, and why must the channel counts match?

---

### Question 10 &nbsp; `🧮 Calculation`

A 6×6×3 volume is convolved with two different 3×3×3 filters (no padding, stride 1). What is the output volume?

---

### Question 11 &nbsp; `🧮 Calculation`

A conv layer has 10 filters of size 3×3×3, each with one bias. How many parameters does it have?

---

### Question 12 &nbsp; `✅ True / False`

The number of parameters in a conv layer depends on the size of the input image.

---

### Question 13 &nbsp; `🧮 Calculation`

A 39×39×3 input goes through 10 filters of 3×3 (stride 1, no padding), then 10 filters of 5×5 with stride 2, then 40 filters of 5×5 with stride 2. What is the final volume, and how many units after unrolling?

---

### Question 14 &nbsp; `☑️ Select all`

Which of these are the three types of layers in a typical ConvNet?

- A. Convolution (CONV)
- B. Pooling (POOL)
- C. Fully connected (FC)
- D. Recurrent (RNN)

---

### Question 15 &nbsp; `🧮 Calculation`

Apply max pooling (f = 2, s = 2) to [[1,3,2,1],[2,9,1,1],[1,3,2,3],[5,6,1,2]]. What is the 2×2 result?

---

### Question 16 &nbsp; `✅ True / False`

Max pooling has parameters that are learned by gradient descent.

---

### Question 17 &nbsp; `💬 Short answer`

How does pooling treat the channels of its input?

---

### Question 18 &nbsp; `🧮 Calculation`

In the LeNet-style example, a 32×32×3 input goes through 6 filters of 5×5 (stride 1, no padding). What are the output volume and number of parameters (with biases)?

---

### Question 19 &nbsp; `🧮 Calculation`

A fully connected layer between a 32×32×3 input (3,072 values) and a 28×28×6 output (4,704 values) would need about how many weights? The equivalent conv layer in the lecture has only 156 parameters.

---

### Question 20 &nbsp; `☑️ Select all`

Which two ideas explain why convolutions need so few parameters?

- A. Parameter sharing: a feature detector useful in one part of the image is useful elsewhere
- B. Sparsity of connections: each output depends on only a small number of inputs
- C. Weights are zero for most filters
- D. Pooling removes parameters from conv layers

---

## Week 2
*Deep convolutional models: case studies*

### Question 21 &nbsp; `✏️ Fill in`

A residual block adds a skip connection so that a[l+2] = g(z[l+2] + ____).

---

### Question 22 &nbsp; `🔘 Multiple choice`

What problem do ResNets help to solve?

- A. Training very deep plain networks gets harder: training error rises with depth
- B. Overfitting small datasets
- C. Choosing the learning rate
- D. Reducing the size of the dataset

---

### Question 23 &nbsp; `💬 Short answer`

Why does adding a residual block rarely hurt performance?

---

### Question 24 &nbsp; `🔘 Multiple choice`

In a ResNet, a[l] and z[l+2] must have the same dimension to be added. How is this ensured?

- A. 'Same' convolutions are used, or an extra matrix Ws adjusts the dimension
- B. The skip connection is removed
- C. Pooling layers are always inserted
- D. The bias is dropped

---

### Question 25 &nbsp; `🧮 Calculation`

A 28×28×192 volume goes through 32 filters of size 1×1×192. What is the output volume?

---

### Question 26 &nbsp; `🔘 Multiple choice`

What is the main use of a 1×1 convolution in Network-in-Network and Inception?

- A. Detect vertical edges
- B. Shrink or expand the number of channels (a per-pixel fully connected layer across channels)
- C. Increase image resolution
- D. Replace pooling

---

### Question 27 &nbsp; `🧮 Calculation`

Inception: a 28×28×192 volume goes through 32 'same' filters of 5×5×192 directly. About how many multiplications? (Output positions × multiplications per position.)

---

### Question 28 &nbsp; `🧮 Calculation`

Using a 1×1 'bottleneck' of 16 filters before the 5×5 conv (32 filters), the first step costs about 2.4M multiplications and the second about 10M. What is the total, and the cost reduction versus 120M?

---

### Question 29 &nbsp; `✅ True / False`

Shrinking the representation with a bottleneck layer usually hurts the performance of an Inception module a lot.

---

### Question 30 &nbsp; `💬 Short answer`

What does an Inception module do?

---

### Question 31 &nbsp; `✅ True / False`

The Inception network (GoogLeNet) has side branches that make a softmax prediction from intermediate layers, which has a regularizing effect.

---

### Question 32 &nbsp; `🔘 Multiple choice`

Why is MobileNet useful?

- A. It has much lower computational cost, so it can run on a mobile phone or embedded device
- B. It has no convolutions
- C. It needs no training data
- D. It always has the highest accuracy

---

### Question 33 &nbsp; `☑️ Select all`

A depthwise separable convolution consists of:

- A. A depthwise convolution (one filter per input channel)
- B. A pointwise convolution (1×1 filters)
- C. A max pooling over the volume
- D. A fully connected layer

---

### Question 34 &nbsp; `🧮 Calculation`

Compute the cost ratio of depthwise separable to normal convolution: 1/n_c' + 1/f², with n_c' = 512 output channels and f = 3 (about, 2 decimals).

---

### Question 35 &nbsp; `💬 Short answer`

What are the additions in the MobileNet v2 bottleneck block?

---

### Question 36 &nbsp; `☑️ Select all`

EfficientNet gives a way to scale a network to a device by adjusting which of the following?

- A. Input image resolution
- B. Depth of the network
- C. Width (number of channels/filters)
- D. Number of classes

---

### Question 37 &nbsp; `🎯 Scenario`

You have a small dataset for your cat-detection task (Tigger, Misty, neither). How do you build on a network pre-trained on ImageNet?

---

### Question 38 &nbsp; `☑️ Select all`

Which of these are data augmentation methods mentioned in the lecture?

- A. Mirroring (flipping)
- B. Random cropping
- C. Color shifting (e.g. PCA colour augmentation)
- D. Removing all labels

---

### Question 39 &nbsp; `💬 Short answer`

Name two tips for doing well on benchmarks or competitions mentioned in 'State of Computer Vision'.

---

### Question 40 &nbsp; `🔘 Multiple choice`

With little labeled data, a vision system tends to rely more on:

- A. Hand-engineering (hacks, tuned features, architectures)
- B. Pure end-to-end learning
- C. Less transfer learning
- D. Larger models only

---

## Week 3
*Object detection*

### Question 41 &nbsp; `🔘 Multiple choice`

In object localization with 3 classes (pedestrian, car, motorcycle) plus background, what is the target vector y?

- A. [pc, bx, by, bh, bw, c1, c2, c3] — 8 numbers
- B. [bx, by] — 2 numbers
- C. [c1, c2, c3] — 3 numbers
- D. [pc, c1, c2, c3] — 4 numbers

---

### Question 42 &nbsp; `✅ True / False`

When pc = 0 (no object), the loss still depends on all components of y.

---

### Question 43 &nbsp; `🧮 Calculation`

A face keypoint network predicts 64 landmark points (x, y) and whether a face is present. How many output units does it have?

---

### Question 44 &nbsp; `💬 Short answer`

What is a drawback of the sliding windows algorithm in its original form?

---

### Question 45 &nbsp; `🔘 Multiple choice`

What does the convolutional implementation of sliding windows do?

- A. It shares computation across windows by turning the FC layers into convolutions
- B. It eliminates the convolution layers
- C. It adds more windows
- D. It trains faster by dropping labels

---

### Question 46 &nbsp; `🧮 Calculation`

Converting FC layers: after a 5×5×16 volume, a fully connected layer of 400 units is replaced by 400 filters of what size, and what output volume?

---

### Question 47 &nbsp; `✏️ Fill in`

In YOLO, the image is divided into a grid, and each object is assigned to the grid cell containing its ____.

---

### Question 48 &nbsp; `🧮 Calculation`

A 100×100×3 input is mapped by a ConvNet to a 3×3 grid with 8 numbers per cell (pc, 4 box values, 3 classes). What is the output volume?

---

### Question 49 &nbsp; `✅ True / False`

In YOLO, bh and bw (box height and width) can be greater than 1.

---

### Question 50 &nbsp; `🧮 Calculation`

Two boxes each have area 4. Their overlap has area 1. What is the IoU (two decimals)?

---

### Question 51 &nbsp; `🔘 Multiple choice`

By convention, a predicted box is considered 'correct' if its IoU with the ground-truth box is at least:

- A. 0.1
- B. 0.5
- C. 0.9
- D. 1.0

---

### Question 52 &nbsp; `✏️ Fill in`

Non-max suppression first discards all boxes with pc ≤ ____ (the lecture's example), then repeatedly keeps the box with the highest pc and discards boxes with a high IoU against it.

---

### Question 53 &nbsp; `✅ True / False`

With several classes, non-max suppression is carried out independently for each output class.

---

### Question 54 &nbsp; `💬 Short answer`

What problem do anchor boxes solve?

---

### Question 55 &nbsp; `🧮 Calculation`

A 3×3 grid, 2 anchor boxes and 3 classes. What is the output volume?

---

### Question 56 &nbsp; `☑️ Select all`

Which steps are part of the YOLO algorithm at prediction time?

- A. Run the ConvNet to get a grid of predictions
- B. Drop low-probability boxes
- C. Apply non-max suppression per class
- D. Slide a window over the image 1,000 times

---

### Question 57 &nbsp; `💬 Short answer`

How do R-CNN-style region proposal methods differ from YOLO?

---

### Question 58 &nbsp; `🔘 Multiple choice`

What does semantic segmentation produce?

- A. One class label per pixel
- B. A bounding box per object
- C. One label per image
- D. A face embedding

---

### Question 59 &nbsp; `🔘 Multiple choice`

What does a transposed convolution do?

- A. Downsample the volume
- B. Upsample: it makes the output volume larger than the input
- C. Rotate the image
- D. Normalize the batch

---

### Question 60 &nbsp; `🎯 Scenario`

Why does the U-Net copy early high-resolution activations to later layers via skip connections?

---

## Week 4
*Face recognition and neural style transfer*

### Question 61 &nbsp; `💬 Short answer`

What is the difference between face verification and face recognition?

---

### Question 62 &nbsp; `✅ True / False`

Face recognition for a door lock only needs to compare against a picture, not check that the person is alive.

---

### Question 63 &nbsp; `🔘 Multiple choice`

What is one-shot learning?

- A. Learning from one example of each person
- B. Training with one epoch
- C. Using one filter
- D. One layer network

---

### Question 64 &nbsp; `✏️ Fill in`

In verification, two images are judged to show the same person if d(img1, img2) ≤ ____ (a threshold).

---

### Question 65 &nbsp; `🔘 Multiple choice`

What is a Siamese network?

- A. Two copies of the same network (same parameters) that encode two images, then compare the encodings
- B. Two different networks
- C. A network with two outputs
- D. A network without parameters

---

### Question 66 &nbsp; `✏️ Fill in`

A triplet loss uses three images: an Anchor, a ____ (same person) and a ____ (different person).

---

### Question 67 &nbsp; `🧮 Calculation`

For a triplet, ||f(A) − f(P)||² = 0.5, ||f(A) − f(N)||² = 0.4 and the margin α = 0.2. What is the loss L = max(…, 0)?

---

### Question 68 &nbsp; `🧮 Calculation`

For a triplet, ||f(A) − f(P)||² = 0.2, ||f(A) − f(N)||² = 0.9 and α = 0.2. What is the loss?

---

### Question 69 &nbsp; `💬 Short answer`

Why is the margin α needed in the triplet loss?

---

### Question 70 &nbsp; `💬 Short answer`

Why should triplets be chosen so they are 'hard' to train on?

---

### Question 71 &nbsp; `✅ True / False`

To train a triplet-loss face model you need multiple pictures of the same person in the training set.

---

### Question 72 &nbsp; `💬 Short answer`

How can face verification be treated as binary classification instead?

---

### Question 73 &nbsp; `☑️ Select all`

In neural style transfer, which three images are involved?

- A. Content image C
- B. Style image S
- C. Generated image G
- D. Test image T

---

### Question 74 &nbsp; `🎯 Scenario`

To visualize what a hidden unit in a deep ConvNet 'sees', how does the lecture suggest you proceed?

---

### Question 75 &nbsp; `✏️ Fill in`

The style transfer cost is J(G) = ____ · J_content(C, G) + ____ · J_style(S, G).

---

### Question 76 &nbsp; `💬 Short answer`

How is the generated image G optimized in neural style transfer?

---

### Question 77 &nbsp; `🔘 Multiple choice`

The content cost function compares:

- A. The activations a[l](C) and a[l](G) of a chosen hidden layer l
- B. The pixels of C and S
- C. The Gram matrices of C and G
- D. The labels of C and G

---

### Question 78 &nbsp; `✏️ Fill in`

The style of an image at layer l is captured by the correlation between channels, called the ____ matrix: G[l]_kk' = Σ_i Σ_j a_ijk · a_ijk'.

---

### Question 79 &nbsp; `🧮 Calculation`

A 1D conv: input length 14 (1 channel), filter size 5, 16 filters, stride 1, no padding. What is the output shape?

---

### Question 80 &nbsp; `🧮 Calculation`

A 3D conv: input 14×14×14×1 and 16 filters of 5×5×5. What is the output volume?

---
