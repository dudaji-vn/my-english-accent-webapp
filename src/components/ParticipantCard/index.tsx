import { Box } from "@mui/material";
import VolumnIcon from "@/assets/icon/volume-icon.svg";
import AudioPlayer from "@/components/AudioPlayer";
import PersonInfo from "../NationalityCard";

export default function ParticipantCard({ voiceSrc }: { voiceSrc: string }) {
  return (
    <Box className="flex items-center gap-1 p-4 bg-white divider">
      <AudioPlayer voiceSrc={voiceSrc} icon={VolumnIcon} />
      <PersonInfo isShowAvatar isShowName isShowNationality />
    </Box>
  );
}
