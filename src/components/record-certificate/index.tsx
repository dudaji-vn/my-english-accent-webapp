import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import RecordingIcon from "@/assets/icon/stop-circle-icon.svg";
import SpeakingIcon from "@/assets/icon/volume-purple-icon.svg";
import BoxCard from "@/components/box-card";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useLazySpeechToTextQuery } from "@/core/services";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateDisableAllAction } from "@/core/store/index";
import { EMPTY_TRANSCRIPT, IVocabularyContent } from "@/core/type/index";
import TextToSpeech from "@/shared/hook/use-text-to-speech";
import persist from "@/shared/utils/persist.util";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import Bowser from "bowser";
import { useEffect, useMemo, useState } from "react";
import WordHighLight from "../word-high-light";
import useMicRecorder from "@/shared/hook/use-mic-recorder";
import { IResultCertificateItem } from "@/pages/certificate/certificate-progress";

export default function RecordCertificate(
  props: IVocabularyContent & { nextVocabulary: (data: IResultCertificateItem) => void; index: number; totalVoca: number }
) {
  const myId = persist.getMyInfo().userId;

  const [trigger, { data: speakToTextData }] = useLazySpeechToTextQuery();

  const getBrowserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();

  const isDiableAllAction = useAppSelector((state) => state.GlobalStore.recordAudio.disableAllAction);
  const dispatch = useAppDispatch();
  const audio = new Audio();

  const { status, startRecording, stopRecording, mediaFile, clearFile, mediaBase64 } = useMicRecorder();

  const [hideUpdateRecordBtn, setHideUpdateRecordBtn] = useState(true);

  const [isRecord, setIsRecord] = useState(() => {
    return status === "recording";
  });

  const isRerecord = useMemo(() => {
    return !!props.voiceSrc;
  }, [props]);

  const displayRepeatBtn = useMemo(() => {
    return (mediaFile || isRerecord) && !isRecord;
  }, [mediaFile, isRecord, isRerecord]);

  const displayUpdateRecordBtn = useMemo(() => {
    return (
      status === "stopped" && isRerecord && mediaFile && speakToTextData && speakToTextData.finalTranscript !== EMPTY_TRANSCRIPT
    );
  }, [isRerecord, status, mediaFile, speakToTextData]);
  const displayContinueBtn = useMemo(() => {
    // if (props.index === props.totalVoca - 1 && mediaBase64) {
    //   return true;
    // }

    return mediaFile && !isRerecord && speakToTextData && speakToTextData.finalTranscript !== EMPTY_TRANSCRIPT;
  }, [mediaFile, isRecord, speakToTextData]);

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
    } else if (isRerecord && props.voiceSrc) {
      audio.src = props.voiceSrc;
    }

    setTimeout(() => {
      dispatch(updateDisableAllAction(true));
      audio.play().catch((error) => {
        dispatch(updateDisableAllAction(false));
      });
    }, 100);
  };
  const onAddRecord = async () => {
    if (mediaFile) {
      if (props.index < props.totalVoca - 1) {
        setHideUpdateRecordBtn(() => true);
      }
      const url = await UploadFileController.uploadAudio(mediaFile, props.vocabularyId, myId, false);
      props.nextVocabulary({
        voiceSrc: url,
        result: speakToTextData?.finalTranscript ?? "",
        index: props.index,
        isUpdate: false,
      });
      clearFile();
    } else {
      props.nextVocabulary({ voiceSrc: "", result: "", index: props.index, isUpdate: false });
    }
  };

  const onUpdateRecord = async () => {
    if (mediaFile) {
      dispatch(updateDisableAllAction(true));
      setHideUpdateRecordBtn(() => true);
      const url = await UploadFileController.uploadAudio(mediaFile, props.vocabularyId, myId, false);
      props.nextVocabulary({ voiceSrc: url, result: speakToTextData?.finalTranscript ?? "", index: props.index, isUpdate: true });
      clearFile();
      dispatch(updateDisableAllAction(false));
    }
  };

  audio.onended = function () {
    dispatch(updateDisableAllAction(false));
  };

  return (
    <Container className="py-4 bg-gray-100 flex flex-col grow justify-between items-center">
      <BoxCard classes="p-4 mb-4 max-w-[375px] w-full">
        <Grid container textAlign={"center"} gap={5}>
          <Grid item xs={12}>
            <Box className="mb-10">
              <Typography className="text-extra-small-medium mb-6" variant={"body2"}>
                {props.index + 1} / {props.totalVoca}
              </Typography>
              <Typography className="text-large-medium mb-6">{props.title}</Typography>
              <Typography variant="body2" className="text-small-regular mb-6 break-words" component={"div"}>
                {props.phonetic}
                <TextToSpeech text={props.title} />
              </Typography>
              <WordHighLight sentence={props.title} transcript={speakToTextData?.finalTranscript || ""} />
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
              className={` p-5 w-16 h-16 ${isRecord ? "bg-orange" : isDiableAllAction ? "bg-purple-200" : "bg-primary"}`}
              onClick={onRecord}
              disabled={isDiableAllAction && !isRecord}
            >
              <Avatar src={isRecord ? RecordingIcon : MicrophoneIcon} className="w-6 h-6" />
            </IconButton>
            {displayRepeatBtn && (
              <IconButton
                className={`absolute top-1/2 -translate-y-1/2 p-5 w-12 h-12 ml-5 ${
                  isDiableAllAction ? "bg-purple-200" : "bg-purple-300"
                }`}
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
              {props.textTranslate}
            </Typography>
          </Grid>
        </Grid>
      </BoxCard>

      {displayContinueBtn && (
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
