import { Typography, Avatar } from "@mui/material";
import BoxCard from "../BoxCard";
import NationalityCard from "../NationalityCard";
import MessageIcon from "@/assets/icon/message-icon.svg";

export default function UserClub() {
  return (
    <BoxCard classes='bg-white p-4'>
      <NationalityCard isShowAvatar isShowName isShowNationality />
      <Typography className='text-extra-small-regular flex gap-1 mt-2'>
        <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
        Speak Vietnamese (native), English
      </Typography>
    </BoxCard>
  );
}
