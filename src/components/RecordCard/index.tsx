import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Checkbox, Grid, Typography } from "@mui/material";
import PersonInfo from "@/components/NationalityCard";
import AvatarIcon from "@/assets/icon/avatar-icon.svg";
import MessageIcon from "@/assets/icon/message-icon.svg";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import { UserResponseType } from "@/core/type";

interface RecordType {
  className?: string;
  userInfo?: UserResponseType;
  checked?: boolean;
  callback: Function;
}
export default function RecordCard(props: RecordType) {
  const [checked, setChecked] = useState(false);

  const onSelectLecture = () => {
    setChecked(() => !checked);
    props.callback(props.userInfo?.userId);
  };

  return (
    <Grid container margin={0} width={"100%"} spacing={1} padding={2} className={props.className} onClick={onSelectLecture}>
      <Grid item xs={2}>
        <Avatar alt='avatar-icon' src={AvatarIcon} />
      </Grid>
      <Grid item xs={8}>
        <PersonInfo userInfo={props.userInfo} isShowName isShowNationality />
      </Grid>
      <Grid item xs={2} textAlign={"end"}>
        <Checkbox checked={checked} icon={<Avatar src={UncheckIcon} alt='uncheck-icon' className='w-4 h-4' />} checkedIcon={<Avatar src={CheckIcon} alt='check-icon' className='w-4 h-4' />} />
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <Avatar alt='message-icon' src={MessageIcon} className='w-4 h-4' />
          <Typography variant={"body2"} className='text-extra-small-regular'>
            Speak Korean (native), English
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
