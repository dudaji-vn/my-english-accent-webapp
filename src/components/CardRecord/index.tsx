import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Checkbox, Grid, SvgIcon, Typography } from "@mui/material";
import AvatarIcon from "@/assets/icon/avatar-icon.svg";
import MessageIcon from "@/assets/icon/message-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-icon.svg";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import KoreaFlag from "@/assets/icon/korea-flag-icon.svg";

export default function CardRecord() {
  return (
    <Grid container spacing={1} padding={2} maxHeight={"120px"}>
      <Grid item xs={2}>
        <Avatar alt="avatar-icon" src={AvatarIcon} />
      </Grid>
      <Grid item xs={8}>
        <Typography color="primary">User name 01</Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Avatar
            alt="national-flag-icon"
            src={KoreaFlag}
            sx={{
              width: "1rem",
              height: "1rem",
            }}
          />
          <Typography>Nationality</Typography>
        </Box>
      </Grid>
      <Grid item xs={2} textAlign={"end"}>
        <Checkbox
          icon={<img src={UncheckIcon} style={{ padding: "2px" }} />}
          checkedIcon={<img src={CheckIcon} />}
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
            sx={{
              width: "1rem",
              height: "1rem",
            }}
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
          <Avatar
            alt="message-icon"
            src={MessageIcon}
            sx={{
              width: "1rem",
              height: "1rem",
            }}
          />
          <Typography component={"span"}>
            Speak Korean (native), English
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
