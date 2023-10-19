import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import WebniarIcon from "@/assets/icon/webinar-icon.svg";
import MessageIcon from "@/assets/icon/message-icon.svg";

import NationalityCard from "@/components/NationalityCard";
import BoxCard from "@/components/BoxCard";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";

export default function ClubMemberPage() {
  const navigate = useNavigate();
  const renderNoMember = () => {
    return (
      <Box className='flex flex-col justify-center items-center gap-4'>
        <Avatar src={WebniarIcon} className='w-16 h-16' variant='square' />
        <Box className='text-center'>
          <Typography className='text-large-semibold'>Add new member</Typography>
          <Typography className='text-base-regular' variant='body2'>
            Let's add new members and begin learning together.
          </Typography>
        </Box>
        <Button variant='contained' onClick={() => navigate(ROUTER.CLUB_ADD_MEMBER)}>
          Add
        </Button>
      </Box>
    );
  };
  const renderMembers = () => {
    return (
      <Box>
        <Box className='flex justify-between items-center mb-4'>
          <Typography className='text-base-semibold'>Members (1)</Typography>
          <Button variant='contained' onClick={() => navigate(ROUTER.CLUB_ADD_MEMBER)}>
            Add
          </Button>
        </Box>
        <BoxCard classes='bg-white p-4'>
          <NationalityCard isShowAvatar isShowName isShowNationality />
          <Typography className='text-extra-small-regular flex gap-1 mt-2'>
            <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
            Speak Vietnamese (native), English
          </Typography>
        </BoxCard>
      </Box>
    );
  };
  return (
    <Container className='mt-6'>
      <Box>
        <Typography className='text-base-semibold'>Admin</Typography>
        <BoxCard classes='bg-white p-4 mt-4 mb-6'>
          <NationalityCard isShowAvatar isShowName isShowNationality />
          <Typography className='text-extra-small-regular flex gap-1 mt-2'>
            <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
            Speak Vietnamese (native), English
          </Typography>
        </BoxCard>
      </Box>
      {renderMembers()}
    </Container>
  );
}
