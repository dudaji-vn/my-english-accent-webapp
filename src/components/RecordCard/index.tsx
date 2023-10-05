import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Checkbox, Grid, Typography } from "@mui/material";
import Nationality from "@/components/NationalityCard";
import AvatarIcon from "@/assets/icon/avatar-icon.svg";
import MessageIcon from "@/assets/icon/message-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-icon.svg";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";

export default function RecordCard() {
  return (
    <Grid container spacing={1} padding={2} maxHeight={"120px"}>
      <Grid item xs={2}>
        <Avatar alt="avatar-icon" src={AvatarIcon} />
      </Grid>
      <Grid item xs={8}>
        <Typography>User name 01</Typography>
        <Nationality />
      </Grid>
      <Grid item xs={2} textAlign={"end"}>
        <Checkbox
          icon={<img src={UncheckIcon} alt="uncheck-icon" />}
          checkedIcon={<img src={CheckIcon} alt="uncheck-icon" />}
        ></Checkbox>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <Avatar
            alt="microphone-icon"
            src={MicrophoneIcon}
            className="w-4 h-4"
          />
          <Typography component={"span"}>2 recorded</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <Avatar alt="message-icon" src={MessageIcon} className="w-4 h-4" />
          <Typography component={"span"}>
            Speak Korean (native), English
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}