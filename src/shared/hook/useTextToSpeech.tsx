import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import { useLazyTextToSpeechQuery } from "@/core/services/google.service";
import { updateDisableAllAction } from "@/core/store/index";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { Avatar, Checkbox } from "@mui/material";
import { useState } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  const [trigger] = useLazyTextToSpeechQuery();

  const playAudio = async (bufferData: number[]) => {
    const audioArrayBuffer = new Uint8Array(bufferData).buffer;
    const audioCtx = new window.AudioContext();
    const audioData = await audioCtx.decodeAudioData(audioArrayBuffer);
    const source = audioCtx.createBufferSource();
    source.buffer = audioData;
    source.connect(audioCtx.destination);
    source.start();
    source.onended = function () {
      setChecked(() => false);
      dispatch(updateDisableAllAction(false));
    };
  };

  const onHandlePlayAudio = async () => {
    try {
      setChecked(() => true);
      dispatch(updateDisableAllAction(true));
      const bufferResponse = await trigger(text).unwrap();
      playAudio(bufferResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Checkbox
      disabled={isDiableAllAction}
      onClick={onHandlePlayAudio}
      checked={checked}
      icon={<Avatar src={SpeakerIcon} className='w-4 h-4' />}
      checkedIcon={<Avatar src={SpeakerFillIcon} className='w-4 h-4' />}
    />
  );
};

export default TextToSpeech;
