# Course 5, week 3: Detection, localization, and segmentation

[Course overview](../course.md) · [Weekly test](<../../../test/course 5. Convolutional Neural Networks/week-3/week-test.md>) · [Weekly answers](<../../../test/course 5. Convolutional Neural Networks/week-3/week-answers.md>)

## Week at a glance

Detection and segmentation. Localization, landmarks, sliding windows, bounding boxes, IoU, NMS, anchors, YOLO, U-Net, and transpose convolution address structured image outputs.

## Detailed notes

- Localization predicts an object's class and box; detection handles multiple objects; landmark detection predicts important points. Sliding-window classification is a conceptual starting point.

- A detector predicts box center, width, height, objectness, and class information for grid cells or anchor boxes. Box parameterization must match the training labels.

- Intersection over union (IoU) measures overlap of predicted and true boxes. Non-max suppression keeps a high-scoring box and removes highly overlapping alternatives.

- Anchors represent common box shapes, and YOLO performs dense predictions in one pass. Region proposals are another approach covered as an optional topic.

- Semantic segmentation assigns a class to each pixel. U-Net joins downsampling with upsampling and skip connections; transpose convolution is one learnable upsampling mechanism.

## Practice and review

For two overlapping boxes, compute IoU and apply one NMS step. Draw U-Net's contracting path, expanding path, and skip connections.

**Watch for:** Do not confuse a single image-level class label with a detection box or a per-pixel segmentation mask.

## Video lessons

- 1. Object Localization: [video](<../../../5. Convolutional Neural Networks/week 3/1. Object Localization/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/1. Object Localization/index.vtt>)
- 2. Landmark Detection: [video](<../../../5. Convolutional Neural Networks/week 3/2. Landmark Detection/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/2. Landmark Detection/index (1).vtt>)
- 3. Object Detection: [video](<../../../5. Convolutional Neural Networks/week 3/3. Object Detection/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/3. Object Detection/index.vtt>)
- 4. Convolutional Implementation of Sliding Windows: [video](<../../../5. Convolutional Neural Networks/week 3/4. Convolutional Implementation of Sliding Windows/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/4. Convolutional Implementation of Sliding Windows/index (1).vtt>)
- 5. Bounding Box Predictions: [video](<../../../5. Convolutional Neural Networks/week 3/5. Bounding Box Predictions/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/5. Bounding Box Predictions/index.vtt>)
- 6. Intersection Over Union: [video](<../../../5. Convolutional Neural Networks/week 3/6. Intersection Over Union/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/6. Intersection Over Union/index (1).vtt>)
- 7. Non-max Suppression: [video](<../../../5. Convolutional Neural Networks/week 3/7. Non-max Suppression/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/7. Non-max Suppression/index.vtt>)
- 8. Anchor Boxes: [video](<../../../5. Convolutional Neural Networks/week 3/8. Anchor Boxes/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/8. Anchor Boxes/index (1).vtt>)
- 9. YOLO Algorithm: [video](<../../../5. Convolutional Neural Networks/week 3/9. YOLO Algorithm/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/9. YOLO Algorithm/index.vtt>)
- 10. Region Proposals (Optional): [video](<../../../5. Convolutional Neural Networks/week 3/10. Region Proposals (Optional)/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/10. Region Proposals (Optional)/index (1).vtt>)
- 11. Semantic Segmentation with U-Net: [video](<../../../5. Convolutional Neural Networks/week 3/11. Semantic Segmentation with U-Net/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/11. Semantic Segmentation with U-Net/index.vtt>)
- 12. Transpose Convolutions: [video](<../../../5. Convolutional Neural Networks/week 3/12. Transpose Convolutions/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/12. Transpose Convolutions/index (1).vtt>)
- 13. U-Net Architecture Intuition: [video](<../../../5. Convolutional Neural Networks/week 3/13. U-Net Architecture Intuition/index.mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/13. U-Net Architecture Intuition/index.vtt>)
- 14. U-Net Architecture: [video](<../../../5. Convolutional Neural Networks/week 3/14. U-Net Architecture/index (1).mp4>) · [English captions](<../../../5. Convolutional Neural Networks/week 3/14. U-Net Architecture/index (1).vtt>)
