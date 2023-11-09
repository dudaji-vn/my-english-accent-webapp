import { Box, Container, IconButton, Avatar, Typography, Button, setRef } from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import FooterCard from "@/components/FooterBtn";
import { useMultiAudio } from "@/shared/hook/useMultiAudio";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NoPeople from "@/assets/icon/no-member-club-icon.svg";
import UserPlayRecord from "@/components/UserPlayRecord";
import { RecordTypeResponse, UserResponseType, VocabularyTypeResponse } from "@/core/type";

export default function ClubListeningPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { challengeId } = state;

  // const { data } = useGetRecordToListenQuery(challengeId);

  const data = {
    participants: [],
    vocabularies: [],
  } as any;

  const [currentVocabulary, setCurrentVocabulary] = useState(0);
  const [audioSelected, setAudioSelected] = useState("");
  const { status, players, indexAudio, playAudio } = useMultiAudio();

  const onHandlePlayAll = () => {
    if (data && data.participants && data.participants.length) {
      const voiceRecords: { url: string; playing: boolean; played: boolean }[] = data.participants[currentVocabulary].recordUser.map((user: RecordTypeResponse) => ({
        url: user.rVoiceSrc,
        playing: false,
        played: false,
      }));
      playAudio(0, voiceRecords);
    }
  };

  const onSlideChange = (val: any) => {
    setAudioSelected(() => "");
    setCurrentVocabulary(() => val.activeIndex);
  };

  const onAudioSelected = (urlSrc: string) => {
    setAudioSelected(() => urlSrc);
  };

  useEffect(() => {
    if (status === "stop") {
      setAudioSelected(() => "");
      console.log("ClubListeningPage::useEffect::stop");
    } else if (indexAudio != -1 && players.length) {
      setAudioSelected(() => players[indexAudio].url);
      console.log("ClubListeningPage::useEffect", players[indexAudio].url);
    }
  }, [indexAudio, status]);

  const renderSlide = () => {
    if (data && data.vocabularies && data.vocabularies.length) {
      return data.vocabularies.map((voca: VocabularyTypeResponse) => {
        return (
          <SwiperSlide key={voca.vocabularyId}>
            <Box className='bg-white rounded-lg p-4 h-full flex flex-col items-center'>
              <Typography className='text-small-medium'>{voca.vtitleDisplayLanguage}</Typography>
              <Typography className='text-small-regular' variant='body2'>
                {voca.vphoneticDisplayLanguage}
              </Typography>
            </Box>
          </SwiperSlide>
        );
      });
    }
  };

  const renderParticipant = () => {
    if (data) {
      if (data.participants && data.participants.length) {
        return (
          <>
            <Typography className='text-base-semibold pb-4'>Participants ({data.participants[currentVocabulary]?.recordUser.length})</Typography>
            {data.participants[currentVocabulary].recordUser.map((recordUser: UserResponseType & RecordTypeResponse) => (
              <UserPlayRecord
                key={recordUser.userId}
                props={{ ...recordUser }}
                audioSelected={audioSelected}
                setAudioSelected={onAudioSelected}
                currentVocabulary={currentVocabulary}
              />
            ))}
          </>
        );
      } else {
        return (
          <Box className='flex flex-col items-center justify-center text-center gap-2 mt-6'>
            <Avatar variant='square' src={NoPeople} alt='no-people-icon' className='w-16 h-16 mb-2' />
            <Typography className='text-base-semibold'>{"No members record yet"}</Typography>
            <Typography className='text-base-regular' variant='body2'>
              {"Let's record the challenges and listen together."}
            </Typography>
          </Box>
        );
      }
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
      <Box className='p-4 bg-white grow'>{renderParticipant()}</Box>
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
