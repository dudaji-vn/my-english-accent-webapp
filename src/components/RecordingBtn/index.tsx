import { useState } from "react";
import { Box, IconButton, Avatar, Typography, Container } from "@mui/material";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";

export default function RecordingBtn() {
  const [isRecord, setIsRecord] = useState(false);
  const onRecord = () => {
    console.log("record");
    setIsRecord(() => !isRecord);
  };
  return (
    <Box className="text-center">
      <Box className="flex justify-between items-center p-7">
        <IconButton
          onClick={onRecord}
          className="border border-stroke border-solid"
        >
          <Avatar src={HearingIcon} className="w-6 h-6" />
        </IconButton>
        <IconButton className="bg-primary p-5" onClick={onRecord}>
          <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
        </IconButton>
        <IconButton
          onClick={onRecord}
          className="border border-stroke border-solid"
        >
          <Avatar src={ArrowRight} className="w-6 h-6" />
        </IconButton>
      </Box>

      <Box className="h-28 w-1"></Box>
      <Typography variant="body2" className="text-small-regular mt-4">
        Tap the icon above and record your voice
      </Typography>
    </Box>
  );
}
