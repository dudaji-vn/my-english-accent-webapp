import React from "react";
import { Avatar, Button, Container, Typography } from "@mui/material";
import HeadphoneIcon from "@/assets/icon/music-play-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-2-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
import BoxCard from "@/components/BoxCard";
import TopicController from "@/core/controllers/topic.controller";

export default function HomePage() {
  const navigate = useNavigate();

  const onGenerated = () => {
    // UserController.register({
    //   avatar_url: "https://www.signivis.com/img/custom/avatars/member-avatar-01.png",
    //   display_language: "en",
    //   favorite_user_ids: [],
    //   google_id: "",
    //   native_language: "kr",
    //   nick_name: "thien04",
    //   password: "123",
    //   user_name: "thien04",
    // } as IUserRegister);

    TopicController.addTopic({
      img_src: "https://th.bing.com/th/id/OIP.IhiqRWFamp-enjV2csKdzwHaE8?pid=ImgDet&rs=1",
      name: "Product design",
    });

    // VocabularyController.addVocabulary({
    //   ipa_display_language: "stæk",
    //   title_display_language: "Stack",
    //   title_native_language: "",
    //   topic_id: "",
    // } as IVocabularyRequest);
  };
  return (
    <Container>
      <Typography className='text-sm my-6' component={"h6"}>
        Home
      </Typography>
      <BoxCard classes='flex flex-col gap-2 p-4 mb-4' onClick={() => navigate(ROUTER.RECORD)}>
        <Avatar src={MicrophoneIcon}></Avatar>
        <Typography className='text-large-semibold'>Practice pronunciation</Typography>
        <Typography variant='body2'>Common phrase practice for work</Typography>
      </BoxCard>
      <BoxCard classes='flex flex-col gap-2 p-4 mb-4' onClick={() => navigate(ROUTER.LISTENING)}>
        <Avatar src={HeadphoneIcon} alt='headphone-icon'></Avatar>
        <Typography className='text-large-semibold'>Listening</Typography>
        <Typography variant='body2'>Your colleague’s english accent</Typography>
      </BoxCard>
      <Button onClick={onGenerated}>Generated</Button>
    </Container>
  );
}
