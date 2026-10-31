# 🔑 Course 5 — Answer Key
## Convolutional Neural Networks

> 80 answers with the lesson each question comes from.

## Week 1
*Foundations of convolutional neural networks*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 1 | **4×4** | Output = (n − f + 1) × (n − f + 1) = (6 − 3 + 1) = 4. | 1.4 Padding |
| 2 | **30** | Each row gives 10·1 + 10·0 + 0·(−1) = 10, and the three rows add up to 30 — a bright stripe where the vertical edge is. | 1.2 Edge Detection Example |
| 3 | **A** | Sobel and Scharr filters are hand-designed; a network can learn filters that detect edges at any angle, or other features, from data. | 1.3 More Edge Detection |
| 4 | **Sobel; Scharr** | Sobel puts more weight on the center row (1, 2, 1); Scharr uses 3, 10, 3. | 1.3 More Edge Detection |
| 5 | **B** | Without padding, each convolution shrinks the image, and corner pixels take part in only one output. | 1.4 Padding |
| 6 | **p = 2** | p = (f − 1) / 2 = (5 − 1) / 2 = 2. | 1.4 Padding |
| 7 | **True** | An odd filter has a central position, and 'same' padding is symmetric only when f is odd. | 1.4 Padding |
| 8 | **3×3** | floor((n + 2p − f)/s + 1) = floor((7 − 3)/2 + 1) = 3. | 1.5 Strided Convolutions |
| 9 | **A 4×4 output (single channel). The filter must have the same number of channels as the input so each channel is multiplied element-wise by its own slice and all 27 products are summed to one number.** |  | 1.6 Convolutions Over Volume |
| 10 | **4×4×2** | Each filter gives a 4×4 map, and the maps are stacked along the channel dimension. | 1.6 Convolutions Over Volume |
| 11 | **280** | Each filter has 3·3·3 = 27 weights + 1 bias = 28, and 28 × 10 = 280. | 1.7 One Layer of a Convolutional Network |
| 12 | **False** | It depends only on filter size and number of filters, which makes conv layers less prone to overfitting. | 1.7 One Layer of a Convolutional Network |
| 13 | **7×7×40, which unrolls to 1,960 units** | 39 → 37 → 17 → 7 (floor((n − 5)/2 + 1)), the volume is 7×7×40, and 7·7·40 = 1,960. Note the second layer uses 20 filters (17×17×20). | 1.8 Simple Convolutional Network Example |
| 14 | **A, B, C** | Pooling and FC layers are easier to design than conv layers. | 1.8 Simple Convolutional Network Example |
| 15 | **[[9, 2], [6, 3]]** | Take the maximum of each non-overlapping 2×2 block. | 1.9 Pooling Layers |
| 16 | **False** | Pooling has hyperparameters (f and s) but nothing to learn. | 1.9 Pooling Layers |
| 17 | **Independently: the same operation is performed on each channel, so a 5×5×3 input pooled with f = 3, s = 1 gives 3×3×3.** |  | 1.9 Pooling Layers |
| 18 | **28×28×6; (5·5·3 + 1)·6 = 456 parameters** | 32 − 5 + 1 = 28, and each filter has 75 weights + 1 bias. | 1.10 CNN Example |
| 19 | **About 14 million (3072 × 4704 = 14,450,688)** | A conv layer is vastly smaller because of parameter sharing and sparsity of connections. | 1.11 Why Convolutions |
| 20 | **A, B** | These two together also help ConvNets capture translation invariance. | 1.11 Why Convolutions |

