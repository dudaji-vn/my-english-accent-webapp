import MessageIcon from "@/assets/icon/message-icon.svg";
import { Language } from "@/core/type";
import { PeopleListenTypeResponse } from "@/core/type/listen.type";
import { Avatar, Box, Typography } from "@mui/material";
import NationalityCard from "../person-info";

export default function UserListen(props: PeopleListenTypeResponse) {
  const language = (language: Language) => {
    const lang = {
      vn: "Vietnamese",
      us: "English",
      kr: "Korean",
    };
    return lang[language];
  };

  return (
    <Box>
      <NationalityCard isShowAvatar isShowName userInfo={props} />
      <Typography className="text-extra-small-regular flex gap-1 mt-2" variant="body2">
        <Avatar variant="square" src={MessageIcon} component={"span"} className="w-4 h-4" />
        Speak {language(props.nativeLanguage)} (native), {language(props.displayLanguage)}
      </Typography>
    </Box>
  );
}
