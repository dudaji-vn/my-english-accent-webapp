import { useState, useEffect } from "react";
import { Avatar, Checkbox  } from "@mui/material";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";

const TextToSpeech = ({ text = "" }: { text: string }) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const synth = window.speechSynthesis;
  const [checked, setChecked] = useState(false);

  const onHandlePlay = async () => {
    if (utterance) {
      synth.speak(utterance);
      setChecked(() => true);

      utterance.onend = function () {
        setChecked(() => false);
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
      setChecked(() => false);
      synth.cancel();
    };
  }, [text]);

  return (
    <Checkbox onClick={onHandlePlay} value={checked} icon={<Avatar src={SpeakerIcon} className='w-4 h-4' />} checkedIcon={<Avatar src={SpeakerFillIcon} className='w-4 h-4' />} />
  );
};

export default TextToSpeech;
