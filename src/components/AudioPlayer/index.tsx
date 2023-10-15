import { Box, Avatar } from "@mui/material";
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
  const playing = true;
  const audio = new Audio(voiceSrc);

  const onPlay = () => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
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
    </Box>
  );
}
