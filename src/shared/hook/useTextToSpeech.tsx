import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import { useLazyTextToSpeechQuery } from "@/core/services/google.service";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateDisableAllAction } from "@/core/store/index";
import { Avatar, Checkbox } from "@mui/material";
import { useState } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  const [trigger] = useLazyTextToSpeechQuery();

  const onLoadAudio = async (bufferData: number[]) => {
    const audioCtx = new AudioContext();
    const audioSource = audioCtx.createBufferSource();

    const audioArrayBuffer = new Uint8Array(bufferData).buffer;
    const audioData = await audioCtx.decodeAudioData(audioArrayBuffer);
    audioSource.buffer = audioData;
    await audioSource.connect(audioCtx.destination);
    audioSource.start();
    audioSource.onended = function () {
      setChecked(() => false);
      dispatch(updateDisableAllAction(false));
    };
  };

  const onHandlePlayAudio = async () => {
    try {
      setChecked(() => true);
      dispatch(updateDisableAllAction(true));
      const bufferResponse = await trigger(text).unwrap();
      await onLoadAudio(bufferResponse.data);
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
