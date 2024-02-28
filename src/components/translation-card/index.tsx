import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import RecordingIcon from "@/assets/icon/stop-circle-icon.svg";
import SpeakingIcon from "@/assets/icon/volume-purple-icon.svg";
import BoxCard from "@/components/box-card";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import {
  useAddOrUpdateGoogleTranscriptMutation,
  useEnrollLectureMutation,
  useLazyCheckUserCompleteEventQuery,
  useLazySpeechToTextQuery,
} from "@/core/services";
import { useAddOrUpdateRecordMutation } from "@/core/services/record.service";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { setIsInRecordProgress, updateDisableAllAction } from "@/core/store/index";
import { EMPTY_TRANSCRIPT, VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import { EVENTS } from "@/shared/const/event.const";
import useMicRecorder from "@/shared/hook/use-mic-recorder";
import TextToSpeech from "@/shared/hook/use-text-to-speech";
import { StageExercise } from "@/shared/type";
import persist from "@/shared/utils/persist.util";
import { removeSpecialCharacters } from "@/shared/utils/string.util";
import { Alert, Avatar, Box, Button, Container, Divider, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import Bowser from "bowser";
import { useEffect, useMemo, useState } from "react";
import ModalMicPermission from "../modal/modal-mic-permission";
import WordHighLight from "../word-high-light";

export default function TranslationCard(
  props: VocabularyTypeWithNativeLanguageResponse & {
    nextVocabulary: Function;
    index: number;
    totalVoca: number;
    isExist?: boolean;
  }
) {
  const myId = persist.getMyInfo().userId;

  const [trigger, { data: speakToTextData }] = useLazySpeechToTextQuery();

  const [addOrUpdateRecord] = useAddOrUpdateRecordMutation();
  const [addOrUpdateGoogleTranscript] = useAddOrUpdateGoogleTranscriptMutation();
  const [enrollmentLecture] = useEnrollLectureMutation();
  const [triggerCheckUserCompleteEvent] = useLazyCheckUserCompleteEventQuery();

  const getBrowserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();

  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const [audio] = useState<HTMLAudioElement>(new Audio());

  const { status, startRecording, stopRecording, mediaFile, clearFile, mediaBase64, isError } = useMicRecorder();
  const [isHearing, setIsHearing] = useState<boolean>(false);
  const [isShowUpdateMessage, setIsShowUpdateMessage] = useState(false);

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
    return mediaFile && !isRecord && !isRerecord && speakToTextData && speakToTextData.finalTranscript !== EMPTY_TRANSCRIPT;
  }, [mediaFile, isRecord, speakToTextData]);

  const displayUpdateRecordBtn = useMemo(() => {
    return (
      status === "stopped" && isRerecord && mediaFile && speakToTextData && speakToTextData.finalTranscript !== EMPTY_TRANSCRIPT
    );
  }, [isRerecord, status, mediaFile, speakToTextData]);

  useEffect(() => {
    if (props.isExist) {
      audio.currentTime = 0;
      audio.pause();
    }
  }, [props.isExist]);

  useEffect(() => {
    if (mediaBase64) {
      trigger(mediaBase64);
    }
  }, [mediaBase64]);

  useEffect(() => {
    if (isError) {
      dispatch(setIsInRecordProgress(false));
    }
  }, [isError]);

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
    if (!isError) {
      dispatch(setIsInRecordProgress(true));
    }
    dispatch(updateDisableAllAction(!isDiableAllAction));
  };

  const onRepeat = () => {
    if (isHearing) {
      setIsHearing(false);
      audio.currentTime = 0;
      audio.pause();
      dispatch(updateDisableAllAction(false));
      return;
    }
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
      });
      dispatch(updateDisableAllAction(true));
    }, 100);
  };
  const onAddRecord = async () => {
    if (mediaFile) {
      dispatch(updateDisableAllAction(true));
      setHideContinueBtn(() => true);
      const url = await UploadFileController.uploadAudio(mediaFile, props.vocabularyId, myId, false);
      let score = 0;
      if (
        speakToTextData?.finalTranscript &&
        removeSpecialCharacters(props.vtitleDisplayLanguage) === removeSpecialCharacters(speakToTextData?.finalTranscript)
      ) {
        score = 1;
      }

      const recordId = await addOrUpdateRecord({
        finalTranscript: speakToTextData?.finalTranscript,
        vocabularyId: props.vocabularyId,
        voiceSrc: url,
        score: score,
      }).unwrap();
      dispatch(setIsInRecordProgress(false));

      if (recordId) {
        props.nextVocabulary({ voiceSrc: url, index: props.index, isUpdate: false });
        clearFile();
        dispatch(updateDisableAllAction(false));

        const res = await enrollmentLecture({
          enrollmentId: props.enrollmentId,
          lectureId: props.lectureId,
        }).unwrap();

        if (res?.stage === StageExercise.Close && Object.values(EVENTS).length > 0) {
          await triggerCheckUserCompleteEvent();
        }
        if (speakToTextData) {
          addOrUpdateGoogleTranscript({
            finalTranscript: speakToTextData.finalTranscript,
            recordId: recordId,
            transcripts: speakToTextData.transcripts,
          });
        }
      }
    }
  };

  const onUpdateRecord = async () => {
    if (mediaFile) {
      dispatch(updateDisableAllAction(true));
      setHideUpdateRecordBtn(() => true);
      const url = await UploadFileController.uploadAudio(mediaFile, props.vocabularyId, myId, false);

      props.nextVocabulary({ voiceSrc: url, index: props.index, isUpdate: true });
      clearFile();
      dispatch(updateDisableAllAction(false));
      let score = 0;
      if (
        speakToTextData?.finalTranscript &&
        removeSpecialCharacters(props.vtitleDisplayLanguage) === removeSpecialCharacters(speakToTextData?.finalTranscript)
      ) {
        score = 1;
      }
      const recordId = await addOrUpdateRecord({
        vocabularyId: props.vocabularyId,
        voiceSrc: url,
        finalTranscript: speakToTextData?.finalTranscript,
        score: score,
      }).unwrap();
      if (speakToTextData && recordId) {
        setIsShowUpdateMessage(true);
        setTimeout(() => {
          setIsShowUpdateMessage(false);
        }, 3000);
        addOrUpdateGoogleTranscript({
          finalTranscript: speakToTextData.finalTranscript,
          recordId: recordId,
          transcripts: speakToTextData.transcripts,
        });
      }
      dispatch(setIsInRecordProgress(false));
    }
  };

  audio.onended = function () {
    dispatch(updateDisableAllAction(false));
    setIsHearing(false);
  };

  return (
    <>
      {isError && (
        <ModalMicPermission
          onConfirm={() => {
            dispatch(updateDisableAllAction(false));
          }}
          isOpen={isError}
          key={Number(isRecord)}
        />
      )}

      <Container className="py-4 bg-gray-100 flex flex-col grow justify-between items-center">
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isShowUpdateMessage} autoHideDuration={3000}>
          <Alert severity="success">Your voice recording has been updated successfully.</Alert>
        </Snackbar>

        <BoxCard classes="p-4 mb-4 max-w-[375px] w-full">
          <Grid container textAlign={"center"} gap={5}>
            <Grid item xs={12}>
              <Box className="mb-10">
                <Typography className="text-extra-small-medium mb-6" variant={"body2"}>
                  {props.index + 1} / {props.totalVoca}
                </Typography>
                <Typography className="text-large-medium mb-6">{props.vtitleDisplayLanguage}</Typography>
                <Typography variant="body2" className="text-small-regular mb-6 break-words" component={"div"}>
                  {props.vphoneticDisplayLanguage}
                  <TextToSpeech text={props.vtitleDisplayLanguage} />
                </Typography>
                <WordHighLight
                  sentence={props.vtitleDisplayLanguage}
                  transcript={speakToTextData?.finalTranscript || props.finalTranscript}
                />
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
                className={`p-5 w-16 h-16 ${
                  isRecord && !isError ? "bg-orange" : isDiableAllAction ? "bg-purple-300" : "bg-primary"
                }`}
                onClick={onRecord}
                disabled={isDiableAllAction && !isRecord}
              >
                <Avatar src={isRecord && !isError ? RecordingIcon : MicrophoneIcon} className="w-6 h-6" />
              </IconButton>
              {displayRepeatBtn && (
                <IconButton
                  className={`absolute top-1/2 -translate-y-1/2 p-5 w-12 h-12 ml-5 ${
                    isHearing ? "bg-purple-300" : "bg-purple-200"
                  }`}
                  onClick={onRepeat}
                  disabled={!isHearing && isDiableAllAction}
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
    </>
  );
}
