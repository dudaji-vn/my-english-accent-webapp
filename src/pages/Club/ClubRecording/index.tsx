import BoxCard from "@/components/BoxCard";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useAddRecordMutation, useGetAllVocabulariesByLectureQuery } from "@/core/services/recordProgress.service";
import { VocabularyTypeResponse } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import persist from "@/shared/utils/persist.util";
import { Box, Container, IconButton, Avatar, Typography, Grid, Divider } from "@mui/material";
import { useRef, useMemo, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";
import { useNavigate, useLocation } from "react-router-dom";

import CloseIcon from "@/assets/icon/close-icon.svg";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";

export default function ClubRecordingPage() {
  //TODO speaking audio
  const myId = persist.getMyInfo().userId;

  const audioEle = useRef<HTMLAudioElement | null>(null);
  const audio = new Audio("props");

  const navigate = useNavigate();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
  });

  const [isRecord, setIsRecord] = useState(() => {
    return status === "recording";
  });

  const onRepeat = () => {
    console.log("onRepeat");
  };

  const onHandlePlay = () => {
    if (isRecord) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecord(() => !isRecord);
  };

  const onHandleClose = () => {
    navigate(-1);
  };

  const callback = (payload: { clubStudyId: string | null; userId: string; vocabularyId: string; voiceSrc: string }) => {
    // const request = {
    //   ...payload,
    //   recordId,
    // };
    // addRecord(request);
  };

  const onHandleNext = async () => {
    const audioBlob = await fetch(mediaBlobUrl as any).then((r) => r.blob());
    const audiofile = new File([audioBlob], "audiofile.mp3", {
      type: "audio/mp3",
    });
    // if (data && mediaBlobUrl) {
    //   await UploadFileController.uploadAudio(audiofile, data.vocabularies[index].vocabularyId, myId, callback);
    // }
  };

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>{"lectureName"}</Typography>
        </Box>
      </Container>
      <Container id='translationCard' className='py-4 bg-gray-100 flex flex-col grow justify-between'>
        <Box>
          <BoxCard classes='p-4'>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography className='text-small-medium'>This is a __ which cannot be reassigned</Typography>
              </Grid>
              <Grid item xs={12} className='py-4'>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <IconButton onClick={onRepeat}>
                  <Avatar src={SpeakingIcon} alt='speaking-icon' className='w-10 h-10' />
                </IconButton>
              </Grid>
            </Grid>
          </BoxCard>

          <Box className='flex gap-1 mt-4'>
            <Avatar alt='national-flag-icon' src={Vietnamflag} className='w-4 h-4 mt-1' />
            <Typography variant='body2' className='text-small-regular'>
              Đây là một hằng số không thể được chỉ định lại
            </Typography>
          </Box>
        </Box>
        <Box className='text-center'>
          <Box className='flex items-center p-7 justify-between'>
            <IconButton onClick={onRepeat} className='border border-stroke border-solid'>
              <Avatar src={HearingIcon} className='w-6 h-6' />
            </IconButton>

            <Box>
              <IconButton className='bg-primary p-5' onClick={onHandlePlay}>
                <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
              </IconButton>
              <audio src={mediaBlobUrl} ref={audioEle}></audio>
            </Box>
            <IconButton onClick={() => onHandleNext()} className='border border-stroke border-solid'>
              <Avatar src={ArrowRight} className='w-6 h-6' />
            </IconButton>
          </Box>
          <Typography variant='body2' className='text-small-regular mt-4'>
            {isRecord ? "Speak now" : "Tap the icon above and record your voice"}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
