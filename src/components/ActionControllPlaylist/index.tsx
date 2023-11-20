import DisableNextIcon from "@/assets/icon/disable-next-icon.svg";
import DisablePreviosIcon from "@/assets/icon/disable-previous-icon.svg";
import LoopIcon from "@/assets/icon/loop-icon.svg";
import NextIcon from "@/assets/icon/next-icon.svg";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import PreviosIcon from "@/assets/icon/previos-icon.svg";
import ShuffleIcon from "@/assets/icon/shuffle-icon.svg";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateIndexListenPage } from "@/core/store/index";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import { Avatar, Box, IconButton } from "@mui/material";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

interface ActionControllPlaylistProps {
  usersRecord: (UserResponseType & RecordTypeResponse & { isPlaying: boolean; isPlayed: boolean })[];
  setUsersRecord: Function;
  onNextSlideIndex: Function;
}
export default forwardRef(function ActionControllPlaylist({ usersRecord, setUsersRecord, onNextSlideIndex }: ActionControllPlaylistProps, ref) {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.GlobalStore.listenPage.currentIndex);
  const totalLecture = useAppSelector((state) => state.GlobalStore.listenPage.total);
  const [isPlayingStatus, setIsPlayingStatus] = useState(false);
  const [indexPlaying, setIndexPlaying] = useState(0);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  
  const onHandleToNewLecture = (isNext: boolean) => {
    if (isNext) {
      if (currentIndex < totalLecture - 1) {
        dispatch(updateIndexListenPage(1));
      }
    } else {
      if (currentIndex >= 1) {
        dispatch(updateIndexListenPage(-1));
      }
    }
    setIsPlayingStatus(false);
  };

  const getNewUserRecord = (currentIndex: number, isEnded?: boolean) => {
    if (isEnded) {
      const newUserRecord = [...usersRecord];
      newUserRecord[currentIndex].isPlaying = false;
      return newUserRecord;
    }

    const newUserRecord = usersRecord.map((user, index) => {
      if (currentIndex === index) {
        return { ...user, isPlaying: true };
      }
      return { ...user, isPlaying: false };
    });
    return newUserRecord;
  };

  const onHandlePlayAudio = (nextIndex?: number) => {
    if (!usersRecord.length) return;

    setIsPlayingStatus((preVal) => !preVal);
    const index = nextIndex ?? indexPlaying;
    setIndexPlaying(index);
    setUsersRecord(getNewUserRecord(index));
    console.log("onHandlePlayAudio::");
  };

  console.log("onPlayNonStop::", usersRecord);

  const onPlayNonStop = () => {
    // console.log("onPlayNonStop::", usersRecord);
    // setUsersRecord(getNewUserRecord(0));
  };

  const onHandleEndAudio = () => {
    setIsPlayingStatus((preVal) => !preVal);
    const nextIndex = indexPlaying + 1;
    if (nextIndex + 1 > usersRecord.length) {
      // setUsersRecord(getNewUserRecord(usersRecord.length - 1, true));
      setIndexPlaying(() => 0);

      if (currentIndex < totalLecture - 1) {
        onNextSlideIndex();
      }
    } else {
      onHandlePlayAudio(indexPlaying + 1);
    }
  };

  useImperativeHandle(ref, () => ({
    onHandlePlayAudio,
    setIndexPlaying,
    setIsPlayingStatus,
    onPlayNonStop,
  }));

  useEffect(() => {
    if (audioElement.current) {
      if (isPlayingStatus) {
        console.log("PLAY true");
        audioElement.current.play().catch((error) => {
          if (!audioElement.current) return;
          audioElement.current.pause();
          audioElement.current.play();
          console.log(error);
        });
      } else {
        console.log("PLAY false");

        audioElement.current.pause();
      }
    }
  }, [indexPlaying, isPlayingStatus]);

  return (
    <Box className='flex justify-around py-4' ref={ref}>
      {usersRecord.length ? <audio ref={audioElement} src={usersRecord[indexPlaying].voiceSrc} onEnded={onHandleEndAudio} /> : null}

      <IconButton>
        <Avatar src={ShuffleIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
      <IconButton onClick={() => onHandleToNewLecture(false)}>
        <Avatar src={currentIndex >= 1 ? PreviosIcon : DisablePreviosIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
      <IconButton className='bg-primary' onClick={() => onHandlePlayAudio()}>
        <Avatar src={isPlayingStatus ? PauseIcon : PlayIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
      <IconButton onClick={() => onHandleToNewLecture(true)}>
        <Avatar src={currentIndex < totalLecture - 1 ? NextIcon : DisableNextIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
      <IconButton>
        <Avatar src={LoopIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
    </Box>
  );
});
