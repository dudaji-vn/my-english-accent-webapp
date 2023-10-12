import { Box, Avatar } from "@mui/material";
import { useRef } from "react";

interface AudioCustomType {
  voiceSrc: string;
  icon: string;
  classes?: string;
}

export default function AudioCustom({
  voiceSrc,
  icon,
  classes = "w-5 h-5",
}: AudioCustomType) {
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
