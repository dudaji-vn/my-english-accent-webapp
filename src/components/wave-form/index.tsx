import { Button, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveForm() {
  const url =
    "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3";
  const waveform = useRef<WaveSurfer>();
  const audioEle = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    setPlaying(() => !playing);
    if (waveform && waveform.current) waveform.current.playPause();
  };

  useEffect(() => {
    waveform.current = WaveSurfer.create({
      container: "#waveform",
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      barHeight: 1,
      cursorWidth: 1,
      height: 80,
      progressColor: "#FE6E00",
      waveColor: "#C4C4C4",
      cursorColor: "transparent",
    });

    if (audioEle && audioEle.current) {
      (audioEle.current as HTMLAudioElement).src = url;
      waveform.current.load(audioEle.current.src);
    }
  }, []);

  return (
    <Box>
      <Box id="waveform" />
      <Button variant="contained" onClick={handlePlay}>
        {!playing ? "Play" : "Pause"}
      </Button>
      <audio ref={audioEle} />
    </Box>
  );
}
