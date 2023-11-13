import { useAppDispatch, useAppSelector } from "@/core/store";
import { saveAudio } from "@/core/store/index";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const MultiAudioComponent = ({ audioSrc }: { audioSrc: string[] }) => {
  const audio: HTMLAudioElement = useAppSelector((state) => state.GlobalStore.clubPage.audio);
  const dispatch = useAppDispatch();
  const [audioIndex, setAudioIndex] = useState(0);
  const [finishedPlayList, setFinishedPlayList] = useState(false);

  const onHandlePlayAudio = (nextIndex?: number) => {
    setFinishedPlayList(false);
    
    const index = nextIndex ?? audioIndex;
    //check null
    if (audio.src === audioSrc[index]) {
      if (audio.paused) {
        audio.play().catch((error) => {
          console.log("error occurred::", error);
        });
      } else {
        audio.pause();
      }
    } else {
      dispatch(saveAudio(audioSrc[index]));
      audio.play().catch((error) => {
        console.log("error occurred::", error);
      });
    }
  };

  const onNextAudio = () => {
    if (audioIndex < audioSrc.length - 1) {
      const newAudioIndex = audioIndex + 1;
      setAudioIndex(newAudioIndex);
      onHandlePlayAudio(newAudioIndex);
    }
  };

  audio.onended = () => {
    if (!finishedPlayList) {
      onNextAudio();
    }
    if (audioIndex === audioSrc.length - 1) {
      setFinishedPlayList(true);
      setAudioIndex(() => 0);
    }
  };

  useEffect(() => {
    setAudioIndex(() => 0);
  }, [audioSrc]);

  useEffect(() => {
    return () => {
      audio.pause();
      dispatch(saveAudio(""));
    };
  }, []);

  return (
    <Button variant='contained' className='rounded-md m-auto grow' onClick={() => onHandlePlayAudio()}>
      <Typography className='text-base-medium ' color={"white"}>
        Listen all
      </Typography>
    </Button>
  );
};
