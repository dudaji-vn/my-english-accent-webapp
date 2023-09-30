import React from "react";
import Box from "@mui/material/Box";
import { Grid, IconButton, Typography } from "@mui/material";
import HeartIcon from "@/assets/favorite-icon.svg";
import AvatarIcon from "@/assets/avatar-icon.svg";
import MessageIcon from "@/assets/message-icon.svg";
import MicrophoneIcon from "@/assets/microphone-icon.svg";

export default function CardRecord() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <img src={AvatarIcon} alt="favorite-icon" />
      </Grid>
      <Grid item xs={8}>
        <Typography>User name 01</Typography>
        <Typography>Country of birth</Typography>
      </Grid>
      <Grid item xs={2} textAlign={"end"}>
        <IconButton color="primary">
          <img src={HeartIcon} alt="favorite-icon" />
        </IconButton>
      </Grid>
      <Grid item xs={12} spacing={2}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <img src={MessageIcon} alt="favorite-icon" />
          <Typography component={"span"}>2 recorded</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <img src={MicrophoneIcon} alt="favorite-icon" />
          <Typography component={"span"}>
            Speak Korean (native), English
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
