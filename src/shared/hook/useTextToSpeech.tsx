import { useState, useEffect, useMemo } from "react";
import { Avatar, Box, Checkbox } from "@mui/material";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import { updateDisableAllAction } from "@/core/store/index";
import { useAppSelector, useAppDispatch } from "@/core/store";

const TextToSpeech = ({ text = "Text default" }: { text: string }) => {
  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const synth = window.speechSynthesis;

  const utterance = useMemo<SpeechSynthesisUtterance>(() => {
    const u = new SpeechSynthesisUtterance(text);
    const voices: SpeechSynthesisVoice[] = synth.getVoices();
    const index = voices.findIndex((voice) => voice.lang === "en-GB");
    u.voice = voices[index];
    u.lang = "en-GB";
    return u;
  }, [text]);

  const [checked, setChecked] = useState(false);

  const onHandlePlay = () => {
    setChecked(() => true);
    dispatch(updateDisableAllAction(true));
  };

  utterance.onend = function () {
    dispatch(updateDisableAllAction(false));
    setChecked(() => false);

    synth.cancel();
  };

  useEffect(() => {
    return () => {
      setChecked(() => false);
      dispatch(updateDisableAllAction(false));

      synth.cancel();
    };
  }, [text]);

  useEffect(() => {
    if (checked) {
      synth.speak(utterance);
    }
  }, [checked]);

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
