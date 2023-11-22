import { useState, useEffect } from "react";
import { Avatar, Checkbox } from "@mui/material";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import { updateDisableAllAction } from "@/core/store/index";
import { useAppSelector, useAppDispatch } from "@/core/store";

const TextToSpeech = ({ text = "" }: { text: string }) => {
  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();

  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const synth = window.speechSynthesis;
  const [checked, setChecked] = useState(false);
  const onHandlePlay = () => {
    if (utterance) {
      setChecked(() => true);
      dispatch(updateDisableAllAction(true));
      synth.speak(utterance);
      utterance.onend = function () {
        dispatch(updateDisableAllAction(false));
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
      dispatch(updateDisableAllAction(false));

      synth.cancel();
    };
  }, [text]);

  return (
    <Checkbox
      disabled={isDiableAllAction}
      onClick={onHandlePlay}
      checked={checked}
      icon={<Avatar src={SpeakerIcon} className='w-4 h-4' />}
      checkedIcon={<Avatar src={SpeakerFillIcon} className='w-4 h-4' />}
    />
  );
};

export default TextToSpeech;
