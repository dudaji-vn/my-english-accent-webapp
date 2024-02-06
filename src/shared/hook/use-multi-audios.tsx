import { useAppDispatch, useAppSelector } from "@/core/store";
import { saveAudio, setPlayAll } from "@/core/store/index";
import { Button, Typography } from "@mui/material";
import { MutableRefObject, useEffect, useState } from "react";

export const MultiAudioComponent = ({ audioSrc }: { audioSrc: { voiceSrc: string; recordId: string }[] }) => {
  const dispatch = useAppDispatch();
  // const recordId = useAppSelector((state) => state.GlobalStore.clubPage.recordId);
  // const [audioIndex, setAudioIndex] = useState(0);
  // const [finishedPlayList, setFinishedPlayList] = useState(false);
  // const [activePlayAll, setActivePlayAll] = useState(false);

  // const onHandlePlayAudio = (nextIndex?: number) => {
  //   setFinishedPlayList(false);
  //   setActivePlayAll(() => true);

  //   const index = nextIndex ?? audioIndex;

  //   //check null
  //   if (audioElement.current) {
  //     if (audioElement.current.src === audioSrc[index].voiceSrc) {
  //       if (audioElement.current.paused) {
  //         audioElement.current.play().catch((error) => {
  //           console.log("error occurred::", error);
  //         });
  //       } else {
  //         audioElement.current.pause();
  //       }
  //     } else {
  //       dispatch(saveAudio(audioSrc[index]));
  //       audioElement.current.play().catch((error) => {
  //         console.log("error occurred::", error);
  //       });
  //     }
  //   }
  // };

  // const onNextAudio = () => {
  //   if (audioIndex < audioSrc.length - 1) {
  //     const newAudioIndex = audioIndex + 1;
  //     setAudioIndex(newAudioIndex);
  //     onHandlePlayAudio(newAudioIndex);
  //   }
  // };

  // if (activePlayAll && audioElement.current) {
  //   audioElement.current.onended = () => {
  //     if (!finishedPlayList) {
  //       onNextAudio();
  //     }
  //     if (audioIndex === audioSrc.length - 1) {
  //       setFinishedPlayList(true);
  //       setAudioIndex(() => 0);
  //     }
  //   };
  // }

  // useEffect(() => {
  //   //reset when swipe
  //   setAudioIndex(() => 0);
  // }, [audioSrc]);

  // useEffect(() => {
  //   //reset when swipe
  //   if (!recordId) {
  //     setActivePlayAll(false);
  //   }
  // }, [recordId]);

  return (
    <Button variant='contained' className='rounded-md m-auto grow' onClick={() => dispatch(setPlayAll())}>
      <Typography className='text-base-medium ' color={"white"}>
        Listen all
      </Typography>
    </Button>
  );
};
