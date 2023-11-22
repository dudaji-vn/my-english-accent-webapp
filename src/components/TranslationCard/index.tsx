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
import UploadFileController from "@/core/controllers/uploadFile.controller";
import persist from "@/shared/utils/persist.util";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateDisableAllAction } from "@/core/store/index";

export default function TranslationCard(props: VocabularyTypeWithNativeLanguageResponse & { onClick: Function; index: number; totalVoca: number }) {
  const myId = persist.getMyInfo().userId;
  const [addOrUpdateRecord] = useAddOrUpdateRecordMutation();
  const [enrollmentLecture] = useEnrollLectureMutation();

  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const audio = new Audio();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
  });

  const [hideUpdateRecordBtn, setHideUpdateRecordBtn] = useState(true);
  const [hideContinueBtn, setHideContinueBtn] = useState(false);

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

  const onHandlePlay = () => {
    if (isRecord) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecord(() => !isRecord);
    setHideUpdateRecordBtn(() => false);
    dispatch(updateDisableAllAction(!isDiableAllAction));
  };

  const onRepeat = () => {
    if (isRerecord) {
      audio.src = props.voiceSrc;
    } else if (mediaBlobUrl) {
      audio.src = mediaBlobUrl;
    }
    audio.play();
    dispatch(updateDisableAllAction(true));
  };

  const onAddRecord = async () => {
    if (mediaBlobUrl) {
      setHideUpdateRecordBtn(() => true);
      setHideContinueBtn(() => true);
      const url = await UploadFileController.uploadAudio(mediaBlobUrl, props.vocabularyId, myId, false);

      const isSuccess = await addOrUpdateRecord({
        vocabularyId: props.vocabularyId,
        voiceSrc: url,
      }).unwrap();

      if (isSuccess) {
        enrollmentLecture({
          enrollmentId: props.enrollmentId,
          lectureId: props.lectureId,
        });
      }
    }
  };

  const onUpdateRecord = async () => {
    if (mediaBlobUrl) {
      setHideUpdateRecordBtn(() => true);
      const url = await UploadFileController.uploadAudio(mediaBlobUrl, props.vocabularyId, myId, false);

      addOrUpdateRecord({
        vocabularyId: props.vocabularyId,
        voiceSrc: url,
      }).unwrap();
    }
  };

  audio.onended = function () {
    dispatch(updateDisableAllAction(false));
  };

  return (
    <Container className='py-4 bg-gray-100 flex flex-col grow justify-between items-center'>
      <BoxCard classes='p-4 mb-4 max-w-[375px]'>
        <Grid container textAlign={"center"} gap={5}>
          <Grid item xs={12}>
            <Box className='mb-10'>
              <Typography className='text-extra-small-medium mb-6' variant={"body2"}>
                {props.index} / {props.totalVoca}
              </Typography>
              <Typography className='text-large-medium mb-6'>{props.vtitleDisplayLanguage}</Typography>
              <Typography variant='body2' className='text-small-regular' component={"div"}>
                {props.vphoneticDisplayLanguage}
                <TextToSpeech text={props.vtitleDisplayLanguage} />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {displayUpdateRecordBtn && !hideUpdateRecordBtn && (
              <Button variant='outlined' onClick={onUpdateRecord} disabled={isDiableAllAction}>
                Update new record
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <IconButton
              className={`p-5 w-12 h-12 ${isDiableAllAction && !isRecord ? "bg-purple-300" : "bg-primary"}`}
              onClick={onHandlePlay}
              disabled={isDiableAllAction && !isRecord}
            >
              <Avatar src={isRecord ? RecordingIcon : MicrophoneIcon} className='w-6 h-6' />
            </IconButton>
            {displayRepeatBtn && (
              <IconButton className={`p-5 w-12 h-12 ml-5 ${isDiableAllAction ? "bg-purple-300" : "bg-primary"}`} onClick={onRepeat} disabled={isDiableAllAction}>
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
      {displayContinueBtn && !hideContinueBtn && (
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
