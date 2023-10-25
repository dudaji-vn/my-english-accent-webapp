import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import KoreaFlag from "@/assets/icon/korea-flag-icon.svg";
import { useAppSelector } from "@/store/hook";
import _ from "lodash";
import { UserResponseType } from "@/core/type";

interface PersonInfoType {
  isShowName?: boolean;
  isShowAvatar?: boolean;
  isShowNationality?: boolean;
  userInfo?: Partial<UserResponseType>;
}

export default function PersonInfo(props: PersonInfoType) {
  const myInfo = useAppSelector((state) => state.user.myInfo);

  const userInfo = _.isEmpty(props.userInfo) ? myInfo : props.userInfo;

  const getFlag = () => {
    switch (userInfo.nativeLanguage) {
      case "kr":
        return KoreaFlag;
      case "vi":
        return Vietnamflag;
    }
  };

  const getNational = () => {
    switch (userInfo.nativeLanguage) {
      case "kr":
        return "Korean";
      case "vi":
        return "Vietnamese";
    }
  };
  return (
    <Box className='flex gap-2'>
      {props.isShowAvatar && <Avatar alt='avatar-icon' />}
      <Box>
        {props.isShowName && <Typography className='text-small-medium'>{userInfo.userName}</Typography>}
        {props.isShowNationality && (
          <Box display={"flex"} alignItems={"center"} gap={1}>
            {/* <Avatar alt='national-flag-icon' src={getFlag()} className='w-4 h-4' /> */}
            <Typography variant='body2' className='text-extra-small-regular'>
              {getNational()}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
