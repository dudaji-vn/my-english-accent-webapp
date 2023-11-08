import { useReactMediaRecorder } from "react-media-recorder-2";
import { useMemo, useState } from "react";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import BoxCard from "@/components/BoxCard";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import TextToSpeech from "@/shared/hook/useTextToSpeech";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import RecordingIcon from "@/assets/icon/stop-circle-icon.svg";
import SpeakingIcon from "@/assets/icon/volume-high-white-icon.svg";
import { useAddOrUpdateRecordMutation } from "@/core/services/record.service";
import { useEnrollLectureMutation } from "@/core/services";

export default function TranslationCard(props: VocabularyTypeWithNativeLanguageResponse & { onClick: Function }) {
  const [addOrUpdateRecord] = useAddOrUpdateRecordMutation();
  const [enrollmentLecture] = useEnrollLectureMutation();

  const audio = new Audio();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
  });

  const [isRecord, setIsRecord] = useState(() => {
    return status === "recording";
  });

  const [isRerecord] = useState(() => {
    return !!props.voiceSrc;
  });

  const displayRepeatBtn = useMemo(() => {
    return (mediaBlobUrl || isRerecord) && !isRecord;
  }, [mediaBlobUrl, isRecord, isRerecord]);

  const displayContinueBtn = useMemo(() => {
    return mediaBlobUrl && !isRecord && !isRerecord;
  }, [mediaBlobUrl, isRecord]);

  const displayUpdateRecordBtn = useMemo(() => {
    return status === "stopped" && isRerecord;
  }, [isRerecord, status]);

  const [hiddenDisplayUpdateRecordBtn, setHiddenDisplayUpdateRecordBtn] = useState(true);

  const onHandlePlay = () => {
    if (isRecord) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecord(() => !isRecord);
    setHiddenDisplayUpdateRecordBtn(() => false);
  };

  const onRepeat = () => {
    console.log(mediaBlobUrl, props.voiceSrc);
    audio.src = mediaBlobUrl ?? props.voiceSrc;
    audio.play();
  };

  const onAddRecord = async () => {
    if (mediaBlobUrl) {
      setHiddenDisplayUpdateRecordBtn(() => true);
      const isSuccess = await addOrUpdateRecord({
        vocabularyId: props.vocabularyId,
        voiceSrc: mediaBlobUrl,
      }).unwrap();

      if (isSuccess) {
        console.log("onAddRecord::", props.enrollmentId);
        enrollmentLecture({
          enrollmentId: props.enrollmentId,
          lectureId: props.lectureId,
        });
      }
    }
  };

  const onUpdateRecord = () => {
    if (mediaBlobUrl) {
      setHiddenDisplayUpdateRecordBtn(() => true);
      addOrUpdateRecord({
        vocabularyId: props.vocabularyId,
        voiceSrc: mediaBlobUrl,
      }).unwrap();
    }
  };

  return (
    <Container className='py-4 bg-gray-100 flex flex-col grow justify-between items-center'>
      <BoxCard classes='p-4 mb-4'>
        <Grid container textAlign={"center"} gap={5}>
          <Grid item xs={12}>
            <Box className='mb-10'>
              <Typography className='text-large-medium mb-6'>{props.vtitleDisplayLanguage}</Typography>
              <Typography variant='body2' className='text-small-regular' component={"div"}>
                {props.vphoneticDisplayLanguage}
                <TextToSpeech text={props.vtitleDisplayLanguage} />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {displayUpdateRecordBtn && !hiddenDisplayUpdateRecordBtn && (
              <Button variant='outlined' onClick={onUpdateRecord}>
                Update new record
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <IconButton className='bg-primary p-5 w-12 h-12' onClick={onHandlePlay}>
              <Avatar src={isRecord ? RecordingIcon : MicrophoneIcon} className='w-6 h-6' />
            </IconButton>
            {displayRepeatBtn && (
              <IconButton className='bg-primary p-5 w-12 h-12 ml-5' onClick={onRepeat}>
                <Avatar src={SpeakingIcon} className='w-6 h-6' />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Typography variant='body2' className='text-small-regular mt-4'>
              {props.titleNativeLanguage}
            </Typography>
          </Grid>
        </Grid>
      </BoxCard>
      {displayContinueBtn && (
        <Button
          variant='outlined'
          onClick={() => {
            onAddRecord();
            props.onClick();
          }}
        >
          Continue
        </Button>
      )}
    </Container>
  );
}
