# Course 5, week 1: Convolution and pooling fundamentals

[Course overview](../course.md) · [Weekly test](<../../../test/course 5. Convolutional Neural Networks/week-1/week-test.md>) · [Weekly answers](<../../../test/course 5. Convolutional Neural Networks/week-1/week-answers.md>)

## Week at a glance

Convolution foundations. Filters, padding, stride, channels, pooling, and complete CNN layers turn image grids into learned features.

## Detailed notes

- A convolution filter slides across an image and responds to local patterns such as edges. Shared weights reduce parameter count compared with a dense layer over all pixels.

- For input width n, filter size f, padding p, and stride s, output width is floor((n+2p−f)/s)+1. Apply the same calculation to height.

- A filter spans all input channels. Multiple filters produce multiple output channels; parameter count is f_h·f_w·C_in·C_out plus optional biases.

- A convolutional layer applies filters and a nonlinearity; pooling reduces spatial size, often with max pooling. Stacking layers increases the effective receptive field.

- The CNN example combines convolution, activation, pooling, flattening, and a final prediction head. Shape tracking explains how each stage transforms the image.

## Practice and review

Calculate output dimensions and parameters for a 32×32×3 input, eight 3×3 filters, stride 1, padding 1, followed by 2×2 pooling.

**Watch for:** Do not treat each input channel as a separate output image; one multi-channel filter sums contributions across all input channels.

## Video lessons

- 1. Computer Vision: [video](<../../../5. Convolutional Neural Networks/week 1/1. Computer Vision/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/1. Computer Vision/index (1).vtt>)
- 2. Edge Detection Example: [video](<../../../5. Convolutional Neural Networks/week 1/2. Edge Detection Example/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/2. Edge Detection Example/index.vtt>)
- 3. More Edge Detection: [video](<../../../5. Convolutional Neural Networks/week 1/3. More Edge Detection/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/3. More Edge Detection/index (1).vtt>)
- 4. Padding: [video](<../../../5. Convolutional Neural Networks/week 1/4. Padding/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/4. Padding/index.vtt>)
- 5. Strided Convolutions: [video](<../../../5. Convolutional Neural Networks/week 1/5. Strided Convolutions/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/5. Strided Convolutions/index.vtt>)
- 6. Convolutions Over Volume: [video](<../../../5. Convolutional Neural Networks/week 1/6. Convolutions Over Volume/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/6. Convolutions Over Volume/index (1).vtt>)
- 7. One Layer of a Convolutional Network: [video](<../../../5. Convolutional Neural Networks/week 1/7. One Layer of a Convolutional Network/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/7. One Layer of a Convolutional Network/index.vtt>)
- 8. Simple Convolutional Network Example: [video](<../../../5. Convolutional Neural Networks/week 1/8. Simple Convolutional Network Example/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/8. Simple Convolutional Network Example/index (1).vtt>)
- 9. Pooling Layers: [video](<../../../5. Convolutional Neural Networks/week 1/9. Pooling Layers/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/9. Pooling Layers/index.vtt>)
- 10. CNN Example: [video](<../../../5. Convolutional Neural Networks/week 1/10. CNN Example/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/10. CNN Example/index (1).vtt>)
- 11. Why Convolutions: [video](<../../../5. Convolutional Neural Networks/week 1/11. Why Convolutions/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/11. Why Convolutions/index.vtt>)
- 12. Yann LeCun Interview: [video](<../../../5. Convolutional Neural Networks/week 1/12. Yann LeCun Interview/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 1/12. Yann LeCun Interview/index.vtt>)
