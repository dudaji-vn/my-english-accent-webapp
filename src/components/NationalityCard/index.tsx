import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import _ from "lodash";
import { UserResponseType } from "@/core/type";
import persist from "@/shared/utils/persist.util";

interface PersonInfoType {
  isShowName?: boolean;
  isShowAvatar?: boolean;
  userInfo?: Partial<UserResponseType>;
}

export default function PersonInfo(props: PersonInfoType) {
  const myInfo = persist.getMyInfo();

  const userInfo = _.isEmpty(props.userInfo) ? myInfo : props.userInfo;

  return (
    <Box className='flex gap-2'>
      {props.isShowAvatar && <Avatar alt='avatar-icon' children={userInfo.nickName?.slice(0, 1)} />}
      <Box className='flex flex-col justify-center'>{props.isShowName && <Typography className='text-base-medium'>{userInfo.nickName}</Typography>}</Box>
    </Box>
  );
}
