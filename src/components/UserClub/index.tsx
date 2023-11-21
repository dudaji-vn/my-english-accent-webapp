import { Typography, Avatar } from "@mui/material";
import BoxCard from "../BoxCard";
import NationalityCard from "../PersonInfo";
import MessageIcon from "@/assets/icon/message-icon.svg";
import { Language, UserResponseType } from "@/core/type";

export default function UserClub(props: UserResponseType) {
  const language = (language: Language) => {
    const lang = {
      vn: "Vietnamese",
      us: "English",
      kr: "Korean",
    };
    return lang[language];
  };

  return (
    <BoxCard classes='bg-white p-4 mb-4'>
      <NationalityCard isShowAvatar isShowName userInfo={props} />
      <Typography className='text-extra-small-regular flex gap-1 mt-2'>
        <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
        Speak {language(props.nativeLanguage)} (native), {language(props.displayLanguage)}
      </Typography>
    </BoxCard>
  );
}
