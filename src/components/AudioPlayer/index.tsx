import { Box, Avatar } from "@mui/material";
import { useRef } from "react";

interface AudioPlayerType {
  voiceSrc: string;
  icon: string;
  classes?: string;
}

export default function AudioPlayer({
  voiceSrc,
  icon,
  classes = "w-5 h-5",
}: AudioPlayerType) {
  const audioEle = useRef<HTMLAudioElement | null>(null);
  const onPlay = () => {
    if (audioEle && audioEle.current) {
      audioEle.current.play();
    }
  };
  return (
    <Box>
      <Avatar
        src={icon}
        alt="volumn-icon"
        className={classes}
        onClick={onPlay}
      />
      <audio src={voiceSrc} ref={audioEle}></audio>
    </Box>
  );
}
