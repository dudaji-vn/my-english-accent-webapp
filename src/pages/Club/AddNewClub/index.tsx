import React, { useState } from "react";
import { Avatar, Box, Button, Checkbox, Container, IconButton, Paper, TextField, Typography } from "@mui/material";
import AddIcon from "@/assets/icon/add-btn-icon.svg";
import CloseIcon from "@/assets/icon/close-icon.svg";
import RightArrowIcon from "@/assets/icon/arrow-right-icon.svg";
import UserIcon from "@/assets/icon/user-icon.svg";
import ClockIcon from "@/assets/icon/clock-icon.svg";
import WebniarIcon from "@/assets/icon/webinar-icon.svg";

import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
import BoxCard from "@/components/BoxCard";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import FooterCard from "@/components/FooterBtn";

export default function AddNewClubPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  return (
    <Box className='flex flex-col grow'>
      <Box className='p-4 flex items-center gap-2 bg-white'>
        <Avatar src={CloseIcon} className='w-6 h-6' />
        <Typography className='text-large-semibold'>Create club</Typography>
      </Box>
      <Container className='mt-6 grow'>
        <Box>
          <Typography className='text-small-medium'>What's your club name</Typography>
          <TextField placeholder='TechTalk and Design Club' variant='outlined' />
        </Box>

        <Box className='mt-4'>
          <Typography className='text-small-medium mb-4'>Lecture (topic)</Typography>
          <BoxCard classes='flex items-center gap-2 p-4 rounded-b-none'>
            <Box className='w-10 h-10'>
              <img className='w-full h-full' src={WebniarIcon}></img>
            </Box>
            <Typography> Terminology</Typography>
            <Checkbox onClick={() => setChecked(() => !checked)} checked={checked} icon={<img src={UncheckIcon} alt='uncheck-icon' />} checkedIcon={<img src={CheckIcon} alt='check-icon' />} />
          </BoxCard>
        </Box>
      </Container>
      <FooterCard classes='items-center'>
        <Button variant='contained' className='rounded-md m-auto grow'>
          <Typography className='text-base-medium text-white'>Create</Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
