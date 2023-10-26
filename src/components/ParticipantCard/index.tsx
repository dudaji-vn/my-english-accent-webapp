import { Box } from "@mui/material";
import VolumnIcon from "@/assets/icon/volume-icon.svg";
import AudioPlayer from "@/components/AudioPlayer";
import PersonInfo from "../NationalityCard";
import { UserType } from "@/shared/type";

export default function ParticipantCard({
  voiceSrc,
  onClick,
  userInfo,
}: {
  voiceSrc: string;
  onClick: Function;
  userInfo: Partial<UserType>;
}) {
  const onRedirectUser = () => {
    onClick();
  };
  return (
    <Box className="flex items-center gap-1 p-4 bg-white divider">
      <AudioPlayer voiceSrc={voiceSrc}/>
      <Box onClick={onRedirectUser}>
        {/* <PersonInfo
          isShowAvatar
          isShowName
          isShowNationality
          userInfo={userInfo}
        /> */}
      </Box>
    </Box>
  );
}
