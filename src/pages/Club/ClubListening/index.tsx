import CloseIcon from "@/assets/icon/close-icon.svg";
import NoPeople from "@/assets/icon/no-member-club-icon.svg";
import FooterCard from "@/components/FooterBtn";
import UserPlayRecord from "@/components/UserPlayRecord";
import { useGetRecordToListenByChallengeQuery } from "@/core/services";
import { RecordTypeResponse, UserResponseType, VocabularyTypeResponse } from "@/core/type";
import { MultiAudioComponent } from "@/shared/hook/useMultiAudios";
import { Avatar, Box, Container, IconButton, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

export default function ClubListeningPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { challengeId } = state;

  const { data } = useGetRecordToListenByChallengeQuery(challengeId);

  const [currentVocabulary, setCurrentVocabulary] = useState(0);
  const [audioSelected, setAudioSelected] = useState("");

  const voiceRecords = useMemo(() => {
    if (data) {
      return data.participants[currentVocabulary].recordUser.map((record) => record.voiceSrc);
    }
    return [];
  }, [data?.participants, currentVocabulary]);

  const onSlideChange = (val: SwiperClass) => {
    setAudioSelected(() => "");
    setCurrentVocabulary(() => val.activeIndex);
  };

  const renderSlide = () => {
    if (data && data.vocabularies && data.vocabularies.length) {
      return data.vocabularies.map((voca: VocabularyTypeResponse) => {
        return (
          <SwiperSlide key={voca.vocabularyId}>
            <Box className='bg-white p-4 h-full flex flex-col items-center swiper-slide-transform'>
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
              <UserPlayRecord key={recordUser.recordId} props={{ ...recordUser }} audioSelected={audioSelected} />
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
    <Box className='flex flex-col grow min-h-screen'>
      <Container className='py-4 divider '>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={() => navigate(-1)}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>{"Word - guessing with designer"}</Typography>
        </Box>
      </Container>
      <Box className='p-4 max-h-[208px] h-[208px] bg-gray-100'>
        <Swiper pagination={true} modules={[Pagination]} className='h-full' onSlideChange={onSlideChange}>
          {renderSlide()}
        </Swiper>
      </Box>
      <Box className='p-4 bg-white grow'>{renderParticipant()}</Box>
      <FooterCard classes='items-center'>
        <MultiAudioComponent audioSrc={voiceRecords} />
      </FooterCard>
    </Box>
  );
}
