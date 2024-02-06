import React from "react";
import { Avatar, Container, Typography } from "@mui/material";
import PeopleIcon from "@/assets/icon/people-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-2-color-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
import BoxCard from "@/components/box-card";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <BoxCard classes="flex flex-col gap-2 p-4 mb-4" onClick={() => navigate(ROUTER.CLUB)}>
        <Avatar src={PeopleIcon}></Avatar>
        <Typography className="text-large-semibold">Club study</Typography>
        <Typography variant="body2">Enhance your communication skills by study with your colleagues</Typography>
      </BoxCard>
      <BoxCard classes="flex flex-col gap-2 p-4 mb-4" onClick={() => navigate(ROUTER.RECORD)}>
        <Avatar src={MicrophoneIcon} alt="headphone-icon"></Avatar>
        <Typography className="text-large-semibold">Practice pronunciation</Typography>
        <Typography variant="body2">Common phrase practice for work</Typography>
      </BoxCard>
    </Container>
  );
}
