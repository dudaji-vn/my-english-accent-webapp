import React from "react";
import { Avatar, Box, Button, Container, IconButton, Typography } from "@mui/material";
import AddIcon from "@/assets/icon/add-btn-icon.svg";
import Chervon from "@/assets/icon/chevron-left-icon.svg";
import WebniarIcon from "@/assets/icon/webinar-icon.svg";

import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
import ClubCard from "@/components/ClubCard";
import { useGetClubsOwnerQuery } from "@/core/services/club.service";
import persist from "@/shared/utils/persist.util";

export default function ClubPage() {
  const navigate = useNavigate();

  const myId = persist.getMyInfo().userId;
  const { data } = useGetClubsOwnerQuery(myId);
  const renderNoClub = () => {
    return (
      <Container className='flex flex-col text-center items-center gap-2 mt-12'>
        <Avatar variant='square' src={WebniarIcon} className='w-16 h-16' />
        <Typography className='text-large-semibold'>Club study</Typography>
        <Typography className='text-base-regular' variant='body2'>
          A place to connect with multilingual colleagues to enhance communication skills
        </Typography>
        <Button className='mt-6 w-[162px]' variant='contained' onClick={() => navigate(ROUTER.ADD_CLUB)}>
          Create new club
        </Button>
      </Container>
    );
  };

  const renderClubManage = () => {
    return (
      <Container>
        <Box className='flex justify-between items-center mt-4'>
          <Typography className='text-base-semibold'>Clubs you manage ({data && data.clubsOwner.length})</Typography>
          <IconButton onClick={() => navigate(ROUTER.ADD_CLUB)}>
            <Avatar src={AddIcon} alt='speaking-icon' className='w-8 h-8' />
          </IconButton>
        </Box>
        {data &&
          data.clubsOwner.map((club) => {
            return <ClubCard {...club} key={club.clubId} />;
          })}
      </Container>
    );
  };

  const renderClubJoined = () => {
    if (data && data.clubsJoined.length > 0) {
      return (
        <Box>
          <Box className='flex justify-between items-center mt-4'>
            <Typography className='text-base-semibold'>Club you’ve joined ({data && data.clubsJoined.length})</Typography>
          </Box>
          {data.clubsJoined.map((club) => {
            return <ClubCard {...club} key={club.clubId} />;
          })}
        </Box>
      );
    }
  };

  return (
    <Box className="pb-4">
      <Box className='px-4 pt-4 pb-2 flex items-center gap-2 bg-white'>
        <Avatar src={Chervon} className='w-6 h-6' onClick={() => navigate(ROUTER.ROOT)} />
        <Typography className='text-large-semibold'>Club study</Typography>
      </Box>
      {data && data.clubsOwner.length > 0 ? renderClubManage() : renderNoClub()}
      <Container>{renderClubJoined()}</Container>
    </Box>
  );
}
