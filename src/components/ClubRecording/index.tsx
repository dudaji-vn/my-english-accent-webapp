import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useAddRecordMutation, useUpdateEnrollmentStepMutation } from "@/core/services/recordProgress.service";
import persist from "@/shared/utils/persist.util";
import { Box, IconButton, Avatar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { IChallengeDetailDisplay } from "@/core/type/challenge.type";
import { RecordRequest } from "@/core/type";

export default function ClubRecordingAudio(props: IChallengeDetailDisplay) {
  const { state, hash } = useLocation();
  const navigate = useNavigate();
  const currentStep = parseInt(hash.replace("#", ""));
  const myId = persist.getMyInfo().userId;
  const { vocabularies, ...restProps } = props;
  const audioEle = useRef<HTMLAudioElement | null>(null);
  const [addRecord] = useAddRecordMutation();
  const [listRequest, setListRequest] = useState<RecordRequest[]>([]);

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

  const onRepeat = () => {
    if (audioEle && audioEle.current) {
      audioEle.current.play();
    }
  };

  const onHandlePlay = () => {
    if (isRecord) {
      stopRecording();
      setToggleSubBtn(() => true);
    } else {
      startRecording();
    }
    setIsRecord(() => !isRecord);
  };

  const callback = (payload: { challengeId: string | null; userId: string; vocabularyId: string; voiceSrc: string }) => {
    const request = {
      ...payload,
      challengeId: state.challengeId,
    };
    setListRequest([...listRequest, request]);
  };

  const onHandleNext = async () => {
    if (currentStep + 1 >= vocabularies.length) {
      await listRequest.map(async (request) => {
        await addRecord(request);
      });

      navigate(
        {
          pathname: ROUTER.CLUB_RECORDING_SUMMARY,
        },
        {
          state: {
            clubId: restProps!.clubId.id,
            challengeId: state.challengeId,
          },
        }
      );
    } else {
      const audioBlob = await fetch(mediaBlobUrl as any).then((r) => r.blob());
      const audiofile = new File([audioBlob], "audiofile.mp3", {
        type: "audio/mp3",
      });
      if (restProps && mediaBlobUrl) {
        await UploadFileController.uploadAudio(audiofile, vocabularies[currentStep].vocabularyId, myId, callback);
      }
      navigate(
        {
          pathname: ROUTER.CLUB_RECORDING,
          hash: `${currentStep + 1}`,
        },
        {
          state: {
            challengeId: state.challengeId,
            clubId: restProps && restProps.clubId.id,
          },
        }
      );
    }

    setToggleSubBtn(false);
  };

  useEffect(() => {
    return () => {
      audioEle.current = null;
    };
  }, []);

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