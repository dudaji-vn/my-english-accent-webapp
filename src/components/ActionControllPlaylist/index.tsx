import DisableNextIcon from "@/assets/icon/disable-next-icon.svg";
import DisablePreviosIcon from "@/assets/icon/disable-previous-icon.svg";
import LoopIcon from "@/assets/icon/loop-icon.svg";
import ActivedLoopIcon from "@/assets/icon/active-loop-icon.svg";
import NextIcon from "@/assets/icon/next-icon.svg";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import VerticalMore from "@/assets/icon/vertial-more-icon.svg";
import PreviosIcon from "@/assets/icon/previos-icon.svg";
import ShuffleIcon from "@/assets/icon/shuffle-icon.svg";
import ActivedShuffleIcon from "@/assets/icon/shuffled-active-icon.svg";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateIndexListenPage } from "@/core/store/index";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import { getShuffledArr } from "@/shared/utils/getShuffleArray.util";
import { Avatar, Box, IconButton } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";

export interface ActionControllRef {
  onHandlePlayAudio: Function;
  setIndexPlaying: Function;
  setIsPlayingStatus: Function;
  getIsPlayingStatus: Function;
}
interface ActionControllPlaylistProps {
  usersRecord: (UserResponseType & RecordTypeResponse & { isPlaying: boolean; isPlayed: boolean })[];
  setUsersRecord: Function;
  onNextSlideIndex: Function;
  setPlayingStatus: Function;
}
export default forwardRef(function ActionControllPlaylist({ usersRecord, setUsersRecord, onNextSlideIndex, setPlayingStatus }: ActionControllPlaylistProps, ref) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.GlobalStore.listenPage.currentLectureIndex);
  const totalLecture = useAppSelector((state) => state.GlobalStore.listenPage.totalLecture);
  const isTheLastVocabulary = useAppSelector((state) => state.GlobalStore.listenPage.isTheLastVocabulary);
  const [isPlayingStatus, setIsPlayingStatus] = useState(false);
  const [indexPlaying, setIndexPlaying] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
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
  };

  const onHandleEndAudio = () => {
    setIsPlayingStatus((preVal) => !preVal);

    const nextIndex = indexPlaying + 1;

    if (isLoop) {
      if (nextIndex < usersRecord.length) {
        onHandlePlayAudio(nextIndex);
      } else {
        setIndexPlaying(() => 0);
        onHandlePlayAudio(0);
      }
      return;
    }

    if (nextIndex < usersRecord.length) {
      onHandlePlayAudio(nextIndex);
    } else {
      if (isTheLastVocabulary) {
        setIndexPlaying(() => 0);
        setUsersRecord(getNewUserRecord(usersRecord.length - 1, true));
      } else {
        onNextSlideIndex();
      }
    }
  };

  useImperativeHandle(ref, () => ({
    onHandlePlayAudio: (nextIndex: number) => {
      if (!usersRecord.length) return;

      setIsPlayingStatus(() => true);
      setIndexPlaying(nextIndex);
      setUsersRecord(getNewUserRecord(nextIndex));
    },
    setIndexPlaying,
    setIsPlayingStatus,
  }));

  useEffect(() => {
    if (audioElement.current) {
      if (isPlayingStatus) {
        audioElement.current.play().catch((error) => {
          if (!audioElement.current) return;
          audioElement.current.pause();
          setIsPlayingStatus(() => false);
          console.log(error);
        });
      } else {
        audioElement.current.pause();
      }
    }
    setPlayingStatus(isPlayingStatus);
  }, [indexPlaying, isPlayingStatus]);

  return (
    <Box className='flex justify-around py-4' ref={ref}>
      {usersRecord.length ? <audio ref={audioElement} src={usersRecord[indexPlaying].voiceSrc} onEnded={onHandleEndAudio} /> : null}
      <IconButton onClick={() => setIsLoop((preVal) => !preVal)}>
        <Avatar src={isLoop ? ActivedLoopIcon : LoopIcon} alt='wave-icon' className='w-6 h-6' />
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
      <IconButton
        onClick={() => {
          navigate(ROUTER.LISTENING + ROUTER.SELECT_LECTURE);
        }}
      >
        <Avatar src={VerticalMore} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
    </Box>
  );
});
