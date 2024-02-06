import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import useMicRecorder from "@/shared/hook/use-mic-recorder";

interface ClubRecordingAudioProps {
  onHandleNext: Function;
}

export default function ClubRecordingAudio(props: ClubRecordingAudioProps) {
  const audio = new Audio();

  const { status, startRecording, stopRecording, mediaFile } = useMicRecorder();

  const [isRecord, setIsRecord] = useState(() => {
    return status === "recording";
  });

  const [toggleSubBtn, setToggleSubBtn] = useState(() => status === "stopped");

  const onRepeat = () => {
    if (mediaFile) {
      audio.src = URL.createObjectURL(mediaFile);
      audio.play();
    }
  };

  const onHandlePlay = () => {
    if (isRecord) {
      stopRecording();
      setToggleSubBtn(() => true);
    } else {
      startRecording();
    }
    setIsRecord(() => !isRecord);
  };

  const onHandleNext = async () => {
    props.onHandleNext(mediaFile);
    setToggleSubBtn(false);
  };

  return (
    <Box className="text-center">
      <Box className={`flex items-center p-7 ${toggleSubBtn ? "justify-between" : "justify-center"}`}>
        {toggleSubBtn && (
          <IconButton onClick={onRepeat} className="border border-stroke border-solid">
            <Avatar src={HearingIcon} className="w-6 h-6" />
          </IconButton>
        )}

        <Box>
          <IconButton className="bg-primary p-5" onClick={onHandlePlay}>
            <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
          </IconButton>
        </Box>
        {toggleSubBtn && (
          <IconButton onClick={onHandleNext} className="border border-stroke border-solid">
            <Avatar src={ArrowRight} className="w-6 h-6" />
          </IconButton>
        )}
      </Box>
      <Typography variant="body2" className="text-small-regular mt-4">
        {isRecord ? "Speak now" : "Tap the icon above and record your voice"}
      </Typography>
    </Box>
  );
}
