import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import RecordingIcon from "@/assets/icon/stop-circle-icon.svg";
import SpeakingIcon from "@/assets/icon/volume-high-white-icon.svg";
import BoxCard from "@/components/BoxCard";
import { TECHTALK_DEFINE } from "@/config/globalDefine";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useEnrollLectureMutation, useLazySpeechToTextQuery } from "@/core/services";
import { useAddOrUpdateRecordMutation } from "@/core/services/record.service";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateDisableAllAction } from "@/core/store/index";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import useMicRecorder from "@/shared/hook/useMicRecorder";
import TextToSpeech from "@/shared/hook/useTextToSpeech";
import persist from "@/shared/utils/persist.util";
import { similarityScore } from "@/shared/utils/similarity.util";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import WordHighlight from "../WordHighlight";

export default function RecordingCard(props: VocabularyTypeWithNativeLanguageResponse & { nextVocabulary: Function; index: number; totalVoca: number }) {
  const myId = persist.getMyInfo().userId;
  const [addOrUpdateRecord] = useAddOrUpdateRecordMutation();
  const [enrollmentLecture] = useEnrollLectureMutation();

  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();

  //record
  const audio = new Audio();
  const { status, startRecording, stopRecording, mediaFile, clearFile, mediaBase64 } = useMicRecorder();

  //Speech to text
  const [trigger, { data: transcript }] = useLazySpeechToTextQuery();

  const [hideUpdateRecordBtn, setHideUpdateRecordBtn] = useState(true);
  const [hideContinueBtn, setHideContinueBtn] = useState(false);

  const [isRecord, setIsRecord] = useState(() => {
    return status === "recording";
  });

  const isRerecord = useMemo(() => {
    return !!props.voiceSrc;
  }, [props]);

  const displayRepeatBtn = useMemo(() => {
    return (mediaFile || isRerecord) && !isRecord;
  }, [mediaFile, isRecord, isRerecord]);

  const displayContinueBtn = useMemo(() => {
    return mediaFile && !isRecord && !isRerecord;
  }, [mediaFile, isRecord]);

  const displayUpdateRecordBtn = useMemo(() => {
    return status === "stopped" && isRerecord;
  }, [isRerecord, status]);

  const isInvalidAudioRecording = useMemo(() => {
    return TECHTALK_DEFINE.SIMILAR_PASS >= similarityScore(props.vtitleDisplayLanguage, transcript);
  }, [transcript]);

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
    if (mediaFile) {
      audio.src = URL.createObjectURL(mediaFile);
    } else if (isRerecord) {
      audio.src = props.voiceSrc;
    }
    audio.play().catch((error) => {
      dispatch(updateDisableAllAction(false));
      console.log(error);
    });
    dispatch(updateDisableAllAction(true));
  };

  const onAddRecord = async () => {
    if (mediaFile) {
      dispatch(updateDisableAllAction(true));
      setHideContinueBtn(() => true);
      const url = await UploadFileController.uploadAudio(mediaFile, props.vocabularyId, myId, false);

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

      props.nextVocabulary({ voiceSrc: url, index: props.index, isUpdate: false });
      clearFile();
      dispatch(updateDisableAllAction(false));
    }
  };

  const onUpdateRecord = async () => {
    if (mediaFile) {
      dispatch(updateDisableAllAction(true));
      setHideUpdateRecordBtn(() => true);
      const url = await UploadFileController.uploadAudio(mediaFile, props.vocabularyId, myId, false);

      addOrUpdateRecord({
        vocabularyId: props.vocabularyId,
        voiceSrc: url,
      }).unwrap();

      props.nextVocabulary({ voiceSrc: url, index: props.index, isUpdate: true });
      clearFile();
      dispatch(updateDisableAllAction(false));
    }
  };

  audio.onended = function () {
    dispatch(updateDisableAllAction(false));
  };

  useEffect(() => {
    if (mediaBase64) {
      trigger(mediaBase64);
    }
  }, [mediaBase64]);

  return (
    <Container className='py-4 bg-gray-100 flex flex-col grow justify-between items-center'>
      <BoxCard classes='p-4 mb-4 max-w-[375px] w-full'>
        <Grid container textAlign={"center"} gap={5}>
          <Grid item xs={12}>
            <Box className='mb-10'>
              <Typography className='text-extra-small-medium mb-6' variant='body2'>
                {props.index} / {props.totalVoca}
              </Typography>
              <WordHighlight sentence={props.vtitleDisplayLanguage} transcript={transcript} />
              <Typography variant='body2' className='text-small-regular' component={"div"}>
                {props.vphoneticDisplayLanguage}
                <TextToSpeech text={props.vtitleDisplayLanguage} />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {displayUpdateRecordBtn && !hideUpdateRecordBtn && (
              <Button variant='outlined' onClick={onUpdateRecord} disabled={isDiableAllAction || isInvalidAudioRecording}>
                Update new record
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <IconButton
              className={`p-5 w-16 h-16 ${isDiableAllAction && !isRecord ? "bg-purple-300" : "bg-primary"}`}
              onClick={onHandlePlay}
              disabled={isDiableAllAction && !isRecord}
            >
              <Avatar src={isRecord ? RecordingIcon : MicrophoneIcon} className='w-6 h-6' />
            </IconButton>
            {displayRepeatBtn && (
              <IconButton className={`p-5 w-16 h-16 ml-5 ${isDiableAllAction ? "bg-purple-300" : "bg-primary"}`} onClick={onRepeat} disabled={isDiableAllAction}>
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
          }}
          className='h-12'
          disabled={isDiableAllAction || isInvalidAudioRecording}
        >
          Continue
        </Button>
      )}
      <Box className={`${props.voiceSrc ? "invisible" : "h-28 visible"}`}></Box>
    </Container>
  );
}
