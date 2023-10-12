import { Box } from "@mui/material";
import VolumnIcon from "@/assets/icon/volume-icon.svg";
import AudioCustom from "@/components/AudioCustom";
import PersonInfo from "../NationalityCard";

export default function ParticipantCard({ voiceSrc }: { voiceSrc: string }) {
  return (
    <Box className="flex items-center gap-1 p-4 bg-white divider">
      <AudioCustom voiceSrc={voiceSrc} icon={VolumnIcon} />
      <PersonInfo isShowAvatar isShowName isShowNationality />
    </Box>
  );
}
