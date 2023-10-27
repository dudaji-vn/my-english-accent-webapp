import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hook";
import _ from "lodash";
import { UserResponseType } from "@/core/type";

interface PersonInfoType {
  isShowName?: boolean;
  isShowAvatar?: boolean;
  userInfo?: Partial<UserResponseType>;
}

export default function PersonInfo(props: PersonInfoType) {
  const myInfo = useAppSelector((state) => state.user.myInfo);

  const userInfo = _.isEmpty(props.userInfo) ? myInfo : props.userInfo;
  return (
    <Box className='flex gap-2'>
      {props.isShowAvatar && <Avatar alt='avatar-icon' />}
      <Box className='flex flex-col justify-center'>{props.isShowName && <Typography className='text-base-medium'>{userInfo.userName}</Typography>}</Box>
    </Box>
  );
}