## Week 2
*Deep convolutional models: case studies*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 21 | **a[l]** | The activation from layer l is carried forward (the shortcut) and added before the nonlinearity. | 2.3 ResNets |
| 22 | **A** | With residual blocks, adding layers does not hurt performance and training error can keep going down. | 2.3 ResNets |
| 23 | **If weights and bias shrink to 0 (e.g. with weight decay), a[l+2] = g(a[l]) = a[l] for ReLU, so the block can easily learn the identity function and the extra layers do no harm.** |  | 2.4 Why ResNets Work |
| 24 | **A** | Ws can be a learned matrix or a fixed zero-padding. | 2.4 Why ResNets Work |
| 25 | **28×28×32** | A 1×1 convolution mixes channels at each position, so you can shrink (or grow) the number of channels while height and width stay the same. | 2.5 Networks in Networks and 1x1 Convolutions |
| 26 | **B** | It also adds a nonlinearity, so it can learn more complex functions. | 2.5 Networks in Networks and 1x1 Convolutions |
| 27 | **About 120 million** | 28·28·32 = 25,088 outputs, each costing 5·5·192 = 4,800 multiplications, which is ≈ 120M. | 2.6 Inception Network Motivation |
| 28 | **About 12.4 million, roughly a tenth of the cost** | 28·28·16·192 ≈ 2.4M plus 28·28·32·(5·5·16) ≈ 10M, and the middle 28×28×16 layer is called the bottleneck. | 2.6 Inception Network Motivation |
| 29 | **False** | Done sensibly, it does not hurt performance, and it saves a great deal of computation. | 2.6 Inception Network Motivation |
| 30 | **It applies 1×1, 3×3, 5×5 convolutions and pooling in parallel on the same input (with 'same' padding) and stacks the outputs along the channel dimension, letting the network learn which sizes it needs.** |  | 2.7 Inception Network |
| 31 | **True** | The intermediate features are already good enough to predict the output. | 2.7 Inception Network |
| 32 | **A** | It uses depthwise separable convolutions. | 2.8 MobileNet |
| 33 | **A, B** | The two steps replace one big normal convolution at a fraction of the cost. | 2.8 MobileNet |
| 34 | **About 0.11 (roughly 10 times cheaper)** | 1/512 + 1/9 ≈ 0.002 + 0.111 = 0.113. | 2.8 MobileNet |
| 35 | **A residual (skip) connection, an expansion 1×1 convolution before the depthwise convolution, and a projection 1×1 (pointwise) convolution afterwards that shrinks to a smaller bottleneck.** |  | 2.9 MobileNet Architecture |
| 36 | **A, B, C** | You choose a good trade-off between them for the compute you have. | 2.14 EfficientNet |
| 37 | **Download the open-source network and weights, replace the softmax layer with your own 3-class softmax, freeze all earlier layers and train only the new layer. You can precompute and cache the frozen layers' activations. With more data, unfreeze more layers.** |  | 2.16 Transfer Learning |
| 38 | **A, B, C** | A common implementation runs the augmentation on CPU threads in parallel with training. | 2.17 Data Augmentation |
| 39 | **Ensembling (average the outputs of several independently trained networks) and multi-crop at test time (e.g. 10-crop: average predictions over several crops of the image).** | Both are expensive and rarely used in production. | 2.18 State of Computer Vision |
| 40 | **A** | With lots of data you can use simpler algorithms and less hand-engineering. | 2.18 State of Computer Vision |

## Week 3
*Object detection*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 41 | **A** | pc says whether an object is present; bx, by, bh, bw give the bounding box; c1–c3 give the class. | 3.1 Object Localization |
| 42 | **False** | When pc = 0 only the error on pc counts; the other components are 'don't care'. | 3.1 Object Localization |
| 43 | **129** | 1 for face present + 64 × 2 = 128 coordinates. | 3.2 Landmark Detection |
| 44 | **It is very slow: each window is run through the ConvNet separately, which has a high computational cost, and the stride and window size trade off cost against accuracy.** |  | 3.3 Object Detection |
| 45 | **A** | A 16×16×3 input yields a 2×2×4 output where each cell is the result for one window. | 3.4 Convolutional Implementation of Sliding Windows |
| 46 | **400 filters of 5×5×16, giving 1×1×400** | A 1×1×400 volume equals the 400-unit FC layer, and later 1×1 convolutions play the role of the next FC layers. | 3.4 Convolutional Implementation of Sliding Windows |
| 47 | **midpoint (center)** | Even if an object spans several cells, it is assigned to only the one with its midpoint. | 3.5 Bounding Box Predictions |
| 48 | **3×3×8** | One target vector y per grid cell. | 3.5 Bounding Box Predictions |
| 49 | **True** | They are specified relative to the grid cell size, so a box wider than its cell has bw > 1, while bx and by are between 0 and 1. | 3.5 Bounding Box Predictions |
| 50 | **0.14** | Union = 4 + 4 − 1 = 7; IoU = 1/7 ≈ 0.14. | 3.6 Intersection Over Union |
| 51 | **B** | 0.5 is the common threshold; a stricter value like 0.6 can be used. | 3.6 Intersection Over Union |
| 52 | **0.6** | It cleans up multiple detections of the same object. | 3.7 Non-max Suppression |
| 53 | **True** | Run it once for each of pedestrian, car and motorcycle. | 3.7 Non-max Suppression |
| 54 | **They let one grid cell detect more than one object: each object is assigned to the grid cell containing its midpoint and to the anchor box with the highest IoU, with a separate set of outputs per anchor.** |  | 3.8 Anchor Boxes |
| 55 | **3×3×16** | Each anchor has 5 + 3 = 8 numbers, and 2 × 8 = 16 per cell. | 3.9 YOLO Algorithm |
| 56 | **A, B, C** | YOLO takes a single pass, so it is fast enough for real-time detection. | 3.9 YOLO Algorithm |
| 57 | **They first propose a few regions (e.g. by segmentation) and classify only those, typically in several steps; Fast R-CNN and Faster R-CNN speed this up. YOLO uses one pass over a grid.** |  | 3.10 Region Proposals (Optional) |
| 58 | **A** | It is useful for self-driving cars, medical imaging and more. | 3.11 Semantic Segmentation with U-Net |
| 59 | **B** | It is the key building block for the expanding path of the U-Net. | 3.12 Transpose Convolutions |
| 60 | **Later layers have strong high-level (contextual) information but low spatial resolution; early layers have fine spatial detail. Concatenating them gives the final per-pixel prediction both.** | The output has the input height and width and one channel per class. | 3.13 U-Net Architecture Intuition |

