import { Box, Typography, Avatar, Checkbox } from "@mui/material";
import MessageIcon from "@/assets/icon/message-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import NationalityCard from "@/components/NationalityCard";
import { UserResponseType } from "@/core/type";

export default function UserPlayRecord(userInfo: UserResponseType) {
  return (
    <Box className='flex justify-between items-start py-4'>
      <Box>
        <NationalityCard isShowAvatar isShowName isShowNationality />
        <Typography className='text-extra-small-regular flex gap-1 mt-2'>
          <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
          Speak Vietnamese (native), English
        </Typography>
      </Box>
      <Checkbox icon={<Avatar src={SpeakerIcon} className='w-6 h-6' />} checkedIcon={<Avatar src={SpeakerFillIcon} className='w-6 h-6' />} />
    </Box>
  );
}
