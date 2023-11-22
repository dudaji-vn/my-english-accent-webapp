import ActivedLoopIcon from "@/assets/icon/active-loop-icon.svg";
import DisableNextIcon from "@/assets/icon/disable-next-icon.svg";
import DisablePreviosIcon from "@/assets/icon/disable-previous-icon.svg";
import LectureListIcon from "@/assets/icon/lecture-list-icon.svg";
import LoopIcon from "@/assets/icon/loop-icon.svg";
import NextIcon from "@/assets/icon/next-icon.svg";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import PreviosIcon from "@/assets/icon/previos-icon.svg";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateIndexListenPage, updateIsPlaying } from "@/core/store/index";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import { Avatar, Box, IconButton } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ActionControllRef {
  onHandlePlayAudio: Function;
  setIndexPlaying: Function;
}
interface ActionControllPlaylistProps {
  usersRecord: (UserResponseType & RecordTypeResponse & { isPlaying: boolean; isPlayed: boolean })[];
  setUsersRecord: Function;
  onNextSlideIndex: Function;
}
export default forwardRef(function ActionControllPlaylist({ usersRecord, setUsersRecord, onNextSlideIndex }: ActionControllPlaylistProps, ref) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.GlobalStore.listenPage.currentLectureIndex);
  const totalLecture = useAppSelector((state) => state.GlobalStore.listenPage.totalLecture);
  const isTheLastVocabulary = useAppSelector((state) => state.GlobalStore.listenPage.isTheLastVocabulary);
  const isPlayingStatus = useAppSelector((state) => state.GlobalStore.listenSetting.isPlaying);

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
    dispatch(updateIsPlaying(false));
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

  const onHandlePlayAudio = (isPlaying: boolean, nextIndex?: number) => {
    if (!usersRecord.length) return;
    dispatch(updateIsPlaying(isPlaying));

    const index = nextIndex ?? indexPlaying;
    setIndexPlaying(index);
    setUsersRecord(getNewUserRecord(index));
  };

  const onHandleEndAudio = () => {
    const nextIndex = indexPlaying + 1;

    if (isLoop) {
      if (nextIndex < usersRecord.length) {
        onHandlePlayAudio(true, nextIndex);
      } else {
        setIndexPlaying(() => 0);
        onHandlePlayAudio(true, 0);
      }
      return;
    }

    if (nextIndex < usersRecord.length) {
      onHandlePlayAudio(true, nextIndex);
    } else {
      if (isTheLastVocabulary) {
        setIndexPlaying(() => 0);
        setUsersRecord(getNewUserRecord(usersRecord.length - 1, true));

        if (currentIndex < totalLecture - 1) {
          dispatch(updateIndexListenPage(1));
          dispatch(updateIsPlaying(true));
        }
      } else {
        onNextSlideIndex();
      }
    }
  };

  useImperativeHandle(ref, () => ({
    onHandlePlayAudio: (nextIndex: number) => {
      if (!usersRecord.length) return;

      dispatch(updateIsPlaying(true));
      setIndexPlaying(nextIndex);
      setUsersRecord(getNewUserRecord(nextIndex));
    },
    setIndexPlaying,
  }));

  useEffect(() => {
    if (audioElement.current) {
      if (isPlayingStatus) {
        audioElement.current.play().catch((error) => {
          // if (!audioElement.current) return;
          // audioElement.current.pause();
          // dispatch(updateIsPlaying(false));
          console.log(error);
        });
      } else {
        audioElement.current.pause();
      }
    }
  }, [indexPlaying, isPlayingStatus, usersRecord]);

  return (
    <Box className='flex justify-around py-4' ref={ref}>
      {usersRecord.length ? <audio ref={audioElement} autoPlay={isPlayingStatus} src={usersRecord[indexPlaying]?.voiceSrc} onEnded={onHandleEndAudio} /> : null}
      <IconButton onClick={() => setIsLoop((preVal) => !preVal)}>
        <Avatar src={isLoop ? ActivedLoopIcon : LoopIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
      <IconButton onClick={() => onHandleToNewLecture(false)}>
        <Avatar src={currentIndex >= 1 ? PreviosIcon : DisablePreviosIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
      <IconButton className='bg-primary' onClick={() => onHandlePlayAudio(!isPlayingStatus)}>
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
        <Avatar variant='square' src={LectureListIcon} alt='wave-icon' className='w-6 h-6' />
      </IconButton>
    </Box>
  );
});