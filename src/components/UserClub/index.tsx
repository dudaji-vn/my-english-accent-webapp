import { Typography, Avatar } from "@mui/material";
import BoxCard from "../BoxCard";
import NationalityCard from "../NationalityCard";
import MessageIcon from "@/assets/icon/message-icon.svg";
import { UserResponseType } from "@/core/type";

export default function UserClub(props: UserResponseType) {
  const language = (language: string) => {
    if (language === "vn") {
      return "Vietnamese";
    } else if (language === "us") {
      return "English";
    } else if (language === "kr") {
      return "Korea";
    } else {
      return "";
    }
  };

  return (
    <BoxCard classes='bg-white p-4 mb-4'>
      <NationalityCard isShowAvatar isShowName  userInfo={props} />
      <Typography className='text-extra-small-regular flex gap-1 mt-2'>
        <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
        Speak {language(props.nativeLanguage)} (native), {language(props.displayLanguage)}
      </Typography>
    </BoxCard>
  );
}
