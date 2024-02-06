import ActivedLoopIcon from "@/assets/icon/active-loop-icon.svg";
import CloseIcon from "@/assets/icon/close-icon.svg";
import DisableNextIcon from "@/assets/icon/disable-next-icon.svg";
import DisablePreviosIcon from "@/assets/icon/disable-previous-icon.svg";
import LectureListIcon from "@/assets/icon/lecture-list-icon.svg";
import LoopIcon from "@/assets/icon/loop-icon.svg";
import NextIcon from "@/assets/icon/next-icon.svg";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import PreviosIcon from "@/assets/icon/previos-icon.svg";
import Loading from "@/components/loading";
import CopyIcon from "@/components/icons/copy-icon";
import LikeIcon from "@/components/icons/like-icon";
import LikedIcon from "@/components/icons/liked-icon";
import {
  useGetPlaylistSummaryByUserQuery,
  useLazyGetPlaylistByUserQuery,
  useLikeOrUnlikePlaylistByUserMutation,
} from "@/core/services";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateIndexLectureLeaderPage } from "@/core/store/index";
import { IPlaylistUserResponse } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import persist from "@/shared/utils/persist.util";
import { Alert, Avatar, Box, Button, Container, IconButton, Snackbar, Tooltip, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

interface IModalCompleteCertificateProps {}
const UserPlaylist = (props: IModalCompleteCertificateProps) => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperRef>(null);
  const trackingSwiper = useRef(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { userId } = useParams();
  const { data: playlistSummary, isFetching: isLoadingPlaylistSummary } = useGetPlaylistSummaryByUserQuery(userId ?? skipToken);

  const [trigger] = useLazyGetPlaylistByUserQuery();
  const [userPlaylist, setUserPlaylist] = useState<IPlaylistUserResponse>();
  const { lectureId, lectures, currentLectureIndex } = useAppSelector((state) => state.GlobalStore.leaderBoardPage);
  const dispatch = useAppDispatch();
  const { setIsSelectListenLecture } = persist;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isContinuePlaying, setIsContinuePlaying] = useState(false);
  const [isStopPlaying, setIsStopPlaying] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [triggerLikeOrUnlike] = useLikeOrUnlikePlaylistByUserMutation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userPlaylist?.isLiked) {
      setIsLiked(userPlaylist?.isLiked);
    } else {
      setIsLiked(false);
    }
    setLikesCount(userPlaylist?.likes ?? 0);
  }, [userPlaylist]);

  const isDisableNext = useMemo(() => {
    if (!playlistSummary) {
      return true;
    }
    return currentLectureIndex >= playlistSummary.lectures.length - 1;
  }, [currentLectureIndex, playlistSummary]);
  const isDisablePrevious = useMemo(() => {
    return currentLectureIndex <= 0;
  }, [currentLectureIndex]);

  useEffect(() => {
    setIsLoading(true);
    if (!userId || !lectureId) {
      return;
    }

    trigger(
      {
        userId: userId,
        lectureId: lectureId,
      },
      true
    )
      .unwrap()
      .then((data) => {
        setUserPlaylist(data);
        if (data) {
          setIsLoading(false);
          if (isContinuePlaying) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureId, userId, isContinuePlaying]);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
  };
  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      if (likesCount > 0) {
        setLikesCount(likesCount - 1);
      }
    }
    if (!userId || !lectureId) {
      return;
    }

    triggerLikeOrUnlike({
      userId: userId,
      lectureId: lectureId,
      emoji: isLiked ? "unlike" : "like",
    });

    setIsLiked(!isLiked);
  };
  const handlePlayAudio = () => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setIsStopPlaying(false);
      setIsPlaying(true);
      audioRef.current.play();
    }
  };
  const handleEnded = () => {
    if (!userPlaylist || !userPlaylist.records || !swiperRef || !swiperRef.current?.swiper) {
      return;
    }
    if (currentIndex === userPlaylist.records.length - 1) {
      if (currentLectureIndex >= lectures.length - 1) {
        dispatch(updateIndexLectureLeaderPage(-lectures.length + 1));
        swiperRef.current.swiper.slideTo(0);
        setCurrentIndex(0);

        if (!isLoop) {
          setIsPlaying(false);
          setIsContinuePlaying(false);
          setIsStopPlaying(true);
        }

        return;
      }

      handleGotoNext();
      return;
    }
    swiperRef.current.swiper.slideTo(currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
  };
  const onSlideChange = (val: SwiperClass) => {
    setIsStopPlaying(false);
    if (audioRef && audioRef.current) {
      audioRef.current.pause();
      setCurrentIndex(val.activeIndex);
    }
  };

  const handleGotoNext = () => {
    setIsStopPlaying(false);

    if (isPlaying) {
      setIsContinuePlaying(true);
      setIsPlaying(false);
    }

    dispatch(updateIndexLectureLeaderPage(1));
  };
  const handleGotoPrevious = () => {
    if (isPlaying) {
      setIsContinuePlaying(true);
      setIsPlaying(false);
    }
    dispatch(updateIndexLectureLeaderPage(-1));
  };

  if (isLoadingPlaylistSummary || !lectureId || !playlistSummary) {
    return <Loading />;
  }
  return (
    <Box className="h-screen bg-gray-100">
      <Container className="py-4 divider bg-gray-100 sticky top-0 z-10">
        <Box className="flex items-center gap-2">
          <IconButton
            onClick={() => {
              setIsSelectListenLecture(false);
              navigate(ROUTER.LEADER_BOARD);
            }}
          >
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold grow">{`${playlistSummary?.nickName}'s voice recording`}</Typography>
        </Box>
      </Container>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCopying} autoHideDuration={3000}>
        <Alert severity="success">Your link has been copied successfully.</Alert>
      </Snackbar>
      <Box className="p-4 flex mt-0 md:mt-0 flex-col items-center">
        <Box
          sx={{
            maxWidth: "calc(100vw - 32px)",
          }}
          className="p-6 shadow-xl bg-white rounded-2xl flex flex-col items-center justify-center w-[100vw] lg:w-[500px]"
        >
          <img className="h-16 mb-4" src={lectures[currentLectureIndex].imgSrc} alt="gallery-icon" />

          <>
            {lectures[currentLectureIndex].lectureName && (
              <Typography className="text-xl font-semibold mb-6">{lectures[currentLectureIndex].lectureName}</Typography>
            )}

            <Box className={"w-full px-4"}>
              <Swiper
                className="md:max-w-[600px] "
                pagination={{
                  enabled: true,
                  // horizontalClass: "bottom-0",
                }}
                slidesPerView={"auto"}
                modules={[Pagination]}
                onSlideChange={onSlideChange}
                ref={swiperRef}
                onTouchEnd={() => (trackingSwiper.current = Date.now())}
                onReachEnd={() => {}}
              >
                {isLoading || !userPlaylist?.records || userPlaylist.records.length === 0 ? (
                  <div className="bg-gray-50 p-4 pb-10 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border h-[150px]">
                    <Loading />
                  </div>
                ) : (
                  userPlaylist?.records.map((record) => (
                    <SwiperSlide key={record.recordId}>
                      <Box className="bg-gray-50 p-4 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border max-h-[208px] h-[208px]">
                        <Typography className="text-small-medium break-words ">{record.title}</Typography>
                        <Typography className="text-small-regular break-all" variant="body2">
                          {record.phonetic}
                        </Typography>
                      </Box>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
              <Box className="w-full flex items-center justify-around mt-6 mb-12">
                <Tooltip title="Replay">
                  <IconButton
                    onClick={() => {
                      setIsLoop(!isLoop);
                    }}
                  >
                    <Avatar src={isLoop ? ActivedLoopIcon : LoopIcon} alt="wave-icon" className="w-6 h-6" />
                  </IconButton>
                </Tooltip>

                <IconButton disabled={isDisablePrevious} onClick={handleGotoPrevious}>
                  <Avatar src={isDisablePrevious ? DisablePreviosIcon : PreviosIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
                <IconButton
                  onClick={handlePlayAudio}
                  disabled={userPlaylist?.records.length === 0}
                  className="bg-primary w-16 h-16"
                >
                  <Avatar src={isPlaying ? PauseIcon : PlayIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
                <IconButton disabled={isDisableNext} onClick={handleGotoNext}>
                  <Avatar src={isDisableNext ? DisableNextIcon : NextIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    navigate(ROUTER.LEADER_BOARD_SELECT_LECTURE);
                  }}
                >
                  <Avatar variant="square" src={LectureListIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
              </Box>
              {userPlaylist && userPlaylist?.records && userPlaylist.records.length > 0 && currentIndex >= 0 && (
                <audio
                  autoPlay={isPlaying && !isStopPlaying}
                  onEnded={handleEnded}
                  ref={audioRef}
                  src={userPlaylist?.records[currentIndex]?.voiceSrc}
                />
              )}
            </Box>

            <Box className="mb-4 w-full  flex items-center gap-8 justify-around">
              <Box
                className={`${isLoading ? "opacity-0 pointer-events-none" : "opacity-1"} transition-opacity flex items-center`}
              >
                <IconButton className="" onClick={handleLike}>
                  {isLiked ? <LikedIcon /> : <LikeIcon />}
                </IconButton>
                <Typography className="text-primary">{likesCount}</Typography>
              </Box>

              <Button
                onClick={handleCopyClick}
                startIcon={<CopyIcon />}
                sx={{
                  borderRadius: "20px",
                }}
                color="primary"
              >
                Copy link
              </Button>
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPlaylist;
