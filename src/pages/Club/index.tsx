import React from "react";
import { Avatar, Box, Button, Container, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@/assets/icon/add-btn-icon.svg";
import PeopleIcon from "@/assets/icon/people-icon.svg";
import Chervon from "@/assets/icon/chevron-left-icon.svg";
import UserIcon from "@/assets/icon/user-icon.svg";
import ClockIcon from "@/assets/icon/clock-icon.svg";
import WebniarIcon from "@/assets/icon/webinar-icon.svg";

import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
import BoxCard from "@/components/BoxCard";
import ClubCard from "@/components/ClubCard";

export default function ClubPage() {
  const navigate = useNavigate();

  const renderNoClub = () => {
    return (
      <Container className='flex flex-col text-center items-center gap-2 mt-12'>
        <Avatar variant='square' src={WebniarIcon} className='w-16 h-16' />
        <Typography className='text-large-semibold'>Club study</Typography>
        <Typography className='text-base-regular' variant='body2'>
          A place to connect with multilingual colleagues to enhance communication skills
        </Typography>
        <Button className='mt-6 w-[162px]' variant='contained' onClick={() => navigate(ROUTER.CLUB_ADD_MEMBER)}>
          Create new club
        </Button>
      </Container>
    );
  };

  const renderClubManage = () => {
    return (
      <Box>
        <Box className='flex justify-between items-center mt-4'>
          <Typography className='text-base-semibold'>Clubs you manage</Typography>
          <IconButton>
            <Avatar src={AddIcon} alt='speaking-icon' className='w-8 h-8' />
          </IconButton>
        </Box>

        <ClubCard />
        <ClubCard />
        <ClubCard />
      </Box>
    );
  };

  const renderClubJoined = () => {
    return (
      <Box>
        <Box className='flex justify-between items-center mt-4'>
          <Typography className='text-base-semibold'>Club you’ve joined (1)</Typography>
          <IconButton>
            <Avatar src={AddIcon} alt='speaking-icon' className='w-8 h-8' />
          </IconButton>
        </Box>
        <ClubCard />
        <ClubCard />
        <ClubCard />
      </Box>
    );
  };

  return (
    <Box>
      <Box className='px-4 pt-4 pb-2 flex items-center gap-2 bg-white'>
        <Avatar src={Chervon} className='w-6 h-6' onClick={() => navigate(ROUTER.ROOT)} />
        <Typography className='text-large-semibold'>Club study</Typography>
      </Box>
      {renderNoClub()}
      <Container>
        {renderClubManage()}
        {renderClubJoined()}
      </Container>
    </Box>
  );
}
