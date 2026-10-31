# Machine learning study set

This folder is a six-course machine-learning study set. It contains video lessons with English and Vietnamese captions, detailed course and week guides, full-course tests, and separate weekly tests with answer keys.

## Folder structure

```text
ml/
├── README.md                       Overview and links
├── 1. Supervised ML playlist/       Course 1 videos, grouped by week and lesson
├── 2. Neural Networks and Deep Learning/
├── 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/
├── 4. Structuring Machine Learning Projects/
├── 5. Convolutional Neural Networks/
├── 6. Sequence Models/
├── docs/                           Course and week study guides plus supporting notes
│   ├── course N. Name/             One folder per course, matching test/
│   │   ├── course.md               Detailed course overview and learning path
│   │   └── week-N/
│   │       └── week.md             Detailed concepts, practice, and lesson links
│   ├── back-forward-propagation.md
│   └── Neural_Networks_and_Deep_Learning_Detailed_Information.md
├── test/
│   └── course N. Name/             One folder per course
│       ├── MLS_Course_N_Chapter_Tests_EN.md
│       ├── MLS_Course_N_Chapter_Test_Answers_EN.md
│       └── week-N/                 One folder per existing course week
│           ├── week-test.md        Five original questions for that week
│           └── week-answers.md     Worked answers and explanations
└── tools/                          Test generators and media checks
```

The `docs/` folder has six course guides and 20 week guides. Each week guide explains the main ideas, gives a practice task, notes a common mistake, and links to that week's videos and English VTT captions. The `test/` folder has six course folders and 20 weekly folders. The weekly files contain 100 new questions across the 20 weeks, with worked answers kept separate; their questions differ from the full-course tests. Video lessons live in numbered folders under each course week; some Course 2 video filenames differ from `index.mp4`, and the guide links use their actual filenames.

## Study guides

| Course | Overview | Weekly guides |
|---|---|---|
| 1. Supervised ML playlist | [course guide](<docs/course 1. Supervised ML playlist/course.md>) | [week 1](<docs/course 1. Supervised ML playlist/week-1/week.md>) · [week 2](<docs/course 1. Supervised ML playlist/week-2/week.md>) · [week 3](<docs/course 1. Supervised ML playlist/week-3/week.md>) |
| 2. Neural Networks and Deep Learning | [course guide](<docs/course 2. Neural Networks and Deep Learning/course.md>) | [week 1](<docs/course 2. Neural Networks and Deep Learning/week-1/week.md>) · [week 2](<docs/course 2. Neural Networks and Deep Learning/week-2/week.md>) · [week 3](<docs/course 2. Neural Networks and Deep Learning/week-3/week.md>) · [week 4](<docs/course 2. Neural Networks and Deep Learning/week-4/week.md>) |
| 3. Improving Deep Neural Networks | [course guide](<docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/course.md>) | [week 1](<docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-1/week.md>) · [week 2](<docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-2/week.md>) · [week 3](<docs/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/week-3/week.md>) |
| 4. Structuring Machine Learning Projects | [course guide](<docs/course 4. Structuring Machine Learning Projects/course.md>) | [week 1](<docs/course 4. Structuring Machine Learning Projects/week-1/week.md>) · [week 2](<docs/course 4. Structuring Machine Learning Projects/week-2/week.md>) |
| 5. Convolutional Neural Networks | [course guide](<docs/course 5. Convolutional Neural Networks/course.md>) | [week 1](<docs/course 5. Convolutional Neural Networks/week-1/week.md>) · [week 2](<docs/course 5. Convolutional Neural Networks/week-2/week.md>) · [week 3](<docs/course 5. Convolutional Neural Networks/week-3/week.md>) · [week 4](<docs/course 5. Convolutional Neural Networks/week-4/week.md>) |
| 6. Sequence Models | [course guide](<docs/course 6. Sequence Models/course.md>) | [week 1](<docs/course 6. Sequence Models/week-1/week.md>) · [week 2](<docs/course 6. Sequence Models/week-2/week.md>) · [week 3](<docs/course 6. Sequence Models/week-3/week.md>) · [week 4](<docs/course 6. Sequence Models/week-4/week.md>) |

## Full course tests

