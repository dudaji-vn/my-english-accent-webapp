import React from "react";
import { Avatar, Box, Container, Typography } from "@mui/material";
import HeadphoneIcon from "@/assets/icon/music-play-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-2-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const redirectTo = (path: string) => {
    navigate({
      pathname: path,
    });
  };
  return (
    <Container>
      <Typography className="text-sm my-6" component={"h6"}>
        Home
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 2,
          borderRadius: 1,
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          background: "white",
          marginBottom: 2,
        }}
        onClick={() => redirectTo(ROUTER.RECORD)}
      >
        <Avatar src={MicrophoneIcon}></Avatar>
        <Typography className="text-large-semibold">
          Practice pronunciation
        </Typography>
        <Typography variant="body2">Common phrase practice for work</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 2,
          borderRadius: 1,
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          background: "white",
        }}
        onClick={() => redirectTo(ROUTER.LISTENING)}
      >
        <Avatar src={HeadphoneIcon}></Avatar>
        <Typography className="text-large-semibold">Listening</Typography>
        <Typography variant="body2">Your colleague’s english accent</Typography>
      </Box>
    </Container>
  );
}
