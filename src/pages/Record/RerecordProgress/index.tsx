import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Box, Avatar, Typography, Divider, Grid, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import { useAddRecordMutation, useGetAllVocabulariesByLectureQuery, useGetVocabularyByRecordQuery } from "@/core/services/recordProgress.service";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import BoxCard from "@/components/BoxCard";
import persist from "@/shared/utils/persist.util";
import CloseIcon from "@/assets/icon/close-icon.svg";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";
import { useReactMediaRecorder } from "react-media-recorder-2";
import ROUTER from "@/shared/const/router.const";
import TextToSpeech from "@/shared/hook/useTextToSpeech";

export default function RerecordingProgressPage() {
  //TODO speaking audio
  const myId = persist.getMyInfo().userId;

  const navigate = useNavigate();
  const search = useLocation();
  const titleName = decodeURI(search.pathname).replace("/rerecord/", "");
  const { vocabularyId } = search.state;
  const { recordId } = search.state;
  const { voiceRecord } = search.state;
  const { challengeId } = search.state;
  const { clubId } = search.state;

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const [updateRecord] = useAddRecordMutation();
  const { data, isFetching } = useGetVocabularyByRecordQuery(vocabularyId);

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
    let newAudio;
    if (!mediaBlobUrl) {
      newAudio = new Audio(voiceRecord);
    } else {
      newAudio = new Audio(mediaBlobUrl);
    }
    setAudio(newAudio);
    setPlaying(() => true);
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

  const callback = (payload: { challengeId?: string; userId: string; vocabularyId: string; voiceSrc: string }) => {
    const request = {
      ...payload,
    };

    if (challengeId && clubId) {
      Object.assign(request, {
        challengeId,
      });
    }
    updateRecord(request);
  };

  const onHandleNext = async () => {
    const audioBlob = await fetch(mediaBlobUrl as any).then((r) => r.blob());
    const audiofile = new File([audioBlob], "audiofile.mp3", {
      type: "audio/mp3",
    });

    if (data && mediaBlobUrl) {
      await UploadFileController.uploadAudio(audiofile, data.vocabularyId, myId, callback, challengeId && clubId);
    }
    if (challengeId && clubId) {
      navigate(
        {
          pathname: ROUTER.CLUB_RECORDING_SUMMARY,
        },
        {
          state: {
            clubId: clubId,
            challengeId: challengeId,
          },
        }
      );
    } else {
      navigate(
        {
          pathname: ROUTER.RECORD + "/" + titleName + ROUTER.SUMMARY,
        },
        {
          state: {
            lectureId: data?.lectureId,
          },
        }
      );
    }
  };

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio) {
      audio.onended = function () {
        setPlaying(() => false);
      };
    }
  });

  console.log("isFetching::", isFetching);

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>{titleName}</Typography>
        </Box>
      </Container>
      {data && (
        <Container id='translationCard' className='py-4 bg-gray-100 flex flex-col grow justify-between'>
          <Box>
            <BoxCard classes='p-4'>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography className='text-small-medium'>{data.vtitleDisplayLanguage}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' className='text-small-regular'>
                    {data.vphoneticDisplayLanguage}
                  </Typography>
                </Grid>
                <Grid item xs={12} className='py-4'>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <TextToSpeech text={data.vtitleDisplayLanguage} />
                </Grid>
              </Grid>
            </BoxCard>

            <Box className='flex gap-1 mt-4'>
              <Avatar alt='national-flag-icon' src={Vietnamflag} className='w-4 h-4 mt-1' />
              <Typography variant='body2' className='text-small-regular'>
                {data.titleNativeLanguage}
              </Typography>
            </Box>
          </Box>
          <Box className='text-center'>
            <Box className='flex items-center p-7 justify-between'>
              <IconButton onClick={onRepeat} className='border border-stroke border-solid' disabled={playing}>
                <Avatar src={HearingIcon} className='w-6 h-6' />
              </IconButton>

              <Box>
                <IconButton className='bg-primary p-5' onClick={onHandlePlay}>
                  <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
                </IconButton>
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
      )}
    </Box>
  );
}
