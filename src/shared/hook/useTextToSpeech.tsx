import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const synth = window.speechSynthesis;

  const onHandlePlay = async () => {
    if (isPaused) {
      synth.cancel();
    }
    if (utterance) {
      synth.speak(utterance);
      utterance.onend = function () {
        setIsPaused(() => !isPaused);
        synth.cancel();
      };
    }
    setIsPaused(() => !isPaused);
  };

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    u.voice = voices[1];
    u.lang = "en-US";
    if (u) {
      setUtterance(u);
    }

    return () => {
      synth.cancel();
    };
  }, [text]);

  return (
    <IconButton onClick={onHandlePlay}>
      <Avatar src={SpeakingIcon} alt='speaking-icon' className='w-10 h-10' />
    </IconButton>
  );
};

export default TextToSpeech;