| # | Course | Questions | Tests | Answer key |
|---|---|---|---|---|
| 1 | Supervised Machine Learning: Regression and Classification | 68 | [tests](<test/course 1. Supervised ML playlist/MLS_Course_1_Chapter_Tests_EN.md>) | [answers](<test/course 1. Supervised ML playlist/MLS_Course_1_Chapter_Test_Answers_EN.md>) |
| 2 | Neural Networks and Deep Learning | 58 | [tests](<test/course 2. Neural Networks and Deep Learning/MLS_Course_2_Chapter_Tests_EN.md>) | [answers](<test/course 2. Neural Networks and Deep Learning/MLS_Course_2_Chapter_Test_Answers_EN.md>) |
| 3 | Improving Deep Neural Networks | 60 | [tests](<test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/MLS_Course_3_Chapter_Tests_EN.md>) | [answers](<test/course 3. Improving Deep Neural Networks Hyperparameter Tuning, Regularization/MLS_Course_3_Chapter_Test_Answers_EN.md>) |
| 4 | Structuring Machine Learning Projects | 40 | [tests](<test/course 4. Structuring Machine Learning Projects/MLS_Course_4_Chapter_Tests_EN.md>) | [answers](<test/course 4. Structuring Machine Learning Projects/MLS_Course_4_Chapter_Test_Answers_EN.md>) |
| 5 | Convolutional Neural Networks | 80 | [tests](<test/course 5. Convolutional Neural Networks/MLS_Course_5_Chapter_Tests_EN.md>) | [answers](<test/course 5. Convolutional Neural Networks/MLS_Course_5_Chapter_Test_Answers_EN.md>) |
| 6 | Sequence Models | 81 | [tests](<test/course 6. Sequence Models/MLS_Course_6_Chapter_Tests_EN.md>) | [answers](<test/course 6. Sequence Models/MLS_Course_6_Chapter_Test_Answers_EN.md>) |

## Supporting documents

- [Forward and backward propagation diagram](docs/back-forward-propagation.md)
- [Neural Networks and Deep Learning detailed information](docs/Neural_Networks_and_Deep_Learning_Detailed_Information.md)

## Regenerating full course tests

The full-course tests are generated from question data in `tools/`. Edit that data, then run the relevant generator. The weekly tests are separate, independently written question sets; edit their Markdown files directly.

- `tools/common.py`: shared builder; checks each question's keywords against the lesson subtitle.
- `tools/gen_c1.py` and `tools/gen_c3.py` through `tools/gen_c6.py`: full course question data. Run from this folder with `python tools/gen_cN.py`.
- `tools/legacy/`: the script that restyled Course 2 and the original Course 1/2 files.
- `tools/check_all.py`: confirms every tests file matches its answer key.
- `tools/verify_media_captions.py`: checks that videos have matching English VTT subtitles.
- `tools/translate_vi_captions.py --verify`: checks Vietnamese caption names, coverage, and cue timing. Run with `--polish` to apply the technical-term glossary to existing Vietnamese VTTs.

## Local video player extension

The `vscode-video-player` extension is in [`tools/vscode-video-player/`](tools/vscode-video-player/) and its installable package is [`tools/vscode-video-player.vsix`](tools/vscode-video-player.vsix). From the `ml/` folder, run **one command** to install it with the subtitle picker:

```powershell
python tools/install_video_player.py
```

The installer verifies the result and removes any older local or upstream edition, so only `vscode-video-player` claims the default editor. The command needs Python and the VS Code `code` CLI. If VS Code was already open, reload its window once. Open a lesson's `.mp4` from the Explorer; MP4 sound requires `ffmpeg` on the local `PATH`.

Every video has matching English and Vietnamese sidecar captions. The player automatically loads the English `.vtt` with the **same base name**: `index.mp4` uses `index.vtt`, and `index (1).mp4` uses `index (1).vtt`. The Vietnamese files are named `index-vi.vtt` and `index (1)-vi.vtt`, respectively. Click **CC** to show or hide captions. To watch with Vietnamese captions, click **Sub** beside CC and choose the matching `-vi.vtt` file in the video's folder. **Aa** adjusts caption appearance.

The local player applies a narrow 11.334 kHz notch filter to the audio of every course video during playback. This removes the high pitched whine without changing the source MP4 files or captions. Reload VS Code after installing the updated local extension.

The player also applies a subtle picture filter (brightness, contrast, and saturation) to every video. It affects playback only; captions and source MP4 files keep their original appearance and data.

If VS Code cannot decode an MP4 video stream (including the AV1 videos in Course 1), the extension loads a persistent H.264 playback copy made with `ffmpeg`. Course 1's incompatible videos have these copies prepared ahead of time, so they are ready when opened. The copies live in the user cache (`%LOCALAPPDATA%\vscode-video-player\h264` on Windows), outside Git. Original MP4s and subtitle files are untouched.

After editing the local extension, run `python tools/build_local_vsix.py` from this folder to rebuild the VSIX, then run the local install command above.

## Video storage with Git LFS

The course `.mp4` files are tracked with Git LFS; Markdown guides, tests, and English and Vietnamese `.vtt` captions remain ordinary Git files. After cloning, run `git lfs install` and `git lfs pull` to obtain the videos. Existing commits may still contain videos stored as ordinary Git objects; the LFS setup applies to the current index and future commits.
