import { useReactMediaRecorder } from "react-media-recorder-2";
import { useEffect, useState } from "react";
import { Avatar, Box, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import BoxCard from "@/components/BoxCard";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import TextToSpeech from "@/shared/hook/useTextToSpeech";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import RecordingIcon from "@/assets/icon/stop-circle-icon.svg";
import SpeakingIcon from "@/assets/icon/volume-high-white-icon.svg";
import { useAppDispatch } from "@/core/store";
import { saveRecord } from "@/core/store/index";

export default function TranslationCard(props: VocabularyTypeWithNativeLanguageResponse) {
  const audio = new Audio();

  const dispatch = useAppDispatch();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
  });

  const [isRecord, setIsRecord] = useState(() => {
    return status === "recording";
  });

  const onHandlePlay = () => {
    if (isRecord) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecord(() => !isRecord);
  };

  const onRepeat = () => {
    audio.src = mediaBlobUrl ?? "";
    audio.play();
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      dispatch(
        saveRecord({
          vocabularyId: props.vocabularyId,
          src: mediaBlobUrl,
        })
      );
    }
  }, [mediaBlobUrl]);

  return (
    <Container className='py-4 bg-gray-100 flex flex-col grow justify-between items-center'>
      <BoxCard classes='p-4'>
        <Grid container textAlign={"center"} gap={5}>
          <Grid item xs={12}>
            <Box className='mb-10'>
              <Typography className='text-large-medium mb-6'>{props.vtitleDisplayLanguage}</Typography>
              <Typography variant='body2' className='text-small-regular' component={"div"}>
                {props.vphoneticDisplayLanguage}
                <TextToSpeech text={props.vtitleDisplayLanguage} />
              </Typography>
            </Box>
            <Box className='flex items-center justify-center gap-6'>
              <IconButton className='bg-primary p-5 w-12 h-12' onClick={onHandlePlay}>
                <Avatar src={isRecord ? RecordingIcon : MicrophoneIcon} className='w-6 h-6' />
              </IconButton>
              {mediaBlobUrl && !isRecord && (
                <IconButton className='bg-primary p-5 w-12 h-12' onClick={onRepeat}>
                  <Avatar src={SpeakingIcon} className='w-6 h-6' />
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Typography variant='body2' className='text-small-regular mt-4'>
              {props.titleNativeLanguage}
            </Typography>
          </Grid>
        </Grid>
      </BoxCard>
    </Container>
  );
}
