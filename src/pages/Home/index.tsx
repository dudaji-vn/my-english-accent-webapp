import React from "react";
<<<<<<< Updated upstream
import { Avatar, Container, Typography } from "@mui/material";
=======
<<<<<<< Updated upstream
import { Avatar, Box, Container, Typography } from "@mui/material";
=======
import { Avatar, Button, Container, Typography } from "@mui/material";
>>>>>>> Stashed changes
>>>>>>> Stashed changes
import HeadphoneIcon from "@/assets/icon/music-play-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-2-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import BoxCard from "@/components/BoxCard";
=======
<<<<<<< Updated upstream
import BoxCard from "@/components/Card";
=======
import BoxCard from "@/components/BoxCard";
import UserController from "@/core/controllers/user.controller";
import { IUserRegister, IVocabularyRequest } from "@/core/type";
import TopicController from "@/core/controllers/topic.controller";
import VocabularyController from "@/core/controllers/vocabulary.controller";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

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

    // TopicController.addTopic({
    //   img_src: "https://th.bing.com/th/id/OIP.IhiqRWFamp-enjV2csKdzwHaE8?pid=ImgDet&rs=1",
    //   name: "Product design",
    // });

    VocabularyController.addVocabulary({
      ipa_display_language: "stæk",
      title_display_language: "Stack",
      title_native_language: "",
      topic_id: "",
    } as IVocabularyRequest);
  };
  return (
    <Container>
      <Typography className='text-sm my-6' component={"h6"}>
        Home
      </Typography>
<<<<<<< Updated upstream
      <BoxCard
        classes="flex flex-col gap-2 p-4 mb-4"
        onClick={() => navigate(ROUTER.RECORD)}
      >
=======
<<<<<<< Updated upstream
      <BoxCard classes="flex flex-col gap-2 p-4 mb-4" onClick={() => navigate(ROUTER.RECORD)}>
=======
      <BoxCard classes='flex flex-col gap-2 p-4 mb-4' onClick={() => navigate(ROUTER.RECORD)}>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        <Avatar src={MicrophoneIcon}></Avatar>
        <Typography className='text-large-semibold'>Practice pronunciation</Typography>
        <Typography variant='body2'>Common phrase practice for work</Typography>
      </BoxCard>
<<<<<<< Updated upstream
      <BoxCard
        classes="flex flex-col gap-2 p-4 mb-4"
        onClick={() => navigate(ROUTER.LISTENING)}
      >
=======
<<<<<<< Updated upstream
      <BoxCard classes="flex flex-col gap-2 p-4 mb-4" onClick={() => navigate(ROUTER.LISTENING)}>
>>>>>>> Stashed changes
        <Avatar src={HeadphoneIcon} alt="headphone-icon"></Avatar>
        <Typography className="text-large-semibold">Listening</Typography>
        <Typography variant="body2">Your colleague’s english accent</Typography>
=======
      <BoxCard classes='flex flex-col gap-2 p-4 mb-4' onClick={() => navigate(ROUTER.LISTENING)}>
        <Avatar src={HeadphoneIcon} alt='headphone-icon'></Avatar>
        <Typography className='text-large-semibold'>Listening</Typography>
        <Typography variant='body2'>Your colleague’s english accent</Typography>
>>>>>>> Stashed changes
      </BoxCard>
      <Button onClick={onGenerated}>Generated</Button>
    </Container>
  );
}
