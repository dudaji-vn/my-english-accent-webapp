import { useRef, useState } from "react";
import { Box, Avatar, IconButton, Typography } from "@mui/material";
import { useReactMediaRecorder } from "react-media-recorder-2";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import persist from "@/shared/utils/persist.util";
import { useAddRecordMutation, useUpdateEnrollmentStepMutation } from "@/core/services/recordProgress.service";
import { DocumentReference } from "firebase/firestore";

export interface RecordingAudioProp {
  vocabularyId: DocumentReference;
  enrollmentId: string;
  currentStep: number;
  totalStep: number;
}

export default function RecordingAudio({ vocabularyId, currentStep, enrollmentId, totalStep }: RecordingAudioProp) {
  const myId = persist.getMyInfo().userId;
  const audioEle = useRef<HTMLAudioElement | null>(null);
  const [addRecord] = useAddRecordMutation();
  const [updateEnrollmentStep] = useUpdateEnrollmentStepMutation();
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
  });

  const [isRecord, setIsRecord] = useState(() => {
    return status === "recording";
  });

  const [toggleSubBtn, setToggleSubBtn] = useState(() => status === "stopped");

  const onHandlePlay = () => {
    if (isRecord) {
      stopRecording();
      setToggleSubBtn(() => true);
    } else {
      startRecording();
    }
    setIsRecord(() => !isRecord);
  };

  const onRepeat = () => {
    if (audioEle && audioEle.current) {
      audioEle.current.play();
    }
  };

  const callback = (payload: { challengeId: string | null; userId: string; vocabularyId: string; voiceSrc: string }) => {
    addRecord(payload);
    updateEnrollmentStep({
      currentStep,
      totalStep,
      enrollmentId,
    });
  };

  const onHandleNext = async () => {
    const audioBlob = await fetch(mediaBlobUrl as any).then((r) => r.blob());
    const audiofile = new File([audioBlob], "audiofile.mp3", {
      type: "audio/mp3",
    });

    await UploadFileController.uploadAudio(audiofile, vocabularyId.id, myId, callback);

    setToggleSubBtn(false);
  };

  return (
    <Box className='text-center'>
      <Box className={`flex items-center p-7 ${toggleSubBtn ? "justify-between" : "justify-center"}`}>
        {toggleSubBtn && (
          <IconButton onClick={onRepeat} className='border border-stroke border-solid'>
            <Avatar src={HearingIcon} className='w-6 h-6' />
          </IconButton>
        )}

        <Box>
          {/* <p>{status}</p> */}
          <IconButton className='bg-primary p-5' onClick={onHandlePlay}>
            <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
          </IconButton>
          <audio src={mediaBlobUrl} ref={audioEle}></audio>
        </Box>
        {toggleSubBtn && (
          <IconButton onClick={() => onHandleNext()} className='border border-stroke border-solid'>
            <Avatar src={ArrowRight} className='w-6 h-6' />
          </IconButton>
        )}
      </Box>
      <Typography variant='body2' className='text-small-regular mt-4'>
        {isRecord ? "Speak now" : "Tap the icon above and record your voice"}
      </Typography>
    </Box>
  );
}
