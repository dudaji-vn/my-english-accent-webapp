import { useEffect, useRef, useState } from "react";
import { Box, Avatar, IconButton, Typography } from "@mui/material";
import { useReactMediaRecorder } from "react-media-recorder-2";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { StageExercise } from "@/shared/type";
import { nextVocabulary } from "@/store/ExerciseStore";
import { useAppDispatch } from "@/store/hook";
import { useNavigate, useParams } from "react-router-dom";

interface RecordingAudioProp {
  stage: StageExercise;
  step: number;
  voiceSrc: string;
}

export default function RecordingAudio({
  stage,
  step,
  voiceSrc,
}: RecordingAudioProp) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const audioEle = useRef<HTMLAudioElement | null>(null);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
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

  const onHandleNext = async () => {
    // const audioBlob = await fetch(mediaBlobUrl as any).then((r) => r.blob());
    // const audiofile = new File([audioBlob], "audiofile.mp3", {
    //   type: "audio/mp3",
    // });
    // const formData = new FormData();
    // formData.append("file", audiofile);
    // // console.log(formData);
    // fetch("http://localhost:3001/api_test", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });

    setToggleSubBtn(false);
    dispatch(nextVocabulary({ currentStep: step }));
  };

  useEffect(() => {
    if (stage === StageExercise.Close) {
      const path = `/${params.category}`;
      navigate({
        pathname: ROUTER.RECORD + path + ROUTER.SUMMARY,
      });
    }
  }, [stage]);

  return (
    <Box className="text-center">
      <Box
        className={`flex items-center p-7 ${
          toggleSubBtn ? "justify-between" : "justify-center"
        }`}
      >
        {toggleSubBtn && (
          <IconButton
            onClick={onRepeat}
            className="border border-stroke border-solid"
          >
            <Avatar src={HearingIcon} className="w-6 h-6" />
          </IconButton>
        )}

        <Box>
          {/* <p>{status}</p> */}
          <IconButton className="bg-primary p-5" onClick={onHandlePlay}>
            <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
          </IconButton>
          <audio src={mediaBlobUrl} ref={audioEle}></audio>
        </Box>
        {toggleSubBtn && (
          <IconButton
            onClick={() => onHandleNext()}
            className="border border-stroke border-solid"
          >
            <Avatar src={ArrowRight} className="w-6 h-6" />
          </IconButton>
        )}
      </Box>
      <Typography variant="body2" className="text-small-regular mt-4">
        {isRecord ? "Speak now" : "Tap the icon above and record your voice"}
      </Typography>
    </Box>
  );
}