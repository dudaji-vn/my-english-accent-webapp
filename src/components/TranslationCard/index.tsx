import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import RecordingIcon from "@/assets/icon/stop-circle-icon.svg";
import SpeakingIcon from "@/assets/icon/volume-purple-icon.svg";
import BoxCard from "@/components/BoxCard";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useEnrollLectureMutation, useLazyCheckUserCompleteEventQuery, useLazySpeechToTextQuery } from "@/core/services";
import { useAddOrUpdateRecordMutation } from "@/core/services/record.service";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateDisableAllAction } from "@/core/store/index";
import { EMPTY_TRANSCRIPT, VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import TextToSpeech from "@/shared/hook/useTextToSpeech";
import persist from "@/shared/utils/persist.util";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useMicRecorder from "../useMicRecorder";
import Bowser from "bowser";
import WordHighLight from "../WordHighLight";
import {EVENTS} from "@/shared/const/event.const";
import { StageExercise } from "@/shared/type";

export default function TranslationCard(
  props: VocabularyTypeWithNativeLanguageResponse & { nextVocabulary: Function; index: number; totalVoca: number }
) {
  const myId = persist.getMyInfo().userId;

  const [trigger, { data: transcript }] = useLazySpeechToTextQuery();

  const [addOrUpdateRecord] = useAddOrUpdateRecordMutation();
  const [enrollmentLecture] = useEnrollLectureMutation();
  const [triggerCheckUserCompleteEvent] = useLazyCheckUserCompleteEventQuery();


  const getBrowserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();

  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const audio = new Audio();

  const { status, startRecording, stopRecording, mediaFile, clearFile, mediaBase64 } = useMicRecorder();
  const [isHearing, setIsHearing] = useState<boolean>(false);

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
    return mediaFile && !isRecord && !isRerecord && transcript && transcript !== EMPTY_TRANSCRIPT;
  }, [mediaFile, isRecord, transcript]);

  const displayUpdateRecordBtn = useMemo(() => {
    return status === "stopped" && isRerecord && mediaFile && transcript && transcript !== EMPTY_TRANSCRIPT;
  }, [isRerecord, status, mediaFile, transcript]);

  useEffect(() => {
    if (mediaBase64) {
      trigger(mediaBase64);
    }
  }, [mediaBase64]);

  const onRecord = async () => {
    if (getBrowserName && getBrowserName !== "Chrome") {
      alert("For better experience. Please use of Chrome browser to record our lectures");
      return <></>;
    }
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

    setTimeout(() => {
      setIsHearing(true);
      audio.play().catch((error) => {
        dispatch(updateDisableAllAction(false));
        setIsHearing(false);
        console.log(error);
      });
      dispatch(updateDisableAllAction(true));
    }, 100);
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
        const res = await enrollmentLecture({
          enrollmentId: props.enrollmentId,
          lectureId: props.lectureId,
        }).unwrap();

        if(res?.stage === StageExercise.Close && Object.values(EVENTS).length > 0) {
          await triggerCheckUserCompleteEvent();
        }
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
    setIsHearing(false);
  };

  return (
    <Container className="py-4 bg-gray-100 flex flex-col grow justify-between items-center">
      <BoxCard classes="p-4 mb-4 max-w-[375px] w-full">
        <Grid container textAlign={"center"} gap={5}>
          <Grid item xs={12}>
            <Box className="mb-10">
              <Typography className="text-extra-small-medium mb-6" variant={"body2"}>
                {props.index} / {props.totalVoca}
              </Typography>
              <Typography className="text-large-medium mb-6">{props.vtitleDisplayLanguage}</Typography>
              <Typography variant="body2" className="text-small-regular mb-6" component={"div"}>
                {props.vphoneticDisplayLanguage}
                <TextToSpeech text={props.vtitleDisplayLanguage} />
              </Typography>

              <WordHighLight sentence={props.vtitleDisplayLanguage} transcript={transcript} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {displayUpdateRecordBtn && !hideUpdateRecordBtn && (
              <Button variant="outlined" onClick={onUpdateRecord} disabled={isDiableAllAction}>
                Update new record
              </Button>
            )}
          </Grid>
          <Grid xs={12} sx={{ position: "relative" }}>
            <IconButton
              className={` p-5 w-16 h-16 ${isRecord ? "bg-orange" : isDiableAllAction ? "bg-purple-300" : "bg-primary"}`}
              onClick={onRecord}
              disabled={isDiableAllAction && !isRecord}
            >
              <Avatar src={isRecord ? RecordingIcon : MicrophoneIcon} className="w-6 h-6" />
            </IconButton>
            {displayRepeatBtn && (
              <IconButton
                className={`absolute top-1/2 -translate-y-1/2 p-5 w-12 h-12 ml-5 ${isHearing ? "bg-purple-300" : "bg-purple-200"}`}
                onClick={onRepeat}
                disabled={isDiableAllAction}
              >
                <Avatar src={SpeakingIcon} className="w-6 h-6" />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Typography variant="body2" className="text-small-regular mt-4">
              {props.titleNativeLanguage}
            </Typography>
          </Grid>
        </Grid>
      </BoxCard>

      {displayContinueBtn && !hideContinueBtn && (
        <Button
          variant="outlined"
          onClick={() => {
            onAddRecord();
          }}
          className="h-12"
          disabled={isDiableAllAction}
        >
          Continue
        </Button>
      )}
      <Box className={`${props.voiceSrc ? "invisible" : "h-28 visible"}`}></Box>
    </Container>
  );
}
