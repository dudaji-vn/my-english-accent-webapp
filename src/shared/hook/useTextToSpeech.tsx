import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import { useLazyTextToSpeechQuery } from "@/core/services/voice.service";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateDisableAllAction } from "@/core/store/index";
import { Avatar, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  const [trigger] = useLazyTextToSpeechQuery();

  const onLoadAudio = async (bufferData: number[]) => {
    const audioArrayBuffer = new Uint8Array(bufferData).buffer;
    const blob = new Blob([audioArrayBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio();
    audio.src = url;
    audio.play().catch((err) => {
      setChecked(() => false);
      dispatch(updateDisableAllAction(false));
    });
    audio.onended = () => {
      setChecked(() => false);
      dispatch(updateDisableAllAction(false));
    };
  };

  const onHandlePlayAudio = async () => {
    try {
      setChecked(() => true);
      dispatch(updateDisableAllAction(true));
      const bufferResponse = await trigger(text, true).unwrap();
      await onLoadAudio(bufferResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setChecked(() => false);
      dispatch(updateDisableAllAction(false));
    };
  }, [text]);

  return (
    <Checkbox
      disabled={isDiableAllAction}
      onClick={onHandlePlayAudio}
      checked={checked}
      icon={<Avatar src={SpeakerIcon} className="w-4 h-4" />}
      checkedIcon={<Avatar src={SpeakerFillIcon} className="w-4 h-4" />}
    />
  );
};

export default TextToSpeech;
