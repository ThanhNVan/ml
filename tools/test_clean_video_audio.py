"""Small end-to-end check for the offline audio cleaner."""

from pathlib import Path
import subprocess
import tempfile
import unittest
import numpy as np


def audio_level(video, frequency):
    pcm = subprocess.check_output([
        "ffmpeg", "-v", "error", "-i", str(video), "-map", "0:a:0",
        "-ac", "1", "-ar", "44100", "-f", "f32le", "-",
    ])
    samples = np.frombuffer(pcm, dtype="<f4")
    phases = np.arange(len(samples)) * (2 * np.pi * frequency / 44100)
    return abs(np.dot(samples, np.exp(-1j * phases))) / len(samples)


class CleanVideoAudioTest(unittest.TestCase):
    def test_keeps_video_and_captions_while_reducing_whine(self):
        from clean_video_audio import clean_video, original_source

        with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as directory:
            folder = Path(directory)
            video = folder / "index.mp4"
            caption = folder / "index.vtt"
            caption.write_text("WEBVTT\n\n00:00:00.000 --> 00:00:02.000\nSpeech\n", encoding="utf-8")
            self.assertEqual(original_source(video), video)
            subprocess.run([
                "ffmpeg", "-v", "error", "-f", "lavfi", "-i", "testsrc2=size=64x64:rate=10:duration=2",
                "-f", "lavfi", "-i", "sine=frequency=1000:duration=2:sample_rate=44100",
                "-f", "lavfi", "-i", "sine=frequency=11334.5:duration=2:sample_rate=44100",
                "-filter_complex", "[1:a][2:a]amix=inputs=2:normalize=0[a]",
                "-map", "0:v", "-map", "[a]", "-c:v", "mpeg4", "-c:a", "aac", str(video),
            ], check=True)
            before_tone = audio_level(video, 11334.5)
            before_voice = audio_level(video, 1000)
            before_video = subprocess.check_output(["ffmpeg", "-v", "error", "-i", str(video), "-map", "0:v:0", "-c", "copy", "-f", "md5", "-"])
            self.assertTrue(clean_video(video))
            after_video = subprocess.check_output(["ffmpeg", "-v", "error", "-i", str(video), "-map", "0:v:0", "-c", "copy", "-f", "md5", "-"])
            self.assertEqual(before_video, after_video)
            self.assertLess(audio_level(video, 11334.5) / before_tone, 0.1)
            self.assertGreater(audio_level(video, 1000) / before_voice, 0.7)
            self.assertEqual(caption.read_text(encoding="utf-8"), "WEBVTT\n\n00:00:00.000 --> 00:00:02.000\nSpeech\n")
            self.assertFalse(clean_video(video))
            self.assertTrue(clean_video(video, dry_run=True, voice_isolate=True))
            self.assertEqual(list(folder.glob("*.tmp.mp4")), [])


if __name__ == "__main__":
    unittest.main()
