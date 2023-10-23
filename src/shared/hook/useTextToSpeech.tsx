import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    if (u) {
      setUtterance(u);
    }

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }
    if (utterance) {
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <IconButton onClick={handlePlay}>
      <Avatar src={SpeakingIcon} alt='speaking-icon' className='w-10 h-10' />
    </IconButton>
  );
};

export default TextToSpeech;
