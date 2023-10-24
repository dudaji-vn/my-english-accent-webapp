import { Box, Container, IconButton, Avatar, Typography, Button, Checkbox } from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import FooterCard from "@/components/FooterBtn";
import { useMultiAudio } from "@/shared/hook/useMultiAudio";
import { useRef } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NoPeople from "@/assets/icon/no-member-club-icon.svg";
import UserPlayRecord from "@/components/UserPlayRecord";
import { useGetAllRecordInChallengeQuery } from "@/core/services/challenge.service";
import { VocabularyTypeResponse, RecordTypeResponse } from "@/core/type";

const exampleAudio = [
  "",
  //   "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Ftopic_NA5SE36AF0rg8BvnNNiUe%2Fvocabulary_MqPGFlc-a0XnlLtu3kXVC%2Fvoice_DwRjcCyd0HgZAcngdguJp?alt=media&token=fbb79a99-0bf8-440e-88d4-3cfb23011213",
  //   "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Ftopic_NA5SE36AF0rg8BvnNNiUe%2Fvocabulary_MqPGFlc-a0XnlLtu3kXVC%2Fvoice_DwRjcCyd0HgZAcngdguJp?alt=media&token=fbb79a99-0bf8-440e-88d4-3cfb23011213",
];

type VocabularyClubType = RecordTypeResponse & VocabularyTypeResponse;

export default function ClubListeningPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { challengeId } = state;
  const { clubId } = state;

  const { data } = useGetAllRecordInChallengeQuery(challengeId);

  console.log("ClubListeningPage::", data);
  // const { players, indexAudio, playAudio } = useMultiAudio(exampleAudio);

  // const swiperElRef = useRef(null);

  // // const pagination = {
  // //   clickable: true,
  // //   renderBullet: function (index: number, className: string) {
  // //     console.log(className);
  // //     return '<span class="' + className + '">' + "</span>";
  // //   },
  // // };

  const onHandlePlayAll = () => {
    // playAudio(0);
  };

  const renderNoUser = () => {
    return (
      <Box className='flex flex-col items-center justify-center text-center gap-2 mt-6'>
        <Avatar variant='square' src={NoPeople} alt='no-people-icon' className='w-16 h-16 mb-2' />
        <Typography className='text-base-semibold'>{"No members record yet"}</Typography>
        <Typography className='text-base-regular' variant='body2'>
          {"Let's record the challenges and listen together."}
        </Typography>
      </Box>
    );
  };

  const onSlideChange = (val: any) => {
    console.log(val.activeIndex);
    if (data) {
      console.log("vocabularyId::", data.vocabularies[val.activeIndex].vocabularyId);
      console.log("challengeId::", data.vocabularies[val.activeIndex].challengeId?.id);
    }
  };

  const renderSlide = () => {
    if (data && data.vocabularies) {
      return data.vocabularies.map((voca) => {
        return (
          <SwiperSlide key={voca.vocabularyId}>
            <Box className='bg-white rounded-lg p-4 h-full flex flex-col items-center'>
              <Typography className='text-small-medium'>{voca.vtitleDisplayLanguage}</Typography>
              <Typography className='text-small-regular'>{voca.vphoneticDisplayLanguage}</Typography>
            </Box>
          </SwiperSlide>
        );
      });
    }
  };

  const renderParticipant = () => {
    if (data) {
      return data.participants.map((user) => <UserPlayRecord key={user.userId} {...user} />);
    }
  };

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={() => navigate(-1)}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>{"Word - guessing with designer"}</Typography>
        </Box>
      </Container>
      <Box className='p-4 max-h-[208px] h-[208px]'>
        <Swiper pagination={true} modules={[Pagination]} className='h-full' onSlideChange={onSlideChange}>
          {renderSlide()}
        </Swiper>
      </Box>
      <Box className='p-4 bg-white grow'>
        <Typography className='text-base-semibold pb-4'>Participant ({data?.participants.length})</Typography>
        {renderParticipant()}
      </Box>
      <FooterCard classes='items-center'>
        <Button variant='contained' className='rounded-md m-auto grow' onClick={onHandlePlayAll}>
          <Typography className='text-base-medium ' color={"white"}>
            Listen all
          </Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
