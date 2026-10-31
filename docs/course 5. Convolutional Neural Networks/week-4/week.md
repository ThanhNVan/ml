# Course 5, week 4: Face recognition and neural style transfer

[Course overview](../course.md) · [Weekly test](<../../../test/course 5. Convolutional Neural Networks/week-4/week-test.md>) · [Weekly answers](<../../../test/course 5. Convolutional Neural Networks/week-4/week-answers.md>)

## Week at a glance

Recognition and generation. Siamese networks and triplet loss support one-shot face recognition; neural style transfer optimizes content and style objectives.

## Detailed notes

- Face verification asks whether two images show the same person; recognition identifies a person among candidates. One-shot learning makes ordinary many-example classification difficult.

- A Siamese network maps images to embeddings. A distance between embeddings supports verification, while triplet loss encourages an anchor-positive pair to be closer than an anchor-negative pair by a margin.

- A binary pair classifier is an alternative to direct embedding-distance training. The choice affects how easily new identities can be added.

- Neural style transfer optimizes a generated image G to balance content similarity to C and style similarity to S: J(G)=αJ_content(C,G)+βJ_style(S,G).

- Convolutional feature activations encode content; correlations of feature maps, often represented by Gram matrices, capture style. Convolutions also generalize to one-dimensional signals and three-dimensional volumes.

## Practice and review

Write a triplet-loss example with anchor, positive, and negative distances; then identify content and style sources in the style-transfer objective.

**Watch for:** Do not treat triplet loss as ordinary three-class classification; it constrains relative embedding distances.

## Video lessons

- 1. What is Face Recognition: [video](<../../../5. Convolutional Neural Networks/week 4/1. What is Face Recognition/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/1. What is Face Recognition/index.vtt>)
- 2. One Shot Learning: [video](<../../../5. Convolutional Neural Networks/week 4/2. One Shot Learning/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/2. One Shot Learning/index (1).vtt>)
- 3. Siamese Network: [video](<../../../5. Convolutional Neural Networks/week 4/3. Siamese Network/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/3. Siamese Network/index.vtt>)
- 4. Triplet Loss: [video](<../../../5. Convolutional Neural Networks/week 4/4. Triplet Loss/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/4. Triplet Loss/index (1).vtt>)
- 5. Face Verification and Binary Classification: [video](<../../../5. Convolutional Neural Networks/week 4/5. Face Verification and Binary Classification/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/5. Face Verification and Binary Classification/index.vtt>)
- 6. What is Neural Style Transfer: [video](<../../../5. Convolutional Neural Networks/week 4/6. What is Neural Style Transfer/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/6. What is Neural Style Transfer/index (1).vtt>)
- 7. What are deep ConvNets learning: [video](<../../../5. Convolutional Neural Networks/week 4/7. What are deep ConvNets learning/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/7. What are deep ConvNets learning/index.vtt>)
- 8. Cost Function: [video](<../../../5. Convolutional Neural Networks/week 4/8. Cost Function/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/8. Cost Function/index (1).vtt>)
- 9. Content Cost Function: [video](<../../../5. Convolutional Neural Networks/week 4/9. Content Cost Function/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/9. Content Cost Function/index.vtt>)
- 10. Style Cost Function: [video](<../../../5. Convolutional Neural Networks/week 4/10. Style Cost Function/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/10. Style Cost Function/index (1).vtt>)
- 11. 1D and 3D Generalizations: [video](<../../../5. Convolutional Neural Networks/week 4/11. 1D and 3D Generalizations/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 4/11. 1D and 3D Generalizations/index.vtt>)
