import { useRef, useState } from "react";
import { Box, Avatar, IconButton, Typography } from "@mui/material";
import { useReactMediaRecorder } from "react-media-recorder-2";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";
import { StageExercise } from "@/shared/type";
import { nextVocabulary } from "@/store/ExerciseStore";
import { useAppDispatch } from "@/store/hook";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useSaveRecordMutation } from "@/core/services";

export interface RecordingAudioProp {
  topicId: string;
  vocabularyId: string;
  refetch: any;
}

export default function RecordingAudio({
  vocabularyId,
  topicId,
  refetch,
}: RecordingAudioProp) {
  const dispatch = useAppDispatch();
  const [saveRecord] = useSaveRecordMutation();

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

    // const storageRef = ref(
    //   firebaseStorage,
    //   `files/${topicId}/${vocabularyId}/voice_${nanoid()}`
    // );
    // const uploadTask = uploadBytesResumable(storageRef, audiofile);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     // setProgresspercent(progress);
    //     console.log(progress);
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       saveRecord({
    //         clubStudyId: null,
    //         userId: "idUser2JLpns9SQblwSgNigfTwF",
    //         vocabularyId: vocabularyId,
    //         voiceSrc:
    //           "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/files%2FnewFile?alt=media&token=6f850b47-7f19-4ef0-8559-216dd673b86b&_gl=1*1y6kamq*_ga*MTA1MzU1OTI0Ni4xNjk2ODI1NjE1*_ga_CW55HF8NVT*MTY5NzA4MDA1OC4xMi4xLjE2OTcwODI3MjAuMi4wLjA.",
    //       });
    //     });
    //   }
    // );
    saveRecord({
      clubStudyId: null,
      userId: "idUser2JLpns9SQblwSgNigfTwF",
      vocabularyId: vocabularyId,
      voiceSrc:
        "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/files%2FnewFile?alt=media&token=6f850b47-7f19-4ef0-8559-216dd673b86b&_gl=1*1y6kamq*_ga*MTA1MzU1OTI0Ni4xNjk2ODI1NjE1*_ga_CW55HF8NVT*MTY5NzA4MDA1OC4xMi4xLjE2OTcwODI3MjAuMi4wLjA.",
    });
    
    refetch();
    setToggleSubBtn(false);
    dispatch(nextVocabulary());
  };

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
