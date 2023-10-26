import { Box, Avatar, Checkbox } from "@mui/material";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import { useState } from "react";
interface AudioPlayerType {
  voiceSrc: string;
  classes?: string;
}

export default function AudioPlayer({ voiceSrc, classes = "w-5 h-5" }: AudioPlayerType) {
  const [playing, setPlaying] = useState(true);
  const audio = new Audio(voiceSrc);

  const onPlay = () => {
    const isPlay = playing;
    console.log(isPlay);
    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
    }
    setPlaying(() => !isPlay);
  };
  return (
    <Box>
      <Checkbox className={classes} onClick={onPlay} icon={<Avatar src={SpeakerIcon} className='w-6 h-6' />} checkedIcon={<Avatar src={SpeakerFillIcon} className='w-6 h-6' />} />
    </Box>
  );
}
