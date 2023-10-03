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
      <div>123123123</div>
      <Typography
        className="text-sm"
        marginTop={"1.375rem"}
        marginBottom={"1.5rem"}
      >
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
        }}
        onClick={() => redirectTo(ROUTER.RECORD)}
      >
        <Avatar src={MicrophoneIcon}></Avatar>
        <Typography>Practice pronunciation</Typography>
        <Typography>Common phrase practice for work</Typography>
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
        }}
        onClick={() => redirectTo(ROUTER.LISTENING)}
      >
        <Avatar src={HeadphoneIcon}></Avatar>
        <Typography>Listening</Typography>
        <Typography>Your colleague’s english accent</Typography>
      </Box>
      {/* <Box display={"flex"} gap={1} padding={2}>
        <img alt="chevron-left-icon" src={ChevronIcon} />
        <Typography>Practice pronunciation</Typography>
      </Box> */}
    </Container>
  );
}
