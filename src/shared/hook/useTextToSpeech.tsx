import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateDisableAllAction } from "@/core/store/index";
import { Avatar, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

const TextToSpeech = ({ text = "a" }: { text: string }) => {
  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const utterances: SpeechSynthesisUtterance[] = [];
  const defaultSaying = "a";

  const synth = window.speechSynthesis;

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const say = (speech: string, rate = 1.0, pitch = 1.0, lang = "en-GB", volume = 1.0) => {
    // rate: (0.1,10), pitch: (0,2), lang: BCP 47 language tag
    // So 0.1 < rate < 10, see https://en.wikipedia.org/wiki/Interval_(mathematics)
    const u = new SpeechSynthesisUtterance(speech);
    u.lang = lang;
    u.pitch = pitch;
    u.rate = rate;
    u.volume = volume;
    utterances.push(u);
    synth.speak(u);
    setChecked(() => true);
    dispatch(updateDisableAllAction(true));

    u.onend = (e) => {
      if (utterances.length) {
        if (utterances[0].text !== defaultSaying) {
          setChecked(() => false);
          dispatch(updateDisableAllAction(false));
        }
      }
      utterances.shift();
    };
  };

  async function sayAllViaSleepyJack() {
    say(defaultSaying, 9, 1, "en-GB", 0); // Wake sleeping audio jack.

    await sleep(100).then(() => {
      say(text);
    });
  }

  useEffect(() => {
    return () => {
      setChecked(() => false);
      dispatch(updateDisableAllAction(false));
      synth.cancel();
    };
  }, [text]);

  return (
    <Checkbox
      disabled={isDiableAllAction}
      onClick={sayAllViaSleepyJack}
      checked={checked}
      icon={<Avatar src={SpeakerIcon} className='w-4 h-4' />}
      checkedIcon={<Avatar src={SpeakerFillIcon} className='w-4 h-4' />}
    />
  );
};

export default TextToSpeech;
