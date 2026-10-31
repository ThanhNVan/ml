# Course 5, week 2: CNN architectures and transfer learning

[Course overview](../course.md) · [Weekly test](<../../../test/course 5. Convolutional Neural Networks/week-2/week-test.md>) · [Weekly answers](<../../../test/course 5. Convolutional Neural Networks/week-2/week-answers.md>)

## Week at a glance

Architectures and reuse. Classic networks, residual connections, 1×1 convolution, Inception, MobileNet, EfficientNet, transfer learning, and augmentation show ways to improve accuracy and efficiency.

## Detailed notes

- Classic CNNs illustrate a progression in depth and structure. Residual blocks add a shortcut, making an identity mapping easier to learn and helping train deeper networks.

- A 1×1 convolution mixes channels at each spatial position and can reduce channel count before a costly spatial convolution. Inception combines parallel operations at different scales.

- MobileNet uses depthwise separable convolutions to reduce computation; EfficientNet explores balanced scaling of width, depth, and resolution.

- Open-source implementations provide tested architectures and pretrained weights. Transfer learning can freeze early features, replace the head, then fine-tune selected layers.

- Data augmentation changes training examples in label-preserving ways. Apply only transformations that preserve the intended target and evaluate on unaugmented representative data.

## Practice and review

Compare the arithmetic cost of a standard 3×3 convolution with depthwise plus pointwise convolution, then outline a small-data transfer-learning plan.

**Watch for:** Do not use an augmentation that changes the label, and do not assume a pretrained model's original class head matches the new task.

## Video lessons

- 1. Why look at case studies: [video](<../../../5. Convolutional Neural Networks/week 2/1. Why look at case studies/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/1. Why look at case studies/index.vtt>)
- 2. Classic Networks: [video](<../../../5. Convolutional Neural Networks/week 2/2. Classic Networks/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/2. Classic Networks/index (1).vtt>)
- 3. ResNets: [video](<../../../5. Convolutional Neural Networks/week 2/3. ResNets/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/3. ResNets/index.vtt>)
- 4. Why ResNets Work: [video](<../../../5. Convolutional Neural Networks/week 2/4. Why ResNets Work/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/4. Why ResNets Work/index (1).vtt>)
- 5. Networks in Networks and 1x1 Convolutions: [video](<../../../5. Convolutional Neural Networks/week 2/5. Networks in Networks and 1x1 Convolutions/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/5. Networks in Networks and 1x1 Convolutions/index.vtt>)
- 6. Inception Network Motivation: [video](<../../../5. Convolutional Neural Networks/week 2/6. Inception Network Motivation/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/6. Inception Network Motivation/index (1).vtt>)
- 7. Inception Network: [video](<../../../5. Convolutional Neural Networks/week 2/7. Inception Network/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/7. Inception Network/index.vtt>)
- 8. MobileNet: [video](<../../../5. Convolutional Neural Networks/week 2/8. MobileNet/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/8. MobileNet/index (1).vtt>)
- 9. MobileNet Architecture: [video](<../../../5. Convolutional Neural Networks/week 2/9. MobileNet Architecture/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/9. MobileNet Architecture/index.vtt>)
- 10. Inception Network Motivation: [video](<../../../5. Convolutional Neural Networks/week 2/10. Inception Network Motivation/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/10. Inception Network Motivation/index (1).vtt>)
- 11. Inception Network: [video](<../../../5. Convolutional Neural Networks/week 2/11. Inception Network/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/11. Inception Network/index.vtt>)
- 12. MobileNet: [video](<../../../5. Convolutional Neural Networks/week 2/12. MobileNet/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/12. MobileNet/index (1).vtt>)
- 13. MobileNet Architecture: [video](<../../../5. Convolutional Neural Networks/week 2/13. MobileNet Architecture/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/13. MobileNet Architecture/index.vtt>)
- 14. EfficientNet: [video](<../../../5. Convolutional Neural Networks/week 2/14. EfficientNet/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/14. EfficientNet/index (1).vtt>)
- 15. Using Open-Source Implementation: [video](<../../../5. Convolutional Neural Networks/week 2/15. Using Open-Source Implementation/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/15. Using Open-Source Implementation/index.vtt>)
- 16. Transfer Learning: [video](<../../../5. Convolutional Neural Networks/week 2/16. Transfer Learning/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/16. Transfer Learning/index (1).vtt>)
- 17. Data Augmentation: [video](<../../../5. Convolutional Neural Networks/week 2/17. Data Augmentation/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/17. Data Augmentation/index.vtt>)
- 18. State of Computer Vision: [video](<../../../5. Convolutional Neural Networks/week 2/18. State of Computer Vision/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 2/18. State of Computer Vision/index (1).vtt>)