## Week 4
*Face recognition and neural style transfer*

| # | Answer | Why | Lesson |
|---|---|---|---|
| 61 | **Verification takes an image and a claimed ID and answers whether they match (1:1). Recognition has a database of K people and outputs the ID or 'not recognized' (1:K), which is harder because errors accumulate across K people.** |  | 4.1 What is Face Recognition |
| 62 | **False** | Systems also need liveness detection (e.g. to stop someone holding up a photo). | 4.1 What is Face Recognition |
| 63 | **A** | A similarity function d(img1, img2) is learned instead of training a classifier on very few images. | 4.2 One Shot Learning |
| 64 | **τ (tau)** | It is a hyperparameter. | 4.2 One Shot Learning |
| 65 | **A** | d(x1, x2) = \|\|f(x1) − f(x2)\|\|²; the network is trained so that same-person encodings are close and different-person encodings are far. | 4.3 Siamese Network |
| 66 | **Positive; Negative** | You want \|\|f(A) − f(P)\|\|² + α ≤ \|\|f(A) − f(N)\|\|². | 4.4 Triplet Loss |
| 67 | **0.3** | L = max(0.5 − 0.4 + 0.2, 0) = 0.3. | 4.4 Triplet Loss |
| 68 | **0** | max(0.2 − 0.9 + 0.2, 0) = max(−0.5, 0) = 0. The triplet is already 'easy'. | 4.4 Triplet Loss |
| 69 | **Without it the network could output f(x) = 0 for all images (all distances 0) and satisfy the condition trivially; the margin forces a gap between positive and negative pairs.** |  | 4.4 Triplet Loss |
| 70 | **If A, P, N are chosen at random, d(A,P) + α ≤ d(A,N) is satisfied easily and gradient descent learns little; hard triplets (where d(A,P) ≈ d(A,N)) make training efficient.** |  | 4.4 Triplet Loss |
| 71 | **True** | For example, 10,000 pictures of 1,000 people. | 4.4 Triplet Loss |
| 72 | **Feed the encodings of the two images through a logistic regression unit: ŷ = σ(Σ w_k \|f(x_i)_k − f(x_j)_k\| + b), where ŷ = 1 if same person, 0 otherwise.** | Database encodings can be precomputed to save time. | 4.5 Face Verification and Binary Classification |
| 73 | **A, B, C** | G starts as random noise and is updated by gradient descent. | 4.6 What is Neural Style Transfer |
| 74 | **Pick a unit in a layer, find the image patches (e.g. nine) that maximize its activation over the training set, and look at them. Early layers detect edges and colors; deeper layers detect textures, then parts and objects.** |  | 4.7 What are deep ConvNets learning |
| 75 | **α; β** | Two hyperparameters control the balance between content and style. | 4.8 Cost Function |
| 76 | **Initialize G randomly, then use gradient descent to update the pixel values of G to minimize J(G); the network weights are not trained.** |  | 4.8 Cost Function |
| 77 | **A** | J_content = ½ \|\|a[l](C) − a[l](G)\|\|². A middle layer l is usually chosen. | 4.9 Content Cost Function |
| 78 | **Gram (style)** | A large value means channels k and k' tend to fire together. | 4.10 Style Cost Function |
| 79 | **10×16** | n − f + 1 = 14 − 5 + 1 = 10, with one output channel per filter. | 4.11 1D and 3D Generalizations |
| 80 | **10×10×10×16** | 14 − 5 + 1 = 10 in each of the three spatial dimensions. | 4.11 1D and 3D Generalizations |
