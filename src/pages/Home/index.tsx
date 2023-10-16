import React from "react";
import { Avatar, Container, Typography } from "@mui/material";
import HeadphoneIcon from "@/assets/icon/music-play-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-2-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
import BoxCard from "@/components/BoxCard";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography className='text-sm my-6' component={"h6"}>
        Home
      </Typography>
      <BoxCard classes='flex flex-col gap-2 p-4 mb-4' onClick={() => navigate(ROUTER.RECORD)}>
        <Avatar src={MicrophoneIcon}></Avatar>
        <Typography className='text-large-semibold'>Practice pronunciation</Typography>
        <Typography variant='body2'>Common phrase practice for work</Typography>
      </BoxCard>
      <BoxCard classes='flex flex-col gap-2 p-4 mb-4' onClick={() => navigate(ROUTER.LISTENING)}>
        <Avatar src={HeadphoneIcon} alt='headphone-icon'></Avatar>
        <Typography className='text-large-semibold'>Listening</Typography>
        <Typography variant='body2'>Your colleague’s english accent</Typography>
      </BoxCard>
    </Container>
  );
}
