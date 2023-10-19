import { Box, Typography, IconButton, Avatar } from "@mui/material";
import BoxCard from "../BoxCard";
import RightArrowIcon from "@/assets/icon/arrow-right-icon.svg";
import UserIcon from "@/assets/icon/user-icon.svg";
import ClockIcon from "@/assets/icon/clock-icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
export default function ClubCard() {
  const navigate = useNavigate();
  const onRedirectToClub = () => {
    navigate(ROUTER.CLUB_DETAIL + "/" + ROUTER.CLUB_STUDY);
  };
  return (
    <BoxCard classes='p-4' onClick={onRedirectToClub}>
      <Box className='flex justify-between items-center'>
        <Typography className='text-base-semibold'>Multiverse Design-Dev</Typography>
        <IconButton>
          <Avatar src={RightArrowIcon} alt='speaking-icon' className='w-6 h-6' />
        </IconButton>
      </Box>

      <Typography className='text-extra-small-regular' variant='body2'>
        <IconButton>
          <Avatar src={UserIcon} alt='speaking-icon' className='w-4 h-4' />
        </IconButton>
        5 members
      </Typography>

      <Typography className='text-extra-small-regular' variant='body2'>
        <IconButton>
          <Avatar src={ClockIcon} alt='speaking-icon' className='w-4 h-4' />
        </IconButton>
        Created 2 minuted ago
      </Typography>
    </BoxCard>
  );
}
