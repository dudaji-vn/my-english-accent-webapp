import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";

const TextToSpeech = ({ text = "" }: { text: string }) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const synth = window.speechSynthesis;

  const onHandlePlay = async () => {
    if (utterance) {
      synth.speak(utterance);
      utterance.onend = function () {
        synth.cancel();
      };
    }
  };

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(text);
    const voices: SpeechSynthesisVoice[] = synth.getVoices();

    const index = voices.findIndex((voice) => voice.lang === "Samantha");
    u.voice = voices[index];
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
